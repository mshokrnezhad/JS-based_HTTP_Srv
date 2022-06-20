const http = require("http");

const PORT = 3000;
const FRIENDS = [
    {
        id: 0,
        name: "AAA"
    },
    {
        id: 1,
        name: "BBB"
    },
    {
        id: 2,
        name: "CCC"
    }
]

const server = http.createServer();

server.on("request", (req, res) => {
    urlParts = req.url.split("/");
    if (req.method === "POST" && urlParts[1] === "friends") {
        req.on("data", data => {
            const friend = data.toString();
            console.log(friend);
            FRIENDS.push(JSON.parse(friend));
        });
        req.pipe(res);
    }
    else if (req.method === "GET" && urlParts[1] === "friends") {
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        if (urlParts.length === 3) {
            id = urlParts[2];
            res.end(JSON.stringify(FRIENDS[id]))
        }
        else {
            res.end(JSON.stringify(FRIENDS))
        }
    }
    else if (req.method === "GET" && urlParts[1] === "messages") {
        res.statusCode = 200;
        res.setHeader = ("Content-Type", "text/html")
        res.end("Helloooooooooo!")
    }
    else {
        res.statusCode = 404
        res.end("Nothing found!")
    }


})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
});