angular.module('orgDetails',[
	'appKitCommon',
	'appKit',
	'ngTable',
	'ngAnimate'
]).controller('organizationDetailsController', function($scope,$uibModal,$http,NgTableParams,$cookieStore) {
	'use strict';
	$scope.fullscreen = false;
	 $http.get(URL+"/org/list")
	 	.then(function(response) {
	  $scope.org=response.data;
	 	});
	$scope.open = function() {
		$uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'addOrganizationDetails.html',
			controller:'addOrganizationDetails'
		});
	};
	
})
.controller('addOrganizationDetails',function($scope,$http,$cookieStore){
	 $scope.logindata = $cookieStore.get('logindata');
	  console.log($scope.logindata);
	 
	 $scope.addOrganizationDetailsForm=function(){
		 var datafiles=$scope.addOrganizationDetails;
		 console.log(datafiles);
		 alert("test");
		 $http({
				method:'POST',
				url: URL+'/org/createOrg',
				data:datafiles,
				headers:{'Content-Type':'application/json'}
				}) 
				.success(function(data,status,headers,config){
				if(data.code ==200){
					window.location.href='#/organizationDetails.html';

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
})

;
