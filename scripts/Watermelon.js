function Watermelon(id, weight , cost, shape, freshColor) {
    Fruit.call(this,id , "Watermelon", weight, cost);
    this.shape = shape;
    this.freshColor = freshColor;
}
Watermelon.COLOR_TYPES = ["Red", "Yellow"];

Watermelon.SHAPE_TYPES = ["Spherical","Oval"];

Watermelon.prototype = Object.create(Fruit.prototype);

Watermelon.prototype.constructor = Watermelon;

Watermelon.prototype.renderProperties = function (labelPropertyNode, containerNode) {
    var thiz = this;

    this.colorSelection = document.createElement("select");
    this.colorSelection.id = "colorSelection";

    this.shapeSelection = document.createElement("select");
    this.shapeSelection.id = "shapeSelection";

    Watermelon.SHAPE_TYPES.forEach(function (shapeType) {
        var option = document.createElement("option");
        option.value = shapeType;
        option.text = shapeType;
        thiz.shapeSelection.appendChild(option);
    });

    if (this.shape) this.shapeSelection.value = this.shape;

    containerNode.appendChild(this.shapeSelection);

    Watermelon.COLOR_TYPES.forEach(function (colorType) {
        var option = document.createElement("option");
        option.value = colorType;
        option.text = colorType;
        thiz.colorSelection.appendChild(option);
    });

    if (this.freshColor) this.colorSelection.value = this.freshColor;

    containerNode.appendChild(this.colorSelection);

    this.colorLabel = document.createElement("label");
    this.colorLabel.innerHTML = "Fresh Color:";

    this.shapeLabel = document.createElement("label");
    this.shapeLabel.innerHTML = "Shape:";

    labelPropertyNode.appendChild(this.shapeLabel);
    labelPropertyNode.appendChild(this.colorLabel);
};

Watermelon.prototype.getFruitValue = function (id) {

    var weight = document.getElementById("weight").value;
    var cost = document.getElementById("cost").value;
    var color = document.getElementById("colorSelection").value;
    var shape = document.getElementById("shapeSelection").value;
    
    return new Watermelon(id, weight, cost, shape, color);
};

Watermelon.prototype.renderOrderItem = function (containerNode, id) {
    var name = document.createElement("label");
    name.innerHTML = "<b>Watermelon</b>";

    var weight = document.createElement("label");
    weight.innerHTML = "Weight:" + this.weight;

    var cost = document.createElement("label");
    cost.innerHTML = "Cost:" + this.cost;

    var color = document.createElement("label");
    color.innerHTML = "Fresh Color:" + this.freshColor;

    var shape = document.createElement("label");
    shape.innerHTML = "Shape:" + this.shape;

    var detailLabel = document.createElement("vbox");
    detailLabel.appendChild(name);
    detailLabel.appendChild(weight);
    detailLabel.appendChild(cost);
    detailLabel.appendChild(color);
    detailLabel.appendChild(shape);
    detailLabel.className = "OrderSummaryDetail";

    var orderSummary = document.createElement("hbox");
    orderSummary.appendChild(detailLabel);
    orderSummary.className = "OrderSummary";
    orderSummary.id = "orderSummary" + id;

    containerNode.appendChild(orderSummary);
};