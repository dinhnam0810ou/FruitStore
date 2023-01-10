function OrderItemView() {
    this.initializeProperty();
    this.registerEvents();
}

OrderItemView.FRUIT_TYPE = ["Watermelon", "Kiwi", "Apple", "Grape"];

OrderItemView.orderItemLastId = 0;

OrderItemView.prototype.initializeProperty = function () {
    var thiz = this;

    this.fruitTypeSelector = document.getElementById("fruitTypeSelector");

    OrderItemView.FRUIT_TYPE.forEach(function (fruit) {
        var option = document.createElement("option");
        option.value = fruit;
        option.text = fruit;
        thiz.fruitTypeSelector.appendChild(option);
    });

    this.fruitPropertyNameLabel = document.getElementById("fruitPropertyNameLabel");
    this.fruitPropertyContainer = document.getElementById("fruitPropertyContainer");

    this.weight = document.getElementById("weight");
    this.cost = document.getElementById("cost");

};

OrderItemView.prototype.registerEvents = function () {
    var thiz = this;
    
    this.fruitTypeSelector.addEventListener("click", this.invalidateFruitPropertyView.bind(this));

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
    this.fruitTypeSelector.value = OrderItemView.FRUIT_TYPE[0];

    this.weight.value = 1;
    this.cost.value = 1;

    this.callback = callback;
    this.orderItem = orderItem;

    if (this.orderItem) {
        this.id = this.orderItem.id;
        this.fruitTypeSelector.value = this.orderItem.name;
        this.orderItem.renderProperties(this.fruitPropertyNameLabel, this.fruitPropertyContainer);
    } else {
        this.invalidateFruitPropertyView();
    }

    document.getElementById("orderItemBlock").style.visibility = "visible";
};

OrderItemView.prototype.saveFruit = function () {

    if (this.weight.value > 0 && this.cost.value > 0) {
        var fruit = new window[this.fruitTypeSelector.value]().getFruitValue(this.id);
        
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

    var fruit = new window[this.fruitTypeSelector.value]();
    fruit.renderProperties(this.fruitPropertyNameLabel, this.fruitPropertyContainer);
};

