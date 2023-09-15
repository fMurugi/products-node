
import prisma from "../db"

//getting products that belongs to the logged in user
export const getUpdates = async (req,res)=>{
    const products = await prisma.product.findMany({
        where:{
            belongsToId: req.user.id
        },
        include:{
            updates: true
        }
    })
    const updates = products.reduce((allupdates,product)=>{
        return [...allupdates, ...product.updates]
    },[])

  res.json({data:updates})
}

//get one product
export const getOneUpdate = async (req,res)=>{
    const update = await prisma.user.findUnique({
        where:{
            id: req.params.id
        }
        
    })

    res.json({data:update})
}

//
export const createUpdate =async (req,res) => {
    const product = await prisma.product.findUnique({
        where:{
            id: req.body.productId
        }
       
    })
    if(!product){
        //does not belong to use
        return res.json({message:"noope"})
    }

    const update = await prisma.update.create({
        data: req.body
    })

    res.json({data: update})
}


// update a product
export const updateUpdate =async (req,res) => {
    const products = await prisma.product.findMany({
        where:{
            belongsToId:req.user.id
           
        },
        include:{
            updates: true
        }
    })
    const updates = products.reduce((allupdates,product)=>{
        return [...allupdates, ...product.updates]
    },[])
    
    res.json({data:updates})
}



export const deleteUpdate =async (req,res) => {
    const deleted = await prisma.update.delete({
        where:{
            id : req.params.id,
        }
    })

    res.json({data:deleted})
}