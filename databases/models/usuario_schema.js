const  {Schema , model, mongoose} = require('mongoose')

const UsuarioSchema = new Schema({
    username: {type: String, required: true},
    name: {type: String , required: true},
    email: {type: String , required: true},
    password: {type: String , required: true},
    role: {type: String , required: true, enum: ['user', 'admin']},
    created_at: {type: Date, required: true},
    wallet: {type: Number, default: 0},
    config_despatch: {type: [mongoose.Types.ObjectId], ref: 'Despatchs'},
    orders: {type: [mongoose.Types.ObjectId], ref: 'Orders'},
    
})

const Users = model('Users' ,UsuarioSchema)

module.exports = Users