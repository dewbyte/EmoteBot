const fetch = require("node-fetch");
const fs = require("fs");
const Discord = require("discord.js");
const { send } = require("process");
const Express = require('express');

var settings = JSON.parse(fs.readFileSync("settings.json"));
console.log(settings);

function addrole (stats, msg, data) {
    var settings = JSON.parse(fs.readFileSync("settings.json"));

    var object = new Object();

    object.name = data.name;
    object.id = data.id;

    settings[stats[2]].adminrole = object;

    console.log(settings[stats[2]].adminrole);

    var testSettings = JSON.stringify(settings, null, 4)
    fs.writeFileSync("settings.json", testSettings)
}

function parseServers(id, settings) {
    var settings = JSON.parse(fs.readFileSync("settings.json"));
    var details = [false, "0", 0];
    for (let prop in settings) {
        var serverId = settings[prop].serverid;
        console.log(serverId);
        if(serverId == id) {
            console.log("this server exists!");
            var details = [true, serverId, prop, settings[prop].prefix];
            break
        }else {
            console.log("this server does not exist")
            details[2] = details[2] + 1;
        }
    }
    return details;
}

function serverHandler(id, msg) {
    var details = parseServers(id, settings);
    
    console.log(details[0])

    if(details[0] != true) {

        console.log(msg.guild.roles.cache.find(role => role.name === "EmoteBot Admin"), "id")

        console.log("Woohoo! This is a new server, time to set up it's settings.")
        var testSettings = JSON.parse(fs.readFileSync("settings.json"));

        var newServer = new Object();

        newServer.prefix = "eb";
        newServer.defualtsize = "2.0";
        newServer.defaultcommands = ["test", "help", "animalvideos"];
        newServer.admincommands = ["getemote", "addemote", "deleteemote", "prefix", "blockcommand", "test", "help", "animalvideos", "size"];
        newServer.channels = [];
        newServer.emotes = [];
        newServer.serverid = id;

        testSettings.push(newServer)

        console.log(testSettings)

        var testSettings = JSON.stringify(testSettings, null, 4)

        fs.writeFileSync("settings.json", testSettings)
        
        var placeinlist = details[2];

        var details = [true, id, placeinlist, "eb"];

        msg.guild.roles.create({
            data: {
              name: 'EmoteBot Admin',
              color: 'BLUE',
            },
            reason: 'we needed a role for EmoteBot Admins',
        })
            .then(data => addrole(details, msg, data))
    }else {
        console.log("server already added :)")
    }
    return details;
}

exports.serverHandler = serverHandler;