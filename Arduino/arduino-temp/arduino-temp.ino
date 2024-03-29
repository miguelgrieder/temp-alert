#include "DHT.h"
#define DHTPIN 13     // Pino digital sensor DHT

//// include <WIFI.h>
//// include <HTTPCLIENT.h>

//// const char* ssid = "WifiName";
////const char* password = "WifiPassword";

// Escolha o tipo de sensor!
# define DHTTYPE DHT11     // DHT 11
//# define DHTTYPE DHT22   // DHT 22 (AM2302), AM2321
//# define DHTTYPE DHT21   // DHT 21 (AM2301)

DHT dht(DHTPIN, DHTTYPE);

#include <Wire.h>
#include <LiquidCrystal_I2C.h>
float oldTemperature  = 0;
float oldHumidity = 0;
// Definir o endereço do LCD para 0x27 para um display de 16 caracteres e 2 linhas
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  Serial.begin(9600);
  
  Serial.println(F("DHTxx teste!"));
  dht.begin();
  lcd.begin();

  //// WiFi.begin(ssid, password);
  ////while (WiFi.status() != WL_CONNECTED) {
  ////  delay(1000);
  ////  Serial.println("Connecting to WiFi..");
  ////}
  ////
  ////Serial.println("Connected to the WiFi network");

}

void loop() {
  // Aguarde alguns segundos entre as medições.

  // delay(2000);

  // A leitura da temperatura ou umidade leva cerca de 250 milissegundos!
  // O sensor pode ter um atraso de até 2 segundos para a leitura
  
  float h = dht.readHumidity();
  // Temperature em Celsius (default)
  float t = dht.readTemperature();

  // Verifique se alguma leitura falhou e tenta novamente.
  if (isnan(h) || isnan(t)) {
    Serial.println(F("Falha de leitura do sensor DHT!"));
    return;
  }

  // Compute heat index in Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(t, h, false);

  Serial.print(F("Umidade: "));
  Serial.print(h);
  Serial.print(F("%  Temperatura: "));
  Serial.print(t);
  Serial.print(F("°C "));

  lcd.setBacklight(HIGH);

  lcd.setCursor(0, 0);
  lcd.print(F("Temp.: "));
  lcd.setCursor(10, 0);
  lcd.print(round(t));
  lcd.setCursor(12, 0);
  lcd.write(223); // Caracter °
  lcd.print(F("C"));
  delay(3000);

  lcd.setCursor(0, 1);
  lcd.print(F("Humidade: "));
  lcd.setCursor(10, 1);
  lcd.print(round(h));
  lcd.setCursor(12, 1);
  lcd.print(F(" %"));
  delay(3000);


  if (oldTemperature*0.90 < round(t) < oldTemperature*1.10 or oldHumidity*0.95 < round(t) < oldHumidity*1.05) {

     ////if(WiFi.status()== WL_CONNECTED){   //Check WiFi connection status
     ////  HTTPClient http;   
     ////  http.begin("http://127.0.0.1:8000/addReportSensor");  //Specify destination for HTTP request
     ////  http.addHeader("Content-Type", "text/plain");             //Specify content-type header
     ////  int httpResponseCode = http.POST("POSTING");   //Send the actual POST request
     ////  
     ////  if(httpResponseCode>0){
     ////   String response = http.getString();                       //Get the response to the request
     ////   Serial.println(httpResponseCode);   //Print return code
     ////   Serial.println(response);           //Print request answer
     ////  }
     ////  else{
     ////   Serial.print("Error on sending POST: ");
     ////   Serial.println(httpResponseCode);
     ////  }
     ////  http.end();  //Free resources
     ////}else{ 
     ////   Serial.println("Error in WiFi connection");   
     ////}
     Serial.println("Enviando POST - Temperatura alterada");   
  }
  
}
