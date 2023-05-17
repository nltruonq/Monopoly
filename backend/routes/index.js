const routes = (app) => {
    app.use("/api/auth", require("./auth"));
    app.use("/api/user", require("./user"));
};

module.exports = routes;
