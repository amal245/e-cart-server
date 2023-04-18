// logic to get all prduct from api
// import product colletion 
const products = require('../models/productSchema')

exports.getallproduct = async (req, res) => {
    // logic
    try {
        const allproducts = await products.find()
        // send allprroducts to client
        res.status(200).json(allproducts)
    }
    catch (error) {
        res.status(401).json(error)
    }
}


// logic to get  perticuar product from mongodb
exports.viewProduct = async (req,res) => {
    // get id of the product
    const id = req.params.id
    try {
        // logic
        const product = await products.findOne({ id })
        // send product details to client
            res.status(200).json(product)
    }
    catch (error) {
        res.status(401).json(error)
    }
}