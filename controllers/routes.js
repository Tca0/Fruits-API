// This file will have all routes that the app deal with 
const express = require('express')
const Fruits = require('../models/fruit')
// defining our router varlibale
const router = express.Router()

//Obtain all fruits
router.get('', (req, res) => {
    console.log('the main route to get all list')
    const fruits = Fruits.all
    res.send(fruits)
})

//Obtain specific fruit via ID
router.get("/:id", (req, res) => {
    console.log('hitting the getElementById route:')
    const fruitId = parseInt(req.params.id);
    console.log(fruitId)
    try {
        const selectedFruit = Fruits.findById(fruitId);
        if(!selectedFruit) {
            throw Error("Item not found")
        }
        res.status(200).send(selectedFruit)
    } catch(err) {
        console.log(err.message)
        res.status(404).send(err.message)
    }
})

// add new item to the data
router.post('/', (req, res) => {
    console.log('Hitting post route')
    const data = req.body;
    const newFruit = Fruits.createNewFruit(data);
    res.status(201).send(newFruit);
})

router.delete('/:id', (req,res) => {
    console.log('hitting the delete route')
    const fruitId = parseInt(req.params.id)
    console.log(fruitId)
    try{
        const fruitToDelete = Fruits.findById(fruitId);
        console.log(fruitToDelete);
        if(!fruitToDelete) {
            throw new Error("item already deleted")
        }
        const deletedFruit = fruitToDelete.deleteAfruit()
        console.log(`the item was deleted \n`);
        console.log(deletedFruit)
        res.status(204).send()
    } catch(err) {
        console.log(err.message)
        res.status(404).send(err.message)
    }
})

// router.patch(':/id', (req, res) => {
//     const fruitId = parseInt(req.params.id)
//     const newData = req.body
//     const fruitToUpdate = Fruits.findById(fruitId)
//     const updatedFruit = fruitToUpdate.updateFruite(newData)
// })






module.exports = router
