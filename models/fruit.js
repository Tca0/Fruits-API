const fruitsData = require('../data/db')

class Fruit {
    constructor(data) {
        this.genus = data.genus
        this.name = data.name
        this.id = data.id
        this.family = data.family
        this.order = data.order
        this.image = data.image
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
        console.log("****Add function****\n: last item before adding: \n", fruitsData[fruitsData.length-1]);
        const newFruitId = fruitsData[fruitsData.length -1].id + 1;
        const newFruit = new Fruit({ id: fruitsData[fruitsData.length -1].id + 1 , ...fruit })
        fruitsData.push(newFruit);
        console.log(" last item now is: \n",fruitsData[fruitsData.length -1] )
        return newFruit
    }
    // delete a specific fruit from list(deleting by ID)
    deleteAfruit() {
        // no need to filter it to get the id because it is instance and we can get the id by this.id
        // const fruitToDelete = fruitsData.filter((fruit) => fruit.id == this.id)[0]
        console.log("******Delete function*******");
        console.log("db length before deletion", fruitsData.length )
        console.log("id for delete item",this.id)
        console.log(fruitsData[this.id])
        const itemToDelete = fruitsData.filter((item) => item.id == this.id)
        const deletedFruit = fruitsData.splice(fruitsData.indexOf(itemToDelete), 1)
        console.log("This item was spliced from list",deletedFruit)
        console.log('From the class module',deletedFruit[0])
        console.log("db length after deletion", fruitsData.length )
        return deletedFruit[0]
    }
    // update a specific item from the list
    updateFruite(fruitNewData) {
        // first find the item from db
        const fruitToUpdate = fruitsData.filter((fruit) => fruit.id == this.id)[0]
        if(!fruitToUpdate) {
            return {message: "Item not found or deleted"}
        }
        // we have to pass through all fileds and assign them to the new value if updated or to the value that stord already if it not changed
        fruitToUpdate.id = this.id
        fruitToUpdate.genus = fruitNewData.genus || this.genus
        fruitToUpdate.name = fruitNewData.name || this.name 
        fruitToUpdate.family = fruitNewData.family || this.family
        fruitToUpdate.order = fruitNewData.order || this.order
        fruitToUpdate.nutritions = fruitNewData.nutritions ||this.nutritions
        if(fruitNewData.image == "" || fruitNewData.image == " ") {
            fruitToUpdate.image = ""
        } else {
            fruitToUpdate.image = fruitNewData.image ||this.image
        }
        // (fruitNewData.image == " ") && (fruitToUpdate.image = fruitNewData.image)
        return fruitToUpdate
    }
}

module.exports = Fruit
