// import express
const express = require('express')
// Router()
const router = new express.Router()
// import controller
const productController = require('../controllers/productController')
// import wishlistController
const wishlistsController = require('../controllers/wishlistsController')
// import cartController
const cartController = require('../controllers/cartController')

// get-all-produt api
// router.http-request(path,callback to define logic to resolve api)
router.get('/products/get-all-products',productController.getallproduct)
// router for view single product details
router.get('/products/:id',productController.viewProduct)
// route for add to wishlist
router.post('/products/add-to-wishlist',wishlistsController.addToWishlists)
// route for get all wishlist item
router.get('/wishlist/get-all-items',wishlistsController.getAllWishlistItems)
// route for removing item from wishhlist
router.delete('/wishlist/remove-item/:id',wishlistsController.removeWishlistItem)
// route for adding item to cart
router.post('/products/add-to-cart',cartController.addTocart)
// route for get all cart items
router.get('/cart/get-all-items',cartController.getCartItems)
// route for remove item from cart
router.delete('/cart/item/:id',cartController.removeCartItem)
// route for incrementing cart item quantity
router.get('/cart/increment-item/:id',cartController.incrCartItem)
// route for decrementing cart item quantity
router.get('/cart/decrement-item/:id',cartController.decrCartItem)
// route for empty cart
router.delete('/cart/empty-cart',cartController.emptyCart)


// export router
module.exports = router