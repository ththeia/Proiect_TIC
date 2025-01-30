var express = require('express');
var router = express.Router();

// Create Recipe
async function createRecipe(req, res) {
    const recipeId = req.params.id; // Recipe ID from URL
    const { title, description, imgURL, steps, createdById } = req.body;

    try {
        await recipeRef.set(
            {
                title,
                description,
                createdAt: new Date(),
                imgURL,
                steps,
                createdById,
            },
            recipeId
        );
        res.status(201).json({ message: "Recipe created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get Recipe by ID
async function getRecipe(req, res) {
    const recipeId = req.params.id;

    try {
        const recipeDoc = await recipeRef.get(recipeId);
        if (!recipeDoc.exists) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.status(200).json(recipeDoc.data());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function getRecipes(req, res) {
    try {
        const recipeDocs = await recipeRef.getAll();
        if (!recipeDocs.exists) {
            return res.status(404).json({ message: "No recipes in DataBase" });
        }
        const recipeMap = recipeDocs.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          }));
          
        res.status(200).json(recipeMap);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update Recipe
async function updateRecipe(req, res) {
    const recipeId = req.params.id;
    const updates = req.body;

    try {
        await recipeRef.update(recipeId, updates);
        res.status(200).json({ message: "Recipe updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete Recipe
async function deleteRecipe(req, res) {
    const recipeId = req.params.id;

    try {
        await recipeRef.delete(recipeId);
        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



router.post("/recipes/:id", createRecipe);
router.get("/recipes", getRecipes);
router.get("/recipes/:id", getRecipe);
router.put("/recipes/:id", updateRecipe);
router.delete("/recipes/:id", deleteRecipe);

module.exports = router;
//module.exports = { createRecipe, getRecipe, updateRecipe, deleteRecipe };