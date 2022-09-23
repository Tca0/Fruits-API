// This file will have all routes that the app deal with 
const express = require('express')
const Fruits = require('../models/fruit')
// defining our router varlibale
const router = express.Router()

//Obtain all fruits
router.get('', (req, res) => {
    const fruits = Fruits.all
    res.send(fruits)
})

//Obtain specific fruit via ID
router.get("/:id", (req, res) => {
    const fruitId = parseInt(req.params.id);
    const selectedFruit = Fruits.findById(fruitId);
    res.status(200).send
    (selectedFruit)
})

//
router.post('/', (req, res) => {
    const data = req.body;
    const newFruit = Fruits.createNewFruit(data);
    res.status(201).send(newFruit);
})

router.delete('/:id', (req,res) => {
    const fruitId = parseInt(req.params.id)
    const fruitToDelete = Fruits.findById(fruitId);
    const deletedFruit = fruitToDelete.deleteAfruit()
    res.status(204).send({"message" : `the item was deleted\n ${deletedFruit}`})
})

// router.patch(':/id', (req, res) => {
//     const fruitId = parseInt(req.params.id)
//     const newData = req.body
//     const fruitToUpdate = Fruits.findById(fruitId)
//     const updatedFruit = fruitToUpdate.updateFruite(newData)
// })






module.exports = router
