'use strict';

angular.module('chattyApp')
  .controller('MessageCtrl', function ($scope, MessageService) {
    $scope.messages = [];
    $scope.getMessages = function() {
    	MessageService.getMessages().then(function(response) {
    	console.log(response.data)
    	$scope.messages = response.data;
    });
    }
    	$scope.getMessages();
  
    $scope.addMessage = function() {
		if($scope.username === 'Mark') {
			$scope.avatar = "http://fun-game-community.de/include/images/avatars/male.png";
		}
		else if($scope.username !== 'Mark') {
			$scope.avatar = "http://icons.iconarchive.com/icons/iconka/buddy/128/blank-male-icon.png";
		}

		MessageService.newMessage($scope.inputMessage, $scope.username, $scope.avatar).then(function() {
			$scope.getMessages();
		});
	}
});
