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

const mysteryWord = randomWord.split("")
const guessLetterArray = []

app.get("/", function(req, res){
  res.render("index", {
    randomWord: randomWord,
    mysteryWord: mysteryWord,
    guessLetterArray: guessLetterArray
  })
})

app.post("/", function(req,res){
  const guessWord = req.body.guess
  guessLetterArray.push(guessWord)
  res.redirect("/")
})

for (var i = 0; i < mysteryWord.length; i++) {
  mysteryWord[i] = "_"
  if (guessLetterArray === mysteryWord[i]) {
  mysteryWord[i] === guessLetterArray
  } else {
  mysteryWord[i] === "_"
  console.log(randomWord);
  }
}

app.listen(3000, function(){
  console.log("Live on port 3000");
})
