'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.showChefExecutive = false;
            $scope.message = "Loading...";
            
           // $scope.dishes = {};
            $scope.dishes = menuFactory.getDishes().query(
            function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }
            );

                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController',  ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.getFeedback().save($scope.feedback);  
                //  $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                }
            };
                
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            //$scope.dish = {};
            //$scope.showMenu = true;
            $scope.showDish = false;
            $scope.message = "Loading...";
            
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
                 .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
            
 }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.dish.comments.push($scope.mycomment);
                
                // to persist comment on server side
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                
                $scope.commentForm.$setPristine();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            };
        }])

        // implement the IndexController and About Controller here
        
        // IndexController Implementation
        .controller('IndexController',['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
            
//        .controller('IndexController' ['DishDetailController','AboutController']) {
            
               
                //$scope.showMenu = false;
                $scope.showDish = false;
                $scope.message = "Loading...";
                
                $scope.featuredDish = menuFactory.getDishes().get({id:0})
                .$promise.then(
                            function(response){
                                $scope.featuredDish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );
                
            
                $scope.promoDish = menuFactory.getPromotion().get({id:0})
                    .$promise.then(
                                function(response){
                                    $scope.promoDish = response;
                                    $scope.showDish = true;
                                },
                                function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;  
                                }
                );
            
                $scope.chefExecutive = corporateFactory.getLeaders().get({id:0})
                .$promise.then(
                    function(response){
                        $scope.chefExecutive = response;
                        $scope.showChefExecutive = true;
                    },
                    function(response) {
                        $scope.message = "Error: "+response.status + " " + response.statusText;  
                    }
                );
            }])
        
        // AboutController Implementation
        .controller('AboutController',['$scope','corporateFactory',function($scope, corporateFactory) {
            $scope.showChefExecutive = false;
            $scope.leaders = corporateFactory.getLeaders().query(
                    function(response){
                      $scope.leaders = response;
                      $scope.showChefExecutive = true;  
                    },
                    function(response){
                      $scope.message = "Error: "+response.status + " " + response.statusText;    
                    }
            );
              
        }]);
