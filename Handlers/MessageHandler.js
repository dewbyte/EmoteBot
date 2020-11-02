const fetch = require("node-fetch");
const fs = require("fs");
const Discord = require("discord.js");
const { send } = require("process");
const bot = new Discord.Client();
const SH = require("./ServerHandler")
const CH = require("./CommandHandler");
const EH = require("./EmoteHandler");

var creds = JSON.parse(fs.readFileSync("login.json"));

function messageHandler(msg) {
    console.log(msg.author.id)
    if (msg.author.id != creds.id) {
        if (true) {
            if (msg.guild === null) {
                console.log("this message is in a DM.\nHandling as a DM.")

                var type = "dm";

                var stats = [false, null, null, "eb"];

                if (msg.content.startsWith("eb.")) {
                    var sendback = CH.handleCommand(stats, msg, type);
                } else {
                    var sendback = EH.emoteHandler(stats, msg, type);
                }

                return sendback;
                
            } else {
                console.log("this message is in a Group DM or a Guild.\nHandling as a Guild.")

                var type = "group";

                var id = msg.guild.id;
                console.log("Server ID is", id)
            
                var stats = SH.serverHandler(id, msg);
                
                if (msg.content.startsWith(stats[3] + ".")) {
                    var sendback = CH.handleCommand(stats, msg, type);
                } else {
                    var sendback = EH.emoteHandler(stats, msg, type);
                }

                return sendback;
            }
        }
    }
}

exports.messageHandler = messageHandler;