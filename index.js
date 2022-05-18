const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const matk1 = {
  id: 0,
  title: 'Kepikõnd ümber Ülemiste järve',
  description: 'Jalad jäävad kuivaks.',
  startsAt: '6. juuni 2022, 10:00',
  endsAt: '6. juuni 2022, 14:00',
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
  startsAt: '1. juuli 2022, 11:00',
  endsAt: '1. juuli 2022, 18:00',
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
  startsAt: '29. mai 2022, 9:00',
  endsAt: '30. mai 2022, 14:00',
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
  return res.render('pages/trek', { matk })
}

const registreeriOsaleja = (req, res) => {
  const paringuKeha = req.body;
  const matk = matkad.find((matk) => matk.id === parseInt(paringuKeha.matkaId));
  matk.participants.push(paringuKeha.osaleja);
  console.log(JSON.stringify(matkad));
  res.json({answer: 'Töötas!'});
}

const tagastaMatkad = (req, res) => {
  res.json(matkad);
}

const salvestaMatk = (req, res) => {
  const matkaId = req.params.matkaId;
  let matk = matkad.find((matk) => matk.id === parseInt(matkaId));
  matk.title = req.body.title;
  matk.description = req.body.description;
  matk.locationDescription = req.body.locationDescription;
  matk.startsAt = req.body.startsAt;
  matk.endsAt = req.body.endsAt;
  matk.price = req.body.price;
  matk.imageUrl = req.body.imageUrl;
  res.json({ response: 'Töötas!' });
}

const uudis1 = {
  id: 0,
  title: 'What I learned from breaking my ankle in the mountains',
  description: 'It wasn’t my finest hour. A few years ago, I was hiking in the Peak District with my husband when I stepped in a small hole and turned my ankle. ',
  imageUrl: 'https://cdn.mos.cms.futurecdn.net/DSHxEbu7i7CxLKJLeQfVJh-840-80.jpg.webp',
  newsUrl: 'https://www.advnture.com/news/what-i-learned-from-breaking-my-ankle-in-the-mountains'
};

const uudis2 = {
  id: 0,
  title: 'The top risks of hiking? Being male and on your phone',
  description: 'Newly released data shows that men make up the vast majority of mountain fatalities, while experts agree that lack of navigation skills and misreading conditions are key risk factors',
  imageUrl: 'https://cdn.mos.cms.futurecdn.net/7gaSLord49YjpNHV6R7cce-1024-80.jpg.webp',
  newsUrl: 'https://www.advnture.com/news/top-risks-hiking'
};

const uudis3 = {
  id: 0,
  title: "Army veteran's quest to run 5000 miles for new mental health charity",
  description: 'Paul Minter raises awareness and money for inspiring retreat on solo, unsupported 218-day UK coast route',
  imageUrl: 'https://cdn.mos.cms.futurecdn.net/iDuf93McC3DLsajso6pnAe-1024-80.jpg.webp',
  newsUrl: 'https://www.advnture.com/news/army-veterans-quest-to-run-5000-miles-for-new-mental-health-charity'
};

const uudised = [uudis1, uudis2, uudis3];

express()
  .use(express.json())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/contact', (req, res) => res.render('pages/contact'))
  .get('/treks/:matkaId', naitaMatkaVaadet)
  .get('/treks', (req, res) => res.render('pages/treks', { matkad: matkad }))
  .get('/news', (req, res) => res.render('pages/news' , { uudised: uudised }))
  .get('/admin', (req, res) => res.render('pages/admin'))
  .post('/api/register', registreeriOsaleja)
  .get('/api/treks', tagastaMatkad)
  .post('/api/treks/:matkaId', salvestaMatk)
  .listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));