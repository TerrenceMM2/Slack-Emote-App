"use strict"

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// External data file
const emoticons = require("./emoticons.js");

// @route GET "/"
// @desc provides a random value from supplied data file.
app.post("/", (req, res) => {
    let emoticonReq = req.body.text;
    emoticonReq = emoticonReq.toLowerCase();
    let emoteArr = {};

    emoticons.forEach(emote => {
        if (emoticonReq === emote.name) {
            emoteArr = emote.emoticons;
        }
    });
    
    const randomEmote = Math.floor(Math.random() * emoteArr.length);
    res.json({
        "text": emoteArr[randomEmote]
    });
})

const port = process.env.PORT || 3000;

app.listen(port, () =>   console.log(`Server is listening on port ${port}.`));

// module.exports = app;