(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', ControllerFunction);

ControllerFunction.$inject = ['$scope'];

function ControllerFunction ($scope) {
	$scope.inputList = "";
	$scope.message = "";
	$scope.messageColor = 'white';
	$scope.output = function () {
		var totalItems = $scope.inputList.split(',');
		function removeEmptyStrings(value) {
			return value.trim() != '';
		}
		totalItems = totalItems.filter(removeEmptyStrings);
		if (totalItems.length === 0) {
			$scope.message = 'Please enter data first';
			$scope.messageColor = 'red';
		} else if (totalItems.length <= 3) {
			$scope.message = 'Enjoy!';
			$scope.messageColor = 'green';
		} else {
			$scope.message = 'Too much!';
			$scope.messageColor = 'green';
		}
	}
}

})();
