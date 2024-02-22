const { Unauthenticated, Unauthorized } = require("../errors");
const { isTokenValid } = require("../utils/jwt");

const authenticatedUser = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }
    if (!token) {
      throw new Unauthenticated("Authencation Invalid");
    }

    const payload = isTokenValid({ token });

    req.user = {
      email: payload.email,
      role: payload.role,
      name: payload.name,
      organizer: payload.organizer,
      id: payload.id,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticatedUser };
