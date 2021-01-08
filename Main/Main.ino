#include "DHT.h"
#include "IRremote.h"
IRsend irsend;

#define INTERVAL_MESSAGE1 1000
#define INTERVAL_MESSAGE2 2000

unsigned long up1 = 0x4FFF00F;                   // <-------- Repalace this to First AC up key HEX
unsigned long down1 = 0x4FF50AF;                 // <-------- Repalace this to First AC down key HEX

unsigned long up2 = 0x4FFF00F;                   // <-------- Repalace this to Second AC up key HEX
unsigned long down2 = 0x4FF50AF;                 // <-------- Repalace this to Second AC down key HEX

unsigned long up3 = 0x4FFF00F;                   // <-------- Repalace this to Third AC up key HEX
unsigned long down3 = 0x4FF50AF;                 // <-------- Repalace this to Third AC down key HEX

unsigned long time_1 = 0;
unsigned long time_2 = 0;

#define DHTPIN1 2
#define DHTPIN2 4
#define DHTPIN3 5
#define DHTTYPE DHT22

DHT dht1(DHTPIN1, DHTTYPE);
DHT dht2(DHTPIN2, DHTTYPE);
DHT dht3(DHTPIN3, DHTTYPE);

#include <Sim800L.h>
#include <SoftwareSerial.h>               

#define RX  10
#define TX  11

Sim800L GSM(RX, TX);

char* text;
char* number;
bool error; 					//to catch the response of sendSms

int setPoint = 35;

void setup() {
 Serial.begin(9600);
 GSM.begin(9600); 
 number="+94704486677";
 Serial.setTimeout(10);
 dht1.begin();
 dht2.begin();
 dht3.begin();

 pinMode(12, OUTPUT);
}

void loop() {

 if(millis() >= time_1 + INTERVAL_MESSAGE1){
    time_1 +=INTERVAL_MESSAGE1;

    float h1 = dht1.readHumidity();
    float t1 = dht1.readTemperature();

    float h2 = dht2.readHumidity();
    float t2 = dht2.readTemperature();

    float h3 = dht3.readHumidity();
    float t3 = dht3.readTemperature();

    Serial.print(F("{\"temperature1\": "));
    Serial.print(t1);
    Serial.print(F(", \"moisture1\": "));
    Serial.print(h1);
    Serial.print(F(", \"temperature2\": "));
    Serial.print(t2);
    Serial.print(F(", \"moisture2\": "));
    Serial.print(h2);
    Serial.print(F(", \"temperature3\": "));
    Serial.print(t3);
    Serial.print(F(", \"moisture3\": "));
    Serial.print(h3);
    Serial.println(F("}"));
  
    if(t1 > setPoint || t2 > setPoint || t3 > setPoint){
     
     if (t1 > setPoint){
      error=GSM.sendSms(number,"Server 01 temperature too high");
     }
     if (t2 > setPoint){
      error=GSM.sendSms(number,"Server 02 temperature too high");
     }
     if (t3 > setPoint){
      error=GSM.sendSms(number,"Server 03 temperature too high");
     }
     
    }
}

if(millis() >= time_2 + INTERVAL_MESSAGE2){
    time_2 +=INTERVAL_MESSAGE2;

    if (Serial.available() > 0) {
      String vst  = Serial.readStringUntil('\n');
      char *buf = vst.c_str();
  
      char *setpoint1 = strtok(buf, ":");
      char *setpoint2 = strtok(NULL, ":");
      char *setpoint3 = strtok(NULL, ":");
  
      if (setpoint3 != NULL) { // Will only be true if we have two colons
        float sp1 = atof(setpoint1);
        float sp2 = atof(setpoint2);
        float sp3 = atof(setpoint3);
  
//        Serial.print("sp1 ");
//        Serial.print(sp1);
//        Serial.print(" sp2 ");
//        Serial.print(sp2);
//        Serial.print(" sp3 ");
//        Serial.println(sp3);

        int period = 1000;
        unsigned long time_now1 = 0;
        unsigned long time_now2 = 0;
        unsigned long time_now3 = 0;

        if(millis() >= time_now1 + period){
            time_now1 += period;

            float t1 = dht1.readTemperature();
            float err1 = sp1 - t1;
//            Serial.println(err1);

            if (err1 > -0.3 && err1 < 0.3){
              digitalWrite(12,HIGH);
              delay(500);
              digitalWrite(12,LOW);
            }
            if (err1 > 0.3){
              irsend.sendNEC(down1, 32);
              digitalWrite(12,HIGH);
              delay(500);
              digitalWrite(12,LOW);
            }
            if (err1 < -0.3){
              irsend.sendNEC(up1, 32);
              digitalWrite(12,HIGH);
              delay(500);
              digitalWrite(12,LOW);
            }
        }

        if(millis() >= time_now2 + period){
            time_now2 += period;

            float t2 = dht2.readTemperature();
            float err2 = sp2 - t2;
//            Serial.println(err2);

            if (err2 > -0.3 && err2 < 0.3){
              digitalWrite(12,HIGH);
              delay(500);
              digitalWrite(12,LOW);
            }
            if (err2 > 0.3){
              irsend.sendNEC(down2, 32);
              digitalWrite(12,HIGH);
              delay(500);
              digitalWrite(12,LOW);
            }
            if (err2 < -0.3){
              irsend.sendNEC(up2, 32);
              digitalWrite(12,HIGH);
              delay(500);
              digitalWrite(12,LOW);
            }
        }

        if(millis() >= time_now3 + period){
            time_now3 += period;

            float t3 = dht3.readTemperature();
            float err3 = sp3 - t3;
//            Serial.println(err3);

            if (err3 > -0.3 && err3 < 0.3){ 
              digitalWrite(12,HIGH);
              delay(500);
              digitalWrite(12,LOW);        
            }
            if (err3 > 0.3){
              irsend.sendNEC(down3, 32);
              digitalWrite(12,HIGH);
              delay(500);
              digitalWrite(12,LOW);
            }
            if (err3 < -0.3){
              irsend.sendNEC(up3, 32);
              digitalWrite(12,HIGH);
              delay(500);
              digitalWrite(12,LOW);
            }
        }
        
      } else {
//        Serial.println("Invalid data format");
      }
      
    }
 }
}
