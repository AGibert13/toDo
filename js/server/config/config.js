let environment = process.env.NODE_ENV || 'dev';

if(environment === 'dev'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/ToDo';
    console.log(environment);
}
else if(environment === 'test'){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/ToDoTest';
    console.log(environment);
}
