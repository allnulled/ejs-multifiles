const fs = require("fs");
const emf = require(__dirname + "/../src/ejs-multifiles.js");
const contents = fs.readFileSync(__dirname + "/examples/project1.emf").toString();

const main = async function() {
    try {
        await emf.render(contents, {}, { basedir: __dirname + "/examples/project1" });
        await emf.renderFile(__dirname + "/examples/project2.emf", {}, {});
    } catch (error) {
        console.log(error);
    }
};

main();