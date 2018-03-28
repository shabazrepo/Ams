angular.module('assetDetails',[
	'appKitCommon',
	'appKit',
	'ngTable',
	'ngAnimate'
]).controller('assetDetailsController', function($scope,$uibModal,$http,NgTableParams,$cookieStore) {
	'use strict';
	$scope.fullscreen = false;
	 $http.get(URL+"/assetdetails/list")
	 	.then(function(response) {
	  $scope.asset=response.data;
	  console.log($scope.asset);
	 	});
	$scope.open = function() {
		$uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'addAssetDetails.html',
			controller:'addAssetDetails'
		});
	};
	
})
.controller('addAssetDetails',function($scope,$http,$cookieStore){
	 $scope.logindata = $cookieStore.get('logindata');
	  console.log($scope.logindata);
	  $http.get(URL+"/assetstate/list")
	 	.then(function(response) {
	  $scope.assetstate=response.data;
	 	}); 
	  $http.get(URL+"/assetmodel/list")
	 	.then(function(response) {
	  $scope.assetmodel=response.data;
	 	}); 
	  
	 $scope.addAssetDetailsForm=function(){
		 var datafiles=$scope.addassetdetails;
		 datafiles.orgBranchId=$scope.logindata.organizationBranchDetailsVO.id;
		 console.log(angular.toJson(datafiles));
		 alert("test");
		 $http({
				method:'POST',
				url: URL+'/assetdetails/createAssetDetails',
				data:datafiles,
				headers:{'Content-Type':'application/json'}
				}) 
				.success(function(data,status,headers,config){
				if(data.code ==200){
					window.location.href='#/assetDetails.html';

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
