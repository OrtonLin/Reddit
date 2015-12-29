//Starter Project for the Reddit Clone
var app = angular.module('reddit-clone', ['ngRoute', 'firebase']);
app.constant('fbURL', "https://reddit-chat-ortonlin.firebaseio.com/");

app.factory('Posts', function($firebaseArray, fbURL) {
  return $firebaseArray(new Firebase(fbURL));
});


app.config(function($routeProvider) {
  $routeProvider.when('/', {
      controller: "MainController",
      templateUrl: "main.html"
    })
    .otherwise({
      redirectTo: '/'
    })
});

app.controller('MainController', function($scope, $firebaseArray,Posts) {
  $scope.posts = Posts;
  $scope.savePost = function(post) {
    if(post === undefined || post.name === undefined || post.description === undefined || post.url === undefined || !$scope.authData)
    {
      alert("Sorry bro you need all of those inputs to be filled or you need to be logged in!")
      return;
    }
    Posts.$add({
      name: post.name,
      description: post.description,
      url: post.url,
      votes:0,
      user:$scope.authData.twitter.username
    });
    post.name = "";
    post.description = "";
    post.url = "";
  }
  $scope.addVote = function(post){
    post.votes++;
    Posts.$save(post);
  }
  $scope.deletePost = function(post){
    var postForDeletion =  new Firebase("https://reddit-chat-ortonlin.firebaseio.com/" + post.$id);
    postForDeletion.remove();
  }
  $scope.login = function(){
    var ref = new Firebase("https://reddit-chat-ortonlin.firebaseio.com/");
    ref.authWithOAuthPopup('twitter',function(error, authData){
      if(error){
        alert('Sorry bro, there was an error.');
      }
      else {
        alert('You were logged in successfully with ' + authData.twitter.username);
      }
      $scope.authData = authData;
    })
  }

});
