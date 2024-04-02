const mqtt = require('mqtt');
require('dotenv').config()
// Adafruit IO username and AIO key
const AIO_USERNAME = 'huynguyenducbao2003';
const AIO_KEY = process.env.AIO_KEY;

// Adafruit IO feed name
const FEED_NAME = ['aiot-led', 'aiot-temp', 'aiot-humi', 'aiot-light', 'aiot-supporter', 'aiot-ai','aiot-fan','aiot-ledcolor'];
const TEST_PUBLISH = [1, 12, 20, 33, "[AIR] CAP NHAT KHONG KHI", "A", 20, "#0fbc22" ];
// Create the MQTT URL for Adafruit IO
const MQTT_URL = `tcp://io.adafruit.com:1883`;

// Connect options
const options = {
  username: AIO_USERNAME,
  password: AIO_KEY,
};

// Connect to Adafruit IO
const client = mqtt.connect(MQTT_URL, options);

client.on('connect', () => {
  console.log('Connected to Adafruit IO');
  // Subscribe to the desired feeds
  FEED_NAME.forEach(feed_name => {
      client.subscribe(`${AIO_USERNAME}/feeds/${feed_name}`);
  });

  // Handle incoming messages from the feed
  client.on('message', (topic, message) => {
    console.log('Received data:', message.toString(), 'from [feed] <-', topic);
  });

  // Testing Publish data to the feed
  setInterval(() => {
    console.log("\n\n")
    FEED_NAME.map((feed, index)=> {
        client.publish(`${AIO_USERNAME}/feeds/${feed}`, TEST_PUBLISH[index].toString());
        console.log('Published data to [feed] -> ', feed ,': ',TEST_PUBLISH[index].toString());
    })
    console.log("\n\n")
  }, 10000); // Publish data every 5 seconds
});

client.on('error', (err) => {
  console.error('Error:', err);
});
