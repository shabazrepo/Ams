(function() {
 angular.module('login',[
'appKit'
]).controller('loginController', function($scope,$http,$window,$location,$cookieStore) {
      		  $scope.name = 'World';
      		$scope.loginForm = function(){ 
      			  
      			  var datafiles=$scope.login;	
      		$http({
      			method:'POST',
      			url: URL+'/login/verifyLogin',
      			data:datafiles,
      			headers:{'Content-Type':'application/json'}
      			}) 
      			.success(function(data,status,headers,config){
      			
      			if(data.code ==200){
      				$cookieStore.put('logindata',data.data);
      				window.location.href="#/assetType";
      				}
      			else{ 
      					$scope.errorMsg = "Email/Password are Incorrect";
      				}
      				})
      				.error(function(data,status,headers,config){
      					if(status == 400) {
      				          $scope.messages = errorMsg;
      				        } else {
      				          alert('Unexpected server error.');
      				        }
      				})
      	}
      	});
})();
 
