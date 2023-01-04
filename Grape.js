function Grape(weight , cost, color) {
    Fruit.call(this, "Grape", weight, cost);
    this.color = color;
}

Grape.COLOR_TYPES = ["Green", "Red", "Purple"];
Grape.prototype = Object.create(Fruit.prototype);
Grape.prototype.constructor = Grape;

Grape.prototype.getColor= function () {
    return this.color;
};
Grape.prototype.setColor = function (color) {
    this.color = color;
};
Grape.prototype.renderProperties = function (labelPropertyNode, containerNode, data) {
    this.colorSelection = document.createElement("select");
    this.colorSelection.id = "colorSelection"
    var thiz = this;
    Grape.COLOR_TYPES.forEach(function (colorType) {
        var option = document.createElement("option");
        option.value = colorType;
        option.text = colorType;
        thiz.colorSelection.appendChild(option);
    });
    containerNode.appendChild(this.colorSelection);
    this.colorLabel = document.createElement("label");
    this.colorLabel.innerHTML = "Color:";
    labelPropertyNode.appendChild(this.colorLabel);
};

Grape.prototype.getNewFruit = function () {
    var weight = document.getElementById("weight").value;
    var cost = document.getElementById("cost").value;
    var color = document.getElementById("colorSelection").value;
    return new Grape(weight, cost, color);
};

Grape.prototype.renderOrderItem = function (containerNode ,index) {
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
    name.innerHTML = "Grape";
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
    orderSummary.appendChild(orderButton);
    orderSummary.className = "OrderSummary"
    containerNode.appendChild(orderSummary);
};