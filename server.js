const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.text());
app.use(express.json());

let servers = 0;
let users = 0;

app.get("/clients/servers", (req, res) => {
    res.send(servers.toString());
});

app.get("/clients/users", (req, res) => {
    res.send(users.toString());
});

// POST servers (+1)
app.post("/clients/servers", (req, res) => {
    servers += 1;
    console.log("Servers +1 =>", servers);
    res.send("OK");
});

// POST users (+1 or -1)
app.post("/clients/users", (req, res) => {
    let delta = parseInt(req.body);

    if (isNaN(delta)) {
        return res.status(400).send("Invalid delta");
    }

    users += delta;
    console.log(`Users ${delta > 0 ? "+" : ""}${delta} =>`, users);

    res.send("OK");
});

// Root
app.get("/", (req, res) => {
    res.send("API OK");
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
