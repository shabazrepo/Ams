angular.module('user',[
	'appKitCommon',
	'appKit',
	'ngTable',
	'ngAnimate'
]).controller('userController', function($scope,$uibModal,$http,NgTableParams,$cookieStore) {
	'use strict';
	$scope.fullscreen = false;
	 $http.get(URL+"/user/list")
	 	.then(function(response) {
	  $scope.user=response.data;
	 	});
	$scope.open = function() {
		$uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'addUser.html',
			controller:'addUser'
		});
	};
	
})
.controller('addUser',function($scope,$http,$cookieStore){
	 $scope.logindata = $cookieStore.get('logindata');
	  console.log($scope.logindata);
	 $http.get(URL+"/user/list")
	 	.then(function(response) {
	  $scope.usertypes=response.data;
	 	});
	 $http.get(URL+"WorkStation/list")
	     .then(function(response){
	    	 $scope.workstation=response.data;
	     })
	 
	     $http.get(URL+"assetdetails/list")
	     .then(function(response){
	    	 $scope.workstation=response.data;
	     })
	 $scope.addUserForm=function(){
		 var datafiles=$scope.adduser;
		 datafiles.organizationId=$scope.logindata.organizationDetailsVO.id;
		 console.log(angular.toJson(datafiles));
		 alert("test");
		 $http({
				method:'POST',
				url: URL+'/user/createUser',
				data:datafiles,
				headers:{'Content-Type':'application/json'}
				}) 
				.success(function(data,status,headers,config){
				if(data.code ==200){
					window.location.href='#/user.html';

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
