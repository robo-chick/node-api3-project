const express = require('express')
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")

const server = express();
const port = 4000

server.use(express.json())

server.use(userRouter)
server.use(postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const time = new Date().toISOString()
  console.log(`${time} ${req.method} ${req.url}`)
}

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

module.exports = server;
