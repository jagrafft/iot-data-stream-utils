module.exports = {
  apps : [
    {
      name: "001",
      script: "./src/pm2/jsonWriterHarness.js",
      env: {
        NODE_ENV: "development",
        NAME: "001",
        UUID: "24fc67d5-765e-44b6-9503-6c8fee3bf0142",
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
        UUID: "58f16f8a-7d93-48d1-9bc0-db268b16d615",
        PROTOCOL: "tcp",
        ADDRESS: "192.168.39.198",
        PORT: 17171,
        SAMPLE_RATE: 0.05
      }
    },
    {
      name: "003",
      script: "./src/pm2/jsonWriterHarness.js",
      env: {
        NODE_ENV: "development",
        NAME: "003",
        UUID: "21e1e845-a0e6-449d-bd34-8b3fbbdfb129",
        PROTOCOL: "tcp",
        ADDRESS: "192.168.39.111",
        PORT: 17171,
        SAMPLE_RATE: 0.05
      }
    },
    {
      name: "004",
      script: "./src/pm2/jsonWriterHarness.js",
      env: {
        NODE_ENV: "development",
        NAME: "004",
        UUID: "38692e23-64ef-44df-8bb7-64bc9eff83db",
        PROTOCOL: "tcp",
        ADDRESS: "192.168.39.",
        PORT: 17171,
        SAMPLE_RATE: 0.05
      }
    }
    {
      name: "005",
      script: "./src/pm2/jsonWriterHarness.js",
      env: {
        NODE_ENV: "development",
        NAME: "005",
        UUID: "fc1f1dcd-97fa-429e-a929-221b6e361a7b",
        PROTOCOL: "tcp",
        ADDRESS: "192.168.39.",
        PORT: 17171,
        SAMPLE_RATE: 0.05
      }
    }
  ]
}
