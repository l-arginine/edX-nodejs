"use strict";

/* Load required modules */

const
    fs = require('fs'),
    path = require('path'),
    csv = require('csvtojson');

/* Initailize variables */

var inputFile = path.join(__dirname, "customer-data.csv");
var outputFile = path.join(__dirname, "customer-data.json");

/* Function to convert csv file if file ecists. Else, throws error as file missing. Also accepts file name as arguments(as long as file is in same dir). */
const formatConverter = (file = inputFile) => {
    if(fs.existsSync(file)){
        console.log("File exists. Converting now...");
        csv().fromFile(file).then((jsonObj) => {
            fs.writeFileSync(outputFile, JSON.stringify(jsonObj));
        })
        console.log("Conversion completed");
    } else {
        console.log("File does not exist.\nPlease rerun the program with the correct file name as an argument.");
    }
}

/* Call function with args */
formatConverter(process.argv[2]);