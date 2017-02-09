(function () {
'use strict';

// Initialize
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.provider('ShoppingListService', ShoppingListServiceProvider);

// ToBuyController
ToBuyController.$inject = ['ShoppingListService'];
function ToBuyController(ShoppingListService) {
	var list1 = this;
	list1.items = ShoppingListService.getItems('ToBuy');
	list1.buyItem = function(itemIndex) {
		ShoppingListService.buyItem(itemIndex);
	}
	list1.itemName = "Cookies";
	list1.itemQuantity = 10;
	list1.addItem = function() {
		ShoppingListService.addItem(list1.itemName, list1.itemQuantity);
	}
}

// AlreadyBoughtController
AlreadyBoughtController.$inject = ['ShoppingListService'];
function AlreadyBoughtController(ShoppingListService) {
	var list2 = this;
	list2.items = ShoppingListService.getItems('AlreadyBought');
}

// Custom Service
function ShoppingListService() {
	var service = this;
	var ToBuyItems = [
		{ name: "Zucchini", quantity: 4 },
		{ name: "Hummus", quantity: 1 },
		{ name: "Milk", quantity: 1 },
		{ name: "Cliff Bars", quantity: 5 },
		{ name: "Shrimp Fried Rice", quantity: 3 },
		{ name: "Milanos", quantity: 10 },
		{ name: "Eggs", quantity: 12 }
	];
	var AlreadyBoughtItems = [];
	service.addItem = function(itemName, itemQuantity) {
		var newItem = {
			name: itemName,
			quantity: itemQuantity
		};
		ToBuyItems.push(newItem);
	};
	service.buyItem = function(itemIndex) {
		AlreadyBoughtItems.push(ToBuyItems.splice(itemIndex, 1)[0]);
	};
	service.getItems = function(listName) {
		if (listName == 'ToBuy'){
			return ToBuyItems;
		} else if (listName == 'AlreadyBought') {
			return AlreadyBoughtItems;
		}
	};
}

// Provider
function ShoppingListServiceProvider() {
	var provider = this;
	provider.$get = function() {
		var shoppingList = new ShoppingListService();
		return shoppingList;
	}
}



})();