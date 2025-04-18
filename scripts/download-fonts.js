const https = require('https');
const fs = require('fs');
const path = require('path');

const fonts = [
  {
    name: 'arial.ttf',
    url: 'https://github.com/matomo-org/travis-scripts/raw/master/fonts/Arial.ttf'
  },
  {
    name: 'arialbd.ttf',
    url: 'https://github.com/matomo-org/travis-scripts/raw/master/fonts/Arial_Bold.ttf'
  },
  {
    name: 'ariali.ttf',
    url: 'https://github.com/matomo-org/travis-scripts/raw/master/fonts/Arial_Italic.ttf'
  },
  {
    name: 'times.ttf',
    url: 'https://github.com/matomo-org/travis-scripts/raw/master/fonts/Times_New_Roman.ttf'
  },
  {
    name: 'timesbd.ttf',
    url: 'https://github.com/matomo-org/travis-scripts/raw/master/fonts/Times_New_Roman_Bold.ttf'
  },
  {
    name: 'timesi.ttf',
    url: 'https://github.com/matomo-org/travis-scripts/raw/master/fonts/Times_New_Roman_Italic.ttf'
  }
];

const downloadFont = (font) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, '..', 'public', 'fonts', font.name);
    const file = fs.createWriteStream(filePath);

    https.get(font.url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${font.name}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
};

async function downloadFonts() {
  try {
    await Promise.all(fonts.map(downloadFont));
    console.log('All fonts downloaded successfully!');
  } catch (error) {
    console.error('Error downloading fonts:', error);
    process.exit(1);
  }
}

downloadFonts(); 