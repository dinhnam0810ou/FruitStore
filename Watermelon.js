function Watermelon(weight , cost, shape, freshColor) {
    Fruit.call(this, "Watermelon", weight, cost);
    this.shape = shape;
    this.freshColor = freshColor;
}
Watermelon.COLOR_TYPES = ["Red", "Yellow"];
Watermelon.SHAPE_TYPES = ["Spherical","Oval"];
Watermelon.prototype = Object.create(Fruit.prototype);
Watermelon.prototype.constructor = Watermelon;

Watermelon.prototype.getShape = function () {
    return this.shape;
};
Watermelon.prototype.setShape = function (shape) {
    this.shape = shape;
};

Watermelon.prototype.getFreshColor = function () {
    return this.freshColor;
}
Watermelon.prototype.setFreshColor = function (freshColor) {
    this.freshColor = freshColor;
};

Watermelon.prototype.renderProperties = function (labelPropertyNode, containerNode, data) {
    this.colorSelection = document.createElement("select");
    this.colorSelection.id = "colorSelection";
    this.shapeSelection = document.createElement("select");
    this.shapeSelection.id = "shapeSelection";
    var thiz = this;
    Watermelon.SHAPE_TYPES.forEach(function (shapeType) {
        var option = document.createElement("option");
        option.value = shapeType;
        option.text = shapeType;
        thiz.shapeSelection.appendChild(option);
    });
    containerNode.appendChild(this.shapeSelection);
    Watermelon.COLOR_TYPES.forEach(function (colorType) {
        var option = document.createElement("option");
        option.value = colorType;
        option.text = colorType;
        thiz.colorSelection.appendChild(option);
    });
    containerNode.appendChild(this.colorSelection);
    this.colorLabel = document.createElement("label");
    this.colorLabel.innerHTML = "Fresh Color:";
    this.shapeLabel = document.createElement("label");
    this.shapeLabel.innerHTML = "Shape:";
    labelPropertyNode.appendChild(this.shapeLabel);
    labelPropertyNode.appendChild(this.colorLabel);
};

Watermelon.prototype.getNewFruit = function () {
    var weight = document.getElementById("weight").value;
    var cost = document.getElementById("cost").value;
    var color = document.getElementById("colorSelection").value;
    var shape = document.getElementById("shapeSelection").value;
    return new Watermelon(weight, cost, shape, color);
};

Watermelon.prototype.renderOrderItem = function (containerNode, index) {
    var orderButton = document.createElement("hbox");
    orderButton.className = "ButtonAction";
    var buttonEdit = document.createElement("button");
    buttonEdit.innerHTML = "Edit";
    buttonEdit.role = "info";
    buttonEdit.id = "buttonEdit";
    var buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = "Delete";
    buttonDelete.role = "danger";
    buttonDelete.id = "buttonDelete" + index;
    orderButton.appendChild(buttonEdit);
    orderButton.appendChild(buttonDelete);
    var name = document.createElement("label");
    name.innerHTML = "Watermelon";
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
    orderSummary.appendChild(orderButton);
    orderSummary.className = "OrderSummary"
    containerNode.appendChild(orderSummary);
};