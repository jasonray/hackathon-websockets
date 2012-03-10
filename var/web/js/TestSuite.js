var client = {
	sendCalled: false,
	
	send: function(client, task) {
		this.sendCalled = true;
	}
}

test("first test within module", function() {
    ok( true, "all pass" );
});

test("testing something", function() {
	localStorage.setItem("hi", "hi")
	var actual = localStorage.getItem("hi");
	ok("hi" == actual, "testing set and get")
})

test("Mock Client Send is being called", function() {
	send_task(client, new Task("a", "b"));
	ok(client.sendCalled == true, "Good work");
})

test("Create a new Task", function() {
	var t = new Task("title", "state");
	ok(t.title == "title", "Title Verified");
	ok(t.state == "state", "State Verified");
	ok(t.id != "", "Id properly set");
})

test("UUID not reused", function() {
	var t = new Task("title1", "state1");
	var t2 = new Task("title2", "state2");
	ok(t.id != t2.id, "Ids function properly");
})

test("Ensure Local Storage is updated from callback", function() {
	var taskToReceive = new Task("callback title", "open")
	receive_task_callback(JSON.stringify(taskToReceive))
	var fromStorage = localStorage.getItem(taskToReceive.id)
	var taskObject = JSON.parse(fromStorage)
	ok(taskToReceive.id == taskObject.id, "Id is good")
	ok(taskToReceive.title == taskObject.title, "title is good")
	ok(taskToReceive.state == taskObject.state, "state is good")
})