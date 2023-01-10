function InventoryOrderView() {
    this.initializeProperty();
    this.registerEvents();
}

InventoryOrderView.SUPPLIERS = ["Volvo","FFruit"];

InventoryOrderView.summaryOrderLastId = 0;

InventoryOrderView.prototype.initializeProperty = function () {
    var thiz = this;
    
    document.getElementById("orderDate").valueAsDate = new Date();

    this.supplierSeletion = document.getElementById("supplierSelection");

    InventoryOrderView.SUPPLIERS.forEach(function (supplier) {
        var option = document.createElement("option");
        option.value = supplier;
        option.text = supplier;
        thiz.supplierSeletion.appendChild(option);
    });

    this.orderItemView = new OrderItemView();
    
    this.orderSummaryDetail = document.getElementById("orderSummaryDetail");
    this.detailVBox = document.getElementById("detailVBox");
    this.summaryInformation = document.getElementById("summaryInformation");
};

InventoryOrderView.prototype.registerEvents = function () {
    var thiz = this;
    this.detailVBox.addEventListener("click", this.handleAction.bind(this));

    document.getElementById("buttonSaveOrder").addEventListener("click", function () {
        thiz.saveOrder();
    });

    document.getElementById("buttonAdd").addEventListener("click", this.addOrderItem.bind(this));

    document.getElementById("buttonInventoryCancel").addEventListener("click", function () {
        document.getElementById("newInventoryOrderBlock").style.visibility = "hidden";
    });
};

InventoryOrderView.prototype.open = function (orderSummaryItem, callback) {
    document.getElementById("orderCode").value = Math.random().toString(16).slice(10);
    document.getElementById("note").value = "";

    this.fruitArray = [];
    this.detailVBox.innerHTML = "";
    this.summaryInformation.innerHTML = "";
    this.orderSummaryItem = orderSummaryItem;
    this.callback = callback;

    if (this.orderSummaryItem) {
        this.id = this.orderSummaryItem.id;
        this.fruitArray = this.orderSummaryItem.fruitArray;
        this.orderSummaryItem.renderOrderProperty();
        this.renderOrderList();
    }

    document.getElementById("newInventoryOrderBlock").style.visibility = "visible";
};

InventoryOrderView.prototype.saveOrder = function () {

    if (this.fruitArray.length > 0 ) {
        var order = new Order().getOrderValue(this.id, this.counter, this.cost, this.fruitArray);
    
        if (!this.orderSummaryItem) {
            InventoryOrderView.summaryOrderLastId ++;
            order.id = InventoryOrderView.summaryOrderLastId;
        }
        this.callback(order);

        document.getElementById("newInventoryOrderBlock").style.visibility = "hidden";
    }
};

InventoryOrderView.prototype.handleAction = function (e) {
    var deleteButton = e.target.closest(".delete");
    var editButton = e.target.closest(".edit");
    if (deleteButton) {

        var message = confirm("Do you want to delete this item??");
        if (message == false) return;

        var id = deleteButton.dataset.id;
        for (var i = 0; i < this.fruitArray.length; i++) {
            var orderItem = this.fruitArray[i];
            if (orderItem.id == id) {
                this.deleteOrderItem(i);
                this.renderOrderList();
                break;
            }
        }
        return;
    }

    if (editButton) {
        var id = editButton.dataset.id;

        for (var i = 0; i < this.fruitArray.length; i++) {
            var orderItem = this.fruitArray[i];
            if (orderItem.id == id) {
                this.editOrderItem(orderItem);
                break;
            }
        }
    }
};

InventoryOrderView.prototype.editOrderItem = function (orderItem) {
    var thiz = this;
    this.orderItemView.open(orderItem, function (savedItem) {
     
        for (var i = 0; i < thiz.fruitArray.length; i++) {

            var item = thiz.fruitArray[i];

            if (item.id == orderItem.id) {
                thiz.fruitArray[i] = savedItem;
                break;
            }
        }

        thiz.renderOrderList();
    });
};

InventoryOrderView.prototype.addOrderItem = function () {
    var thiz = this;
    this.orderItemView.open(null, function (newItem) {
        thiz.fruitArray.push(newItem);
        thiz.renderOrderList();
    });
};

InventoryOrderView.prototype.deleteOrderItem = function (index) {
    this.fruitArray.splice(index, 1);
    this.renderOrderList();
};

InventoryOrderView.prototype.renderOrderList = function () {
    var thiz = this;
    this.detailVBox.innerHTML = "";
    this.summaryInformation.innerHTML = "";
    this.counter = 0;
    this.cost = 0;
    
    if (this.fruitArray.length > 0) {
        this.fruitArray.forEach(function (fruit) {
            
            fruit.renderOrderItem(thiz.detailVBox, fruit.id);
            thiz.counter ++;
            thiz.cost += fruit.totalCost();
    
            var buttonEdit = document.createElement("button");
            buttonEdit.innerHTML = "Edit";
            buttonEdit.role = "info";
            buttonEdit.id = "buttonEdit" + fruit.id;
            buttonEdit.className = "edit";
            buttonEdit.setAttribute("data-id", fruit.id);
    
    
            var buttonDelete = document.createElement("button");
            buttonDelete.innerHTML = "Delete";
            buttonDelete.role = "danger";
            buttonDelete.id = "buttonDelete" + fruit.id;
            buttonDelete.className = "delete";
            buttonDelete.setAttribute("data-id", fruit.id);
    
            var orderButton = document.createElement("hbox");
            orderButton.className = "ButtonAction";
            orderButton.appendChild(buttonEdit);
            orderButton.appendChild(buttonDelete);
            
    
            var orderSummary = document.getElementById("orderSummary" + fruit.id);
            orderSummary.appendChild(orderButton);
    
            thiz.detailVBox.appendChild(orderSummary);
        });

        var totalItem = document.createElement("label");
        totalItem.id = "totalItem";
        totalItem.innerHTML = "Total Item: " + `<b>${this.counter}</b>` + " items";
    
        var totalCost = document.createElement("label");
        totalCost.id = "totalCost";
        totalCost.innerHTML = "Total Cost:" + `<b>${this.cost}</b>` + "$";
    
        this.summaryInformation.appendChild(totalItem);
        this.summaryInformation.appendChild(totalCost);
    }
};