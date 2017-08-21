const data = require ("./data/data")
const express = require("express")
const app = express()
const mustache = require("mustache-express")
app.engine('mustache', mustache())
app.set('views', './views')
app.set('view engine', 'mustache')
app.use( express.static('public'))

app.listen(3000, function(){
  console.log(Live on port 3000);
})
