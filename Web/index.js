const express = require('express')
const route = require('./src/routes/index')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,"src","public")))
app.use(express.urlencoded({
  extended : true
}))
app.use(express.json());
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})