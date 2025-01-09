function Response(req, res) {
    this.res = res;
}

Response.prototype.success = function (data = true) {
    this.res.status(200).json({
        code: 200,
        message:'success',
        data: data
    });
};

Response.prototype.error = function (code, message) {
    this.res.json({
        code: code,
        message: message
    });
};

Response.prototype.noLogin = function () {
    this.res.status(401).json({
        code: 401,
        message: 'no login'
    });
};

export default function (req, res, next) {
    res.response = new Response(req, res);
    req.uuid = 1;
    next();
}