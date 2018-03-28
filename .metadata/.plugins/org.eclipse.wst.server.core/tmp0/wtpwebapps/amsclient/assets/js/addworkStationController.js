angular.module('workStation',[
	'appKitCommon',
	'appKit',
	'ngTable',
	'ngAnimate'
]).controller('workStationController', function($scope,$uibModal,$http,NgTableParams,$cookieStore) {
	'use strict';
	$scope.fullscreen = false;
	 $http.get(URL+"/WorkStation/list")
	 	.then(function(response) {
	  $scope.workstation=response.data;
	 	});
	$scope.open = function() {
		$uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'addWorkStation.html',
			controller:'addWorkStation'
		});
	};
	
})

.controller('addWorkStation',function($scope,$http,$cookieStore){
	$scope.logindata=$cookieStore.get('logindata');
 
	 $http.get(URL+"/assetstate/list")
	 	.then(function(response) {
	  $scope.assetstate=response.data;
	 	});
	 $http.get(URL+"/assetmodel/list")
	 	.then(function(response) {
	  $scope.assetmodel=response.data;
	 	});	 
	 
	 $scope.addWorkStationForm=function(){
		 var datafiles=$scope.addworkstation;
		 datafiles.orgBranchDetailsId=$scope.logindata.organizationBranchDetailsVO.id;
		 console.log(angular.toJson(datafiles));
		 $http({
				method:'POST',
				url: URL+'/WorkStation/createWorkStation',
				data:datafiles,
				headers:{'Content-Type':'application/json'}
				}) 
				.success(function(data,status,headers,config){
				if(data.code ==200){
					window.location.href= '#/workStation';
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
//});
