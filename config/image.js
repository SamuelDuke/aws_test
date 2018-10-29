const fs = require('fs');
const path = require('path');

const rootPath = 'http://54.69.223.221:8080';

// export const upload = (fileName, filePath) => {
//     return new Promise((resolve, reject) => {
//         console.log('config.upload started');
//         const target_path = `uploads/${fileName}`;
//
//         // renaming real file
//         fs.rename(filePath, target_path, function (err) {
//             if (err) {
//                 reject(err);
//             } else {
//                 const path = `${rootPath}/image/imagePath/${fileName}`;
//                 console.log(path);
//                 resolve(path);
//             }
//         });
//     })
// };

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
                    console.log(path);
                    resolve(path);
                }
            });
        })
    }
};