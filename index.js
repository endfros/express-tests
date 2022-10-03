// If "type": "module" is not added you can use require() instead.

import express from "express";
import fs from "fs"

const server = express(); // creating a server instance with express

//We add a middleware that converts anything that comes from body into a valid JSON

server.use(express.json())

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

server.get('/koders/:idKoder', async (request, response) =>{
    const id = parseInt(request.params.idKoder);
    const dataFile = await fs.promises.readFile('./kodemia.json','utf8')
    const json = JSON.parse(dataFile);
    
    const koderFound = json.koders.find(koder => koder.id === id)

    if(!koderFound){
        response.status(404)
        response.json({
            sucess: false,
            message: 'No koder found'
        })
        return
    }

    response.json({
        sucess: true,
        data: {
            koder: koderFound
        }
    })
})

server.post('/koders', async (request, response) =>{
    const newKoder = request.body
    console.log(newKoder)

    const dataFile = await fs.promises.readFile('./kodemia.json','utf8');
    const json = JSON.parse(dataFile);

    json.koders.push(newKoder)

    await fs.promises.writeFile('./kodemia.json', JSON.stringify(json,null,2),'utf8')

    response.json({
        success: true,
        message: 'koder created'
    })
})

server.patch('/koders/:idKoder', async (request, response) =>{

    const patchKoder = request.body
    console.log(patchKoder)

    const id = parseInt(request.params.idKoder);
    const dataFile = await fs.promises.readFile('./kodemia.json','utf8')
    const json = JSON.parse(dataFile);
    
    const koderFound = json.koders.find(koder => koder.id === id)

    koderFound.id = patchKoder.id
    koderFound.name = patchKoder.name
    koderFound.gender = patchKoder.gender   
    koderFound.generation = patchKoder.generation

    await fs.promises.writeFile('./kodemia.json', JSON.stringify(json,null,2),'utf8')

    response.json({
        message: 'Aqui se actualizaran koders'
    })
})

server.delete('/koders/:idKoder', async (request, response) =>{

    const id = parseInt(request.params.idKoder);
    const dataFile = await fs.promises.readFile('./kodemia.json','utf8')
    const json = JSON.parse(dataFile);
    
    const koderFound = json.koders.find(koder => koder.id === id)

    const index = json['koders'].indexOf(koderFound)

    json['koders'].splice(index, 1)

    await fs.promises.writeFile('./kodemia.json', JSON.stringify(json,null,2),'utf8')

    response.json({
        message: `Aqui se elimino el koder ${koderFound.name}`
    })
})



/*
    Practica integradora: fs + express

    GET /koders => endpoint => information endpoint => endpoint + path

    GET /koders => return json with koders information
                => the data will be on a file
*/
