const CartsManager = require('../cartsManager')
const Manager =  new CartsManager('carritos.json');

const express = require('express')
const router = express.Router()

router.get("/carts",async (req,res)=>{
    try{
        console.log("consultando carritos")
        const misCarritos = await Manager.getCarritos()
        let limit = parseInt(req.query.limit)

        if (limit) return  res.send(misCarritos.slice(0,limit))
        
        return res.json(misCarritos)
    }catch{
        console.log(error)
        return res.json({message:'Error al consultar los carritos.'})
    }
})

router.get("/carts/:cid",async (req,res)=>{
    try{
        let id = req.params.cid
        const carrito = await Manager.getCarrito(id)
        return res.json(carrito)
    }catch{
        console.log(error)
        return res.json({message:"Error al consultar el carrito solicitado."})
    }
})

router.post('/carts', async(req, res)=>{
    try{
        const newCart = req.body
        const msg = await Manager.addCart(newCart)
        res.json({message: `${msg}`})
    }catch{
        console.log(error)
        return res.json({message:'Error durante el alta del carrito.'})
    }
})

router.post('/:cid/product/:pid', async(req, res)=>{
    try{
        const cid = req.params.cid
        const pid = req.params.pid
        const msg = await Manager.addProductToCart(cid,pid)
        res.json({message: `${msg}`})
    }catch{
        console.log(error)
        return res.json({message:'Error durante el alta del producto.'})
    }
})


module.exports = router