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
        // it should return all list when request get /fruits
        it('Return a list of data with status code 200 when request get /fruits', (done) => {
            request(api).get('/fruits').expect(200, done)
        })
        // it should return the fifth item on list with get request on url /fruits/5
        it('Return the item that its id match the id in the get request /fruits/:id' , (done) => {
            request(api).get('/fruits/5').expect(200)
        .expect({
            "genus": "Fragaria",
            "name": "Blueberry",
            "id": 5,
            "family": "Rosaceae",
            "order": "Rosales",
            "image": 'https://github.com/Tca0/Fruits-API/blob/main/data/images/Blueberry.jpeg',
            "nutritions": {
                "carbohydrates": 5.5,
                "protein": 0,
                "fat": 0.4,
                "calories": 29,
                "sugar": 5.4
            }
        }, done)
        })
        // it return status 404 and item not found if the item not in db
        it('Return status 404 when request an item not in db' , (done) => {
            request(api).get('/fruits/50').expect(404,done)
        })
        // it return status 201 to post request and return the new item that created when send a post request to /fruits
        
        // it('it return status 201 to post request to /fruits and return the new item', (done) => {
        //     // const newItem = { ...testFruit, id: fruitDB[fruitDB.length -1].id + 1}
        //     request(api).post('/fruits')
        //                 .send(testFruit)
        //                 .set('Accept', /application\/json/)
        //                 .expect(201).expect({ ...testFruit, id: fruitDB[fruitDB.length -1].id + 1}, done)
        // })

        // delete route test
        it('responds to delete /fruits/:id with status 204', async () => {
            await request(api).delete('/fruits/6').expect(204);
            const newDbList = await request(api).get('/fruits');
            expect(newDbList.body.length).toBe(fruitDB.length);
        })

        // update an item route test
        let newItemValues ={
            "genus": "Fragaria-1",
            "name": "Blueberry-1",
            "id": 9,
            "family": "Rosaceae",
            "order": "Rosales",
            "image": '',
            "nutritions": {
                "carbohydrates": 5.5,
                "protein": 0,
                "fat": 0.4,
                "calories": 29,
                "sugar": 5.4
        }
    }
        it('Return 202 and the updated item on route /fruits/:id with method put', async () => {
            const itemToUpdate = await request(api).get('/fruits/9')
            await request(api).put('/fruits/9').send(newItemValues).expect(202)
            const updatedItem = await request(api).get('/fruits/9')
            expect(updatedItem).not.toBe(itemToUpdate)
        } )

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
                "id": 32,
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
