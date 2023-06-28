const env = require('./environment');
const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  const revManifestPath = path.join(__dirname, '../public/assets/rev-manifest.json');
  let revManifest = {};

  if (env.name !== 'development') {
    try {
      const manifestContent = fs.readFileSync(revManifestPath, 'utf8');
      revManifest = JSON.parse(manifestContent.trim());
    } catch (err) {
      console.error('Error parsing rev-manifest.json:', err);
    }
  }

  app.locals.assetPath = function (filePath) {
    if (env.name === 'development') {
      return filePath;
    }

    const revisionedPath = revManifest[filePath] || filePath;
    return '/' + revisionedPath;
  };
};