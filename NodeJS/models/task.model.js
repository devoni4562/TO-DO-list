// const mongoose = require('mongoose');

//
// const taskSchema = new mongoose.Schema(
//     {
//         title: {
//             type: String,
//             required: true
//         },
//         categoryId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Category',
//             required: true
//         },
//         completed: {
//             type: Boolean,
//             required: true
//         },
//         userId: {
//             type: mongoose.Schema.Types.ObjectId,
//             required: true
//         }
//     },
//     {
//         timestamps: true,
//     }
// );
//
// module.exports = mongoose.model('task', taskSchema);