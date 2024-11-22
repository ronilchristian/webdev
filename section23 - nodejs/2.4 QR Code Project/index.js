/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "node:fs";

inquirer
  .prompt([{
    type: "input",
    name: "url",
    message: "Enter a URL",
    },
  ])
  .then((answers) => {
    var qr_svg = qr.image(answers.url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('qr_img.png'));

    fs.writeFile("URL.txt", answers.url, (err) => {
        if (err) throw err;
        console.log("File saved successfully!");
    });
  })
  .catch((error) => {
    console.log(error);
  });
