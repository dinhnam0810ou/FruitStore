function Apple(id, weight , cost, size) {
    Fruit.call(this, id, "Apple", weight, cost);
    this.size = size;
}

Apple.SIZE_TYPES = ["Small", "Medium", "Large"];

Apple.prototype = Object.create(Fruit.prototype);

Apple.prototype.constructor = Apple;

Apple.prototype.renderProperties = function (labelPropertyNode, containerNode) {
    this.sizeSelection = document.createElement("select");
    this.sizeSelection.id = "sizeSelection";
    var thiz = this;

    Apple.SIZE_TYPES.forEach(function (sizeType) {
        var option = document.createElement("option");
        option.value = sizeType;
        option.text = sizeType;
        thiz.sizeSelection.appendChild(option);
    });
    
    if (this.size) this.sizeSelection.value = this.size;

    containerNode.appendChild(this.sizeSelection);
    
    this.sizeLabel = document.createElement("label");
    this.sizeLabel.innerHTML = "Size:";
    labelPropertyNode.appendChild(this.sizeLabel);

};

Apple.prototype.getFruitValue = function (id) {
    
    var weight = document.getElementById("weight").value;
    var cost = document.getElementById("cost").value;
    var size = document.getElementById("sizeSelection").value;

    return new Apple(id, weight, cost, size);
};

Apple.prototype.renderOrderItem = function (containerNode, id) {
    var name = document.createElement("label");
    name.innerHTML = "<b>Apple</b>";

    var weight = document.createElement("label");
    weight.innerHTML = "Weight:" + this.weight;

    var cost = document.createElement("label");
    cost.innerHTML = "Cost:" + this.cost;

    var size = document.createElement("label");
    size.innerHTML = "Size:" + this.size;

    var detailLabel = document.createElement("vbox");
    detailLabel.appendChild(name);
    detailLabel.appendChild(weight);
    detailLabel.appendChild(cost);
    detailLabel.appendChild(size);
    detailLabel.className = "OrderSummaryDetail";

    var orderSummary = document.createElement("hbox");
    orderSummary.appendChild(detailLabel);
    orderSummary.className = "OrderSummary";
    orderSummary.id = "orderSummary" + id;
    
    containerNode.appendChild(orderSummary);
};
