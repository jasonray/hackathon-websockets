var global_store

function create_task(text){
    // add to local storage
    //  send_update_task()
}

function change_task_state(task, state){
    // change it in local storage
    // send_update_task()
}

function send_update_task(task){
    // serialize task and send it
    // Send the serialized task to the jms destination/broker
}

function update_task_callback(){
    // callback that's called when the broker sends us a new task
    // unserialize && update local storage when received
}

function update_viewer(){
    // read all of the global_store and replace <div>
}
