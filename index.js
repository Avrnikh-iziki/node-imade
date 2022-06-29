const express = require("express");
const path = require("path")
const app = express();
const helmet = require('helmet')
const cors = require('cors');
const db = require('./config/db')
require('dotenv').config();

db()
const port = process.env.PORT;
const corsOption = {
    origin: '*',
    Credential: true,
}


const auth = require('./routes/auth')
const orders = require('./routes/orders')
const products = require('./routes/products')

app.use(
    helmet.hidePoweredBy(),
    helmet.frameguard({ action: 'deny' }),
    helmet.hsts(),
    helmet.noSniff(),
    helmet.dnsPrefetchControl(),
    helmet.ieNoOpen(),
    helmet.referrerPolicy(),
    helmet.xssFilter(),
    helmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'", "trusted-cdn.com"], "img-src": ["'self'", "https: data:"] } })
);
app.use(express.json())
app.use(cors(corsOption))

app.use('/auth',auth )
app.use('/products',products )
app.use('/orders',orders )


app.listen(port, () => {
    console.log(`server listen on port ${port}`)
})
