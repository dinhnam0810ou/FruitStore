function OrderItemView() {
    this.initializeProperty();
    this.handleEvent();
}

OrderItemView.FRUIT_TYPE = ["Watermelon", "Kiwi", "Apple", "Grape"];

OrderItemView.orderItemLastId = 0;

OrderItemView.prototype.initializeProperty = function () {
    var thiz = this;

    this.fruitType = document.getElementById("fruitType");

    OrderItemView.FRUIT_TYPE.forEach(function (fruitType) {
        var option = document.createElement("option");
        option.value = fruitType;
        option.text = fruitType;
        thiz.fruitType.appendChild(option);
    });

    this.fruitPropertyNameLabel = document.getElementById("fruitPropertyNameLabel");
    this.fruitPropertyContainer = document.getElementById("fruitPropertyContainer");
    this.invalidateFruitPropertyView();
};

OrderItemView.prototype.handleEvent = function () {
    var thiz = this;
    
    this.fruitType.addEventListener("click", this.invalidateFruitPropertyView.bind(this));

    document.getElementById("buttonSaveItem").addEventListener("click", function () {
        thiz.saveFruit();
    });

    document.getElementById("buttonItemCancel").addEventListener("click", function () {
        document.getElementById("orderItemBlock").style.visibility = "hidden";
    });
};

OrderItemView.prototype.open = function (orderItem, callback) {
    this.fruitPropertyContainer.innerHTML = "";
    this.fruitPropertyNameLabel.innerHTML = "";

    this.callback = callback;
    this.orderItem = orderItem;
    if (this.orderItem) this.id = this.orderItem.id;

    this.invalidateFruitPropertyView();
    document.getElementById("orderItemBlock").style.visibility = "visible";
};

OrderItemView.prototype.saveFruit = function () {
    var weight = document.getElementById("weight").value;
    var cost = document.getElementById("cost").value;

    if (weight > 0 && cost > 0) {
        var fruit = new window[this.fruitType.value]().getFruitValue(this.id);

        if (!this.orderItem) {
            OrderItemView.orderItemLastId ++;
            fruit.id = OrderItemView.orderItemLastId;
        }
    
        this.callback(fruit);
    
        document.getElementById("orderItemBlock").style.visibility = "hidden";
    } else {
        alert("Invalid weight or cost");
    }
    
};

OrderItemView.prototype.invalidateFruitPropertyView = function () {
    this.fruitPropertyContainer.innerHTML = "";
    this.fruitPropertyNameLabel.innerHTML = "";
    
    if (this.orderItem) {
        this.fruitType.value = this.orderItem.name;
        this.orderItem.renderProperties(this.fruitPropertyNameLabel, this.fruitPropertyContainer);
        document.getElementById("orderItemBlock").style.visibility = "visible";
    } else {
        var fruit = new window[this.fruitType.value]();
        fruit.renderProperties(this.fruitPropertyNameLabel, this.fruitPropertyContainer);
    }
};

