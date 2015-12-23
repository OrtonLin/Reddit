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
    Posts.$add({
      name: post.name,
      description: post.description,
      url: post.url
    });
    post.name = "";
    post.description = "";
    post.url = "";
  }
});
