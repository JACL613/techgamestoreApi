const Users = require('../databases/models/usuario_schema');
const { encrypt } = require('../lib/utils');

const route = require('express').Router();

route.get('/',async (req, res) =>{
    try {
        const query = await Users.find()

        if(!query || query.length <= 0) return res.json({message: 'No hay usuarios registrados' , status: 404})
        
        return res.json({message: 'Usuarios encontrados', data: query , status: 200})
    } catch (error) {
        return res.json({message: `Error: ${error.message}`, status: 500})
    }
})

route.get('/:id' , async (req, res) => {
    const {id} = req.params
    if(!id)
    return res.json({message: 'faltan datos', status: 401})
    try {
        const query = await Users.findById(id)
        if(!query || query.length < 1)
            return res.json({message: 'No se encontro el usuario', status: 404})
    } catch (error) {
        return res.json({message: `Error: ${error.message}`, status: 500})
    }
})

route.post('/', async (req, res) => {
    const {username, name ,email , password, role, created_at, wallet, config_despatch, orders} = req.body

    if(!username || !name || !email || !password || !role || !created_at )
        return res.json({message: 'faltan datos', status: 401})
    try {
        const passwordHash = encrypt(password)
        const query = await Users.create({username, name, email, password: passwordHash , role, created_at, wallet, config_despatch, orders})
        if (!query.ok) return res.json({status:400 , message: 'Fallo en la creacion'})
        return res.json({status:200, message:'Usuario registrado',data:query})
    } catch (error) {
        return res.json({message: `Error: ${error.message}`, status: 500})
    }

})

route.put('/:id', async (req, res) => {
    const {id} = req.params
    const {data} = req.body
    if (!id || !data) 
    return res.json({message: 'faltan datos', status: 401})
    try {
        const query = await Users.findByIdAndUpdate(id, {...data})
        if(query.length < 0)
            return res.json({message: 'No se encontro el usuario' , status: 404})
    } catch (error) {
        return res.json({message: `Error: ${error.message}`, status: 500})
    }

})

route.delete('/:id', async (req, res) => {
     const {id} = req.params

     try {
        const query = await Users.findByIdAndDelete(id)
        if(!query)
            return res.json({message: 'No se pudo borrar el usuario', status: 400})

        return res.json({message:'Usuario eliminado', status: 200})
     } catch (error) {
        return res.json({message: `Error: ${error.message}`, status: 500})
     }
})

module.exports = route;