function Kiwi(weight , cost, freshColor) {
    Fruit.call(this, "Kiwi", weight, cost);
    this.freshColor = freshColor;
}
Kiwi.COLOR_TYPES = ["Green", "Yellow"];
Kiwi.prototype = Object.create(Fruit.prototype);
Kiwi.prototype.constructor = Kiwi;

Kiwi.prototype.getFreshColor= function () {
    return this.freshColor;
};
Kiwi.prototype.setFreshColor = function (freshColor) {
    this.freshColor= freshColor;
};
Kiwi.prototype.renderProperties = function (labelPropertyNode, containerNode, data) {
    this.colorSelection = document.createElement("select");
    this.colorSelection.id = "colorSelection";
    var thiz = this;
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

Kiwi.prototype.getNewFruit = function () {
    var weight = document.getElementById("weight").value;
    var cost = document.getElementById("cost").value;
    var color = document.getElementById("colorSelection").value;
    return new Kiwi(weight, cost, color);
};

Kiwi.prototype.renderOrderItem = function (containerNode, index) {
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
    name.innerHTML = "Kiwi";
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
    orderSummary.appendChild(orderButton);
    orderSummary.className = "OrderSummary"
    containerNode.appendChild(orderSummary);
};