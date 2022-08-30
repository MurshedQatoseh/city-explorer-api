'use strict'
const cache = require('./cache.js')
const axios = require('axios')

module.exports = getMovie

async function getMovie (keyword) {
  const key = 'movie-' + keyword
  const url = `${process.env.MOVIE_API_URL}api_key=${process.env.MOVIE_API_KEY}&query=${keyword}`

  if (cache[key] && (Date.now() - cache[key].timestamp < (6000 * 60 * 24))) {
    console.log('Cache hit')
  } else {
    console.log('Cache miss')
    cache[key] = {}
    cache[key].timestamp = Date.now()
    const result = await axios.get(url)
    const dataToSend = result.data
    cache[key].data = dataToSend
  }
  return cache[key].data
}
