const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

function renderNews(request, response) {
  response.render('pages/news')
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/contact', (req, res) => res.render('pages/contact'))
  .get('/news', renderNews)
  .listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))