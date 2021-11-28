//---------------------Esto no se si va aqui xD
module.exports = {
    protegerRuta (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    }
};