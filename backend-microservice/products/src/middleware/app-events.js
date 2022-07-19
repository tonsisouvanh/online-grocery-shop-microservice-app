const { SubscribeEvents } = require("../controllers/productController");
const appEvents = (app) => {

  app.use("/app-events", async (req, res, next) => {
    const { payload } = req.body;

    SubscribeEvents(payload);

    console.log("========== product Service recieved Event ==========");

    return res.status(200).json(payload);
  });
};

module.exports = appEvents;
