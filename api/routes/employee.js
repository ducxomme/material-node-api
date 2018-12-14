const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Employee = require('../model/employee');

router.get('/', (req, res, next) => {
    Employee.find()
        .select('_id name gender')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                employees: docs
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.post('/', (req, res, next) => {
    const employee = new Employee({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        gender: req.body.gender
    })

    employee.save()
        .then(result => {
            res.status(201).json({
                message: 'The Employee created succesful',
                employee: {
                    _id: result._id,
                    name: result.name,
                    gender: result.gender
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.patch('/:employeeId', (req, res, next) => {
    const id = req.params.employeeId;
    const updateObj = {};

    for(const key of Object.keys(req.body)){
        updateObj[key] = req.body[key];
    }

    Employee.update({_id: id, $set: updateObj})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Updated successful',
                employee: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.delete('/:employeeId', (req, res, next) => {
    Employee.findByIdAndRemove(req.params.employeeId)
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Deleted successful'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

module.exports = router;