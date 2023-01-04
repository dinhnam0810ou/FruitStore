function Order(orderCode, orderDate, supplier, note, totalItem, totalCost) {
    this.orderCode = orderCode;
    this.orderDate = orderDate;
    this.supplier = supplier;
    this.note = note;
    this.totalItem = totalItem;
    this.totalCost = totalCost;
}

Order.prototype.getTotalCost = function () {
    return this.totalCost;
}

Order.prototype.getNewOrder = function (totalItem, totalCost) {
    var orderCode = document.getElementById("orderCode").value;
    var orderDate = document.getElementById("orderDate").value;
    var supplier = document.getElementById("supplier").value;
    var note = document.getElementById("note").value;
    return new Order(orderCode, orderDate, supplier, note, totalItem, totalCost);
}

Order.prototype.renderInventoryOrder = function (containerNode) {
    var orderButton = document.createElement("hbox");
    var buttonEdit = document.createElement("button");
    buttonEdit.innerHTML = "Edit";
    buttonEdit.role = "info";
    buttonEdit.id = "buttonEdit";
    var buttonCancel = document.createElement("button");
    buttonCancel.innerHTML = "Cancel";
    buttonCancel.role = "random";
    buttonCancel.id = "buttonCancel";
    orderButton.appendChild(buttonEdit);
    orderButton.appendChild(buttonCancel);
    orderButton.className = "ButtonAction";
    var orderDate = document.createElement("label");
    orderDate.innerHTML = "Date:" + this.orderDate;
    var totalItem = document.createElement("label");
    totalItem.innerHTML = "Total Items:" + this.totalItem;
    var totalCost = document.createElement("label");
    totalCost.innerHTML = "Total Cost:" + this.totalCost;
    var orderCode = document.createElement("label");
    var code = document.createElement("b");
    code.innerHTML = this.orderCode;
    orderCode.appendChild(code);
    var detailLabel = document.createElement("hbox");
    detailLabel.appendChild(orderDate);
    detailLabel.appendChild(totalItem);
    detailLabel.appendChild(totalCost);
    detailLabel.className = "SummaryInformation";
    var orderSummary = document.createElement("hbox");
    orderSummary.appendChild(detailLabel);
    orderSummary.appendChild(orderButton);
    orderSummary.className = "OrderSummary";
    containerNode.appendChild(orderCode);
    containerNode.appendChild(orderSummary);
};