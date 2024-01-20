const TaskModel = require('../models/task.model');

module.exports.getTasks = async (req, res) => {
    const tasks = await TaskModel.find();
    res.status(200).json(tasks);

};

module.exports.setTask = async (req, res) => {
    if (!req.body.title) {
        res.status(400).json({message: "Merci d'ajouter une tache"});
    }

    const task = await TaskModel.create({
        title: req.body.title,
        categoryId: req.body.categoryId,
        completed: false,
        userId: req.auth.userId
    })
        .catch(err => res.status(500).json({err}));
    res.status(201).json(task);
};

module.exports.editTask = async (req, res) => {
    const task = await TaskModel.findById(req.params.id);

    if (!task) {
        res.status(400).json({message: "Cette tache n'existe pas"});
    }

    const updateTask = await TaskModel.findByIdAndUpdate(
        task,
        req.body,
        {new: true}
    )
        .catch(err => res.status(500).json({err}));
    res.status(200).json(updateTask);
};

module.exports.deleteTask = async (req, res) => {
    const task = await TaskModel.findById(req.params.id);

    if (!task) {
        res.status(400).json({message: "Cette tache n'existe pas"});
    }

    await task.deleteOne()
        .catch(err => res.status(500).json({err}));

    res.status(200).json({message: "Tache supprimé"});
};