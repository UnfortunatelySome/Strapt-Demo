
// Define Adafruit IO MQTT client
// Uses randomly generated client id, websocket-specific port 443, and standard path '/mqtt'
client = new Paho.MQTT.Client("broker.mqttdashboard.com", 8000, "/mqtt", "clientId");

// Set up callbacks
client.onConnectionLost = onConnectionLost;
client.onMessageReceived = onMessageReceived;
client.onMessageDelivered = onMessageDelivered;

// Attempt to connect to dispenser
// TODO: set this up to work based on url argument, in order to connect to specific dispenser based on QR code
client.connect({onSuccess:onConnect,
               keepAliveInterval:6000});

function onMessageReceived(responseObject) {
    console.log("Message Received");
    console.log(responseObject.payloadString);
    if (responseObject.payloadString == "Product vended!") {
        window.location.href = "vend.html";
    }
}

// Successful connection to broker callback
function onConnect() {
  console.log("Connected to remote broker");
  // Subscribe to vendAck channel
  client.subscribe("abhaycashikar/feeds/vendack");
  client.onMessageArrived = onMessageReceived;
}

function vendCallback() {
  console.log("Vended Product");
  document.getElementById("vendButton").disabled = true;
  document.getElementById("vendButton").innerHTML = "Strapting...";
  var vendMsg = new Paho.MQTT.Message("1");
  vendMsg.destinationName = "abhaycashikar/feeds/vend";
  client.send(vendMsg);
}

function onConnectionLost(responseObject) {
  console.log("Connection Lost");
  //alert("Lost connection to dispenser!");
}

function onMessageDelivered(responseObject) {
  console.log("Message Delivered");
}
