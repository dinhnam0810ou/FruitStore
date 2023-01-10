function Order(id, orderCode, orderDate, supplier, note, totalItem, totalCost, fruitArray) {
    this.id = id;
    this.orderCode = orderCode;
    this.orderDate = orderDate;
    this.supplier = supplier;
    this.note = note;
    this.totalItem = totalItem;
    this.totalCost = totalCost;
    this.fruitArray = fruitArray;
}

Order.prototype.getTotalCost = function () {
    return this.totalCost;
}

Order.prototype.getOrderValue = function (id, totalItem, totalCost, fruitArray) {

    var orderCode = document.getElementById("orderCode").value;
    var orderDate = document.getElementById("orderDate").value;
    var supplier = document.getElementById("supplierSelection").value;
    var note = document.getElementById("note").value;

    return new Order(id, orderCode, orderDate, supplier, note, totalItem, totalCost, fruitArray);

}

Order.prototype.renderOrderProperty = function () {

    document.getElementById("orderDate").value = this.orderDate;
    document.getElementById("orderCode").value = this.orderCode;
    document.getElementById("supplierSelection").value = this.supplier;
    
    document.getElementById("note").value = this.note;
}

Order.prototype.renderOrderSummaryList = function (containerNode, id) {
    var orderButton = document.createElement("hbox");
    orderButton.className = "ButtonAction";

    var buttonEdit = document.createElement("button");
    buttonEdit.innerHTML = "Edit";
    buttonEdit.role = "info";
    buttonEdit.className = "edit";
    buttonEdit.id = "buttonEdit" + id;
    buttonEdit.setAttribute("data-id", id);

    var buttonCancel = document.createElement("button");
    buttonCancel.innerHTML = "Delete";
    buttonCancel.role = "danger";
    buttonCancel.id = "buttonSummaryCancel";
    buttonCancel.className = "delete";
    buttonCancel.setAttribute("data-id", id);

    orderButton.appendChild(buttonEdit);
    orderButton.appendChild(buttonCancel);

    var orderDate = document.createElement("label");
    orderDate.innerHTML = "Date:" + this.orderDate;

    var totalItem = document.createElement("label");
    totalItem.innerHTML = "Total Items:" + this.totalItem;

    var totalCost = document.createElement("label");
    totalCost.innerHTML = "Total Cost:" + this.totalCost;

    var orderCode = document.createElement("label");
    orderCode.innerHTML = `<b>${this.orderCode}</b>`;

    var detailLabel = document.createElement("hbox");
    detailLabel.className = "SummaryInformation";
    detailLabel.appendChild(orderDate);
    detailLabel.appendChild(totalItem);
    detailLabel.appendChild(totalCost);

    var orderSummary = document.createElement("hbox");
    orderSummary.className = "OrderSummary";
    orderSummary.appendChild(detailLabel);
    orderSummary.appendChild(orderButton);
    
    containerNode.appendChild(orderCode);
    containerNode.appendChild(orderSummary);
};