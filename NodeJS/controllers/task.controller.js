const TaskModel = require('../models/task.model');

module.exports.getTasks = async (req, res) => {
    const tasks = await TaskModel.find();
    res.status(200).json(tasks);

};

module.exports.setTask = async (req, res) => {
    if (!req.body.message) {
        res.status(400).json({message: "Merci d'ajouter une tache"});
    }

    const task = await TaskModel.create({
        title: req.body.message,
        category: "code frontend",
        completed: false,
        user: req.body.author
    });
    res.status(200).json(task);
};

module.exports.editTask = async (req, res) => {
    const task = await TaskModel.findById(req.params.id);

    if (!task) {
        res.status(400).json({message: "Cette tache m'existe pas"});
    }

    const updateTask = await TaskModel.findByIdAndUpdate(
        task,
        req.body,
        {new: true}
    );
    res.status(200).json(updateTask);
};

module.exports.deleteTask = async (req, res) => {
    const task = await TaskModel.findById(req.params.id);

    if (!task) {
        res.status(400).json({message: "Cette tache m'existe pas"});
    }

    await task.deleteOne();
    res.status(200).json({message: "supprimé"});
};