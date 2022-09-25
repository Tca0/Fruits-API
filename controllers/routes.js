// This file will have all routes that the app deal with 
const express = require('express')
const Fruits = require('../models/fruit')
// defining our router varlibale
const router = express.Router()

//Obtain all fruits
router.get('', (req, res) => {
    console.log('the main route to get all list')
    const fruits = Fruits.all
    // when success to get all data it response by status code 200 
    res.status(200).send(fruits)
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

router.put('/:id', (req,res) => {
    console.log('hitting the update route')
    const fruitId = parseInt(req.params.id)
    // const newData = JSON.stringify(req.body)
    const newData = req.body
    console.log(fruitId)
    console.log(newData)
    console.log(newData.name);
    const fruitToUpdate = Fruits.findById(fruitId)
    console.log(`this item to update\n`)
    console.log(fruitToUpdate);
    const updatedFruit = fruitToUpdate.updateFruite(newData)
    console.log(`the item after updating \n`)
    console.log(updatedFruit);
    res.status(202).send(updatedFruit)
})






module.exports = router
