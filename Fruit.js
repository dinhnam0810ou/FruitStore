function Fruit(name, weight, cost) {
    this.name = name;
    this.weight = weight;
    this.cost = cost;
}

Fruit.prototype.getName = function () {
    return this.name;
};

Fruit.prototype.setName = function (name) {
    this.name = name;
};

Fruit.prototype.getWeight = function () {
    return this.weight;
};

Fruit.prototype.setWeight = function (weight) {
    this.weight = weight;
};

Fruit.prototype.getCost = function () {
    return this.cost;
};

Fruit.prototype.setCost = function (cost) {
    this.cost = cost;
};

Fruit.prototype.totalCost = function () {
    return this.weight * this.cost;
};

Fruit.prototype.renderProperties = function (labelPropertyNode, containerNode, data) {
    
};

Fruit.prototype.getNewFruit = function () {

};

Fruit.prototype.renderOrderItem = function (containerNode) {

};

Fruit.prototype.renderOrderButton = function () {
 
};

