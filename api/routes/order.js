const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../model/order');
const Employee = require('../model/employee');

router.get('/', (req, res, next) => {
    Order.find()
        .select('_id employee materials')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

router.get('/:orderId', (req, res, next) => {
    Order.findOne({ _id: req.params.orderId })
        .select('_id employee materials')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
});

router.post('/', (req, res, next) => {
    Employee.findById(req.body.employee)
        .then(employee => {
            if (!employee) {
                return res.status(404).json({
                    message: 'Employee not found'
                })
            }
            const listMaterials = req.body.materials;
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                employee: employee,
                materials: listMaterials
            })
            return order.save();
        })

        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'The Order created succesful',
                order: {
                    _id: result._id,
                    employee: result.employee,
                    materials: result.materials
                }
            });

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.patch('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    const updateObj = req.body.materials;


    Order.updateOne({ _id: id }, { $set: { materials: updateObj } })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Updated Order succesful'
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:orderId', (req, res, next) => {
    Order.findByIdAndRemove(req.params.orderId)
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Deleted succesful'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;