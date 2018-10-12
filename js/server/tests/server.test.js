const expect = require('expect');
const request = require('supertest');
const {app} = require('../server');
const {toDo} = require('../models/todo');

describe('GET /todos', ()=>{
    it('should get all tasks', (done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(5)
        })
        .end(done);
    });
});