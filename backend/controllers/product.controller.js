const getAllProducts=async(req,res)=>{
   try{
    const products = await Product.find({}); //find all products
    res.json(products);
   }catch(error){
    console.log("Error in getAllProducts controller", error.message);
    res.status(500).json({message:"Server error",error:error.message});
   }
}

const getFeaturedProducts = async (req,res)=>{
   try{
      let featuredProducts = await redisClient.get("featured_products");
      if(featuredProducts){
         return res.json(JSON.parse(featuredProducts));
      }
      //if not in redis, fetch from mongodb
      // .lean() is gonna return a plain js object instead of mongodb document, which is good for performance
      featuredProducts= await Product.find({isFeatured:true}).lean();

      if(!featuredProducts){
         return res.status(404).json({message:"No featured products found"});

      }
      //store in redis for future quick access

      await redisClient.set("featured_products",JSON.stringify(featuredProducts));

      res.json(featuredProducts);
   }catch(error){
      console.log("Error in getFeaturedProducts controller", error.message);
      res.status(500).json({message:"Server error",error:error.message});
   }
}



module.exports={getAllProducts,getFeaturedProducts};