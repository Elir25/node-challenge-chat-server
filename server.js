const express = require("express");
const cors = require("cors");
const { request } = require("express");

const app = express();

app.use(cors());

app.use(express.json())
//created a new json file which contains some messages
let messagesArr = require('./messages.json');

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

/**------------ read all the messages ------------------------ */
app.get("/messages", function (request, response) {
  
  response.json(messagesArr)
});

/**------------ Post a message ------------------------ */

app.post("/messages", function (request, response) {
  
  const body = request.body;
  
  const newMessage = {
    id: messagesArr.length + 1,
    from: body.from,
    text: body.text,
  }
  messagesArr.push(newMessage);

  response.send(newMessage);
  console.log(messagesArr.length)
});
/**------------ read a message given an ID------------------------ */

app.get("/messages/:id", function (request, response) {
  response.setHeader("Content-Type", "application/json")
  messageId = messagesArr.find(item => item.id == request.params.id);
  if (messageId) {
    response.send(JSON.stringify(messageId));
  } else response.send(JSON.stringify({error: "message not found"}));
  
});

/**------------ EDIT a message given an ID------------------------ */

app.put("/messages/:id", function (request, response) {
  response.setHeader("Content-Type", "application/json")
  //find the index of the message and add an error if the id is not available
  const messageIndex = messagesArr.findIndex(item => item.id == request.params.id)
  if(messageIndex == -1){
    return response.send(JSON.stringify({error: "message not found"}));
  }

  const messageToUpdate = messagesArr[messageIndex]
  
  messageToUpdate.text = request.body.text
  messageToUpdate.from = request.body.from

  console.log(`messageIndex: ${messageIndex} || messageToUpdate: ${messageToUpdate}`)
  messagesArr.splice(messageIndex, 1, messageToUpdate)
  response.send(JSON.stringify(messageToUpdate));
});

/**------------ DELETE a message given an ID------------------------ */
app.delete('/messages/:id', function(request, response){
  response.setHeader("Content-Type", "application/json")

  //using the for loop to find the index of the element i want to delete
  //add a condition to compare that with the param the user use
  //use the splice method to find the index and the number of elements i want to delete
  for (let i = 0; i < messagesArr.length; i ++) {
   if (messagesArr[i].id == parseInt(request.params.id)) {
    messagesArr.splice(i, 1)
   }
  }
response.send()
  
})

app.listen(3000, () => {
   console.log("Listening on port 3000")
  });
