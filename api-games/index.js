const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let DB = {
    games: [
        {
            id: 10,
            title: "Sim City 4",
            year: 2004,
            price: 20,
        },
        {
            id: 35,
            title: "Cities Skylines",
            year: 2016,
            price: 40,
        },
        {
            id: 98,
            title: "GTA V",
            year: 2013,
            price: 60,
        },
        {
            id: 76,
            title: "The Witcher",
            year: 2007,
            price: 40,
        },
        {
            id: 23,
            title: "Red Dead Revolver",
            year: 2004,
            price: 40,
        },
    ],
};

app.get("/games", (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
});

app.get("/games/:id", (req, res) => {
    if (isNaN(req.params.id)) return res.sendStatus(400);

    let id = parseInt(req.params.id);
    let game = DB.games.find((game) => game.id == id);

    if (game == undefined) return res.sendStatus(404);

    res.statusCode = 200;
    res.json(game);
});

app.post("/game", (req, res) => {
    let { title, price, year } = req.body;

    DB.games.push({
        id: 122,
        title,
        price,
        year,
    });

    res.sendStatus(200);
});

app.delete("/game/:id", (req, res) => {
    if (isNaN(req.params.id)) return res.sendStatus(400);

    let id = parseInt(req.params.id);
    let index = DB.games.findIndex((game) => game.id == id);

    console.log(index);

    if (index == -1) return res.sendStatus(404);

    DB.games.splice(index, 1);

    res.sendStatus(200);
});

app.put("/game/:id", (req, res) => {
    if (isNaN(req.params.id)) return res.sendStatus(400);

    let id = parseInt(req.params.id);
    let game = DB.games.find((game) => game.id == id);

    if (game == undefined) return res.sendStatus(404);

    let { title, price, year } = req.body;

    if (title != undefined) game.title = title;
    if (price != undefined) game.price = price;
    if (year != undefined) game.year = year;

    res.sendStatus(200);
});

app.listen(2000, () => {
    console.log("API TEST...");
});
