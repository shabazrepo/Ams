angular.module('assetType',[])

.controller('assetTypeController', function($scope,$uibModal,$http,NgTableParams,$cookieStore) {
	'use strict';
	$scope.fullscreen = false;
	 $http.get(URL+"/assettype/list")
	 	.then(function(response) {
	  $scope.asset=response.data;
	 	});
	$scope.open = function() {
		$uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'addAssetType.html',
			controller:'addAssetType'
		});
	};
	
})
.controller('addAssetType',function($scope,$http,$cookieStore){
	$scope.logindata=$cookieStore.get('logindata');
 
	 $http.get(URL+"/category/list")
	 	.then(function(response) {
	  $scope.categories=response.data;
	 	});
	 $scope.addAssetForm=function(){
		 var datafiles=$scope.addassettype;
		 datafiles.organizationId=$scope.logindata.organizationDetailsVO.id;
		 console.log(angular.toJson(datafiles));
		 $http({
				method:'POST',
				url: URL+'/assettype/createAssetType',
				data:datafiles,
				headers:{'Content-Type':'application/json'}
				}) 
				.success(function(data,status,headers,config){
				if(data.code ==200){
					window.location.href= CURL+'/assetTypes.html';
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
