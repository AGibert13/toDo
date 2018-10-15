const expect = require('expect');
const request = require('supertest');
const {app} = require('../server');
const {toDo} = require('../models/todo');
const {todos, addTodos} = require('./seed/seed');

describe('POST /todos', ()=>{
    beforeEach(addTodos);
    it('should create new todo', (done)=>{
        let newTask = {
            task: 'This is a third task',
            description: "Description for task 3",
            start: "09/22/2018",
            end: "10/14/2018",
            timestamp: "",
            employee: "Leonard",
            idNum: 3
        };
        request(app)
        .post('/todos')
        .send(newTask)
        .expect(200)
        .expect((res)=>{
            expect(res.body.task).toBe(newTask.task);
        })
        .end((err, res)=>{
            if(err){
                return done(err);
            }
            toDo.find({idNum: 3})
            .then((todos)=> {
                expect(todos.length).toBe(1);
                expect(todos[0].task).toBe(newTask.task);
                done();
            }).catch((error)=> done(error));
        })
    });
});

describe('GET /todos', ()=>{
    it('should get all tasks', (done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(3);
        })
        .end(done);
    });
});

describe('PATCH /todos', ()=>{
    it('should update tasks', (done)=>{
        let completed = true
        request(app)
        .patch('/todos/1')
        .send({completed})
        .expect(200)
        .expect((res)=>{
            expect(res.body.completed).toBe(true);
        })
        .end(done);
    });
    it('should clear completedAt when a todo is not complete', (done)=>{
        request(app)
        .patch('/todos/1')
        .send({"completed": false})
        .expect(200)
        .expect((res)=>{
            expect(res.body.completedAt).toBe(null)
        })
        .end(done);
    })
    
});

describe('DELETE /todos', ()=>{
    it('should remove task', (done)=>{
        request(app)
        .delete('/todos/3')
        .expect(200)
        .expect((res)=>{
            expect(res.body.success).toBe("YES");
        })
        .end(done);
    });
    it('should get return 404 if document is not found', (done)=>{
        request(app)
        .delete('/todos/7')
        .expect(404)
        .end(done);
    });
    it('should return 400 is object is invalid', (done)=>{
        request(app)
        .delete('/todos/edf')
        .expect(400)
        .end(done);
    })
});