'use strict';

angular.module('confusionApp')
        .constant("baseURL", "http://localhost:3000/")
        .service('menuFactory', ['$resource','baseURL', function($resource,baseURL) {
    
    
                  this.getDishes = function(){
                     return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
                    };
    
                this.getPromotion = function(index) {
                    
                    return $resource(baseURL+"promotions/:id",null,  {'update':{method:'PUT' }});
                };
    
                // implement a function named getPromotion
                // that returns a selected promotion.
    
                        
        }])

        .service('corporateFactory', ['$resource','baseURL', function($resource,baseURL) {    
                
                var corpofac = {};
                corpofac.getLeaders = function() {
                     return $resource(baseURL+"leadership/:id",null,  {'update':{method:'PUT' }});
                };
                return corpofac;
                
        }])

        .factory('feedbackFactory',['$resource','baseURL',function($resource,baseURL) {
            
            var feedback = {}
            
            feedback.getFeedback = function() {
                return $resource(baseURL+"feedback/:id",null,  {'update':{method:'PUT' }});  
            };
            
            return feedback;
            
        }]);
