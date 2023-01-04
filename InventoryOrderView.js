function InventoryOrderView() {
    document.getElementById("orderDate").valueAsDate = new Date();
    var orderItemView = new OrderItemView();
    orderItemView.open(null, this.renderOrderList.bind(this));
    this.orderSummaryDetail = document.getElementById("orderSummaryDetail");
    this.detailVBox = document.getElementById("detailVBox");
    this.summaryInformation = document.getElementById("summaryInformation");
    this.orderArray = [];
    document.getElementById("buttonSaveOrder").addEventListener("click", this.saveOrder.bind(this));
    document.getElementById("buttonAdd").addEventListener("click", function () {
    document.getElementById("orderItemBlock").style.visibility = "visible";
    });
}

InventoryOrderView.prototype.open = function (orderItem, callback) {
    this.orderItem = orderItem;
    this.callback = callback;
}

InventoryOrderView.prototype.saveOrder = function () {
    var order = new Order().getNewOrder(this.counter, this.cost);
    this.orderArray.push(order);
    this.callback(this.orderArray);
}

InventoryOrderView.prototype.deleteOrderItem = function (fruitArray, index) {
    fruitArray.splice(index, 1);
    this.renderOrderList(fruitArray);
};

InventoryOrderView.prototype.renderOrderList = function (fruitArray) {
    this.detailVBox.innerHTML = "";
    this.summaryInformation.innerHTML = "";
    this.counter = 0;
    this.cost = 0;
    var thiz = this;
    fruitArray.forEach(function (fruit, index) {
        fruit.renderOrderItem(this.detailVBox, index);
        thiz.counter ++;
        thiz.cost += fruit.totalCost();
        document.getElementById("buttonDelete" + index).addEventListener("click", function () {
            thiz.deleteOrderItem(fruitArray, index);
        });
    });
    var totalItem = document.createElement("label");
    totalItem.id = "totalItem";
    totalItem.innerHTML = "Total Item: " + this.counter + " items";
    var totalCost = document.createElement("label");
    totalCost.id = "totalCost";
    totalCost.innerHTML = "Total Cost:" + this.cost + "$";
    this.summaryInformation.appendChild(totalItem);
    this.summaryInformation.appendChild(totalCost);

    
};