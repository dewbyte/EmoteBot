const fetch = require("node-fetch");
const fs = require("fs");
const Discord = require("discord.js");
const { send } = require("process");
const bot = new Discord.Client();

function emoteHandler(stats, msg, type) {
    var settings = JSON.parse(fs.readFileSync("settings.json"));
    var sendback = "";
    var matches = [];
    var highestlength = [0, ""]

    if (type != "dm") {
        for (em in settings[stats[2]].emotes) {
            if (msg.content.includes(settings[stats[2]].emotes[em].code)) {
                matches.push(settings[stats[2]].emotes[em].code);
            }
        }
        if (matches.length != 0) {
            for(item in matches) {
                if (item.length > highestlength[0]) {
                    var highestlength = [item.length, item]
                }
            }
            var sendback = "https://static-cdn.jtvnw.net/emoticons/v1/" + highestlength[1].id.toString() + "/" + settings[stats[2]].defaultsize;
        }
    } else {
        var sendback = "you need to use \"getemote\" in direct messages, there is no emote detection in direct messages.";
    }

    return sendback;
}

exports.emoteHandler = emoteHandler;