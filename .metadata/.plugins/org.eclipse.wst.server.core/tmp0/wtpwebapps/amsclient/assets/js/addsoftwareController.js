angular.module('software',[
	'appKitCommon',
	'appKit',
	'ngTable',
	'ngAnimate'
]).controller('softwareController', function($scope,$uibModal,$http,NgTableParams,$cookieStore) {
	'use strict';
	$scope.fullscreen = false;
	 $http.get(URL+"/software/list")
	 	.then(function(response) {
	  $scope.software=response.data;
	 	});
	$scope.open = function() {
		$uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'addSoftware.html',
			controller:'addSoftwareController'
		});
	};
	
})
.controller('addSoftwareController',function($scope,$http,$cookieStore){
	
	 $http.get(URL+"/WorkStation/list")
	 	.then(function(response) {
	  $scope.workstation=response.data;
	 	});
	 $scope.addSoftwareForm=function(){
		 var datafiles=$scope.addsoftware;
		 console.log(angular.toJson(datafiles));
		 $http({
				method:'POST',
				url: URL+'/software/createSoftware',
				data:datafiles,
				headers:{'Content-Type':'application/json'}
				}) 
				.success(function(data,status,headers,config){
				if(data.code ==200){
					window.location.href= '#/software';
					}
				else{ 
						$scope.errorMsg = "Some Data is Missing";
					}
					})
					.error(function(data,status,headers,config){
						if(status == 400) {
					          $scope.messages = errorMsg;
					        } else {
					          alert('Server Down.');
					        }
					})

	 }
});

