var global_store

var UUID = function b(a){
	return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,b)
}

var Task = function(title, state) {
	this.id = UUID();
	this.title = title;
	this.state = state;
}

var client = Stomple.create_client({
	  	url: "ws://" + window.location.hostname + ":61614/stomp",
	  	destination: "jms.topic.chat",
		login: "guest",
        passcode: "guest",

		socketOpen: function() {
			console.log("socket opened");
		},
        
        socketMessage: function(msg) {
			console.log("socket msg");
			console.log(msg);
	    },
        
        socketClose: function(e) {
			console.log("socket close");
			console.log(e);
	    },
        
		socketError: function() {
			console.log("socket error");
			console.log(client.websocket);
			return false;
		}
	  
  });
  var msgHandler = {
		fn: function(task) {
			upateLocalStorage(task);
		  	var c = document.getElementById('output');
			c.innerHTML = c.innerHTML + '<br>' + msg.body;
		}
  };
	var updateLocalStorage = {
		fn: function(task) {
			// store in the local storage database
		}
	}
  client.subscribe({
	handler: msgHandler.fn,
	thisObj: msgHandler,
	
	success: function() {	//did subscription succeed?
		console.log("sub ok..");
	},
	failure: function(reason) {		//did subscription fail?
		console.log(reason);
	}
  });


function create_task(text){
    // add to local storage
    //  send_update_task()
}

function change_task_state(task, state){
    // change it in local storage
    // send_update_task()
}

function send_task(client, task){
	task = JSON.stringify(task);

	client.send({
		body: client.session+": "+ task,
	});
    // Send the serialized task to the jms destination/broker
}

function receive_task_callback(message){
    var task = JSON.parse(message);
	localStorage[task.id] = JSON.stringify(task);
}

function update_viewer(){
    // read all of the global_store and replace <div>
}
