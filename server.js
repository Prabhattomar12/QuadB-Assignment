const express = require('express');
const ejs = require('ejs');
const cors = require('cors');
const fetch = require("node-fetch");
const pool = require('./db');

// app configs
const app = express();
const PORT = process.env.PORT || 9000;
let list = [];


// middlewares
app.use(cors())
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

// routes
app.get('/', async (req, res) => {
   // add data in the postgres database only one time
    //  await fetch('https://api.wazirx.com/api/v2/tickers')
    // .then(res => res.json())
    // .then( async result => {
    //     for(let i=0; i<10; i++){
    //         console.log(i, result[Object.keys(result)[i]] );
    //         list.push(result[Object.keys(result)[i]])

            // const data = result[Object.keys(result)[i]];
            // const body = {
            //     "name": data.name,
            //     "last": data.last,
            //     "sell": data.sell, 
            //     "buy_price": data.buy, 
            //     "volume": data.volume, 
            //     "base_unit": data.base_unit,
            // }
            // await fetch('http://localhost:9000/addItem', {
            //     method: "POST",
            //     headers: { "content-type": "application/json" },
            //     body: JSON.stringify(body),
            // })
        // }

      

    // })
 
    // fetching data from own rest api
      
    await fetch('http://localhost:9000/getList')
                         .then( res => res.json())
                         .then(result => list = result)

    console.log('list ', list)
     
    res.render('home', { list: list });

})

app.post('/addItem', async (req, res) => {
    try {
      const { name, last, sell, buy_price, volume, base_unit } = req.body;
      const newItem = await pool.query(
        'INSERT INTO cryptoList (name, last, sell, buy_price, volume, base_unit) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
        [name, last, sell, buy_price, volume, base_unit]
      );
      res.status(201).json(newItem.rows[0]);
    } catch (err) {
      console.log(err.message);
    }
  });


  app.get('/getList', async (req, res) => {
    try {
      const allList = await pool.query('SELECT * FROM cryptolist');
      res.json(allList.rows);
    } catch (err) {
      console.log(err.message);
    }
  });


// listen
app.listen(PORT, () => console.log('Server has started on Port no: ', PORT));

