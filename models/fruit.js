const fruitsData = require('../data/db')

class Fruit {
    constructor(data) {
        this.genus = data.genus
        this.name = data.name
        this.id = data.id
        this.family = data.family
        this.order = data.order
        this.nutritions = data.nutritions
    }
    // return all fruits info
    static get all() {
        const fruits = fruitsData.map((fruit) => new Fruit(fruit))
        return fruits
    }
    // return a fruite by ID
    static findById(id) {
        const fruit = fruitsData.filter((fruit) => fruit.id == id)[0]
        if(!fruit) {
            return;
        }
        const foundedFruit = new Fruit(fruit)
        return foundedFruit
    }
    // add new fruit to the list
    static createNewFruit(fruit) {
        // we add a new item to the array and its id sohuld match the number that comes directly after the last item id's  
        const newFruitId = fruitsData[fruitsData.length -1].id + 1;
        const newFruit = new Fruit({ id: newFruitId , ...fruit })
        fruitsData.push(newFruit);
        return newFruit
    }
    // delete a specific fruit from list(deleting by ID)
    deleteAfruit() {
        const fruitToDelete = fruitsData.filter((fruit) => fruit.id == this.id)[0]
        const deletedFruit = fruitsData.splice(fruitsData.indexOf(fruitToDelete), 1)
        console.log(deletedFruit)
        console.log(fruitsData.length)
        return
    }
    // update a specific item from the list
//     updateFruite(fruitNewData) {
//         // first find the item from db
//         const fruitToUpdate = fruitsData.filter((fruit) => fruit.id == id)[0]
//         if(!fruitToUpdate) {
//             return {message: "Item not found or deleted"}
//         }
//         let fruit = new Fruit({

//         })
//     }
}

module.exports = Fruit