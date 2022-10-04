#include <Servo.h> 
int servoPin = 10;
int angle = 0;
const unsigned int rledPin = 11;
const unsigned int gledPin = 12;
const unsigned int bledPin = 13;
const unsigned int potPin = A0;

String  inputString    = "";
boolean stringComplete = false;
Servo servo;
void setup() {

  servo.attach(servoPin); 
  pinMode(rledPin, OUTPUT);
  pinMode(gledPin, OUTPUT);
  pinMode(bledPin, OUTPUT);
  Serial.begin(9600);
  inputString.reserve(10);
}

void loop() {
  unsigned int adcVal = analogRead(potPin);
  Serial.print("adc");  
  Serial.println(adcVal);
//  servo.write(adcVal/7);
  if(stringComplete) 
  {
    if(inputString.substring(0,3) == "led")
    {
      if (inputString.substring(3,4) == "0")
        digitalWrite(rledPin, HIGH);
      else if(inputString.substring(3,4) == "1")
        digitalWrite(rledPin, LOW );
      else if(inputString.substring(3,4) == "2")
        digitalWrite(gledPin, HIGH );
      else if(inputString.substring(3,4) == "3")
        digitalWrite(gledPin, LOW );
      else if(inputString.substring(3,4) == "4")
        digitalWrite(bledPin, HIGH );
      else if(inputString.substring(3,4) == "5")
        digitalWrite(bledPin, LOW );
    }
    if(inputString.substring(0,3) == "sev")
    {
      if (inputString.substring(3,4) == "0"){
        servo.write(45);
        delay(15);
      }
      else if(inputString.substring(3,4) == "1"){
        servo.write(90);
        delay(15);
      }
      else if(inputString.substring(3,4) == "2"){
        servo.write(135);
        delay(15);
      }
    }
    Serial.println(inputString);
    inputString = "";
    stringComplete = false;
  }
  delay(250);
}

void serialEvent() {
  while (Serial.available() > 0) {
    char inChar = Serial.read();
    inputString = inputString + inChar;
    if(inChar == '\n') stringComplete = true;
  }
}
