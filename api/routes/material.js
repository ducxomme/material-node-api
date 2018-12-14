const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Material = require('../model/material');

router.get('/', (req, res, next) => {
    Material.find()
        .select('_id name unit inventory')
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                count: docs.length,
                materials: docs
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

router.post('/', (req, res, next) => {
    const material = new Material({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        unit: req.body.unit,
        inventory: req.body.inventory
    });
    material.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'The Material created successful',
                material: {
                    _id: result._id,
                    name: result.name,
                    unit: result.unit,
                    inventory: result.inventory
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

router.patch('/:materialId', (req, res, next) => {
    const id = req.params.materialId;
    const updateObj = {};

    for (const key of Object.keys(req.body)){
        updateObj[key] = req.body[key];
    }

    Material.update({ _id: id, $set: updateObj})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Updated successful',
                material: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

router.delete('/:materialId', (req, res, next) => {
    Material.findByIdAndRemove(req.params.materialId)
        .then(result => {
            res.status(200).json({
                message: 'Deleted successful'
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

module.exports = router;