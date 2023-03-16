const { SerialPort, ReadlineParser } = require("serialport");
const port = new SerialPort({
    path: "/dev/cu.usbmodem32401",
    baudRate: 9600,
    autoOpen: false,
});
const parser = port.pipe(new ReadlineParser());

// 시리얼 포트 오픈
port.open((err) => {
    if (err) {
        return console.log("Error opening port ===> ", err.message);
    }

    console.log("SerialPort Open");
});

parser.on("data", (data) => {
    console.log(data);
    jsonParser(data);
});
