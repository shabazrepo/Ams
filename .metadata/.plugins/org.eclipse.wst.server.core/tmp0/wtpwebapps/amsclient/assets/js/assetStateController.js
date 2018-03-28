angular.module('assetState',[
	'appKitCommon',
	'appKit',
	'ngTable',
	'ngAnimate'
]).controller('assetStateController', function($scope,$uibModal,$http,NgTableParams,$cookieStore) {
	'use strict';
	$scope.fullscreen = false;
	 $http.get(URL+"/assetstate/list")
	 	.then(function(response) {
	  $scope.assetstate=response.data;
	 	});
	$scope.open = function() {
		$uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'addAssetState.html',
			controller:'addAssetState'
		});
	};
	
})
.controller('addAssetState',function($scope,$http,$cookieStore){
	 $scope.logindata = $cookieStore.get('logindata');
	  console.log($scope.logindata);
	 $scope.addAssetStateForm=function(){
		 var datafiles=$scope.addassetstate;
		 datafiles.organizationId=$scope.logindata.organizationDetailsVO.id;
		 console.log(angular.toJson(datafiles));
		 alert("test");
		 $http({
				method:'POST',
				url: URL+'/assetstate/createAssetState',
				data:datafiles,
				headers:{'Content-Type':'application/json'}
				}) 
				.success(function(data,status,headers,config){
				if(data.code ==200){
					window.location.href='#/assetState.html';

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
