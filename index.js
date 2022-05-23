const express = require('express');
const path = require('path');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const PORT = process.env.PORT || 5000;

let matkad;

const uri = "mongodb+srv://loodlakev:sitakott@cluster0.a13cc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const loeMatkadMallu = (async () => {
  try {
    await client.connect();
    const collection = client.db('matka-app-2203').collection('treks');
    matkad = await collection.find().toArray();
  } finally {
    await client.close();
    console.log(matkad);
  }
})()

const naitaMatkaVaadet = async (req, res) => {
  let matk;
  try {
    await client.connect();
    const collection = client.db('matka-app-2203').collection('treks');
    matk = await collection.findOne({ _id: new ObjectId(req.params.matkaId) });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
  return res.render('pages/trek', { matk });
}

const registreeriOsaleja = async (req, res) => {
  const paringuKeha = req.body;
  try {
    await client.connect();
    const collection = client.db('matka-app-2203').collection('treks');
    const filter = { _id: new ObjectId(paringuKeha.matkaId) };
    const updateDoc = {
      $push: { participants: paringuKeha.osaleja }
    };
    matk = await collection.updateOne(filter, updateDoc);
    res.json({ response: 'Töötas!' });
  } catch (error) {
    console.log(error);
    res.json({ response: 'Katki läks!' });
  } finally {
    await client.close();
  }
}

const tagastaMatkad = async (req, res) => {
  try {
    await client.connect();
    const collection = client.db('matka-app-2203').collection('treks');
    const treks = await collection.find().toArray();
    res.json(treks);
  } catch (error) {
    console.log(error);
    res.json({ response: 'Katki läks!' });
  } finally {
    await client.close();
  }
}

const salvestaMatk = async (req, res) => {
  const matkaId = req.params.matkaId;
  try {
    await client.connect();
    const collection = client.db('matka-app-2203').collection('treks');
    const filter = { _id: new ObjectId(matkaId) };
    const updateDoc = {
      $set: {
        description: req.body.description,
        locationDescription: req.body.locationDescription,
        startsAt: req.body.startsAt,
        endsAt: req.body.endsAt,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        title: req.body.title,
      }
    };
    matk = await collection.updateOne(filter, updateDoc);
    res.json({ response: 'Töötas!' });
  } catch (error) {
    console.log(error);
    res.json({ response: 'Katki läks!' });
  } finally {
    await client.close();
  }
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