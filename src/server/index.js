const express = require('express');
const os = require('os');
const products = require("./products.json");
const fs = require("fs");
const axios = require('axios');

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

//  Method 1: Make API call, Write and Read data from file and send response 
app.get('/api/getProductsViaAPI', async (_req, res) => {
    console.log("Coming in getProducts API call..");
    let products_data;
    await axios.get("https://dummyjson.com/products").then(res => {
        // console.log("res in BE: ", res.data);
        products_data = res.data;
        return res.data;
    })
        .then(error => error?.data?.message);
    console.log("products_data: ", products_data.products.length);
    fs.writeFile("./src/server/write_products.json", JSON.stringify(products_data), (err) => {
        if (err) console.log("file write err: ", err)
    });
    console.log("write successful!!")

    fs.readFile("./src/server/write_products.json", (err, data) => {
        console.log("read data: ", JSON.parse(data));
        return res.send(JSON.parse(data));
    });
})

//  Method 2: Directly sending the data by loading the data from imported JSON.
app.get('/api/getMockProducts', (_req, res) => {
    res.send(products);
})

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
