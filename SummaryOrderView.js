function SummaryOrderView() {
    this.initializeProperty();
    this.handleEvent();
}

SummaryOrderView.prototype.initializeProperty = function () {
    this.inventoryOrderView = new InventoryOrderView();
    this.inventoryOrderContainer = document.getElementById("inventoryOrderContainer");
    this.summaryInformationOrder = document.getElementById("summaryInformationOrder");
    this.orderArray = [];
};

SummaryOrderView.prototype.handleEvent = function () {
    document.getElementById("inventoryOrderContainer").addEventListener("click", this.handleAction.bind(this));

    document.getElementById("buttonInventoryOrder").addEventListener("click", this.addSummaryOrder.bind(this));
    
};

SummaryOrderView.prototype.handleAction = function (e) {
    var editButton = e.target.closest(".edit");
    var deleteButton = e.target.closest(".delete");

    if (editButton) {
        var id = editButton.dataset.id;
        for (var i = 0; i < this.orderArray.length; i++) {
            var summaryOrder = this.orderArray[i];
            if (summaryOrder.id == id) {
                this.editSummaryOrder(summaryOrder);
                break;
            }
        }
        return;
    }

    if (deleteButton) {

        var message = confirm("Are you sure about that??");
        if (message == false) return;

        var id = deleteButton.dataset.id;
        
        for (var i = 0; i < this.orderArray.length; i++) {
            var summaryOrder = this.orderArray[i];
            if (summaryOrder.id == id) {
                this.deleteSummaryOrder(i);
                break;
            }
        }
    }
};

SummaryOrderView.prototype.deleteSummaryOrder = function (index) {
    this.orderArray.splice(index, 1);
    this.renderSummaryOrder();
};

SummaryOrderView.prototype.addSummaryOrder = function () {
    var thiz = this;

    this.inventoryOrderView.open(null, function (newItem) {
        thiz.orderArray.push(newItem);
        thiz.renderSummaryOrder();
    });

};

SummaryOrderView.prototype.editSummaryOrder = function (summaryOrder) {
    var thiz = this;

    this.inventoryOrderView.open(summaryOrder, function (savedSummaryItem) {
        summaryOrder.orderCode = savedSummaryItem.orderCode;
        summaryOrder.orderDate = savedSummaryItem.orderDate;
        summaryOrder.supplier = savedSummaryItem.supplier;
        summaryOrder.note = savedSummaryItem.note;
        summaryOrder.totalItem = savedSummaryItem.totalItem;
        summaryOrder.totalCost = savedSummaryItem.totalCost;
        summaryOrder.fruitArray = savedSummaryItem.fruitArray;
        thiz.renderSummaryOrder();
    });

};

SummaryOrderView.prototype.renderSummaryOrder = function () {
    this.count = 0;
    this.cost = 0;
    var thiz = this;
    this.summaryInformationOrder.innerHTML = "";
    this.inventoryOrderContainer.innerHTML = "";

    if (this.orderArray.length > 0) {
        this.orderArray.forEach(function (order) {
            order.renderOrderSummaryList(this.inventoryOrderContainer, order.id);
            thiz.count ++;
            thiz.cost += order.getTotalCost();
        });
    
        var totalOrder = document.createElement("label");
        totalOrder.innerHTML = "Order Total:" + this.count;
    
        var totalCost = document.createElement("label");
        totalCost.innerHTML = "Order Cost:" + this.cost + "$";
        
        this.summaryInformationOrder.appendChild(totalOrder);
        this.summaryInformationOrder.appendChild(totalCost);
    }
    
};


