function OrderItemView() {
    document.getElementById("fruitType").addEventListener("click", this.invalidateFruitPropertyView.bind(this));
    document.getElementById("buttonSaveItem").addEventListener("click", this.saveFruit.bind(this));
    this.fruitPropertyNameLabel = document.getElementById("fruitPropertyNameLabel");
    this.fruitPropertyContainer = document.getElementById("fruitPropertyContainer");
    this.invalidateFruitPropertyView();
    this.fruitArray = [];
}

OrderItemView.prototype.open = function (orderItem, callback) {
    // set data
    this.callback = callback;
    this.orderItem = orderItem;
    this.invalidateFruitPropertyView();
};

OrderItemView.prototype.invalidateFruitPropertyView = function () {
    var fruitType = document.getElementById("fruitType").value;
    this.fruitPropertyContainer.innerHTML = "";
    this.fruitPropertyNameLabel.innerHTML = "";
    var fruit = new window[fruitType]();
    fruit.renderProperties(this.fruitPropertyNameLabel, this.fruitPropertyContainer);
};

OrderItemView.prototype.saveFruit = function () {
    var fruitType = document.getElementById("fruitType").value;
    var fruit = new window[fruitType]().getNewFruit();
    this.fruitArray.push(fruit);
    this.callback(this.fruitArray);
  
};
