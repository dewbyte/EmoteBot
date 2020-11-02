//dependancies
const fetch = require("node-fetch");
const fs = require("fs");
const Discord = require("discord.js");
const { send } = require("process");
const bot = new Discord.Client();
const PH = require("./Handlers/PresenceHandler");
const SH = require("./Handlers/ServerHandler");
const MH = require("./Handlers/MessageHandler");
const Express = require('express');

//finding token
var login = JSON.parse(fs.readFileSync("login.json"));

//generate a random animal video
var animalvideo = PH.randomVideo();

//finding settings
var settings = JSON.parse(fs.readFileSync("settings.json"));

//bot on message
bot.on("ready", () =>{
    bot.user.setActivity("funny animal video courtesy of " + animalvideo.username, { type: "STREAMING", url: animalvideo.video });
    console.log("This bot is online!");
})

bot.on("message", function(msg) {
    if (msg.author.id != login.id) {
        try {
            msg.channel.send(MH.messageHandler(msg)).catch((error) => {
                console.error(error);
              });
        }catch (err) {
            console.log("fuck....")
        }
    }
})

bot.login(login.token);