module.exports = {
  apps : [
    {
      name: "001",
      script: "./src/pm2/jsonWriterHarness.js",
      env: {
        NODE_ENV: "development",
        NAME: "001",
        ID: "",
        PROTOCOL: "tcp",
        ADDRESS: "192.168.39.188",
        PORT: 17171,
        SAMPLE_RATE: 0.05,
        FILE_PATH: "/home/jg"
      }
    },
    {
      name: "002",
      script: "./src/pm2/jsonWriterHarness.js",
      env: {
        NODE_ENV: "development",
        NAME: "002",
        ID: "",
        PROTOCOL: "tcp",
        ADDRESS: "192.168.39.200",
        PORT: 17171,
        SAMPLE_RATE: 0.05,
        FILE_PATH: "/home/jg"
      }
    }
  ]
}
