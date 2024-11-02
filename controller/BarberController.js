const Barber = require('../model/Barber');



// exports.oneBrber=async (req,res) =>  {
//     const barbers=await  Barber.find();

//     res.render("index",{
//         barbers
//     })
    
// }

// exports.setBarber=async (req,res,next)=>{
//     req.barber=await Barber.findById(req.params.id)
//     console.log(req.params.id)
//     console.log(req.barber)
//     next();
// }

exports.oneBarber=async(req,res)=>{
 const barber= await Barber.findById(req.params.id)
 const barbers=await Barber.find();

console.log(req.params.id)
console.log(barber)

 res.status(200).json({
    status: 'success',
    data: {
      data: barber,
     
    }
  });


}

exports.getTime=async(req,res)=>{
  const barberId=req.params.id
  const barber=await Barber.findByIdAndUpdate({_id:barberId},{"$push":{"reserve":req.body.reserve}}) 
  console.log(barber)    

  res.status(200).json({
    status: 'success',
    data: {
      data: barber
    }
  });
}