
import { response } from 'express';
import express from 'express';
import { get } from 'https';
import { writeFile } from 'fs';
import path from 'path';


const __dirname = path.resolve();
const app = express();


app.listen(3000);

app.get('/', function(req,res){
    res.sendFile(__dirname + "/index.html")
})

app.get('/json', function(req,res){
    const url = "https://aad0cee14cb1f8b2d608066f6ac19126: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@storifyaj.myshopify.com/admin/api/2021-07/shop.json"

    get(url, function(response){
        var json = '';

    response.on('data', function (chunk) {
        json += chunk;
    });

    response.on('end', function () {
                var data = JSON.parse(json);
                var registeredId = data.shop.id;
                var storeName = data.shop.name;
                var domainName = data.shop.domain;
                var registeredEmail = data.shop.email;
                const user = {
                    "id" : registeredId,
                    "name" : storeName,
                    "email" : registeredEmail,
                    "domain" : domainName,
                }

                const userData = JSON.stringify(user);

                writeFile('user.json', userData, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("JSON data is saved.");
                });
        
    });
       
    })
    res.sendFile(__dirname + "/user.json");
})