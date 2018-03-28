angular.module('assetModel',[
	'appKitCommon',
	'appKit',
	'ngTable',
	'ngAnimate'
]).controller('assetModelController', function($scope,$uibModal,$http,NgTableParams,$cookieStore,Service) {
	'use strict';
	$scope.fullscreen = false;
	 $http.get(URL+"/assetmodel/list")
	 	.then(function(response) {
	  $scope.assetmodel=response.data;
	 	});
	 
	 $scope.chckedIndexs=[];
		$scope.counter=0;
	 $scope.checkedIndex = function (isChecked,assetModel) {


		  if(isChecked)
			  { //if true increased 
			  if($scope.counter<0)
				  $scope.counter=0;
			  if($scope.counter<$scope.assetmodel.length)
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
  if (assetModel!=0 && $scope.chckedIndexs.indexOf(assetModel) === -1) {
      $scope.chckedIndexs.push(assetModel);
  }
  else  if (assetModel!=0 ){         
      $scope.chckedIndexs.splice($scope.chckedIndexs.indexOf(assetModel), 1);
  }
	 
	 }
	 $scope.checkedIndexs=[];
		$scope.checkAll = function(selectedvalue) {
			$scope.checkedIndexs=[];
			$scope.counter=0;
		 
			$scope.selectedAll=selectedvalue;
			if ($scope.selectedAll ) {
				$scope.selectedAll = true;
				angular.forEach($scope.assetmodel, function (assetModel) { 
	                $scope.checkedIndexs.push(assetModel);
	                $scope.counter++;
	                console.log($scope.checkedIndexs);
	             });
			} else {
				$scope.selectedAll = false;
			}
			
			angular.forEach($scope.assetmodel, function (item) { 
	        	item.cid = $scope.selectedAll;
	        });
	        		
	        $scope.checkedIndex($scope.selectedAll,0);
	         
	    };
	 
	$scope.open = function() {
		$uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'addAssetModel.html',
			controller:'addAssetModel'
		});
	};
	
	$scope.edit=function(){
		if($scope.chckedIndexs.length==1){
			$uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'addAssetModel.html',
			controller:'addAssetModel',
			
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
			$scope.addassetmodel=$scope.chckedIndexs[0];
			}
			$scope.addassetmodel.assettypeId=$scope.addassetmodel.assettypeId+'';
Service.assetmodel=$scope.addassetmodel;
console.log(angular.toJson($scope.addassetmodel));
		 
			}
	
})
.controller('addAssetModel',function($scope,$http,$cookieStore,Service){
	 $scope.logindata = $cookieStore.get('logindata');
	  console.log($scope.logindata);
	 $http.get(URL+"/assettype/list")
	 	.then(function(response) {
	  $scope.assettypes=response.data;
	 	});
	 $http.get(URL+"/vendor/list")
	 .then(function(response){
		 $scope.vendors=response.data;
	 });
	 
	 if(Service.assetmodel!=null){
			$scope.addassetmodel = Service.assetmodel;
			console.log($scope.addassetmodel);
		}
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
					window.location.href='#/assetModel';

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
		    
		    assetmodel:{}
		  };
		});

