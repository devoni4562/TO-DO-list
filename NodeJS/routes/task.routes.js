const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.json({message: "toutes les tasks"});
});
router.post("/", (req, res) => {
    console.log(req.body);
    res.json({message: req.body.message});
});

router.put("/:id", (req, res) => {
    res.json({messageId: req.params.id});
});

router.delete("/:id", (req, res) => {
    res.json({message: `Task supprimé : ${req.params.id}`});
});

router.patch("/check-task/:id", (req, res) => {
    res.json({message: `la tache : ${req.params.id} a été éffectuée`});
});
router.patch("/uncheck-task/:id", (req, res) => {
    res.json({message: `la tache : ${req.params.id} n'a pas été effectuée`});
});

module.exports = router;