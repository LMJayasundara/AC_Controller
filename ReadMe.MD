# IOT IR Based AC Controler System

## Budget of Project

<pre>
Raspbery Pi (Server Run On that) X 1 => Rs.10,500.00 X 1    = Rs.10,500.00
DHT22 Temperature Sensor Module X 3  => Rs.775.00 X 3       = Rs. 2,325.00
Arduino MEGA X 1                     => Rs.1,950.00 X 1     = Rs. 1,950.00 
IR Receiver Module X 5               => Rs.40.00 X 5        = Rs.   200.00 
IR LED X 10                          => Rs. 845+ Rs. 155    = Rs. 1,000.00         
GSM GPRS Quad-band Module X 1        => Rs.1,550.00 X 1     = Rs. 1,550.00
SD Card                              => Rs.2500.00 X 1      = Rs. 2,500.00  

                          Toatal material cost around (LKR) = Rs.20,000.00
</pre>

## Steps </br>
### 01 - Install node.js to the raspberry pi

### 02 - Update the Main.ino 8-15 with relevant AC Controler UP and Down Key HEX Values by using Hex.ino

### 03 - Upload the Main.ino to the Arduino Mega

### 04 - Install the Node dependencies
```
cd server
npm install
```
### 05 - Run the Server
```
node server.js
```
### 06 - To visualized the GUI (Grapical User Interface)
```
(Go to your favorite browser and Type)
<RaspberryPi_IP_Address>:3000

Ex : 192.168.10.1:3000
```
## Sketch

<img src="./Project/images/Sketch.png" width="600" height="300">