var builder = require("botbuilder");
var restify = require("restify");
var luis = require("./luis/main");

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log("%s listening to %s", server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

//MICROSOFT_APP_PASSWORD: hRXRO697%;)kyxozaJRV62!

server.post('/api/messages', connector.listen());

// R'eceive messages from the user
var bot = new builder.UniversalBot(connector, function (session) {
    session.send('Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.', session.message.text);
});

luis.startDialog(bot);