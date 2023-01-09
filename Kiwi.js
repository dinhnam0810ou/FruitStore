function Kiwi(id, weight , cost, freshColor) {
    Fruit.call(this,id , "Kiwi", weight, cost);
    this.freshColor = freshColor;
}

Kiwi.COLOR_TYPES = ["Green", "Yellow"];

Kiwi.prototype = Object.create(Fruit.prototype);

Kiwi.prototype.constructor = Kiwi;

Kiwi.prototype.renderProperties = function (labelPropertyNode, containerNode) {
    var thiz = this;

    this.colorSelection = document.createElement("select");
    this.colorSelection.id = "colorSelection";

    Kiwi.COLOR_TYPES.forEach(function (colorType) {
        var option = document.createElement("option");
        option.value = colorType;
        option.text = colorType;
        thiz.colorSelection.appendChild(option);
    });

    containerNode.appendChild(this.colorSelection);

    this.colorLabel = document.createElement("label");
    this.colorLabel.innerHTML = "Fresh Color:";

    labelPropertyNode.appendChild(this.colorLabel);
};

Kiwi.prototype.getFruitValue = function (id) {

    var weight = document.getElementById("weight").value;
    var cost = document.getElementById("cost").value;
    var color = document.getElementById("colorSelection").value;
    
    return new Kiwi(id, weight, cost, color);
};

Kiwi.prototype.renderOrderItem = function (containerNode, id) {
    var name = document.createElement("label");
    name.innerHTML = "<b>Kiwi</b>";

    var weight = document.createElement("label");
    weight.innerHTML = "Weight:" + this.weight;

    var cost = document.createElement("label");
    cost.innerHTML = "Cost:" + this.cost;

    var color = document.createElement("label");
    color.innerHTML = "Color:" + this.freshColor;
    
    var detailLabel = document.createElement("vbox");
    detailLabel.appendChild(name);
    detailLabel.appendChild(weight);
    detailLabel.appendChild(cost);
    detailLabel.appendChild(color);
    detailLabel.className = "OrderSummaryDetail";

    var orderSummary = document.createElement("hbox");
    orderSummary.appendChild(detailLabel);
    orderSummary.className = "OrderSummary";
    orderSummary.id = "orderSummary" + id;

    containerNode.appendChild(orderSummary);
};