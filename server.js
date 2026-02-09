const { loadEnv } = require("./src/config/env");
loadEnv();

const app = require("./src/app");
const { connectDB } = require("./src/db");

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });
