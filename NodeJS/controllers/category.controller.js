const CategoryModel = require('../models/category.model');

module.exports.getCategories = async (req, res) => {
    const categories = await CategoryModel.find()
        .catch(err => res.status(500).json({err}));
    res.status(200).json(categories);

};

module.exports.setCategory = async (req, res) => {
    if (!req.body.title) {
        res.status(400).json({message: "Merci d'ajouter une catégorie"});
    }

    const category = await CategoryModel.create({
        title: req.body.title,
    })
        .catch(err => res.status(500).json({err}));
    res.status(201).json(category);
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
    )
        .catch(err => res.status(500).json({err}));
    res.status(200).json(updateCategory);
};

module.exports.deleteCategory = async (req, res) => {
    const category = await CategoryModel.findById(req.params.id);

    if (!category) {
        res.status(400).json({message: "Cette catégorie m'existe pas"});
    }

    await category.deleteOne()
        .catch(err => res.status(500).json({err}));
    res.status(200).json({message: "supprimé"});
};