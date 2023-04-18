// import cartitems collection\model
const cartitems = require('../models/cartSchema')

// to add item to cart 
exports.addTocart = async (req,res)=>{

    // to geet product properties from request body
    const  { id,title,price,image,quantity } = req.body

    // logic
    try{
        // check product is allredy in cart
        const product = await cartitems.findOne({id})
        if(product){
            // product allredy incart
            // increment quantity
            product.quantity+=1
            // upadate total price for the product
            product.grantTotal = product.price * product.quantity
            // save to the mongodb
            await product.save()
            // send res to the client
            res.status(200).json("Items added to your cart..")
        }
        else{
            // prooduct is not in the cart
            // add product to cart collection
            const newProduct = new cartitems({
                id,title,price,image,quantity,grantTotal:price
            })
            await newProduct.save()
            // send res to the client
            res.status(200).json("Item added to your cart..")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

// get catItems
exports.getCartItems = async (req,res)=>{
     // logic
     try {
        const allItems = await cartitems.find()
        // send allprroducts to client
        res.status(200).json(allItems)
    }
    catch (error) {
        res.status(401).json(error)
    }
}

// removeanItem from cart
exports.removeCartItem = async (req,res)=>{
    // gett id of product should be removed
    const { id } = req.params

    // logic
    try{
        const removeItem = await cartitems.deleteOne({id})
        if(removeItem){
            //get the  remaining items other than deleted one from cart 
            const allItems = await cartitems.find()
            res.status(200).json(allItems)
            
        }
        else{
            res.status(404).json("Item is not in the cart")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

// increment cart item 
exports.incrCartItem = async  (req,res)=>{
    const {id} = req.params
    // logigic
    try{
    const item = await cartitems.findOne({id})
    if(item){
        item.quantity+=1
        item.grantTotal=item.price*item.quantity
        await item.save()
        //get the  remaining items other than deleted one from cart 
        const allItems = await cartitems.find()
        res.status(200).json(allItems)
    }
    else{
        res.status(404).json("Item is not in the cart")
        
    }
    }
    catch(error){
        res.status(401).json(error)
    }
}

// decrement cart item 
exports.decrCartItem = async  (req,res)=>{
    const {id} = req.params
    // logic
    try{
    const item = await cartitems.findOne({id})
    if(item){
        // decrement quantity
        item.quantity-=1
        if(item.quantity==0){
            // remove item from cart
            const deleteItem = await cartitems.deleteOne({id})
            if(deleteItem){
                const allItems = await cartitems.find()
                res.status(200).json(allItems)
            }
            else{
                res.status(404).json("Item is not in the cart")
            }
        }
        else{
            item.grantTotal=item.price*item.quantity
            await item.save()
            //get the  remaining items other than deleted one from cart 
            const allItems = await cartitems.find()
            res.status(200).json(allItems)
        }
        
    }
    else{
        res.status(404).json("Item is not in the cart")
        
    }
    }
    catch(error){
        res.status(401).json(error)
    }
}

//empty cart
exports.emptyCart = async (req,res)=>{
    try{
        const result = await cartitems.deleteMany({})
        res.status(200).json("Your Cart is Empty")
    }
    catch(error){
        res.status(401).json(error)
    }
}