function Apple(weight , cost, size) {
    Fruit.call(this, "Apple", weight, cost);
    this.size = size;
}
Apple.SIZE_TYPES = ["Small", "Medium", "Large"];
Apple.prototype = Object.create(Fruit.prototype);
Apple.prototype.constructor = Apple;

Apple.prototype.getSize = function () {
    return this.size;
};

Apple.prototype.setSize = function (size) {
    this.size = size;
};

Apple.prototype.renderProperties = function (labelPropertyNode, containerNode, data) {
    this.sizeSelection = document.createElement("select");
    this.sizeSelection.id = "sizeSelection";
    var thiz = this;
    Apple.SIZE_TYPES.forEach(function (sizeType) {
        var option = document.createElement("option");
        option.value = sizeType;
        option.text = sizeType;
        thiz.sizeSelection.appendChild(option);
    });
    containerNode.appendChild(this.sizeSelection);
    this.sizeLabel = document.createElement("label");
    this.sizeLabel.innerHTML = "Size:";
    labelPropertyNode.appendChild(this.sizeLabel);
};

Apple.prototype.getNewFruit = function () {
    var weight = document.getElementById("weight").value;
    var cost = document.getElementById("cost").value;
    var size = document.getElementById("sizeSelection").value;
    return new Apple(weight, cost, size);
};

Apple.prototype.renderOrderItem = function (containerNode, index) {
    var orderButton = document.createElement("hbox");

    var buttonEdit = document.createElement("button");
    buttonEdit.innerHTML = "Edit";
    buttonEdit.role = "info";
    buttonEdit.id = "buttonEdit";

    var buttonDelete = document.createElement("button");
    buttonDelete.innerHTML = "Delete";
    buttonDelete.role = "danger";
    buttonDelete.id = "buttonDelete" + index;
    buttonDelete.className = "delete";
    buttonDelete.setAttribute("data-index",index);

    orderButton.appendChild(buttonEdit);
    orderButton.appendChild(buttonDelete);
    orderButton.className = "ButtonAction";

    var name = document.createElement("label");
    name.innerHTML = "Apple";

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
    orderSummary.appendChild(orderButton);
    orderSummary.className = "OrderSummary"
    
    containerNode.appendChild(orderSummary);
};