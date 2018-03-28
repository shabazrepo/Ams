angular.module('assetType',[
	'appKitCommon',
	'appKit',
	'ngTable',
	'ngAnimate'
]).controller('assetTypeController', function($scope,$uibModal,$http,NgTableParams,$cookieStore,Service) {
	'use strict';
	$scope.fullscreen = false;
	 $http.get(URL+"/assettype/list")
	 	.then(function(response) {
	  $scope.asset=response.data;
	 	});
	 $scope.checkedIndexs=[];
		$scope.counter=0;
	 $scope.checkedIndex = function (isChecked,assetType) {


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
        if (assetType!=0 && $scope.checkedIndexs.indexOf(assetType) === -1) {
            $scope.checkedIndexs.push(assetType);
        }
        else  if (assetType!=0 ){         
            $scope.checkedIndexs.splice($scope.checkedIndexs.indexOf(assetType), 1);
        }
	 
      	 }
	
	 $scope.checkedIndexs=[];
		$scope.checkAll = function(selectedvalue) {
			$scope.checkedIndexs=[];
			$scope.counter=0;
		 
			$scope.selectedAll=selectedvalue;
			if ($scope.selectedAll ) {
				$scope.selectedAll = true;
				angular.forEach($scope.asset, function (assettype) { 
	                $scope.checkedIndexs.push(assettype);
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
			templateUrl: 'addAssetType.html',
			controller:'addAssetType'
		});
	};
	$scope.edit=function(){
		if($scope.checkedIndexs.length==1){
			$uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'addAssetType.html',
			controller:'addAssetType',
			
		});
		}
		
		if($scope.checkedIndexs.length>1)   {
			 $('#Edit1').fadeIn(); 
			 $('.dialog .btn').click(function(){
			       $('.dialog').fadeOut();
			       })
		return false;
		}else 
			{ 
			$scope.addassettype=$scope.checkedIndexs[0];
			}
		

			
			$scope.addassettype.categoryId=$scope.addassettype.categoryId+'';
Service.assettype=$scope.addassettype;
console.log(angular.toJson($scope.addassettype));
		 
			}	
})

.controller('addAssetType',function($scope,$http,$cookieStore,Service){
	$scope.logindata=$cookieStore.get('logindata');
	$http.get(URL+"/category/list")
 	.then(function(response) {
  $scope.categories=response.data;
 	});
	if(Service.assettype!=null){
		$scope.addassettype = Service.assettype;
		console.log($scope.addassettype);
	}
	 $scope.addAssetForm=function(){
		 var datafiles=$scope.addassettype;
		 datafiles.organizationId=$scope.logindata.organizationDetailsVO.id;
		 console.log(angular.toJson(datafiles));
		 $scope.checkedIndexs=[];	
	     	$scope.counter=0; 
		 $http({
				method:'POST',
				url: URL+'/assettype/createAssetType',
				data:datafiles,
				headers:{'Content-Type':'application/json'}
				}) 
				.success(function(data,status,headers,config){
				if(data.code ==200){
					$cookieStore.put('assetdata',data.data);
					window.location.href= "#/assetType";
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
		    
		    assettype:{}
		  };
		});


//});
