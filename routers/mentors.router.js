import express from "express"
import fs from "fs"

const router = express.Router() // creating router instance

// Now with queries we can filter

// Filter by generation
// Filter by gender
router.get('', async (request, response) =>{
    const dataFile = await fs.promises.readFile('./kodemia.json','utf8')
    const json = JSON.parse(dataFile);
    
    let mentors = json.mentors

    // Access to the query params directly from the request
    // const queries = request.query

    // count query

    //Destruct

    const {gender, generation} = request.query 

    let mentorsFiltered

    // Validate the query

    if(generation){
        mentors = mentors.filter(mentor => mentor.generation === parseInt(generation)) 
        mentorsFiltered = mentors
    }

    if(gender){
        mentors = mentors.filter(mentor => mentor.gender === gender) 
        mentorsFiltered = mentors
    }

    response.json({
        sucess: true,
        data: {
            mentors: mentorsFiltered || json.mentors
        }
    })
})


router.get('/:idMentor', async (request, response) =>{
    const id = parseInt(request.params.idMentor);
    const dataFile = await fs.promises.readFile('./kodemia.json','utf8')
    const json = JSON.parse(dataFile);
    
    const mentorFound = json.mentors.find(mentor => mentor.id === id)

    if(!mentorFound){
        response.status(404)
        response.json({
            sucess: false,
            message: 'No mentor found'
        })
        return
    }

    response.json({
        sucess: true,
        data: {
            mentor: mentorFound
        }
    })
})

router.post('', async (request, response) =>{
    const newMentor = request.body
    console.log(newMentor)

    const dataFile = await fs.promises.readFile('./kodemia.json','utf8');
    const json = JSON.parse(dataFile);

    json.mentors.push(newMentor)

    await fs.promises.writeFile('./kodemia.json', JSON.stringify(json,null,2),'utf8')

    response.json({
        success: true,
        message: 'mentor created'
    })
})

router.patch('/:idMentor', async (request, response) =>{

    const patchMentor = request.body
    console.log(patchMentor)

    const id = parseInt(request.params.idMentor);
    const dataFile = await fs.promises.readFile('./kodemia.json','utf8')
    const json = JSON.parse(dataFile);
    
    const mentorFound = json.mentors.find(mentor => mentor.id === id)

    mentorFound.id = patchMentor.id
    mentorFound.name = patchMentor.name
    mentorFound.gender = patchMentor.gender   
    mentorFound.generation = patchMentor.generation

    await fs.promises.writeFile('./kodemia.json', JSON.stringify(json,null,2),'utf8')

    response.json({
        message: 'Aqui se actualizaran mentors'
    })
})

router.delete('/:idMentor', async (request, response) =>{

    const id = parseInt(request.params.idMentor);
    const dataFile = await fs.promises.readFile('./kodemia.json','utf8')
    const json = JSON.parse(dataFile);
    
    const mentorFound = json.mentors.find(mentor => mentor.id === id)

    const index = json['mentors'].indexOf(mentorFound)

    json['mentors'].splice(index, 1)

    await fs.promises.writeFile('./kodemia.json', JSON.stringify(json,null,2),'utf8')

    response.json({
        message: `Aqui se elimino el mentor ${mentorFound.name}`
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