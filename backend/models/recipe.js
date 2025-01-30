const { getFirelord, MetaTypeCreator } = require("firelord");
const Recipe = MetaTypeCreator(
    {
      title: String,
      description: String,
      createdAt: Date,
      imgURL: String,
      steps: String,
      createdById: String,

    },
    "recipes"
  );
  
  const recipeRef = getFirelord(Recipe);

  module.exports = recipeRef;