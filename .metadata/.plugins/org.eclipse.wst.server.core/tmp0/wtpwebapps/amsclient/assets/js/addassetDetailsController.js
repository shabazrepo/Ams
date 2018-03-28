angular.module('assetDetails',[
	'appKitCommon',
	'appKit',
	'ngTable',
	'ngAnimate'
]).controller('assetDetailsController', function($scope,$uibModal,$http,NgTableParams,$cookieStore,Service) {
	'use strict';
	$scope.fullscreen = false;
	 $http.get(URL+"/assetdetails/list")
	 	.then(function(response) {
	  $scope.asset=response.data;
	  console.log($scope.asset);
	 	});
	 
	 $scope.chckedIndexs=[];
		$scope.counter=0;
	 $scope.checkedIndex = function (isChecked,assetDetails) {


		  if(isChecked)
			  { //if true increased 
			  if($scope.counter<0)
				  $scope.counter=0;
			  if($scope.counter<$scope.asset.length)
		      $scope.counter++; 
			  }else 
				{
				  $scope.counter--; 
				  
				}
			// checked status   
	//alert($scope.counter);              	alert(isChecked);
		 	$('table input:checkbox').change(function(){ 
		
		        if($scope.counter>0){
		        $('.icons.default').hide();
		        $('.icons.controls').show();
		        } else{
		        	if($scope.counter<=0)
		        		{
		        $('.icons.default').show();
		        $('.icons.controls').hide();
		        }
		        	}
		        })
     if (assetDetails!=0 && $scope.chckedIndexs.indexOf(assetDetails) === -1) {
         $scope.chckedIndexs.push(assetDetails);
     }
     else  if (assetDetails!=0 ){         
         $scope.chckedIndexs.splice($scope.chckedIndexs.indexOf(assetDetails), 1);
     }
	 
   	 }
	 
	 $scope.checkedIndexs=[];
		$scope.checkAll = function(selectedvalue) {
			$scope.checkedIndexs=[];
			$scope.counter=0;
		 
			$scope.selectedAll=selectedvalue;
			if ($scope.selectedAll ) {
				$scope.selectedAll = true;
				angular.forEach($scope.asset, function (assetdetails) { 
	                $scope.checkedIndexs.push(assetdetails);
	                $scope.counter++;
	                console.log($scope.checkedIndexs);
	             });
			} else {
				$scope.selectedAll = false;
			}
			
			angular.forEach($scope.asset, function (item) { 
	        	item.cid = $scope.selectedAll;
	        });
	        		
	        $scope.checkedIndex($scope.selectedAll,0);
	         
	    };
	 
	$scope.open = function() {
		$uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'addAssetDetails.html',
			controller:'addAssetDetails'
		});
	};
	
	$scope.edit=function(){
		if($scope.chckedIndexs.length==1){
			$uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'addAssetDetails.html',
			controller:'addAssetDetails',
			
		});
		}
		
		if($scope.chckedIndexs.length>1)   {
			 $('#Edit1').fadeIn(); 
			 $('.dialog .btn').click(function(){
			       $('.dialog').fadeOut();
			       })
		return false;
		}else 
			{ 
			$scope.addassetdetails=$scope.chckedIndexs[0];
			}
		

			
			$scope.addassetdetails.assetStateId=$scope.addassetdetails.assetStateId+'';
			$scope.addassetdetails.assetModelId=$scope.addassetdetails.assetModelId+'';
Service.assetdetails=$scope.addassetdetails;
console.log(angular.toJson($scope.addassetdetails));
		 
			}
	
})
.controller('addAssetDetails',function($scope,$http,$cookieStore,Service){
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
	  
	  if(Service.assetdetails!=null){
			$scope.addassetdetails = Service.assetdetails;
			console.log($scope.addassetdetails);
		}
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
					window.location.href='#/assetDetails';

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
.factory('Service', function() {
	  return {
		    
		    assetdetails:{}
		  };
		});

