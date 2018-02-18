/* global Module */

// test command
// curl -H "Content-Type: application/json" -X POST -d '{"message":"test"}' http://localhost:8080/kalliope

const NodeHelper = require("node_helper");
const bodyParser = require('body-parser');


module.exports = NodeHelper.create({

    start: function() {

        console.log(this.name + ' is started');

        this.expressApp.use(bodyParser.json()); // support json encoded bodies
        this.expressApp.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

        this.expressApp.post('/kalliope', (req, res) => {
            if (req.body.message){
                var message = req.body.message;
                console.log("Received kalliope message: " + message);
                this.sendSocketNotification("NEW_MESSAGE", message);
                res.send({"status": "success", "payload": message});
            }else{
                res.send({"status": "failed", "error": "No message given."});
            }
        });
    },

    socketNotificationReceived: function(notification, payload) {
		console.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);

	}

});

