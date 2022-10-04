bool stringComplete = true;
String inputString = "";

void setup() {
  Serial.begin(9600);
}

void loop() {
  if(stringComplete){
    Serial.println(inputString);
    inputString = "";
    stringComplete = false;
  }

}

void serialEvent(){
  while(Serial.available()){
    char inChar = (char)Serial.read();
    inputString += inChar;
    if(inChar =='\n'){
      stringComplete = true;
    }
  }
}
