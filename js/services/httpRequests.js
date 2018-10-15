angular.module('httpRequests', []).service('httpRequests', function ($http, $filter) {
    this.add = function (taskName, desc, startDate, endDate, selectedEmployee, idNum) {
        let currentTime = new Date();
        let newTask = {
            task: taskName,
            description: desc,
            start: startDate,
            end: endDate,
            timestamp: $filter('date')(currentTime, 'medium'),
            employee: selectedEmployee,
            id: idNum
        };
        console.log(newTask);
        $http.put(`https://todo-f02af.firebaseio.com/toDoItems/item${idNum}.json`, JSON.stringify(newTask));

        return newTask;
    };

    this.delete = function(idNum){
        $http.delete(`https://todo-f02af.firebaseio.com/toDoItems/item${idNum}.json`);
    };

    this.update = function (taskName, desc, startDate, endDate, selectedEmployee, idNum) {
        let currentTime = new Date();
        let newTask = {
            task: taskName,
            description: desc,
            start: startDate,
            end: endDate,
            timestamp: $filter('date')(currentTime, 'medium'),
            employee: selectedEmployee,
            id: idNum
        };
        console.log(newTask);
        $http.patch(`https://todo-f02af.firebaseio.com/toDoItems/item${idNum}.json`, JSON.stringify(newTask));

        return newTask;
    };

    this.getData = function(url){
      return $http.get(url)
    }
});