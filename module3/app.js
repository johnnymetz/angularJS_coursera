(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com')
.directive('foundItems', FoundItemsDirective);


// Directive
function FoundItemsDirective() {
	var ddo = {
		scope: {
			items: '<',
			totalItems: '<',
			onRemove: '&'
		},
		templateUrl: 'foundItems.html'
	};
	return ddo;
}

// Controller
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var menu = this;

	menu.getMatchedMenuItems = function () {
		menu.found = [];

		if (menu.search_term) {
			var promise = MenuSearchService.getMatchedMenuItems(menu.search_term);

			promise.then(function (response) {
				menu.found = response;
				menu.total_found = response.length;
				console.log('Response length:', response.length);
			})
			.catch(function (error) {
				console.log(error.message)
			});
		}
	}
	menu.removeItem = function (index) {
		menu.found.splice(index, 1);
		menu.total_found = menu.found.length;
	}
}

// Service
MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
	var service = this;

	service.getMatchedMenuItems = function (searchTerm) {
		return $http({
			method: 'GET',
			url: (ApiBasePath + '/menu_items.json')
		}).then(function (response) {
			var foundItems = [];
			for (var i = 0; i < response.data.menu_items.length; i ++) {
				if (response.data.menu_items[i]['description'].toLowerCase().indexOf(searchTerm) !== -1) {
					foundItems.push(response.data.menu_items[i]);
				}
			}
			return foundItems;
		})
	}
}



})();