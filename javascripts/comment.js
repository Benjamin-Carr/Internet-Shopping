/* global angular */
angular.module('comment', [])
    .controller('MainCtrl', [
        '$scope',
        '$http',
        function($scope, $http) {
            /******************************************
             *       initial setup
             *          - initialize array
             *          - define getAll function
             *          - call getAll function
             ******************************************/
            $scope.comments = [];
            $scope.getAll = function() {
                return $http.get('/comments').success(function(data) {
                    angular.copy(data, $scope.comments);
                });
            };
            $scope.getAll();
            
            /******************************************
             *       add comment
             *          - POST new comment
             ******************************************/
            $scope.addComment = function() {
                var newcomment = { title: $scope.formContent, upvotes: 0 };
                $http.post('/comments', newcomment).success(function(data) {
                    console.log("add comment worked");
                    $scope.comments.push(data);
                });
                $scope.formContent = '';
            };
            
            /******************************************
             *       increment upvotes
             *          - PUT comment by _id using upvote
             ******************************************/
            $scope.incrementUpvotes = function(comment) {
                $http.put('/comments/' + comment._id + '/upvote')
                    .success(function(data) {
                        console.log("upvote worked");
                        comment.upvotes += 1;
                    });
            };
            
            /******************************************
             *       delete comment
             *          - DELETE comment by _id
             *          - reload comments array using getAll()
             ******************************************/
            $scope.delete = function(comment) {
                $http.delete('/comments/' + comment._id)
                    .success(function(data) {
                        console.log("delete worked");
                    });
                $scope.getAll();
            };
        }
    ]);