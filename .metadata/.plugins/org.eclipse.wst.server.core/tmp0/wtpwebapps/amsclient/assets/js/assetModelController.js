angular.module('assetModel',[
	'appKitCommon',
	'appKit',
	'ngTable',
	'ngAnimate'
]).controller('assetModelController', function($scope,$uibModal,$http,NgTableParams,$cookieStore) {
	'use strict';
	$scope.fullscreen = false;
	 $http.get(URL+"/assetmodel/list")
	 	.then(function(response) {
	  $scope.assetmodel=response.data;
	 	});
	$scope.open = function() {
		$uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'addAssetModel.html',
			controller:'addAssetModel'
		});
	};
	
})
.controller('addAssetModel',function($scope,$http,$cookieStore){
	 $scope.logindata = $cookieStore.get('logindata');
	  console.log($scope.logindata);
	 $http.get(URL+"/assettype/list")
	 	.then(function(response) {
	  $scope.assettypes=response.data;
	 	});
	 
	 $scope.addAssetForm=function(){
		 var datafiles=$scope.addassetmodel;
		 datafiles.organizationId=$scope.logindata.organizationDetailsVO.id;
		 console.log(angular.toJson(datafiles));
		 alert("test");
		 $http({
				method:'POST',
				url: URL+'/assetmodel/createAssetModel',
				data:datafiles,
				headers:{'Content-Type':'application/json'}
				}) 
				.success(function(data,status,headers,config){
				if(data.code ==200){
					window.location.href='#/assetModel.html';

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
