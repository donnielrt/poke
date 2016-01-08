/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
    id: String,

    title: String,
    description: String,

    // URL endpoint to take an action against
    //endpoint: String,

    // Link to agenda job
    agendaId: Number
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Task' collection in the MongoDB database
Topic = mongoose.model('Task', TaskSchema);

