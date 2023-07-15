const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
const bcrypt = require("bcryptjs");
const fakeProductList = [
    {
        id: 0,
        src: 'https://megaone.acrothemes.com/food-shop/img/item8.jpg',
        alt: 'product',
        name: 'Oranges',
        price: '20',
        qty: 1,
        sale: 20,
        priceSaled: 15,
    },
    {
        id: 1,
        src: 'https://megaone.acrothemes.com/food-shop/img/item9.jpg',
        alt: 'product',
        name: 'Grapes',
        price: '30',
        qty: 1,
    },
    {
        id: 2,
        src: 'https://megaone.acrothemes.com/food-shop/img/item10.jpg',
        alt: 'product',
        name: 'Bananas',
        price: '40',
        qty: 1,
        sale: 20,
        priceSaled: 15,
    },
    {
        id: 3,
        src: 'https://megaone.acrothemes.com/food-shop/img/item11.jpg',
        alt: 'product',
        name: 'Kiwi',
        price: '10',
        qty: 1,
        sale: 20,
        priceSaled: 15,
    },
    {
        id: 4,
        src: 'https://megaone.acrothemes.com/food-shop/img/item7.jpg',
        alt: 'product',
        name: 'Strawberries',
        price: '20',
        qty: 1,
        sale: 20,
        priceSaled: 15,
    },
    {
        id: 5,
        src: 'https://megaone.acrothemes.com/food-shop/img/item5.jpg',
        alt: 'product',
        name: 'Cherries',
        price: '30',
        qty: 1,
    },
    {
        id: 6,
        src: 'https://megaone.acrothemes.com/food-shop/img/item8.jpg',
        alt: 'product',
        name: 'Oranges',
        price: '20',
        qty: 1,
        sale: 20,
        priceSaled: 15,
    },
    {
        id: 7,
        src: 'https://megaone.acrothemes.com/food-shop/img/item8.jpg',
        alt: 'product',
        name: 'Oranges',
        price: '20',
        qty: 1,
        sale: 20,
        priceSaled: 15,
    },
    {
        id: 8,
        src: 'https://megaone.acrothemes.com/food-shop/img/item8.jpg',
        alt: 'product',
        name: 'Oranges',
        price: '20',
        qty: 1,
        sale: 20,
        priceSaled: 15,
    },
    {
        id: 9,
        src: 'https://megaone.acrothemes.com/food-shop/img/item8.jpg',
        alt: 'product',
        name: 'Oranges',
        price: '20',
        qty: 1,
        sale: 20,
        priceSaled: 15,
    },
    {
        id: 10,
        src: 'https://megaone.acrothemes.com/food-shop/img/item8.jpg',
        alt: 'product',
        name: 'Oranges',
        price: '20',
        qty: 1,
        sale: 20,
        priceSaled: 15,
    },
];

const app = express();

app.use(express.json());
app.use(cookieSession({
    name: 'session',
    keys: [''],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(cors());

const db = require("./app/models/index");
const User = db.user;
const Product = db.product;
db.sequelize.sync({force: true}).then(() => {
    console.log('Drop and Resync Db');
    initial();
  });

const initial = () => {
    User.create({
        username: "test001",
        phoneNumber: "0123456789",
        password: bcrypt.hashSync("12345678", 8)
    });
    User.create({
        username: "test002",
        phoneNumber: "0123456789",
        password: bcrypt.hashSync("12345678", 8)
    });
    User.create({
        username: "test003",
        phoneNumber: "0123456789",
        password: bcrypt.hashSync("12345678", 8)
    });
    fakeProductList.forEach((product) => {
        const {
            src: imageUrl,
            name: productName,
            price,
            qty: amount,
            sale: salePercent = null,
            priceSaled: salePrice = null,
        } = product;
        Product.create({
            productName: productName,
            imageUrl: imageUrl,
            salePercent: salePercent,
            salePrice: salePrice,
            amount: amount * 50,
            price: price,
            description: null
        });
    });
}

app.get('/', (req, res) => {
    res.send('Hello, this is a test route!');
});
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/product.routes')(app);

const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});