#!/usr/bin/env node

const emf = require(__dirname + "/emf.api.js");
const [bin_node, bin_emf, ...files] = process.argv;
console.log("[*] Using «emf» or «ejs-multifiles» command line utility [*]");
console.log("[*] Node binary:  " + bin_node);
console.log("[*] EMF binary:   " + bin_emf);
console.log("[*] Files:        " + files.length);
const main = async function() {
    try {
        for(let index=0; index<files.length; index++) {
          const file = files[index];
          console.log("[*] File:         " + file);
          const output = await emf.renderFile(file);
        }
    } catch (error) {
        console.error(error);
    }
}