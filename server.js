const express = require("express");
const cors = require("cors");
const { request } = require("express");

const app = express();

app.use(cors());

app.use(express.json())
//created a new json file which contains some messages
const messagesArr = require('./messages.json');

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

/**------------ Post a messages ------------------------ */

app.post("/messages", function (request, response) {
  
  const body = request.body;
  
  const newMessage = {
    id: messagesArr.length + 1,
    from: body.from,
    text: body.text,
  }
  messagesArr.push(newMessage);

  response.send(newMessage);
});



app.listen(3000, () => {
   console.log("Listening on port 3000")
  });
