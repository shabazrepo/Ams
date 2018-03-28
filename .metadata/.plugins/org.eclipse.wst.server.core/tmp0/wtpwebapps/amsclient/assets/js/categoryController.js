angular.module('category',[
	'appKitCommon',
	'appKit',
	'ngTable',
	'ngAnimate'
]).controller('categoryController', function($scope,$uibModal,$http,NgTableParams,$cookieStore) {
	'use strict';
	$scope.fullscreen = false;
	 $http.get(URL+"/category/list")
	 	.then(function(response) {
	  $scope.category=response.data;
	 	});
	$scope.open = function() {
		$uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'addCategory.html',
			controller:'addCategory'
		});
	};
	
})
.controller('addCategory',function($scope,$http,$cookieStore){	
	 $scope.logindata = $cookieStore.get('logindata');
	  console.log($scope.logindata);
	 $scope.addCategoryForm=function(){
		 var datafiles=$scope.addcategory;
		  datafiles.organizationId=$scope.logindata.organizationDetailsVO.id;
		  console.log(angular.toJson(datafiles));
		 alert("test");
		 $http({
				method:'POST',
				url: URL+'/category/createCategory',
				data:datafiles,
				headers:{'Content-Type':'application/json'}
				}) 
				.success(function(data,status,headers,config){
				if(data.code ==200){
					window.location.href='#/category.html';

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
