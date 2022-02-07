module.exports = {
  apps : [
    {
      name: "001",
      script: "./src/pm2/jsonWriterHarness.js",
      env: {
        NODE_ENV: "development",
        NAME: "001",
        ID: "157cdfb2-c888-47aa-acab-5c701a2878cf",
        PROTOCOL: "tcp",
        ADDRESS: "192.168.39.187",
        PORT: 17171,
        SAMPLE_RATE: 0.05
      }
    },
    {
      name: "002",
      script: "./src/pm2/jsonWriterHarness.js",
      env: {
        NODE_ENV: "development",
        NAME: "002",
        ID: "3b7050ef-3f5c-417a-a8ac-9299c0da1f46",
        PROTOCOL: "tcp",
        ADDRESS: "192.168.39.198",
        PORT: 17171,
        SAMPLE_RATE: 0.05
      }
    }
  ]
}
