var app = angular.module('app', []);

app.directive('limitTo', [function() {
  return {
    restrict: "A",
    link: function(scope, elem, attrs) {
      var limit = parseInt(attrs.limitTo);
      angular.element(elem).on("keypress", function(e) {
        if (this.value.length == limit) e.preventDefault();
      });
    }
  }
}]);

app.controller('cardController', function($scope) {

  $scope.cardNumber = '**** **** **** ****';
  $scope.fullName= 'full name';
  $scope.expiry = '**/**';
  $scope.cvc = '***';  
  
  
  $scope.cardNumberChange = function() {
    replaceCardNumberValue();    
    validation();
    if($scope.basicCardNumber == '') { 
      $scope.cardNumber = '**** **** **** ****';
    } else {
      $scope.cardNumber = $scope.basicCardNumber;
    }  
  }
  
  $scope.fullNameChange = function() {    
    $scope.basicFullName = $scope.basicFullName.replace(/\d/, '');
    if($scope.basicFullName == '') { 
      $scope.fullName = 'full name';
    } else {
      $scope.fullName = $scope.basicFullName;
    }
  }

  $scope.expiryChange = function() {
    replaceExpiryValue();    
    if($scope.basicExpiry == '') { 
      $scope.expiry = '**/**';
    } else {
      $scope.expiry = $scope.basicExpiry;
    }  
  }

  $scope.cvcChange = function() {    
    if($scope.basicCvc == '') { 
      $scope.cvc= '***';
    } else {
      $scope.cvc = $scope.basicCvc;
    }
  }

  $scope.cardNumberClick = function() {
    changeColor('#cardNumber');
    moveBack();
  }
  
  $scope.fullNameClick = function() {
    changeColor('#fullName');
    moveBack();
  }

  $scope.expiryClick = function() {
    changeColor('#expiresValue');
    moveBack();
  }

  $scope.cvcClick = function() {
    changeColor('#cvc');
    moveFront();
  }
    
  //Replace words functions
  var replaceCardNumberValue = function() {
    var cardCode = $scope.basicCardNumber.replace(/[^\d]/g, '').substring(0,16);
    cardCode = cardCode != '' ? cardCode.match(/.{1,4}/g).join(' ') : '';
    $scope.basicCardNumber = cardCode;
  }
  
  var replaceExpiryValue = function() {
    var cardCode = $scope.basicExpiry.replace(/[^\d]/g, '').substring(0,4);
    cardCode = cardCode != '' ? cardCode.match(/.{1,2}/g).join('/') : '';
    $scope.basicExpiry = cardCode;
  }

  var changeColor = function(name) {
    var classes = ['#cardNumber', '#fullName', '#expiresValue', '#cvc'];
    classes.forEach(function(item) {      
      if (item === name) {
        $(item).css("color", "#fff");
      }
      else {
        $(item).css("color", "#DCDCDC");
      }
    });
  }

  var validation = function() {
    var first = $scope.basicCardNumber[0];
    if (first == 3){
      $('.cardFront').addClass('express').removeClass('master visa');
      $('.cardBack').css('background-color', '#0d69b4');
    } else if (first == 4) {
      $('.cardFront').addClass('master').removeClass('visa express');
      $('.cardBack').css('background-color', '#000066');
    } else if (first == 5) {
      $('.cardFront').addClass('visa').removeClass('master express');
      $('.cardBack').css('background-color', '#540279');
    } else {
      $('.cardFront').removeClass('master visa express');
      $('.cardBack').css('background-color', '#C0C0C0');
    }
  }
  
  // Move card functions
  var moveBack = function() {
    $('.cardFront').addClass('delay').removeClass('move90');
    $('.cardBack').removeClass('delay move180');     
  }

  var moveFront = function() {    
    $('.cardFront').removeClass('delay').addClass('move90');
    $('.cardBack').addClass('delay move180');     
  }
 });