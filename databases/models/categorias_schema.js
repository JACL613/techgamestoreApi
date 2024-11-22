const {Schema, model, default: mongoose} = require('mongoose')

const CategorysSchema = new Schema( {
    name: {type: String, required: true},
    total_products: {type: Number, required: true},
    products: {type: [mongoose.Types.ObjectId], ref: 'Products', required: true}
})

const Categorys =  model(CategorysSchema, 'Categorys')

module.exports = Categorys