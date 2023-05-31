const routes = (app) => {
    app.use("/api/auth", require("./auth"));
    app.use("/api/user", require("./user"));
    app.use("/api/location",require("./location"))
};

module.exports = routes;
