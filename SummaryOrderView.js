function SummaryOrderView() {
    var inventoryOrderView = new InventoryOrderView();
    inventoryOrderView.open(null, this.renderSummaryOrder.bind(this));
    this.inventoryOrderContainer = document.getElementById("inventoryOrderContainer");
    this.summaryInformationOrder = document.getElementById("summaryInformationOrder");
    document.getElementById("buttonNewOrder").addEventListener("click", function () {
        document.getElementById("newInventoryOrderBlock").style.visibility = "visible";
    });
}

SummaryOrderView.prototype.renderSummaryOrder = function (orderArray) {
    this.count = 0;
    this.cost = 0;
    var thiz = this;
    this.summaryInformationOrder.innerHTML = "";
    this.inventoryOrderContainer.innerHTML = "";
    orderArray.forEach(function (order) {
        order.renderInventoryOrder(this.inventoryOrderContainer);
        thiz.count ++;
        thiz.cost += order.getTotalCost();
    });
    var totalOrder = document.createElement("label");
    totalOrder.innerHTML = "Order Total:" + this.count;
    var totalCost = document.createElement("label");
    totalCost.innerHTML = "Order Cost:" + this.cost + "$";
    this.summaryInformationOrder.appendChild(totalOrder);
    this.summaryInformationOrder.appendChild(totalCost);
};


