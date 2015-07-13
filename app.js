var data;
var data2;
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query='
var myApp = angular.module('myApp', [])

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}
  $scope.order = ''
  $scope.setOrder = function(value) {
    $scope.order = value
  }
  $scope.getSongs = function() {
    $http.get(baseUrl + $scope.track).success(function(response){
      data = $scope.tracks = response.tracks.items
      
    })
  }
  $scope.getRelatedArtists = function() {
    $http.get('https://api.spotify.com/v1/artists/' + 
      $scope.track.artists[0].id + '/related-artists')
    .success(function(response){
      data2 = $scope.artists = response
    })
  }

  $scope.get = function() {
    $scope.getSongs();
    $scope.getRelatedArtists();
  }
  
  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song.preview_url);
      $scope.audioObject.play()  
      $scope.currentSong = song
    }
  }
})

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});
