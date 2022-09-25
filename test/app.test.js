const request = require("supertest");
const server = require("../server");
const Fruit = require("../models/fruit");
const fruitDB = require("../data/db");
const { createNewFruit } = require("../models/fruit");


// describe the test for API
describe('API server', () => {
    // define an api as a variable
    let api;
    // define a test data element
    let testFruit = {
            "family": undefined,
            "genus": undefined,
            "id": 33,
            "name": "funghi",
            "image": undefined,
            "name": undefined,
            "nutritions": undefined,
            "order": undefined,
          };
        //   before all test if the api runnibg
        beforeAll( () => {
            api = server.listen(4000, () => {
                console.log(`Testing the app that is running on port 4000`)
            })
        })
        // test the server closing after all
        afterAll((done) => {
            console.log('Gracefully stopping test server');
            api.close(done);
        });
        // test the server is response to get request with url "/" by status 200
        it('responds to get / with status 200', (done) => {
            request(api).get('/').expect(200, done);
        });
    
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
