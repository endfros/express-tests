// If "type": "module" is not added you can use require() instead.

import express from "express";

import kodersRouter from "./routers/koders.router.js";
import mentorsRouter from "./routers/mentors.router.js";

const server = express(); // creating a server instance with express

//We add a middleware that converts anything that comes from body into a valid JSON

server.use(express.json())

server.use('/mentors',mentorsRouter)
server.use('/koders',kodersRouter)

// Make our server listen on a port 

server.get('/', (request, response) =>{
    // One way to send json

    // response.setHeader('Content-Type', 'application/json');
    // const message = {
    //     message: 'Hello World from GET /!'
    // }
    // const jsonString = JSON.stringify(message);
    // response.write(jsonString);
    // response.end();

    //Another way to send json

    response.json({
        message: 'Hello World from GET / :D!'
    })
    //it is like summarized
})

server.get('/hola', (request, response) => {
    response.write('GET /hola');
    response.end();
})

server.post('/', (request, response) =>{
    response.write('POST /');
    response.end();
})

server.patch('/', (request, response) =>{
    response.write('PATCH /');
    response.end();
})

server.listen(8080,() => {
    console.log("Server is now listening on port 8080");
});

/* 
    Problem1: 
        -Get /koders => response json : {message: 'Aqui estarán todos los koders'}
        -Post /koders => response json : {message: 'Aqui se crearan koders'}
        -Patch /koders => response json : {message: 'Aqui se actualizaran koders'}
        -Delete /koders => response json : {message: 'Aqui se eliminaran koders'}
*/




/*
    Practica integradora: fs + express

    GET /koders => endpoint => information endpoint => endpoint + path

    GET /koders => return json with koders information
                => the data will be on a file
*/

// Router, 
