const fs = require('fs');
const cheerio = require('cheerio');
const buildPath = 'dist';
const htmlPath = `${buildPath}index.html`;
const whitelist = ['main', 'polyfills', 'runtime', 'vendor'];

fs.readFile(htmlPath, 'utf8', function (err, data) {
  if (err) {
    console.log(err);
    return;
  }

  const $ = cheerio.load(data);

  function replacer(i, el) {
    const inputPath = `${buildPath}${el.attribs.src}`;
    const src = el.attribs.src.split('.');
    const filename = src[0];
    if (whitelist.includes(filename)) {
      const extension = src[src.length - 1];
      const random = [...Array(16)].map(() => Math.random().toString(36)[2]).join('');
      const newFilename = `${filename}.${random}.${extension}`;
      const outputPath = `${path}${newFilename}`;
      el.attribs.src = newFilename;
      fs.rename(inputPath, outputPath, function() {
        console.log(`Renamed: ${inputPath} to ${outputPath}`);
      });
    }
  }

  $('script').each(replacer);

  fs.writeFile(htmlFile, $.html(), {}, function() {
    console.log('[Complete] Updated your HTML');
  });
});
