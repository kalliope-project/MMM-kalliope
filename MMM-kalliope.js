/* global Module */

class Message {
    constructor(text) {
        this.text = text;
        this.timestamp = new Date();
    }
}

Module.register('MMM-kalliope',{
    // list of messages to print on the screen
    messages: [],

    // Default module config.
	defaults: {
        max: 5,
        keep_seconds: 5
    },

    start: function() {
        // need to connect to the node helper
        this.sendSocketNotification("CONNECT", null);

        console.log("Starting module: " + this.name);

        //Update DOM every minute so that the time of the call updates and calls get removed after a certain time
		setInterval(() => {
			this.updateDom();
        }, 1000);

        setInterval(() => {
			this.cleanOldMesssage();
        }, 1000);
    },

    cleanOldMesssage: function() {
        var currentDate = new Date();

        for(var i = 0; i < this.messages.length; i++){
            var dif = currentDate.getTime() - this.messages[i].timestamp.getTime();

            var Seconds_from_T1_to_T2 = dif / 1000;
            var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);

            // delete the message if to old
            if (Seconds_Between_Dates > this.config.keep_seconds){
                this.messages.splice(i, 1);
            }
        }
    },

    // Override dom generator
	getDom: function() {
        var wrapper = document.createElement("div");

        if (this.messages.length  == 0){
            wrapper.innerHTML = "";
            return wrapper
        }

        var table = document.createElement("table");

        for(var i = 0; i < this.messages.length; i++){

            var row = document.createElement("tr");
            table.appendChild(row);

            var messageCell = document.createElement("td");
			messageCell.innerHTML =  this.messages[i].text
			row.appendChild(messageCell);
        }
        return table;
    },

    socketNotificationReceived: function(notification, payload) {
        console.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);

        // create new message object
        var newMessage = new Message(payload);
        this.messages.push(newMessage);

        // clean old messages if list is too long
        while(this.messages.length > this.config.max){
            this.messages.shift();
        }

    }
});