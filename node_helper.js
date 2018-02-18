/* global Module */

// test commands
// curl -H "Content-Type: application/json" -X POST -d '{"notification":"KALLIOPE", "payload": "my message"}' http://localhost:8080/kalliope
// curl -H "Content-Type: application/json" -X POST -d '{"notification":"SHOW_ALERT", "payload": {"title": "mytitle", "message": "this is a test", "timer": 5000}}' http://localhost:8080/kalliope

const NodeHelper = require("node_helper");
const bodyParser = require('body-parser');


module.exports = NodeHelper.create({

    start: function() {

        console.log(this.name + ' is started');

        this.expressApp.use(bodyParser.json()); // support json encoded bodies
        this.expressApp.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

        this.expressApp.post('/kalliope', (req, res) => {
            if (req.body.notification){
                if (req.body.payload){
                    this.sendSocketNotification(req.body.notification, req.body.payload);
                    res.send({"status": "success"});
                }else{
                    res.send({"status": "failed", "error": "No payload given."});
                }
            }else{
                res.send({"status": "failed", "error": "No notification given."});
            }
        });
    },

    socketNotificationReceived: function(notification, payload) {
		console.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);

	}

});

