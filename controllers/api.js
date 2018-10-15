exports.sendInfo = (req, res, next) => {
    const info = {
        firstName: 'Samuel',
        lastName: 'Winterton',
        age: 34,
        spouse: 'Erica Winterton'
    };
    res.json(info);
};