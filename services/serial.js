const { SerialPort, ReadlineParser } = require("serialport");
const port = new SerialPort({
    path: "/dev/cu.usbmodem32401",
    baudRate: 9600,
    autoOpen: false,
});
const parser = port.pipe(new ReadlineParser({ delimiter: "#" }));
const tts = require("./tts");

// 시리얼 포트 오픈
port.open((err) => {
    if (err) {
        return console.log("Error opening port ===> ", err.message);
    }
    console.log("SerialPort Open");
});

// 시리얼 포트로부터 데이터 수신
parser.on("data", (data) => {
    console.log("Receive Data ===> ", data);
    jsonParser(data);
});

// JSON 파싱 후 위치 데이터 추출
const jsonParser = (json) => {
    let location;
    json = JSON.parse(json);

    try {
        if (json.hasOwnProperty("location") == true) {
            location = json.location;
            console.log("Current Location ===> ", location);
            tts.speak(location);
        }
    } catch (err) {
        console.log("JSON Parsing Error ===> ", err.message);
    }
};
