const app = require("./app");
const env = require("./config/env");

app.listen(env.port, () => {
  console.log(`Clinic booking API đang chạy tại http://localhost:${env.port}`);
  console.log(`Môi trường: ${env.nodeEnv}`);
});
