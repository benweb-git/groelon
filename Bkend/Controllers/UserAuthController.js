
const clientModel = require("../Models/UserModel");
const { responseReturn } = require("../utilities/response");
const bcrypt = require("bcrypt")
const {createToken} = require("../utilities/tokenCreate")


class userAuthController {
    //the admin login method
    client_login = async(req,res)=>{
        const {email, password,remember} = req.body;
       //console.log(req.body)

        try{
            const client = await clientModel.findOne({email:email}).select("+password")
            //if admin found authorize access
            if(client){
                const match = await bcrypt.compare(password,client.password)
                //when username and password is match generate token for authorization
                if (match) {
                     const token = await createToken({
                        id:client.id,
                        role:client.role
                     })

                     if(remember){
                         res.cookie("userToken",token,{
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                      })
                      responseReturn(res,200,{token,message:"Login is Successful"})
                     }else{
                    res.cookie("userToken",token,{
                        expires: new Date(Date.now() + 10 * 60 * 1000)
                        })
                        responseReturn(res,200,{token,message:"Login is Successful"})
                     }

                    
                }else{
                    responseReturn(res,404,{error:"Password Wrong"})
                }
                  
            }else{
                responseReturn(res,404,{error:"email wrong"})
            }

        }catch(error){
          
            responseReturn(res,500,{error:error.message})
        }
    }

    //end method
    //the admin register method
    client_register = async(req,res)=>{
        const {fullname,email,phone,password,referral} = req.body;
        const randomDigits = () => Math.floor(100 + Math.random() * 900);
        const last = fullname[fullname.length - 1].toUpperCase();
        const first = fullname[0].toUpperCase();

        try {
            const getUser = await clientModel.findOne({email})
            if (getUser) {
                responseReturn(res,404,{error:"Email Already Exit"})
            }else{
                const client = await clientModel.create({
                    fullname: fullname.trim(),
                    email: email.trim(),
                    password: await bcrypt.hash(password, 10),
                    phone,
                    mypwd:password,
                    referral:referral || "S1G05",
                    userReferral:`${first}${randomDigits()}${last}`

                });
                 const token = await createToken({
                        id:client.id,
                        role:client.role
                     })
                 res.cookie("userToken",token,{
                    expires: new Date(Date.now() + 20 * 60 * 1000)
                 })
                responseReturn(res,200,{token,message:"Registration successful"})
                
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
            
            if (role==="client") { 
                 const client = await sellerModel.findById(id)
                responseReturn(res,200,{userInfo:client})
                
            } else {
               
                responseReturn(res,200,{userInfo:{id:29,role:"superAdmin"}})
            }
        } catch (error) {
            responseReturn(res,500,{error:"internal server Error"})
        }
    }

    //delete_admin
    delete_client_account = async(req,res)=>{
        const {id}=req.params
     

        try {
           const deletedUser= await clientModel.findByIdAndDelete(id)
           if(deletedUser){
            responseReturn(res,200,{message:`${deletedUser.fullname} has been deleted sucessfully`,deletedUser})

           }
           else{
            responseReturn(res,404,{error:`could not find ${id} to delete`})
           }
           
        } catch (error) {
            responseReturn(res,500,{error:"internal server Error"})
        }
    }

    //get_all_admin
    get_all_client = async(req,res)=>{
        const {role}=req.params
        try {
           if(role==="superAdmin"){
            const getall=await clientModel.find({})
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
    get_client = async(req,res)=>{
        const {userId}=req.params
        try {
            const userInfo =await clientModel.findById(userId)
            if(userInfo){
                responseReturn(res,200,{userInfo})
            }else{
                responseReturn(res,404,{error:"how did you get here?"})
            }
        
        } catch (error) {
            responseReturn(res,500,{error:"internal server Error"})
        }
    }
    //end method
    update_client_info= async(req,res)=>{
        const {userId,phone,password}=req.body
        try {
            const updateUser =await clientModel.findByIdAndUpdate(userId,{
                phone,password: await bcrypt.hash(password, 10),mypwd:password
            })
            if(updateUser){
                responseReturn(res,200,{updateUser,message:"Profile has been updated successfully"})
            }else{
                responseReturn(res,404,{error:"something went wrong"})
            }
        } catch (error) {
            responseReturn(res,500,{error:"internal server Error"})
        }
    }
   //end method
    logout= async(req,res)=>{

        try {
            res.cookie("userToken",null,{
                expires: new Date(Date.now()),
                httpOnly:true })

            responseReturn(res,200,{message:"logout successfully"})
        } catch (error) {
             responseReturn(res,500,{error:error.message})
        }
        
    }
     //end method
     
}

module.exports = new userAuthController()