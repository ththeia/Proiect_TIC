const { getFirelord, MetaTypeCreator } = require("firelord");
const User = MetaTypeCreator(
    {
      name: String,
      email: String,
      createdAt: Date,
    },
    "users"
  );
  
  const userRef = getFirelord(User);

  module.exports = userRef;