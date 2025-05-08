const { responseReturn } = require("../../utilities/response");
const { formidable } = require('formidable');
const { cloudinary, configureCloudinary } = require('../../utilities/cloudinaryConfig');
//const networkModel = require("../../Models/NetworkModel");
const coinModel = require("../../Models/coinModel");
const participantModel = require("../../Models/ParticipantsModel");
const ContactModel = require("../../Models/ContactModel");
const transactionModel = require("../../Models/transactionModel");
const UserModel = require("../../Models/UserModel");


configureCloudinary();

class participantController {
    //create method
    //end method 

    create_client =  async (req, res) => {
       const {name,email, phone,wallet,password,amount,coin}=req.body;
       try {
         
         const alreadyExisted=await participantModel.findOne({email})

         if(!alreadyExisted){
            const clientcreated= await participantModel.create({
            name,email, phone,wallet,password,amount,coin
         })
         if(clientcreated){
             responseReturn(res, 201, { 
                clientcreated, 
                 success: 'verfying your transaction' 
              });
         }else{  responseReturn(res, 404, { 
                error: "database could'nt be created"
            });
}
           
         }else{
            responseReturn(res, 404, { 
                error: "YOU CAN ONLY PARTICIPATE ONCE"
            });
         }
        
       } catch (error) {
            responseReturn(res, 500, { 
                error: error.message || 'Internal server error' 
            });
       }


    }
     //end method 
    //create_trasaction
    create_trasaction =  async (req, res) => {
        const {userId,orderId, Amount,currency,address,status,TokenAmount,referraled}=req.body;
        try {
          
             if(TokenAmount>=40){
                const transactionCreated= await transactionModel.create({
                    userId,orderId,Amount,currency,address,status,TokenAmount,referraled
                 })
                 if(transactionCreated){
                    responseReturn(res, 201, { 
                        transactionCreated, 
                        success: 'verfying your transaction' 
                     });
                }else{  responseReturn(res, 404, { 
                       error: "something went wrong"
                   });
                    }

             }else{
             responseReturn(res, 404, { 
                 error: "minimum amount to purchase is 40"
             });
          }
 
        } catch (error) {
             responseReturn(res, 500, { 
                 error: error.message || 'Internal server error' 
             });
        }
 
 
     }
    //end method

    create_contact =  async (req, res) => {
        const {email,subject,textMessage }=req.body;
        try {
            const contactcreated= await ContactModel.create({
                email,subject,textMessage
             })
             if(contactcreated){
                 responseReturn(res, 201, {  
                     success: 'message sent' 
                  });
             }else{  responseReturn(res, 404, { 
                    error: "database could'nt be created"
                });}
        } catch (error) {
            responseReturn(res, 500, { 
                error: error.message || 'Internal server error' 
            });
        }

    }


    //get method

    // get_all_clients= async (req, res) => {
    //     try {
    //        const networks= await networkModel.find({})
    //        if(networks){
    //             responseReturn(res, 201, { 
    //                           networks, 
    //                             message: 'All  coin network gotton sucessfully' 
    //                         });
    //        }else{
    //         responseReturn(res, 404, { 
    //             error: 'could not find any coins details' 
    //         });
    //        }     
    //     } catch (error) {
    //         responseReturn(res, 500, { 
    //             error: error.message || 'Internal server error' 
    //         });
    //     }

    // }

    
    get_network = async (req, res) => {
        const { coinName } = req.params;
    
        try {
            // First find the coin details
            const coinDetails = await coinModel.findOne({ coinSymbol: coinName });
    
            if (!coinDetails) {
                return responseReturn(res, 404, { 
                    error: '404 wrong page you seem lost' 
                });
            }
    
            // Aggregate to combine coin and network information
            const coinInfo = await coinModel.aggregate([
                // Match the specific coin
                {
                    $match: {
                        coinSymbol: coinName
                    }
                },
                // Keep all fields from coin model
                {
                    $project: {
                        coinName: 1,
                        coinSymbol: 1,
                        coinAddress: 1,
                        coinImg: 1,
                        rate: 1,
                        coinBarcode: 1,
                        coinImgPublicId: 1,
                        coinBarcodePublicId: 1,
                        Example: 1
                    }
                },
                // Lookup to get network details
                {
                    $lookup: {
                        from: 'networkdetails',  // Collection name for network model
                        let: { coin_id: '$_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ['$coinId', '$$coin_id']
                                    }
                                }
                            }
                        ],
                        as: 'networkInfo'
                    }
                },
                // Unwind the networkInfo array since we expect one network document per coin
                {
                    $unwind: {
                        path: '$networkInfo',
                        preserveNullAndEmptyArrays: true
                    }
                },
                // Combine all information into a single document
                {
                    $project: {
                        // Coin model fields
                        _id: 0,
                        coinName: 1,
                        coinSymbol: 1,
                        coinAddress: 1,
                        coinImg: 1,
                        rate: 1,
                        coinBarcode: 1,
                        Example: 1,
                        // Network model fields
                        coinNetworks: '$networkInfo.coinNetworks'
                    }
                }
            ]);
    
            if (!coinInfo || coinInfo.length === 0) {
                return responseReturn(res, 404, { 
                    error: 'No coin information found' 
                });
            }
            return responseReturn(res, 200, { 
                coinInfo: coinInfo[0],
                success: 'Coin information retrieved successfully'
            });
    
        } catch (error) {
            console.error('Get coin information error:', error);
            return responseReturn(res, 500, { 
                error: error.message || 'Internal server error' 
            });
        }
    };

     //end method
    //get_all_participants
    //get-transactions
    get_all_transactions=async (req, res) => {
       
        try {
            const allTransactions= await transactionModel.find({}) .sort({ createdAt: 1 })
            .limit(50)
            .exec()
            .catch(error => {
                console.error('Error fetching transaction:', error);
                throw error;
            });
            if(allTransactions){
                responseReturn(res, 201, {  
                    allTransactions,
                    success: 'SUCCESS' 
                 });

            }else{
                responseReturn(res, 404, { 
                    error: "This account doesn't not exist, contact support for assistance"
                });
            }


            
        } catch (error) {
            responseReturn(res, 500, { 
                error: error.message || 'Internal server error' 
            });
        }
    }
    //get_all_user_transactions
    get_all_user_transactions = async (req, res) => {
        const { userId } = req.params;
        
        // Check if userId is provided
        if (!userId) {
            return responseReturn(res, 400, { 
                error: "User ID is required" 
            });
        }
        
        try {
            // Use userId field instead of _id
            const transactions = await transactionModel.find({ userId: userId })
                .sort({ createdAt: -1 }) // -1 for descending (newest first)
                .limit(15)
                .exec();
                
            if (transactions && transactions.length > 0) {
                responseReturn(res, 200, {  
                    transactions,
                    message: 'SUCCESS' 
                });
            } else {
                responseReturn(res, 404, { 
                    error: "No transactions found for this user"
                });
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
            responseReturn(res, 500, { 
                error: error.message || 'Internal server error' 
            });
        }
    }

    //delete_participant
    delete_transaction = async (req, res) => {
        const { id } = req.params;
       
        try {
            const result = await transactionModel.deleteMany({userId: id});
            
            if (result.deletedCount > 0) {
                responseReturn(res, 200, { 
                    success: `Successfully deleted ${result.deletedCount} transactions. Refresh to see changes.` 
                });
            } else {
                responseReturn(res, 404, { 
                    error: 'No transactions found for this user. Nothing was deleted.' 
                });
            }
        } catch (error) {
            console.error('Error deleting transactions:', error);
            responseReturn(res, 500, { 
                error: error.message || 'Internal server error' 
            });
        }
    }
    //update_participant
  
    update_transaction = async (req, res) => {
        const { id, confirmationStatus } = req.params;

        function determineUserStatus(balance) {
            if (balance >= 100001) {
                return "Super Legend";
            } else if (balance >= 50000 && balance <= 100000) {
                return "Legend";
            } else if (balance >= 5000 && balance <= 49999) {
                return "Diamond";
            } else if (balance >= 1000 && balance <= 4999) {
                return "Platinum";
            } else if (balance >= 500 && balance <= 999) {
                return "Gold";
            } else if (balance >= 200 && balance <= 499) {
                return "Silver";
            } else if (balance >= 40 && balance <= 199) {
                return "Bronze";
            } else {
                return "Basic"; 
            }
        }
        
        try {
            // Find and update the transaction first
            const findTransaction = await transactionModel.findByIdAndUpdate(
                id, 
                { paymentStatus: confirmationStatus },
                { new: true } // Return the updated document
            );
            
            if (!findTransaction) {
                return responseReturn(res, 404, { 
                    error: 'Could not find transaction to update. Please refresh to see latest data.' 
                });
            }
            
            // If transaction is completed, update user balance
            if (confirmationStatus === "completed") {
                const userID = findTransaction.userId;
                const findUser = await UserModel.findById(userID);
                
                if (!findUser) {
                    return responseReturn(res, 404, { 
                        error: 'User not found. Transaction updated but user balance unchanged.' 
                    });
                }
                
                const newBalance = findTransaction.TokenAmount + findUser.balance;
                const newStatus = determineUserStatus(newBalance);
                
                const updateUser = await UserModel.findByIdAndUpdate(
                    userID,
                    { 
                        balance: newBalance, 
                        status: newStatus 
                    },
                    { new: true }
                );
                
                if (!updateUser) {
                    return responseReturn(res, 500, { 
                        error: 'Transaction updated but failed to update user balance. Please try again.' 
                    });
                }
            }
            
            // Success response
            return responseReturn(res, 201, { 
                success: 'Transaction updated successfully. Refresh to see changes.' 
            });
        } catch (error) {
            console.error('Transaction update error:', error);
            return responseReturn(res, 500, { 
                error: error.message || 'Internal server error' 
            });
        }
    };
   //end method
    // get_participant = async (req, res) => {
    //     const {email}=req.params
    //     try {
    //         const accountExist= await participantModel.findOne({email})
    //         if(accountExist){
    //             responseReturn(res, 201, {  
    //                 accountExist,
    //                 success: 'SUCCESS' 
    //              });

    //         }else{
    //             responseReturn(res, 404, { 
    //                 error: "This account doesn't not exist, contact support for assistance"
    //             });
    //         }


            
    //     } catch (error) {
    //         responseReturn(res, 500, { 
    //             error: error.message || 'Internal server error' 
    //         });
    //     }

    // }
    //delete_contact
    delete_contact= async (req, res) => {
        const { id } = req.params;
        try {
            const deleteContact = await ContactModel.findByIdAndDelete(id)
            if (deleteContact) {
                responseReturn(res, 201, { 
                    success: 'contact deleted successfully , Refresh contact to see changes' 
                });
                
            } else {
                responseReturn(res, 404, { 
                    error: 'could not delete contact,, Refresh contact to see changes' 
                });
            }

            
        } catch (error) {
              responseReturn(res, 500, { 
                error: error.message || 'Internal server error' 
            });
        }
    }
    //end method
    get_contacts= async (req, res) => {
        try {
            const contacts = await ContactModel.find({})
                .sort({ createdAt: 1 })
                .limit(15)
                .exec()
                .catch(error => {
                    console.error('Error fetching contacts:', error);
                    throw error;
                });
            if (contacts) {
                responseReturn(res, 201,{
                    contacts,
                    message: 'contact got successfully' }
                    
                );
                
            } else {
                responseReturn(res, 404, { 
                    error: 'no contact to display' 
                });
            }
            
        } catch (error) {
            responseReturn(res, 500, { 
                error: error.message || 'Internal server error' 
            });
        }
    }

}

module.exports = new participantController();