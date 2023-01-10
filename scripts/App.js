function App() {
  
}

App.prototype.run = function () {
    document.getElementById("newInventoryOrderBlock").style.visibility = "hidden";
    document.getElementById("orderItemBlock").style.visibility = "hidden";
    this.summaryOrderView = new SummaryOrderView();
}