(function(factory) {
    const mod = factory();
    if(typeof window !== "undefined") {
        window.ejsMultifiles = mod;
    }
    if(typeof global !== "undefined") {
        globalThis.ejsMultifiles = mod;
    }
    if(typeof module !== "undefined") {
        module.exports = mod;
    }
})(function() {
    const fs = require("fs");
    const ejs = require("ejs");
    const path = require("path");
    const FileSplitter = require(__dirname + "/file-splitter-syntax.js");
    const emf = {};
    emf.render = async function(template, parameters = {}, configurations = {}) {
        try {
            const output = await ejs.render(template, parameters, configurations);
            const files = FileSplitter.parse(output);
            for(let index=0; index<files.length; index++) {
                const item = files[index];
                const { file, contents } = item;
                const basedir = configurations.basedir ? configurations.basedir : process.cwd();
                const final_file = path.resolve(basedir, file);
                fs.writeFileSync(final_file, contents, "utf8");
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
    emf.renderFile = function(file, parameters = {}, configurations = {}) {
        try {
            const contents = fs.readFileSync(file).toString();
            configurations.basedir = path.dirname(file);
            return emf.render(contents, parameters, configurations);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    emf.default = emf;
    return emf;
});