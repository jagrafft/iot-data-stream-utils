module.exports = {
  apps : [
    {
      name: "",
      script: "./src/pm2/jsonWriterHarness.js",
      env: {
        NODE_ENV: "development",
        NAME: "",
        UUID: "",
        PROTOCOL: "tcp",
        ADDRESS: "",
        PORT: 11111,
        SAMPLE_RATE: 0.1
      }
    }
  ]
}
