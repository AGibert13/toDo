angular.module('editTasks', []).service('editTasks', function () {
    this.editMode = function (currentTask, employees) {

        let htmlData = "";
        

        htmlData += `<td><input type="text" ng-model="editTask"></td>`
        htmlData += `<td> <input type="text" ng-model="editDescription"></td>`
        htmlData += `<td><input type="date" ng-model="editStart" ></td>`
        htmlData += `<td><input type="date" ng-model="editEnd"></td>`
        htmlData += `<td><select ng-model="editEmployeeList" ng-options="name for name in employees"></select></td>`
        htmlData += `<td><input type="button" value="Update" ng-click="updateTask()"></td>`
        htmlData += `<td><input type="button" value="Cancel" ng-click="cancelEdit()"></td>`

        return htmlData;
    };
    this.exitEdit = function () {
            let htmlData = "";
            htmlData +=`<tr ng-repeat="task in tasks" id="row{{{task.id}}}">`
            htmlData +=`<td>{{{task.task}}}</td>`
            htmlData +=`<td>{{{task.description}}}</td>`
            htmlData +=`<td>{{{task.start}}}</td>`
            htmlData +=`<td>{{{task.end}}}</td>`
            htmlData +=`<td>{{{task.employee}}}</td>`
            htmlData +=`<td><button ng-click="enableEdit()">Edit</button></td>`
            htmlData +=`<td><button ng-click="delete()">Delete</button></td></tr>`

            return htmlData;
    };
})