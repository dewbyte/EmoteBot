const fetch = require("node-fetch");
const fs = require("fs");
const Discord = require("discord.js");
const { send } = require("process");
const bot = new Discord.Client();
const animalvid = require("./PresenceHandler");

function savedata(data, stats, keywords, msg, type) {
    console.log("message was", msg.content)
    console.log("SHITHTIHTIHTIHTITHIT")

    var settings = JSON.parse(fs.readFileSync("settings.json"));

    var addition = "";

    if (keywords[1] == "id") {
        for (emote in data.emotes) {
            if (data.emotes[emote].id == keywords[3]) {
                console.log(data.emotes[emote])
                var addition = data.emotes[emote];
                break
            }
        }
    }else if (keywords[1] == "name") {
        for (let emote in data.emotes) {
            if (data.emotes[emote].code == keywords[3]) {
                console.log(data.emotes[emote].code)
                var addition = data.emotes[emote];
                break
            }
        }
    }

    if (addition != "" && keywords[3] != "*" && keywords[0] == "addemote") {
        settings[stats[2]].emotes.push(addition)

        var settings = JSON.stringify(settings, null, 4);
        fs.writeFileSync("settings.json", settings)
        console.log("writtenn")
        msg.react('✅')
    }else if (addition == "" && keywords[3] == "*" && keywords[0] == "addemote") {
        console.log("adding every emote on the channel")
        for (e in data.emotes) {
            settings[stats[2]].emotes.push(data.emotes[e])
        }

        var settings = JSON.stringify(settings, null, 4);
        fs.writeFileSync("settings.json", settings)
        console.log("writtenn")
        msg.react('✅')
    }else if (keywords[0] == "addemote"){
        msg.react('❌')
    }
    if (addition != "" && keywords[0] == "getemote" && type != "dm"){
        console.log(addition.id)

        var settings = JSON.parse(fs.readFileSync("settings.json"));

        msg.channel.send("https://static-cdn.jtvnw.net/emoticons/v1/" + addition.id + "/" + settings[stats[2]].defaultsize)
    }else if(addition != "" && keywords[0] == "getemote" && type == "dm" && keywords.length >= 3){
        if (isNaN(keywords[2])) {
            msg.channel.send("Not a number.")
        }else {
            if (parseFloat(keywords[3]) <= 1) {
                var size = "1.0"
            }else if (parseFloat(1 < keywords[3]) <= 2) {
                var size = "2.0"
            }else {
                var size = "4.0"
            }
            console.log("https://static-cdn.jtvnw.net/emoticons/v1/" + addition.id.toString() + "/" + size)
            msg.channel.send("https://static-cdn.jtvnw.net/emoticons/v1/" + addition.id.toString() + "/" + size)
            console.log("message sent")
        }
    }
    
}

function test(keywords, msg, stats, type) {
    var settings = JSON.parse(fs.readFileSync("settings.json"));
    console.log("triggered the test function")


    return "Test!";
}

function getemote(keywords, msg, stats, type) {
    var settings = JSON.parse(fs.readFileSync("settings.json"));
    console.log("triggered the getemote function")
    console.log("message was", msg.content)

    if (keywords.length >= 3) {
        var url = "https://api.twitchemotes.com/api/v4/channels/" + keywords[2];

        try {
            fetch (url)
                .then(response => response.json())
                .then(data =>savedata(data, stats, keywords, msg, type))

            console.log("WENT THROUGH BITCHHHHHHHHHH")
        }catch (err) {
            console.log(err)
            var sendback = "The url did not work, check your arguments and try again."
        }
    }else {
        var sendback = "Not enough arguments were given."
    }

    return sendback;
}

function addemote(keywords, msg, stats, type) {
    var settings = JSON.parse(fs.readFileSync("settings.json"));
    console.log("triggered the getemote function")
    console.log("message was", msg.content)

    if (keywords.length >= 3) {
        var url = "https://api.twitchemotes.com/api/v4/channels/" + keywords[2];

        try {
            fetch (url)
                .then(response => response.json())
                .then(data =>savedata(data, stats, keywords, msg, type))

            console.log("WENT THROUGH BITCHHHHHHHHHH")
        }catch (err) {
            console.log(err)
            var sendback = "The url did not work, check your arguments and try again."
        }
    }else {
        var sendback = "Not enough arguments were given."
    }

    return sendback;
}

function deleteemote(keywords, msg, stats, type) {
    var settings = JSON.parse(fs.readFileSync("settings.json"));
    console.log("triggered the deleteemote function")
    var removed = "";

    if (keywords.length >= 3) {
        if (keywords[1] == "id") {
            for (emote in settings[stats[2]].emotes) {
                if (settings[stats[2]].emotes[emote].id.toString() == keywords[2]) {
                    settings[stats[2]].emotes.splice(emote, 1)
                    var removed = settings[stats[2]].emotes[emote];
                    var settings = JSON.stringify(settings, null, 4);
                    fs.writeFileSync("settings.json", settings)
                    break
                }
            }
        }else if (keywords[1] == "name") {
            for (emote in settings[stats[2]].emotes) {
                if (settings[stats[2]].emotes[emote].code.toString() == keywords[2]) {
                    settings[stats[2]].emotes.splice(emote, 1)
                    var removed = settings[stats[2]].emotes[emote];
                    var settings = JSON.stringify(settings, null, 4);
                    fs.writeFileSync("settings.json", settings)
                    break
                }
            }
            
        }
        if(removed != "") {
            msg.react('✅')
        }else {
            msg.react('❌')
        }
    }else if (keywords.length == 2){
        if (keywords[1] == "*") {
            settings[stats[2]].emotes = [];
            var settings = JSON.stringify(settings, null, 4);
            var removed = "all";
            fs.writeFileSync("settings.json", settings)
        }
        if(removed != "") {
            msg.react('✅')
        }else {
            msg.react('❌')
        }
    }else {
        var sendback = "Not enough arguments given."
    }
    

    return sendback;
}

function prefix(keywords, msg, stats, type) {
    var settings = JSON.parse(fs.readFileSync("settings.json"));
    console.log("triggered the prefix function")

    if (keywords.length == 1) {
        var sendback = "Current prefix is \"" + settings[stats[2]].prefix + "\"."
    }else {
        settings[stats[2]].prefix = keywords[1];
        var settings = JSON.stringify(settings, null, 4);
        fs.writeFileSync("settings.json", settings)
        var sendback = "Prefix has been changed to\"" + keywords[1] + "\"."
    }

    return sendback;
}

function blockcommand(keywords, msg, stats, type) {
    var settings = JSON.parse(fs.readFileSync("settings.json"));
    console.log("triggered the blockcommand function")

    var defaultcommands = settings[stats[2]].defaultcommands;

    if (keywords.length != 1) {

        if (defaultcommands.includes(keywords[1])) {

            var commandindex = defaultcommands.indexOf(keywords[1]);

            defaultcommands.splice(commandindex, 1)

            var sendback = "Command has been removed for all default users."
        }else {
            var sendback = "Not a valid command to delete."
        }

        var settings = JSON.stringify(settings, null, 4);

        fs.writeFileSync("settings.json", settings)
    }else {
        var sendback = "Not enough arguments given."
    }

    return sendback;
}

function appealcommand(keywords, msg, stats, type) {
    var settings = JSON.parse(fs.readFileSync("settings.json"));
    console.log("triggered the blockcommand function")

    var defaultcommands = settings[stats[2]].defaultcommands;
    var legacycommands = ["help", "test", "animalvideos"]

    if (keywords.length != 1) {

        if (legacycommands.includes(keywords[1])) {

            defaultcommands.push(keywords[1])

            var sendback = "Command has been appealed for all default users."
        }else {
            var sendback = "Not a valid command to appeal."
        }

        var settings = JSON.stringify(settings, null, 4);

        fs.writeFileSync("settings.json", settings)
    }else {
        var sendback = "Not enough arguments given."
    }

    return sendback;
}

function animalvideo(keywords, msg, stats, type) {
    var settings = JSON.parse(fs.readFileSync("settings.json"));
    var videosubmissions = JSON.parse(fs.readFileSync("animalvideosubmissions.json"));
    console.log("triggered the animalvideo function")

    if (keywords.length != 1) {
        if (keywords[1] == "queue") {
            var totalsubmissions = 0;
            for (v in videosubmissions) {
                totalsubmissions = totalsubmissions + 1;
                console.log(totalsubmissions)
            }
            var sendback = "The total amount of videos in the queue is " + totalsubmissions.toString();
        }else {
            var newSubmission = new Object();
            newSubmission.username = msg.author.username;
            newSubmission.video = keywords[1];

            videosubmissions.push(newSubmission)
            var videosubmissions = JSON.stringify(videosubmissions, null, 4)

            fs.writeFileSync("animalvideosubmissions.json", videosubmissions);

            var sendback = "Your video has been added to the submissions, thanks!"
        }
    }else {
        var sendback = "Video is " + animalvid.randomVideo().video + " courtesy of " + animalvid.randomVideo().username;
    }

    return sendback;
}

function size(keywords, msg, stats, type) {
    var settings = JSON.parse(fs.readFileSync("settings.json"));
    console.log("triggered the size function")

    var settings = JSON.parse(fs.readFileSync("settings.json"));
    console.log("triggered the blockcommand function")

    var size = settings[stats[2]].defaultsize;

    console.log("default size is", size)

    if (keywords.length != 1) {

        try {
            if (parseFloat(keywords[1]) == 1) {
                settings[stats[2]].defaultsize = "1.0";

                var sendback = "New size is 1.";

                var settings = JSON.stringify(settings, null, 4);
    
                fs.writeFileSync("settings.json", settings)
            }else if (parseFloat(keywords[1]) == 2) {
                settings[stats[2]].defaultsize = "2.0";

                var sendback = "New size is 2.";

                var settings = JSON.stringify(settings, null, 4);
    
                fs.writeFileSync("settings.json", settings)
            }else if (parseFloat(keywords[1]) >= 3) {
                settings[stats[2]].defaultsize = "4.0";

                var sendback = "New size is 4.";

                var settings = JSON.stringify(settings, null, 4);
    
                fs.writeFileSync("settings.json", settings)
            }else {
                var sendback = "That is not a valid number!"
            }
        }catch (err) {
            var sendback = "That is not a valid number!"
        }

    }else {
        var sendback = "Current size is " + size;
    }

    return sendback;
}

function help(keywords, msg, stats, type) {
    var settings = JSON.parse(fs.readFileSync("settings.json"));

    console.log("type is", type)
    console.log("triggered the help function")
    console.log("keywords[1] =", keywords[1])
    if (type != "dm") {
        var defaultcommands = settings[stats[2]].defaultcommands;
        var admincommands = settings[stats[2]].admincommands;
        console.log("went through dm test")
        if (keywords.length == 1) {
            var sendback = "The current list of commands avaliable for your community is:\n" + "\n__Default Commands:__\n**" + defaultcommands.join("**\n**") + "**\n\n__Admin Commands:__\n**" + admincommands.join("**\n**") + "**\n\n*each command can be further explained through calling help \"commandname\"*"
        } else if (defaultcommands.includes(keywords[1]) || admincommands.includes(keywords[1]) ) {
            console.log("went through defaultcommands test")
            if (keywords[1] == "test") {
                console.log("sendback triggered")
                var sendback = "__The test command is used to test if the bot is online and working.__\n\nTest command has no arguments, it only outputs \"Test!\"";
            }else if (keywords[1] == "help") {
                var sendback = "__The help command is used to get information on another command.__\n\nHelp command lists active commands when triggered without arguments.\n\nWhen triggered with arguments it will try to list the information that it knows about the command listed in the argument.";
            }else if (keywords[1] == "getemote") {
                var sendback = "__The getemote command will queury a website and will grab the emote given in arguments.__\n\nThe first argument is either \"name\" or \"id\", which will say if you want to get the emote by id or by name.\n\nThe second argument is the ID of the twitch channel you need to grab an emote from, the third argument can be one of 2 strings.\n\n1.The exact ID of the emote, which will give back the corresponding emote.\n2.The exact name of the emote, which will give back the first emote with it's name.\n\nIf you want a list of some common channels, look below\n\n__xqcOw__\n71092938\n\n__Default Emotes__\n0\n\n__Lirik__\n23161357\n\n__Pokimane__\n44445592\n\n__CallMeCarsonLive__\n76055616\n\n__Ninja__\n19571641\n\n__TimTheTatMan__\n36769016\n\n__Shroud__\n37402112\n\n__Tfue__\n60056333\n\n__Myth__\n110690086\n\n__Loltyler1__\n51496027\n\n__Sodapoppin__\n26301881\n\n__Pengu__\n85956078";
            }else if (keywords[1] == "addemote") {
                var sendback = "__The addemote command will add the corresponding emote to your server's pool of emotes.__\n\nWhen you are calling the command, you can use up to 3 arguments.\n\nThe 1st argument 1 has to be 1 of 2 different keywords. If you use \"name\" then you need to type in 2 more arguments.\nThe 2nd argument has to be the id of the twitch channel you wish to pull emotes from.\nThe 3rd argument will be the name of your emote.\n\nIf you use \"id\" as your second argument, you will queury the Twitch Emotes database for your emote.\nThe 2nd argument should be the id of the twitch channel that you are pulling the emote from.\nThe 3rd argument can either be a number, which would be the id of you emote, or it can be \*, which means that you wish to add all emotes in the channel.\n\n*The Twitch Emotes API site is https://twitchemotes.com/. Use the search box to find your channel and pull the channel from the url. EX:(The ID for the url https://twitchemotes.com/channels/71092938/ is 71092938.[also xqc's channel])*\n\nIf you want a list of some common channels, look below\n\n__xqcOw__\n71092938\n\n__Default Emotes__\n0\n\n__Lirik__\n23161357\n\n__Pokimane__\n44445592\n\n__CallMeCarsonLive__\n76055616\n\n__Ninja__\n19571641\n\n__TimTheTatMan__\n36769016\n\n__Shroud__\n37402112\n\n__Tfue__\n60056333\n\n__Myth__\n110690086\n\n__Loltyler1__\n51496027\n\n__Sodapoppin__\n26301881\n\n__Pengu__\n85956078";
            }else if (keywords[1] == "deleteemote") {
                var sendback = "__The deleteemote command will delete the emote specified from the server's pool of emotes..__\n\nThe first argument has to be 1 of 3 strings.\n\nIf you use \"id\" then it will delete the first emote that matches the id given.\n\nThe second keyword that you can use for handling deletion is \"name\". This command only requires 1 keyword, which will be the name of your emote. The oldest emote that matches the name will be deleted.\n\nThe last keyword supported for the second argument is \"*\" that deletes all emotes for a server, starting it from scratch.";
            }else if (keywords[1] == "prefix") {
                var sendback = "__The prefix command will change your server's bot prefix.__\n\nWhen run without arguments, it will list the current prefix.\n\nWhen given an argument, it will change the prefix to whatever the argument is.";
            }else if (keywords[1] == "blockcommand") {
                var sendback = "__The blockcommand command will remove 1 of 3 commands from the \"everyone\" command pool.__The commands that can be removed are \n\n\"test\", \"help\", and \"animalvideos\".\n\nAdmin users can still use this command, even after deletion.\n ***you can fix this using appealcommand***";
            }else if (keywords[1] == "animalvideo") {
                var sendback = "__The animalvideo command is the base command used to access my animalvideos database.__\n\nIf called without arguments, it will output a random animal video from my database.\n\nWhen called with an argument, it will send the argument to a database for manual inspection and addition to my animal videos database.\n\nThis command is just for fun so please, don't abuse it. \:)";
            }else if (keywords[1] == "appealcommand") {
                var sendback = "__The appealcommand command will roll back any changes done by blockcommand__\n\nRequires 1 argument, where the argument is the command you wish to add back into the system.";
            }else if (keywords[1] == "size") {
                var sendback = "__The size command will change the default size of the emotes to whatever argument is given.__\n\nRequires 1 argument, which will change the default size to the given number(sizes can be 1, 2, or 4. any numbers over 3 will be counted as 4.).\n\nThe default size is listed when called without arguments.";
            }else {
                var sendback = "__" + keywords[1] + " is not a valid command.__\n\nTry using the \"help\" command to get a list of current commands."
            }
        }else {
            var sendback = "__" + keywords[1] + " is not a valid command.__\n\nTry using the \"help\" command to get a list of current commands."
        }
    }else if (keywords.length == 1){
        var sendback = "Direct Message commands are only as follows:\n\n**getemote**\n**test**\n**help**\n**animalvideo**\n\n*each command can be further explained through calling help \"commandname\"*"
    }else if (["test", "animalvideos", "getemote", "help"].includes(keywords[1])) {
        if (keywords[1] == "test") {
            var sendback = "__The test command is used to test if the bot is online and working.__\n\nTest command has no arguments, it only outputs \"Test!\"";
        }else if (keywords[1] == "help") {
            var sendback = "__The help command is used to get information on another command.__\n\nHelp command lists active commands when triggered without arguments.\n\nWhen triggered with arguments it will try to list the information that it knows about the command listed in the argument."
        }else if (keywords[1] == "getemote") {
            var sendback = "__The getemote command will queury a website and will grab the emote given in arguments.__\n\nThe first argument is either \"name\" or \"id\", which will say if you want to get the emote by id or by name.\n\nThe second argument is the ID of the twitch channel you need to grab an emote from, the third argument can be one of 2 strings.\n\n1.The exact ID of the emote, which will give back the corresponding emote.\n2.The exact name of the emote, which will give back the first emote with it's name.\n\nIf you want a list of some common channels, look below\n\n__xqcOw__\n71092938\n\n__Default Emotes__\n0\n\n__Lirik__\n23161357\n\n__Pokimane__\n44445592\n\n__CallMeCarsonLive__\n76055616\n\n__Ninja__\n19571641\n\n__TimTheTatMan__\n36769016\n\n__Shroud__\n37402112\n\n__Tfue__\n60056333\n\n__Myth__\n110690086\n\n__Loltyler1__\n51496027\n\n__Sodapoppin__\n26301881\n\n__Pengu__\n85956078";
        }else if (keywords[1] == "animalvideo") {
            var sendback = "__The animalvideo command is the base command used to access my animalvideos database.__\n\nIf called without arguments, it will output a random animal video from my database.\n\nWhen called with an argument, it will send the argument to a database for manual inspection and addition to my animal videos database.\n\nThis command is just for fun so please, don't abuse it. \:)"
        }else {
            var sendback = "__" + keywords[1] + " is not a valid command.__\n\nTry using the \"help\" command to get a list of current commands."
        }
    }else {
        var sendback = "__" + keywords[1] + " is not a valid command.__\n\nTry using the \"help\" command to get a list of current commands."
    }
    return sendback;
}

exports.test = test;
exports.help = help;
exports.getemote = getemote;
exports.addemote = addemote;
exports.prefix = prefix;
exports.getemote = getemote;
exports.deleteemote = deleteemote;
exports.blockcommand = blockcommand;
exports.animalvideo = animalvideo;
exports.appealcommand = appealcommand;
exports.size = size;