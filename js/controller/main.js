 (function () {
     angular.module('toDo', ['httpRequests', 'editTasks', 'getNewId'])
         .config(function ($interpolateProvider) {
             $interpolateProvider.startSymbol('[{');
             $interpolateProvider.endSymbol('}]')
         })
         .controller('toDoController', ['$scope', '$http', '$filter', '$compile', 'httpRequests', 'editTasks','getNewId', function ($scope, $http, $filter, $compile, httpRequests, editTasks, getNewId) {
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
                 let id = getNewId.newId($scope.tasks);
                 console.log(id);
                 let tempTask = httpRequests.add($scope.task, $scope.description, $filter('date')($scope.start, 'MM/dd/yyyy'), $filter('date')($scope.end, 'MM/dd/yyyy'), $scope.employeeList, id);
                 $scope.tasks[`item${id}`] = tempTask;
             };
             $scope.delete = function () {
                 let id = this.task.id;
                 httpRequests.delete(id);
                 delete $scope.tasks[`item${id}`];
             };
             $scope.enableEdit = function () {
                 let currentRow = document.getElementById(`row${this.task.id}`);
                 $scope.currentTask = this.task;
                 $scope.editTask = this.task.task;
                 $scope.editDescription = this.task.description;
                 $scope.editStart = new Date(this.task.start);
                 $scope.editEnd = new Date(this.task.end);
                 $scope.editEmployeeList = this.task.employee;
                 let data = editTasks.editMode($scope.currentTask, $scope.employees);
                 data = ($compile(data)($scope));
                 angular.element(currentRow).html("");
                 for (const element in data) {
                     if (!isNaN(element)) {
                         angular.element(currentRow).append(data[element]);
                     }
                 };
             };
             $scope.cancelEdit = function () {
                 let tbody = document.getElementsByTagName('tbody');
                 let data = editTasks.exitEdit();
                 data = ($compile(data)($scope));
                 angular.element(tbody).html("");
                 for (const element in data) {
                     if (!isNaN(element)) {
                         angular.element(tbody).append(data[element]);
                     }
                 };
             };

             $scope.updateTask = function () {
                 let tbody = document.getElementsByTagName('tbody');
                 let tempTask = httpRequests.add($scope.editTask, $scope.editDescription, $filter('date')($scope.editStart, 'MM/dd/yyyy'), $filter('date')($scope.editEnd, 'MM/dd/yyyy'), $scope.editEmployeeList, $scope.currentTask.id);
                 $scope.tasks[`item${$scope.currentTask.id}`] = tempTask;
                 let data = editTasks.exitEdit();
                 data = ($compile(data)($scope));
                 angular.element(tbody).html("");
                 for (const element in data) {
                     if (!isNaN(element)) {
                         angular.element(tbody).append(data[element]);
                     }
                 };
             };
         }]);
 })();