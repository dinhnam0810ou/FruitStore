function Fruit(id, name, weight, cost) {
    this.name = name;
    this.weight = weight;
    this.cost = cost;
    this.id = id;
}

Fruit.prototype.totalCost = function () {
    return this.weight * this.cost;
};

Fruit.prototype.renderProperties = function (labelPropertyNode, containerNode) {
    
};

Fruit.prototype.getFruitValue = function () {

};

Fruit.prototype.renderOrderItem = function (containerNode, id) {

};

