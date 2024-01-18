const CategoryModel = require('../models/category.model');

module.exports.getCategories = async (req, res) => {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);

};

module.exports.setCategory = async (req, res) => {
    if (!req.body.title) {
        res.status(400).json({message: "Merci d'ajouter une catégorie"});
    }

    const category = await CategoryModel.create({
        title: req.body.title,
    });
    res.status(200).json(category);
};

module.exports.editCategory = async (req, res) => {
    const category = await CategoryModel.findById(req.params.id);

    if (!category) {
        res.status(400).json({message: "Cette catégorie n'existe pas"});
    }

    const updateCategory = await CategoryModel.findByIdAndUpdate(
        category,
        req.body,
        {new: true}
    );
    res.status(200).json(updateCategory);
};

module.exports.deleteCategory = async (req, res) => {
    const category = await CategoryModel.findById(req.params.id);

    if (!category) {
        res.status(400).json({message: "Cette catégorie m'existe pas"});
    }

    await category.deleteOne();
    res.status(200).json({message: "supprimé"});
};