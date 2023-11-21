const fs = require('fs');
const pdf = require('pdf-parse');

function parsePdf() {
  if (fs.readdirSync('../uploads').length === 0) {
    return;
  }

  const file = fs.readdirSync('../uploads')[0];

  let dataBuffer = fs.readFileSync(file);

  pdf(dataBuffer).then(data => data.text);
}

module.exports = parsePdf;

// let file;

// if (fs.readdirSync('../uploads').length > 0) {
//   file = fs.readdirSync('../uploads')[0];
// }

// let dataBuffer = fs.readFileSync(file);

// module.exports = pdf(dataBuffer)
//   .then(data => {
//     return data.text;
//     // console.log(data.numpages);
//     // console.log(data.numrender);
//     // console.log(data.info);
//     // console.log(data.metadata);
//     // console.log(data.text);
//   })
//   .catch(err => console.log(err));
