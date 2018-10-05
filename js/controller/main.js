 angular.module('toDo', ['httpRequests'])
 .config(function($interpolateProvider){
     $interpolateProvider.startSymbol('{{{');
     $interpolateProvider.endSymbol('}}}')
 })
     .controller('toDoController', ['$scope', '$http', '$filter', 'httpRequests', function ($scope, $http, $filter, httpRequests) {
        $scope.employees = httpRequests.getData('https://todo-f02af.firebaseio.com/employees/.json')
        .then(function (response) {
            $scope.employees = response.data;
           });
        $scope.tasks = httpRequests.getData('https://todo-f02af.firebaseio.com/toDoItems/.json')
        .then(function (response) {
            $scope.tasks = response.data;
           });

         $scope.minDate = $filter('date')((new Date()), 'yyyy-MM-dd');
         $scope.addTask = function () {
             httpRequests.add($scope.task,$scope.description,$filter('date')($scope.start, 'MM/dd/yyyy'),$filter('date')($scope.end, 'MM/dd/yyyy'),$scope.employeeList, (Object.keys($scope.tasks).length + 1));
         }
     }]);