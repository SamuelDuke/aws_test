module.exports = {
    port: 8080,
    database:'mongodb://admin:RAiTAC0BxVafiCDY@cluster0-shard-00-00-z72vv.mongodb.net:27017,cluster0-shard-00-01-z72vv.mongodb.net:27017,cluster0-shard-00-02-z72vv.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
    //database: 'mongodb://localhost/aws_test',
    jwtSecret: 'I Love Erica!!!!',
    jwtExpiration: 1000000,
    uploadProfilePhotoFormKey: 'file',
    rootPath: 'http://54.69.223.221:8080',

    response: (res, httpStatus, status, message, data, err) => {
        res.status(httpStatus).json({
            status: status,
            data: data,
            message: message,
            err: err
        });
    }
};