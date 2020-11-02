const fetch = require("node-fetch");
const fs = require("fs");
const Discord = require("discord.js");
const { send } = require("process");
const bot = new Discord.Client();
const command = require("./Commands");

function handleCommand(stats, msg, type) {
    console.log("message was", msg.content)
    console.log("handlecommand type is", type)
    //idk how the log function above helps, but for some reason i need it to run the script??? why
    console.log("stats are", stats)
    //idk how the log function above helps, but for some reason i need it to run the script??? why
    

    var settings = JSON.parse(fs.readFileSync("settings.json"));
    //useless but i might need it eventually

    var msglist = msg.content.split(".");
    msglist.shift()
    var message = msglist.join(".");
    try {
        console.log("error did not happen")
        var keywords = message.split(" ")
    } catch(err) {
        console.log("error happened")
        var keywords = [msg]
    }

    var commandname = keywords[0];

    if (type != "dm") {
        var validcommand = false;
        var admincommand = false;
        console.log("argument is", keywords[1])
        for (comd in settings[stats[2]].admincommands) {
            console.log("1st phase, comd is", settings[stats[2]].admincommands[comd])
            if (commandname == settings[stats[2]].admincommands[comd]) {
                var validcommand = true;
                var admincommand = true;
                break
            }
        }

        for (comd in settings[stats[2]].defaultcommands) {
            console.log("2nd phase, comd is", settings[stats[2]].defaultcommands[comd])
            if (commandname == settings[stats[2]].defaultcommands[comd]) {
                var validcommand = true;
                break
            }
        }
        if (validcommand) {
            if (admincommand) {
                if (msg.member.roles.cache.has(settings[stats[2]].adminrole.id)) {
                    if (commandname == "getemote") {
                       var sendback = command.getemote(keywords, msg, stats, type);
                    } else if (commandname == "addemote") {
                        var sendback = command.addemote(keywords, msg, stats, type);
                    }else if (commandname == "deleteemote") {
                        var sendback = command.deleteemote(keywords, msg, stats, type);
                    }else if (commandname == "prefix") {
                        var sendback = command.prefix(keywords, msg, stats, type);
                    }else if (commandname == "blockcommand") {
                        var sendback = command.blockcommand(keywords, msg, stats, type);
                    }else if (commandname == "test") {
                        var sendback = command.test(keywords, msg, stats, type);
                    }else if (commandname == "help") {
                        var sendback = command.help(keywords, msg, stats, type);
                    }else if (commandname == "animalvideo") {
                        var sendback = command.animalvideo(keywords, msg, stats, type);
                    }else if (commandname == "appealcommand") {
                        var sendback = command.appealcommand(keywords, msg, stats, type);
                    }else if (commandname == "size") {
                        var sendback = command.size(keywords, msg, stats, type);
                    }
                } else {
                    if (settings[stats[2]].defaultcommands.includes(commandname)) {
                        if (commandname == "test") {
                            var sendback = command.test(keywords, msg, stats, type);
                        }else if (commandname == "help") {
                            var sendback = command.help(keywords, msg, stats, type);
                        }else if (commandname == "animalvideo") {
                            var sendback = command.animalvideo(keywords, msg, stats, type);
                        }else if (commandname == "getemote") {
                            var sendback = command.getemote(keywords, msg, stats, type);
                        }
                    }else {
                        var sendback = "This is not a valid command, or you do not have access to it.";
                    }
                }
            } else {
                if (commandname == "test") {
                    var sendback = command.test(keywords, msg, stats, type);
                }else if (commandname == "help") {
                    var sendback = command.help(keywords, msg, stats, type);
                }else if (commandname == "animalvideo") {
                    var sendback = command.animalvideo(keywords, msg, stats, type);
                }else if (commandname == "getemote") {
                    var sendback = command.getemote(keywords, msg, stats, type);
                }
            }
        } else {
            if (commandname == "test") {
                var sendback = command.test(keywords, msg, stats, type);
            }else if (commandname == "help") {
                var sendback = command.help(keywords, msg, stats, type);
            }else if (commandname == "animalvideo") {
                var sendback = command.animalvideo(keywords, msg, stats, type);
            }else if (commandname == "getemote") {
                var sendback = command.getemote(keywords, msg, stats, type);
             }
        }
    }else {
        if (commandname == "test") {
            var sendback = command.test(keywords, msg, stats, type);
        }else if (commandname == "help") {
            var sendback = command.help(keywords, msg, stats, type);
        }else if (commandname == "animalvideo") {
            var sendback = command.animalvideo(keywords, msg, stats, type);
        }else if (commandname == "getemote") {
            var sendback = command.getemote(keywords, msg, stats, type);
         }
    }

    return sendback;
}

exports.handleCommand = handleCommand;