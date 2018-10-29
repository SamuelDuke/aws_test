const fs = require('fs');
const path = require('path');

const rootPath = 'http://54.69.223.221:8080';

module.exports = {
    upload: (fileName, filePath) => {
        const target_path = `uploads/${fileName}`;

        // renaming real file
        fs.rename(filePath, target_path, function (err) {
            if (err) {
                return 'There was an error trying to save the image to the server';
            } else {
                return `${rootPath}/image/imagePath/${fileName}`
            }
        });

    }
};