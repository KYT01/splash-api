const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config()

const app = express();
app.use (cors());

const PORT = process.env.PORT || 8090;


app.get("/", (request, response) => {
    response.json("HOME PAGE");
});

app.listen(PORT, ()=> console.log('app is running on ${PORT}'));

// https://api.unsplash.com/search/photos/?client_id=YOUR_ACCESS_KEY //

app.get("/photos", async (request, response) => {
    const subject = request.query.subject
    const API = `https://api.unsplash.com/search/photos/?client_id=${process.env.REACT_APP_ACCESS_KEY}&query=${subject}`;
    const res = await axios.get(API);

    const photos = res.data.results.map((photo)=>{
        return {
            id: photo.id,
            img_url: photo.urls.regular,
            original_image: photo.links.self,
            photographer: photo.user.name
        }
    })
    response.status(200).json(photos);
});






