const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const matk1 = {
  id: 0,
  title: 'Kepikõnd ümber Ülemiste järve',
  description: 'Jalad jäävad kuivaks.',
  startsAt: '6. juuni, 10:00',
  endsAt: '6. juuni, 14:00',
  locationDescription: 'Järve Selveri parkla',
  locationLatitude: '59.393345',
  locationLongitude: '24.722974',
  price: '20€',
  imageUrl: 'https://shawellnessclinic.com/wp-content/uploads/2014/11/nordic-walking3.jpg',
  participants: [],
};

const matk2 = {
  id: 1,
  title: 'Rattamatk ümber Naissaare',
  description: 'Saame kokku Pirita rannas, ujume ratastega üle ja sõidame paar tundi. Toitulustus on hinna sees.',
  startsAt: '1. juuli, 11:00',
  endsAt: '1. juuli, 18:00',
  locationDescription: 'Pirita rannas',
  locationLatitude: '59.470105',
  locationLongitude: '24.828892',
  price: '50€',
  imageUrl: 'https://trek.scene7.com/is/image/TrekBicycleProducts/b300_mtbMarqueeImage?wid=1200',
  participants: [],
};

const matk3 = {
  id: 2,
  title: 'Ujumine üle Suure Väina',
  description: 'Kaasa ujukad.',
  startsAt: '29. mai, 9:00',
  endsAt: '30. mai, 14:00',
  locationDescription: 'Virtsu sadamas',
  locationLatitude: '58.573628',
  locationLongitude: '23.510629',
  price: '10€',
  imageUrl: 'http://ontheedgemag.com/wp-content/uploads/2018/08/Ice-Swim-3-Ryan-Stramrood.jpg',
  participants: [],
};

const matkad = [matk1, matk2, matk3];

const naitaMatkaVaadet = (req, res) => {
  const matk = matkad.find((matk) => matk.id === parseInt(req.params.matkaId))
  return res.render('pages/trek', { matk: matk })
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/contact', (req, res) => res.render('pages/contact'))
  .get('/treks/:matkaId', naitaMatkaVaadet)
  .get('/treks', (req, res) => res.render('pages/treks', { matkad: matkad }))
  .get('/news', (req, res) => res.render('pages/news'))
  .listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));