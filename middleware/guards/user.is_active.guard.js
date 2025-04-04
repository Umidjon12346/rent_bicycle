const activeAdminGuard = (req, res, next) => {
  if (!req.user.is_active) {
    return res
      .status(403)
      .send({ message: "Your account is deactivated. Contact support." });
  }
  next();
};

module.exports = { activeAdminGuard };
