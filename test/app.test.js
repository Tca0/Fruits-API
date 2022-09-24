const st = require("supertest");
const { request } = require("../server");
const Fruit = require("../models/fruit");
const fruitDB = require("../data/db");
const { createNewFruit } = require("../models/fruit");



describe('db tests', () => {
    
    it('should return all fruits', () => {
        const result = fruitDB;
        expect(Fruit.all).toEqual(result)
    })

    test('it calls the fruit findById method', () => {
        const fruit = 8
        expect(Fruit.findById(fruit)).toEqual({
            "genus": "Ficus",
            "name": "Fig",
            "id": 8,
            "family": "Moraceae",
            "order": "Rosales",
            "image": "https://github.com/Tca0/Fruits-API/blob/main/data/images/Fig.jpeg",
            "nutritions": {
                "carbohydrates": 19,
                "protein": 0.8,
                "fat": 0.3,
                "calories": 74,
                "sugar": 16
            }})
    })

    it('should create a new fruit', () => {
        const addFruit = "funghi";
        expect(Fruit.createNewFruit(addFruit)).toEqual({
                "family": undefined,
                "genus": undefined,
                "id": 33,
                "name": "funghi",
                "image": undefined,
                "name": undefined,
                "nutritions": undefined,
                "order": undefined,
              })
    })

    // it('should delete a fruit', () => {
    //     const result = fruitDB
    //     expect(Fruit.(1)).toEqual(fruitDB[0])
    // })


})
