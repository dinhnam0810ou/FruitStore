function Grape(id, weight , cost, color) {
    Fruit.call(this,id , "Grape", weight, cost);
    this.color = color;
}

Grape.COLOR_TYPES = ["Green", "Red", "Purple"];

Grape.prototype = Object.create(Fruit.prototype);

Grape.prototype.constructor = Grape;

Grape.prototype.renderProperties = function (labelPropertyNode, containerNode) {
    var thiz = this;

    this.colorSelection = document.createElement("select");
    this.colorSelection.id = "colorSelection"

    Grape.COLOR_TYPES.forEach(function (colorType) {
        var option = document.createElement("option");
        option.value = colorType;
        option.text = colorType;
        thiz.colorSelection.appendChild(option);
    });

    if (this.color) this.colorSelection.value = this.color;

    containerNode.appendChild(this.colorSelection);

    this.colorLabel = document.createElement("label");
    this.colorLabel.innerHTML = "Color:";

    labelPropertyNode.appendChild(this.colorLabel);
};

Grape.prototype.getFruitValue = function (id) {

    var weight = document.getElementById("weight").value;
    var cost = document.getElementById("cost").value;
    var color = document.getElementById("colorSelection").value;

    return new Grape(id, weight, cost, color);
    
};

Grape.prototype.renderOrderItem = function (containerNode, id) {
    var name = document.createElement("label");
    name.innerHTML = "<b>Grape</b>";

    var weight = document.createElement("label");
    weight.innerHTML = "Weight:" + this.weight;

    var cost = document.createElement("label");
    cost.innerHTML = "Cost:" + this.cost;

    var color = document.createElement("label");
    color.innerHTML = "Color:" + this.color;

    var detailLabel = document.createElement("vbox");
    detailLabel.appendChild(name);
    detailLabel.appendChild(weight);
    detailLabel.appendChild(cost);
    detailLabel.appendChild(color);
    detailLabel.className = "OrderSummaryDetail";

    var orderSummary = document.createElement("hbox");
    orderSummary.appendChild(detailLabel);
    orderSummary.className = "OrderSummary"
    orderSummary.id = "orderSummary" + id;

    containerNode.appendChild(orderSummary);
};