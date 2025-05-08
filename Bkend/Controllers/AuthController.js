const adminModel = require("../Models/AdminModel");
const { responseReturn } = require("../utilities/response");
const bcrypt = require("bcrypt")
const {createToken} = require("../utilities/tokenCreate")


class authController {
    //the admin login method
    admin_login = async(req,res)=>{
        const {username, password,remember} = req.body;
       

        try{
            const admin = await adminModel.findOne({username:username}).select("+password")
            //if admin found authorize access
            if(admin){
                const match = await bcrypt.compare(password,admin.password)
                //when username and password is match generate token for authorization
                if (match) {
                     const token = await createToken({
                        id:admin.id,
                        role:admin.role
                     })

                     res.cookie("accessToken",token,{
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                     })
                     responseReturn(res,200,{token,message:"Login is Successful"})
                }else{
                    responseReturn(res,404,{error:"Password Wrong"})
                }
                  
            }else if(username===process.env.user_name && password===process.env.user_pass){
                    const token = await createToken({
                        id:29,
                        role:"superAdmin"
                    })
                    res.cookie('accessToken',token,{
                        expires : new Date(Date.now() + 7*24*60*60*1000 )
                    }) 
                    const getall=await adminModel.find({})
                    responseReturn(res,200,{token,getall,message:"Login is Successful"})

            }else{
                responseReturn(res,404,{error:"Username wrong"})
            }

        }catch(error){
          
            responseReturn(res,500,{error:error.message})
        }
    }

    //end method
    //the admin register method
    admin_register = async(req,res)=>{
        const {username,password} = req.body;

        try {
            const getUser = await adminModel.findOne({username})
            if (getUser) {
                responseReturn(res,404,{error:"Username Already Exit"})
            }else{
                const admin = await adminModel.create({
                    username,
                    password:await bcrypt.hash(password,10)
                })
                 const token = await createToken({
                        id:admin.id,
                        role:admin.role
                     })
                 res.cookie("accessToken",token,{
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                 })
                 const getall=await adminModel.find({})
                responseReturn(res,200,{token,getall,message:"Registration successful"})
                
            }
        } catch (error) {
            responseReturn(res,500,{message:"Internal Server Error"})
        }

    }
    
    //end method
    //the get user info method
    getUser = async(req,res)=>{
        const {id,role} = req;

        try {
            
            if (role==="superAdmin") {
                
                responseReturn(res,200,{userInfo:{id:29,role:"superAdmin"}})
                
            } else {
                const admin = await sellerModel.findById(id)
                responseReturn(res,200,{userInfo:seller})
                
            }
        } catch (error) {
            responseReturn(res,500,{error:"internal server Error"})
        }
    }

    //delete_admin
    delete_admin_account = async(req,res)=>{
        const {id}=req.params
     

        try {
           const deletedAdmin= await adminModel.findByIdAndDelete(id)
           if(deletedAdmin){
            const getall=await adminModel.find({})
            responseReturn(res,200,{message:`${deletedAdmin.username} has been deleted sucessfully`,getall})
           }
           else{
            responseReturn(res,404,{error:`could not find ${id} to delete`})
           }
           
        } catch (error) {
            responseReturn(res,500,{error:"internal server Error"})
        }
    }

    //get_all_admin
    get_all_admin = async(req,res)=>{
        const {role}=req.params
       
        try {
           if(role==="superAdmin"){
            const getall=await adminModel.find({})
            responseReturn(res,200,{message:`all good`,getall})
           }
           else{
            responseReturn(res,404,{error:`could not find any data to display`})
           }
           
        } catch (error) {
            responseReturn(res,500,{error:"internal server Error"})
        }
    }
   //end method
    logout= async(req,res)=>{

        try {
            res.cookie("accessToken",null,{
                expires: new Date(Date.now()),
                httpOnly:true })

            responseReturn(res,200,{message:"logout successfully"})
        } catch (error) {
             responseReturn(res,500,{error:error.message})
        }
        
    }
     //end method
     
}

module.exports = new authController()