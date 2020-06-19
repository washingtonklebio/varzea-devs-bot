const fs = require('fs');
const fsEx = require("fs-extra");

const Helper = (exports = module.exports = {});


Helper.alignImageCenter = (name) => {
    const imageWidth = 306;
    const nameSize = name.length;
    const margin = (imageWidth - nameSize * 16.10) / 2;

    return margin;
}

Helper.existsFile = (file) => fs.existsSync(file);

Helper.removeDir = async (directory) =>
  Helper.existsFile(directory) ? await fsEx.remove(directory) : false;