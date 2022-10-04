import express from "express"
import fs from "fs"

const router = express.Router() // creating router instance

// Now with queries we can filter

// Filter by generation
// Filter by gender
router.get('', async (request, response) =>{
    const dataFile = await fs.promises.readFile('./kodemia.json','utf8')
    const json = JSON.parse(dataFile);
    
    let koders = json.koders

    // Access to the query params directly from the request
    // const queries = request.query

    // count query

    //Destruct

    const {gender, generation} = request.query 

    let kodersFiltered

    // Validate the query

    if(generation){
        koders = koders.filter(koder => koder.generation === parseInt(generation)) 
        kodersFiltered = koders
    }

    if(gender){
        koders = koders.filter(koder => koder.gender === gender) 
        kodersFiltered = koders
    }

    response.json({
        sucess: true,
        data: {
            koders: kodersFiltered || json.koders
        }
    })
})


router.get('/:idKoder', async (request, response) =>{
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

router.post('', async (request, response) =>{
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

router.patch('/:idKoder', async (request, response) =>{

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

router.delete('/:idKoder', async (request, response) =>{

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

export default router 

/*
    GET /mentors
    GET /mentors/:id
    POST /mentors
    PATCH /mentors/:id
    DELETE /mentors/:id

    Router para mentores
*/