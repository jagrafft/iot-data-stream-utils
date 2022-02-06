import { readConfig } from "../src/utils.js"

readConfig()
  .then(x => console.log(x))
  .catch(console.error)
