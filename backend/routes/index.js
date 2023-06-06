const routes = (app) => {
    app.use("/api/auth", require("./auth"));
    app.use("/api/user", require("./user"));
    app.use("/api/location", require("./location"))
    app.use("/api/friend", require("./friend"))
    app.use("/api/friend-request",require("./friendRequest"))
};

module.exports = routes;
