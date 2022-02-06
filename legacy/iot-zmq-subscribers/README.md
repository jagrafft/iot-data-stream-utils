# IoT ZeroMQ Subscribers
CLI for subscribing to then handling ZeroMQ streams (e.g. write to disk, merge with other streams, relay, ...) designed for compatibility with [IoT ZeroMQ Publishers][izp]. 

## CLI Options
| Option                     |
|:---------------------------|
| `-d, --device [devices]`   |
| `--devices`                |
| `-n, --handler [handlers]` |
| `-p, --path [path]`        |
| `-s, --status [stream]`    |

### Flag Composition
|                 | `-d, --device`                | `-n, --handler`                        | `-p, --path`                  | `-s, --stream`         |
|:----------------|:-----------------------------:|:--------------------------------------:|:-----------------------------:|:----------------------:|
| `-d, --device`  | [Show](#devices)              | [Not Yet Implemented](#device-handler) | [Write](#device-handler-path) | [Show](#device-status) |
| `-n, --handler` | [Write](#device-handler-path) | [Show](#handlers)                      | [Write](#device-handler-path) | `-`                    |
| `-p, --path`    | [Write](#device-handler-path) | [Write](#device-handler-path)          | `-`                           | `-`                    |
| `-s, --status`  | [Show](#device-status)        | `-`                                    | `-`                           | [Show](#statuses)      |

#### Device(s)
Show one (1) or more `device`s.

```bash
[EXAMPLE]
```

#### Handler(s)
Show one (1) or more `handler`s.

```bash
[EXAMPLE]
```

#### Status(es)
Show the status of one (1) or more running processes.

```bash
[EXAMPLE]
```

#### Device, Handler _NOT YET IMPLEMENTED_
Show the output of `handler` for a given `device`. **Does not write.** Should be used with handlers that do not require external handling of data persistence.

```bash
[EXAMPLE]
```

#### Device, Handler, Path
Write data streams of `(device, handler)` combination(s) to `path`. Errors then aborts if `path` exists.

```bash
[EXAMPLE]
```

#### Device, Status
Show the `status` of one (1) or more `device`s.

```bash
[EXAMPLE]
```

[izp]: https://github.com/jagrafft/iot_zmq_publishers
