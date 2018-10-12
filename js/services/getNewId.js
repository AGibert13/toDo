angular.module('getNewId', []).service('getNewId', function () {
    this.newId = function(taskList){
        let largestId = 0;
        for (const key in taskList) {
            if (taskList[key].id > largestId) {
                console.log( taskList[key].id);
                console.log(largestId);
                largestId = taskList[key].id ;    
            };
        };
        return largestId + 1;
    };
});