const marcaController = require("./marcaController");

module.exports = (app) =>{
    app.post("/marca", marcaController.post);
    app.put("/marca/:id", marcaController.put);
    app.delete("/marca/:id", marcaController.delete);
    app.get("/marca", marcaController.get);
    app.get("/marca/:id", marcaController.getById);
}