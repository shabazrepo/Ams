angular.module('vendor',[
	'appKitCommon',
	'appKit',
	'ngTable',
	'ngAnimate'
]).controller('vendorController', function($scope,$uibModal,$http,NgTableParams,$cookieStore) {
	'use strict';
	$scope.fullscreen = false;
	 $http.get(URL+"/vendor/list")
	 	.then(function(response) {
	  $scope.vendors=response.data;
	  console.log($scope.vendors);
	 	});
	$scope.open = function() {
		$uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'addVendor.html',
			controller:'addVendor'
		});
	};
	
})
.controller('addVendor',function($scope,$http,$cookieStore){
	 $scope.logindata = $cookieStore.get('logindata');
 
	 $scope.addVendorForm=function(){
		 var datafiles=$scope.addvendor;
		 datafiles.addressVO.organizationDetailsVO=$scope.logindata.organizationDetailsVO;
		 datafiles.addressVO.organizationBranchDetailsVO=$scope.logindata.organizationBranchDetailsVO;
		console.log(datafiles);
		 $http({
				method:'POST',
				url: URL+'/vendor/createVendor',
				data:datafiles,
				headers:{'Content-Type':'application/json'}
				}) 
				.success(function(data,status,headers,config){
				if(data.code ==200){
					window.location.href='#/vendor';

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
