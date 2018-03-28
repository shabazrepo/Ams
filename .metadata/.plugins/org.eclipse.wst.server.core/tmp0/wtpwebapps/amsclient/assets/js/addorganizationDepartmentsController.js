angular.module('orgDepartments',[
	'appKitCommon',
	'appKit',
	'ngTable',
	'ngAnimate'
]).controller('organizationDepartmentsController', function($scope,$uibModal,$http,NgTableParams,$cookieStore) {
	'use strict';
	$scope.fullscreen = false;
	 $http.get(URL+"/orgDepartment/list")
	 	.then(function(response) {
	  $scope.orgdepartments=response.data;
	 	});
	$scope.open = function() {
		$uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'addOrganizationDepartments.html',
			controller:'addOrganizationDepartments'
		});
	};
	
})
.controller('addOrganizationDepartments',function($scope,$http,$cookieStore){
	 $scope.logindata = $cookieStore.get('logindata');
	  console.log($scope.logindata);
	 
	 $scope.addOrganizationDepartmentsForm=function(){
		 var datafiles=$scope.addorganizationdepartments;
		 datafiles.orgBranchId=$scope.logindata.organizationBranchDetailsVO.id;
		 alert( datafiles.orgBranchId);
		 console.log(angular.toJson(datafiles));
		 alert("test");
		 $http({
				method:'POST',
				url: URL+'/orgDepartment/createOrgDepartment',
				data:datafiles,
				headers:{'Content-Type':'application/json'}
				}) 
				.success(function(data,status,headers,config){
				if(data.code ==200){
					window.location.href='#/organizationDepartments';

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
