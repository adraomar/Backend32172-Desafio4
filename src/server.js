const express = require("express");
const { Router } = express;

const app = express();
const router = Router();
const PORT = 8080;
const productos = [];
let id = 0;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

app.use(express.urlencoded({extended: true}));
app.use("/", express.static("public"));
app.use("/api", router);

router.get("/productos", (request, response) => {
    if(productos.length < 1) {
        response.json({
            error: "No existen productos."
        });
    }
    else
    {
        response.send(productos);
    }
}) 

router.get("/productos/:id", (request, response) => {
    const id = request.params.id;
    const encontrado = productos.find((e) => Number(e.id) === Number(id));

    if(isNaN(id) || !encontrado) {
        response.json({
            error: "El id de producto es inválido."
        });
    }
    else
    {
        response.json({encontrado});
    }
}) 

router.post("/productos", (request, response) => {
    const prod = request.body;
    const newProd = {id: id, ...prod};
    productos.push(newProd);
    console.log(productos);
    id++;
    response.send(productos);
})

router.put("/productos/:id", (request, response) => {
    response.send("Put OK");
})

router.delete("/productos/:id", (request, response) => {
    response.send("DElete OK");
})