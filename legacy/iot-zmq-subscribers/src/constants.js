import {
  homedir
} from "os"

const REQUIRED_DEVICE_CONFIG_KEYS = ["address", "port", "protocol", "sampleRate"]

const REQUIRED_HANDLER_CONFIG_KEYS = ["name", "description", "script"]

export {
  REQUIRED_DEVICE_CONFIG_KEYS,
  REQUIRED_HANDLER_CONFIG_KEYS
}
