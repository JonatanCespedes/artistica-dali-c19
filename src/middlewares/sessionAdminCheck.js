module.exports = (req, res, next) => {
    if(!req.session.user) return res.redirect("/users/login");
    if(req.session.user.rol !== "ADMIN") return res.redirect("/");
    next();
}