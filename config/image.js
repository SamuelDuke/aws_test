const fs = require('fs');

const rootPath = require('./main').rootPath;

module.exports = {
    upload: (fileName, filePath) => {
        return new Promise((resolve, reject) => {
            console.log('config.upload started');
            const target_path = `uploads/${fileName}`;

            // renaming real file
            fs.rename(filePath, target_path, function (err) {
                if (err) {
                    reject(err);
                } else {
                    const path = `${rootPath}/image/imagePath/${fileName}`;
                    resolve(path);
                }
            });
        })
    }
};