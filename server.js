'use strict'

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const weather = require('./modules/weather.js')
const movie = require('./modules/movie.js')

const app = express()
app.use(cors())
const PORT = process.env.PORT || 3002

app.get('/weather', weatherHandler)
app.get('/movie', movieHandler)

function weatherHandler (request, response, next) {
  try {
    const { lat, lon } = request.query
    weather(lat, lon).then(summaries => response.send(summaries)).catch((error) => {
      console.error(error)
      response.status(200).send(' Something went wrong!')
    })
  } catch (error) {
    next(error)
  }
}

function movieHandler (request, response, next) {
  try {
    const keyword = request.query.keyword
    movie(keyword).then(summaries => response.send(summaries)).catch((error) => {
      console.error(error)
      response.status(200).send(' Something went wrong!')
    })
  } catch (error) {
    next(error)
  }
}

app.use((error, request, response, next) => {
  response.status(500).send(error.message)
})

app.listen(PORT, () => console.log(`Server up on ${PORT}`))
