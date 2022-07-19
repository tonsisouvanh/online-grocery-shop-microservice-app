const { SubscribeEvents } = require("../controllers/merchantController");
const appEvents = (app) => {

  app.use("/app-events", async (req, res, next) => {
    const { payload } = req.body;

    SubscribeEvents(payload);

    console.log("========== User Service recieved Event ==========");

    return res.status(200).json(payload);
  });
};

module.exports = appEvents;
