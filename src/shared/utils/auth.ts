export default {
  jwt: {
    secret: process.env.DB_SECRET || "penis",
    expiresIn: "12h",
  },
};
