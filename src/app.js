const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const meRoutes = require("./routes/me.routes");
const sessionsRoutes = require("./routes/sessions.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const { notFound, errorHandler } = require("./middleware/error");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/me", meRoutes);
app.use("/api/sessions", sessionsRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
