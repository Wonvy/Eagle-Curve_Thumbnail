const fs = require('fs');
const curve = require('./../js/curve-util.js');
const imageSize = require('./../js/image-size.js');

module.exports = async ({ src, dest, item }) => {
  return new Promise(async (resolve, reject) => {
    try {
      // 1. Parse and generate thumbnail from curve file to dest
      await curve.curve2png(src, dest);
      let size = await imageSize(dest);

      // 2. Check if the result is correct
      if (!fs.existsSync(dest) || size.width === 0) {
        return reject(new Error(`curve file thumbnail generation failed.`));
      }

      // 3. Update the item dimensions
      item.height = size?.height || item.height;
      item.width = size?.width || item.width;

      // 4. Return the result
      return resolve(item);
    }
    catch (err) {
      return reject(err);
    }
  });
};