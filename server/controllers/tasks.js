var mongoose = require('mongoose');
var _ = require('lodash');
var Task = mongoose.model('Task');


/**
 * List
 */
exports.all = function(req, res) {
    Task.find({}).exec(function(err, tasks) {
        if(!err) {
            res.json(tasks);
        }else {
            console.log('Error in first query');
        }
    });
};

var initTasks = function() {
    var Agenda = require('agenda');
    var agenda;

    var jobs = mongoose.connection.collection('jobs');
    var noop = function() {};

    //console.log('Initializing');
    //agenda = new Agenda({
    //    mongo: mongoose.connection
    //}, function(err) {
    //    if (err) {
    //        console.log('Error initializing Agenda: ', err);
    //        return;
    //    }
    //    console.log('Agenda initialized');
    //});

    // With mongodb directly
    agenda = new Agenda({
        name: 'poke',
        // TODO: Reuse mongoose connection
        db: { address: 'mongodb://127.0.0.1/poke', collection: 'jobs' }
    }, function(err) {
        if (err) {
            console.log('Error initializing Agenda: ', err);
            return;
        }

        console.log('Agenda initialized');
    });

    agenda
        .on('ready', function() {
            console.log('Agenda ready firing');

            //jobs.ensureIndex({
            //    nextRunAt: 1,
            //    lockedAt: 1,
            //    name: 1,
            //    priority: 1
            //}, noop);

            agenda.define('send email', {
                priority: 'high',
                concurrency: 10
            }, function(job, done) {
                var data = job.attrs.data;
                console.log('Running `send email` job with data ', data);

                done();
            });

            //agenda.every('3 minutes', 'send email');
            //
            //agenda.schedule('in 2 minutes', 'send email', {
            //    to: 'admin@example.com',
            //    data: 'test'
            //});
            //
            //agenda.now('send email');

            agenda.start();
        });

    agenda.on('error', function() {
        console.log('Agenda Error: ', arguments);
    });
};

/**
 * Add a task
 */
exports.add = function(req, res) {
    Task.create(req.body, function (err) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send('Added successfully');
    });
};

/**
 * Update a task
 */
exports.update = function(req, res) {
    var query = { id: req.body.id };
    var isIncrement = req.body.isIncrement;
    var isFull = req.body.isFull;
    var omitKeys = ['id', '_id', '_v', 'isIncrement', 'isFull'];
    var data = _.omit(req.body, omitKeys);

    if(isFull) {
        Task.findOneAndUpdate(query, data, function(err, data) {
            if(err) {
                console.log('Error on save!');
                res.status(500).send('Error saving task: ', err.toString());
            }
            res.status(200).send('Updated successfully');
        });
    } else {
        Task.findOneAndUpdate(query, { $inc: { count: isIncrement ? 1: -1 } }, function(err, data) {
            if(err) {
                console.log('Error on save!');
                // Not sure if server status is the correct status to return
                res.status(500).send('Error updating task: ', err.toString());
            }
            res.status(200).send('Updated successfully');
        });
    }

};

/**
 *
 */
exports.increment = function(req, res) {
    var query = { id: req.body.id };
};

/**
 * Remove a task
 */
exports.remove = function(req, res) {
    var query = { id: req.body.id };
    Task.findOneAndRemove(query, function(err, data) {
        if(err) console.log('Error on delete');
        res.status(200).send('Removed Successfully');
    });
};