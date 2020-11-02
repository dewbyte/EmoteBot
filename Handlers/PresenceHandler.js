const fs = require("fs");

function randomVideo() {
    var animalvideos = JSON.parse(fs.readFileSync("animalvideos.json"));
    var avarray = [];

    for (var i of animalvideos) {
        avarray.push(i);
    }
    var videoobject = avarray[Math.floor(Math.random()*avarray.length)]

    return videoobject;
}

exports.randomVideo = randomVideo;