const {ObjectID} = require('mongodb');
const {toDo} = require('../../models/todo');

const todoOneId = new ObjectID();
const todoTwoId = new ObjectID();

const toDos = [{
    _id: todoOneId,
    task: 'This is a task',
    description: "Description for task 1",
    start: "09/22/2018",
    end: "10/14/2018",
    timestamp: "",
    employee: "Leonard",
    idNum: 1
}, {
    _id: todoTwoId,
    task: 'This is another task',
    description: "Description for task 2",
    start: "09/22/2018",
    end: "10/14/2018",
    timestamp: "",
    employee: "Leonard",
    idNum: 2
}];

const addTodos = (done) => {
    toDo.remove({}).then(() => {
        return toDo.insertMany(toDos);
    }).then(() => done());
};

module.exports = {
    toDos,
    addTodos
}