const say = require("say");

module.exports = {
    speak: (location) => {
        say.speak(location, null, null, (err) => {
            if (err) {
                return console.log(err.message);
            }
            console.log("Location notification complete");
        });
    },
};
