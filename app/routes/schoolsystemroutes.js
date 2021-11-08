module.exports = (app) => {
  const router = require("express").Router();
  const middleware = require("../middleware/middleware");
  const schoolDetails = require("../controllers/schoolController");
  router.post("/school", schoolDetails.school);
  router.post("/class", schoolDetails.className);
  router.post("/section", schoolDetails.section);
  router.post("/subject", schoolDetails.subject);
  app.use("/", router);
};
