'use strict';

angular.module('chattyApp')
  .service('MessageService', function ($http) {

	this.getMessages = function(response) {
		return $http({
			method: 'GET',
			url: 'http://localhost:8000'
		})
    }
	this.newMessage = function(message, username, avatar) {
		 return $http({
			method: 'POST',
			url: 'http://localhost:8000',
			data: {
				message: message, 
				username: username,
				avatar: avatar
			}
		})
    }

  });
