import zmq from "zeromq"

import {
  Observable
} from 'rxjs'

/* Class to encapsulate ZMQ publisher stream */
class ZMQObserver {
  // Instantiate private fields
  #connected 
  #subscribed
  
  /**
   * Constructor for ZMQObservable
   *
   * @param {string} protocol - Protocol to use
   * @param {string} address - ZMQ publisher address
   * @param {number} port - Port of ZMQ publisher
   * @param {number} rate - Sample rate
   * @param {string} [topic=""] - Topic to subscribe to
   * @param {string} [description=""] - Description of ZMQObservable
   */
  constructor(
    protocol,
    address,
    port,
    rate,
    topic="",
    description=""
  ) {
    this._protocol = protocol
    this._address = address
    this._port = port
    this._rate = rate
    this._topic = topic

    // Initiate ZMQ subscriber
    this._socket = zmq.socket("sub")

    // Set private fields
    this.#connected = false
    this.#subscribed = false
  }

  // TODO Function should report connection status with respect to IoT device
  /**
   * Connect to ZMQ publisher
   */
  connect() {
    if (this.#connected) {
      console.error("ALREADY CONNECTED")
    } else {
      try {
        this._socket.connect(this.urlPath())
        this.#connected = true
        console.log("CONNECTED")
      } catch (err) {
        console.error(err)
      }
    }
  }

  /* CLASS METHODS */
  /**
   * Connect to ZMQ publisher
   */
  disconnect() {
    if (this.#connected) {
      try {
        this._socket.disconnect(this.urlPath())
        this.#connected = false
        console.log("DISCONNECTED")
      } catch (err) {
        console.error(err)
      }
    } else {
      console.error("NOT CONNECTED")
    }
  }

  /**
   * Indicate if socket is connected
   */
  isConnected() {
    return this.#connected
  }

  /**
   * Indicate if socket is subscribed to a topic
   */
  isSubscribed() {
    return this.#subscribed
  }

  // TODO Can this function elimiate redudant definitions?
  /**
   * ZMQ subscriber stream wrapped in an Observable
   *
   * @param {bool} [byteStream=false] - Return bytes instead of strings
   * @return {Observable}
   */
  observable(byteStream=false) {
    this.isConnected() || this.connect()
    this.isSubscribed() || this.subscribe()

    if (byteStream) {
      // Return Observable for bytes
      return new Observable(subscriber => {
        this._socket.on("message", (bytes) => { 
          subscriber.next(bytes)
        })

        const unsubscribe = () => {
          // TODO Both appropriate?
          this.unsubscribe()
          this.disconnect()
        }

        return unsubscribe
      })
    } else {
      // Return Observable for strings
      return new Observable(subscriber => {
        const textDecoder = new TextDecoder()

        this._socket.on("message", (bytes) => { 
          subscriber.next(textDecoder.decode(bytes))
        })

        const unsubscribe = () => {
          subscriber.complete()
          // TODO Both appropriate?
          this.unsubscribe()
          this.disconnect()
        }

        return unsubscribe
      })
    }
  }
  
  // TODO Function should report subscription status with respect to IoT device
  /**
   * Subscribe to ZMQ topic
   */
  subscribe() {
    if (this.isConnected()) {
      if (this.isSubscribed()) {
        console.error("ALREADY SUBSCRIBED")
      } else {
        try {
          this._socket.subscribe(this._topic)
          this.#subscribed = true
          console.log("SUBSCRIBED")
        } catch (err) {
          console.error(err)
        }
      }
    } else {
      console.error("SUBSCRIBER IS NOT CONNECTED TO A PUBLISHER")
    }
  }

  /**
   * Unsubscribe from ZMQ topic
   */
  unsubscribe() {
    if (this.isSubscribed()) {
      this._socket.unsubscribe(this._topic)
      console.log("UNSUBSCRIBED")
    } else {
      console.error("NOT SUBSCRIBED")
    }
  }

  /**
   * Return URL path for ZMQ publisher
   */
  urlPath() {
    return `${this._protocol}://${this._address}:${this._port}`
  }

  /* GET/SET METHODS */
  get address() {
    return this._address
  }

  set address(a) {
    this._address = a
  }

  get port() {
    return this._port
  }

  set port(p) {
    this._port = p
  }

  get protocol() {
    return this._protocol
  }

  set protocol(p) {
    this._protocol = p
  }

  get rate() {
    return this._rate
  }

  set rate(r) {
    this._rate = r
  }

  get topic() {
    return this._topic
  }

  set topic(t) {
    this._topic = t
  }
}

export {
  ZMQObserver
}
