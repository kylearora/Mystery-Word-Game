const express = require("express")
const app = express()
const mustache = require("mustache-express")
const bodyParser = require("body-parser")
const session = require("express-session")
const validator = require("express-validator")
const words = require("./words")
const randomWord = words.randomWord
const randomWordLength = words.randomWord.length

app.engine("mustache", mustache())
app.set("view engine", "mustache")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))

var sess = {
  secret: "keyboard cat",
  cookie: {},
  saveUninitialized: true,
  resave: true
}
app.use(session(sess))

app.use(function(req, res, next) {
  if (!req.session.pageLoads) {
    req.session.pageLoads = 0
  }
  req.session.pageLoads += 1
  next()
})

const guessLetterArray = []
const guessCount = (randomWord.length + 2)

app.get("/", function(req, res){
  const mysteryWord = randomWord.split("")
  let winspace = false
  for (var i = 0; i < randomWord.length; i++) {
    if (guessLetterArray.indexOf(randomWord[i]) >= 0) {
      mysteryWord[i] = randomWord[i]
    } else {
      mysteryWord[i] = "_"
      winspace = true
    }
  }
  if (!winspace) {
    res.redirect("/win")
  } else {
    res.render("index", {
      randomWord: randomWord,
      mysteryWord: mysteryWord,
      guessLetterArray: guessLetterArray,
      guessCount: guessCount
    })
  }
})

app.get("/win", function (req, res){
  res.render("win")
})

app.post("/", function(req,res){
  const guessWord = req.body.guess
  guessLetterArray.push(guessWord)
  res.redirect("/")
})

app.listen(3000, function(){
  console.log("Live on port 3000");
})
