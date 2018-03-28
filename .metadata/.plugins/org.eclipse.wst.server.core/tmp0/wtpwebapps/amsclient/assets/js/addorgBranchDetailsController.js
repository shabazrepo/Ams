angular.module('orgBranchDetails',[
	'appKitCommon',
	'appKit',
	'ngTable',
	'ngAnimate'
]).controller('orgBranchDetailsController', function($scope,$uibModal,$http,NgTableParams,$cookieStore) {
	'use strict';
	$scope.fullscreen = false;
	 $http.get(URL+"/orgBranch/list")
	 	.then(function(response) {
	  $scope.orgbranch=response.data;
	 	});
	$scope.open = function() {
		$uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'addOrgBranchDetails.html',
			controller:'addOrgBranchDetails'
		});
	};
	
})
.controller('addOrgBranchDetails',function($scope,$http,$cookieStore){
	 $scope.logindata = $cookieStore.get('logindata');
	  console.log($scope.logindata);
	 $scope.addOrgBranchDetailsForm=function(){
		 var datafiles=$scope.addOrgBranchDetails;
		 datafiles.organizationDetailsId=$scope.logindata.organizationDetailsVO.id;
		 console.log(angular.toJson(datafiles));
		 alert("test");
		 $http({
				method:'POST',
				url: URL+'/orgBranch/createBranch',
				data:datafiles,
				headers:{'Content-Type':'application/json'}
				}) 
				.success(function(data,status,headers,config){
				if(data.code ==200){
					window.location.href='#/oranizationBranchDetails';

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
