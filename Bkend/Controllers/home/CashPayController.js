const { responseReturn } = require("../../utilities/response");
const cashModel = require("../../Models/cashPayModel");
const { formidable } = require('formidable');
const { cloudinary, configureCloudinary } = require('../../utilities/cloudinaryConfig');


configureCloudinary();
class cashPayController {
  
      create_cash = async (req, res) => {
          const form = formidable();
          let cashImgResult;
      
          form.parse(req, async (err, fields, files) => {
              if (err) {
                  return responseReturn(res, 500, { error: 'Error parsing form data' });
              }
      
              try {
                  const { cashName, cashSymbol, cashPayTag,cashMessage,rate } = fields;
                 
                 
      
                  // Validation
                  if (!cashName?.[0] || !cashSymbol?.[0] || !cashPayTag?.[0] || !cashMessage?.[0] || !rate?.[0] || !files.cashImg) {
                      return responseReturn(res, 400, { error: 'All fields are required' });
                  }
      
                  // Upload options
                  const uploadOptions = {
                      folder: 'cash',
                      timeout: 30000 // 30 seconds timeout
                  };
      
                  try {
                      // Upload images in parallel
                      [cashImgResult] = await Promise.all([
                          cloudinary.uploader.upload(files.cashImg[0].filepath, {
                              ...uploadOptions,
                              resource_type: 'image'
                          })
                      ]);
                      
                      const cashExist= await cashModel.findOne({cashUniqueName:cashName[0].toUpperCase()})
  
                      if(!cashExist){
                           // Create database entry
                      const cashDetails = await cashModel.create({
                          cashName: cashName[0],
                          cashUniqueName: cashName[0].toUpperCase().trim(),
                          cashSymbol: cashSymbol[0],
                          cashMessage: cashMessage[0],
                          cashPayTag: cashPayTag[0],
                          rate:rate[0],
                          cashImg: cashImgResult.secure_url,
                          cashImgPublicId: cashImgResult.public_id,
                         
                      });
                      responseReturn(res, 201, { 
                          cashDetails, 
                          message: 'Cash details added successfully' 
                      });
                      }else{
                          return responseReturn(res, 404, { 
                              error: 'this cash has already been created' 
                          });
                      }
                     
      
                  } catch (uploadError) {
                      // Cleanup any successful uploads
                      const cleanup = [];
                      if (cashImgResult) cleanup.push(cloudinary.uploader.destroy(cashImgResult.public_id));
                      await Promise.all(cleanup);
      
                      throw uploadError; // Re-throw to be caught by outer catch
                  }
      
              } catch (error) {
                  console.error('Error:', error);
                  
                  // Specific timeout error handling
                  if (error.name === 'TimeoutError') {
                      return responseReturn(res, 408, { 
                          error: 'Upload timed out. Try smaller files or better network connection' 
                      });
                  }
      
                  responseReturn(res, 500, { 
                      error: error.message || 'Internal server error' 
                  });
              }
          });
      };
  
      
      update_cash = async (req, res) => {
          const form = formidable({
              multiples: true,
              maxFileSize: 50 * 1024 * 1024,
              keepExtensions: true
          });
      
          try {
              const [fields, files] = await new Promise((resolve, reject) => {
                  form.parse(req, (err, fields, files) => {
                      if (err) reject(err);
                      resolve([fields, files]);
                  });
              });
      
              const { id } = req.params;
              const { cashName, cashSymbol, cashPayTag,cashMessage,rate } = fields;
              // Parse Example data more safely
          
      
              // Find existing record
              const previousDetails = await cashModel.findById(id);
              if (!previousDetails) {
                  return responseReturn(res, 404, { error: 'cash details not found' });
              }
      
              // Handle fields that might be URLs or files
              const updateData = {
                  cashName: cashName?.[0] || previousDetails.cashName,
                  rate:rate?.[0] || previousDetails.rate,
                  cashUniqueName: cashName?.[0] ? cashName[0].toUpperCase().trim() : previousDetails.cashUniqueName,
                  cashSymbol: cashSymbol?.[0] ? cashSymbol[0]: previousDetails.cashSymbol,
                  cashPayTag: cashPayTag?.[0] || previousDetails.cashPayTag,
                  cashMessage: cashMessage?.[0] || previousDetails.cashMessage,
              };
      
              // Handle image fields that might be URLs
              if (fields.cashImg?.[0]?.startsWith('http')) {
                  updateData.cashImg = fields.cashImg[0];
              }
      
              // Handle new file uploads
              if (files.cashImg) {
                  const uploadOptions = {
                      folder: 'cash',
                      chunk_size: 6000000,
                      timeout: 60000,
                      resource_type: 'auto'
                  };
      
                  let cashImgResult;
      
                  try {
                      const uploadPromises = [];
                      
                      if (files.cashImg?.[0]) {
                          uploadPromises.push(
                              cloudinary.uploader.upload(files.cashImg[0].filepath, {
                                  ...uploadOptions,
                                  resource_type: 'image'
                              })
                          );
                      }
      
      
                      if (uploadPromises.length > 0) {
                          const results = await Promise.all(uploadPromises);
      
                          // Update image URLs and public IDs
                          if (files.cashImg?.[0]) {
                              cashImgResult = results[0];
                              updateData.cashImg = cashImgResult.secure_url;
                              updateData.cashImgPublicId = cashImgResult.public_id;
                          }
      
                          // Delete old images if they exist
                          const deletePromises = [];
                          if (cashImgResult && previousDetails.cashImgPublicId) {
                              deletePromises.push(cloudinary.uploader.destroy(previousDetails.cashImgPublicId));
                          }
      
                          if (deletePromises.length > 0) {
                              await Promise.all(deletePromises);
                          }
                      }
                  } catch (uploadError) {
                      // Cleanup any successful uploads on error
                      const cleanup = [];
                      if (cashImgResult) {
                          cleanup.push(cloudinary.uploader.destroy(cashImgResult.public_id));
                      }
                      
                      if (cleanup.length > 0) {
                          await Promise.all(cleanup);
                      }
      
                      throw uploadError;
                  }
              }
      
              // Update database
              const updateDetails = await cashModel.findByIdAndUpdate(
                  id,
                  updateData,
                  { new: true }
              );
      
              return responseReturn(res, 200, { 
                  success: true,
                  data: updateDetails,
                  message: 'Cash details updated successfully' 
              });
      
          } catch (error) {
              //console.error('Update cash Error:', error);
      
              if (error.http_code === 400) {
                  return responseReturn(res, 400, { 
                      error: 'Invalid file format or corrupt file' 
                  });
              }
      
              if (error.name === 'TimeoutError' || error.message?.includes('timeout')) {
                  return responseReturn(res, 408, { 
                      error: 'Upload timed out. Please try with smaller files or check your network connection' 
                  });
              }
      
              return responseReturn(res, 500, { 
                  error: 'An error occurred while updating cash details',
                  details: process.env.NODE_ENV === 'development' ? error.message : undefined
              });
          }
      };
      //end method
      //get method
  
      get_all_cashes= async (req, res) => {
          try {
             const cashDetails= await cashModel.find({})
             if(cashDetails){
                  responseReturn(res, 201, { 
                                 cashDetails, 
                                  message: 'All cash payment details got successfully' 
                              });
             }else{
              responseReturn(res, 404, { 
                  error: 'could not find any cash payment details' 
              });
             }     
          } catch (error) {
              responseReturn(res, 500, { 
                  error: error.message || 'Internal server error' 
              });
          }
  
      }
  
      //end method
      //delete method
      delete_cash= async (req, res) => {
          const {id}=req.params
          try {
             const deleteCash= await cashModel.findByIdAndDelete(id)
             if(deleteCash){
                  responseReturn(res, 201, { 
                                   deleteCash, 
                                  message: 'cash deleted successfully' 
                              });
             }else{
              responseReturn(res, 404, { 
                  error: 'could not find any cash details' 
              });
             }     
          } catch (error) {
              responseReturn(res, 500, { 
                  error: error.message || 'Internal server error' 
              });
          }
  
      }
      //get_cash
      get_cash=async (req, res) => {
          const {id}=req.params
          try {
             const cash= await cashModel.findById(id)
            
             if(cash){
                  responseReturn(res, 201, { 
                                   cash, 
                                  message: 'cash gotten successfully'
                              });
             }else{
              responseReturn(res, 404, { 
                  error: 'could not find any home details' 
              });
             }     
          } catch (error) {
              responseReturn(res, 500, { 
                  error: error.message || 'Internal server error' 
              });
          }
  
      }

}

module.exports = new cashPayController();