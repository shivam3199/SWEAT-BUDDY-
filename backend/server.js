require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const path = require('path')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes)

app.use(express.static(path.join(__dirname,"./frontend/build")))
app.get("*",(req,res) => {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log(`listening for requests on port, ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 