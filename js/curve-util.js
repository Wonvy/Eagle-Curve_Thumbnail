const fs = require('fs');

// PNG 文件的魔术数字
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

// 读取 .curve 文件并提取其中的 Thumbnail.png
async function curve2png(src, dist) {
  try {
    // 读取 .curve 文件的二进制数据
    const buffer = await fs.promises.readFile(src);

    // 查找 PNG 文件的起始位置（通过魔术数字）
    const pngStartIndex = buffer.indexOf(PNG_SIGNATURE);
    if (pngStartIndex === -1) {
      throw new Error('Thumbnail.png not found in the .curve file.');
    }

    // 假设 PNG 文件直到文件结尾（或者可以解析 PNG 文件的结束标志）
    const pngEndIndex = buffer.indexOf(Buffer.from([0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82]), pngStartIndex);
    if (pngEndIndex === -1) {
      // throw new Error('Incomplete PNG file in the .curve file.');
    }

    // 提取 PNG 文件数据
    const pngBuffer = buffer.slice(pngStartIndex, pngEndIndex + 8); // 包含 PNG 文件的结束标志

    // 保存 PNG 文件
    await fs.promises.writeFile(dist, pngBuffer);
  } catch (err) {
    return reject(err);
  }
}

async function curve2buffer(filePath) {
  try {
    // 读取文件
    const fs = require('fs').promises;
    const buffer = await fs.readFile(filePath);

    // 查找 PNG 文件的起始位置（通过魔术数字）
    const pngStartIndex = buffer.indexOf(PNG_SIGNATURE);
    if (pngStartIndex === -1) {
      throw new Error('Thumbnail.png 在 .curve 文件中未找到。');
    }

    // 查找 PNG 文件的结束位置
    const pngEndIndex = buffer.indexOf(Buffer.from([0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82]), pngStartIndex);
    if (pngEndIndex === -1) {
      throw new Error('.curve 文件中的 PNG 文件不完整。');
    }

    // 提取 PNG 文件数据
    const pngBuffer = buffer.slice(pngStartIndex, pngEndIndex + 8); // 包含 PNG 文件的结束标志

    // 返回 PNG buffer
    return pngBuffer;
  } catch (error) {
    console.error('curve2buffer 中出错:', error);
    throw error;
  }
}


module.exports = {
  curve2png: curve2png,
  curve2buffer: curve2buffer
};
