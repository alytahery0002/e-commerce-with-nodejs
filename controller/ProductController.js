const products=require('../model/Product')
const Store=require("../model/Store")

exports.index=(req,res)=>{
const store=Store.findById(req.params.id).populate("products")


res.status(200).json({
    status: 'success',
    data: {
      data: store,
     
    }
})
}

exports.singleProduct=(req,res)=>{
  const store=Store.findById({_id:req.params.id,"products":req.params.id2})
  store.populate("products")
  const product=store.products
  
  res.status(200).json({
      status: 'success',
      data: {
        data: store,
       
      }
  })
  }

exports.create=async (req,res)=>{
    const newProduct= new products({
      name:req.body.name,
      description:req.body.description,
      price:req.body.price,
    })

    newProduct.save()

    const store=await Store.findByIdAndUpdate(req.params.id,{"$push":{"products":newProduct.id}})

    res.status(200).json({
    status: 'success',
    data: {
      data: newProduct,
     
    }
})
    
}
exports.update=(req,res)=>{
    
}
exports.delete=(req,res)=>{
    
}