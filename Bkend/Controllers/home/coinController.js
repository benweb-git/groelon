const { responseReturn } = require("../../utilities/response");
const { formidable } = require('formidable');
const { cloudinary, configureCloudinary } = require('../../utilities/cloudinaryConfig');
const coinModel = require("../../Models/coinModel");


configureCloudinary();

class coinController {
     //end method
    //create method

    create_coin = async (req, res) => {
        const form = formidable();
        let coinImgResult, coinBarcodeResult;
    
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return responseReturn(res, 500, { error: 'Error parsing form data' });
            }
    
            try {
                const { coinName, coinSymbol, coinAddress,rate } = fields;
               
                // Parse the coin_example JSON string
    
                // Validation
                if (!coinName?.[0] || !coinAddress?.[0] || !coinSymbol?.[0] || !rate?.[0] || !files.coinImg || !files.coinBarcode) {
                    return responseReturn(res, 400, { error: 'All fields are required' });
                }
    
                // Upload options
                const uploadOptions = {
                    folder: 'coins',
                    timeout: 30000 // 30 seconds timeout
                };
    
                try {
                    // Upload images in parallel
                    [coinImgResult, coinBarcodeResult] = await Promise.all([
                        cloudinary.uploader.upload(files.coinImg[0].filepath, {
                            ...uploadOptions,
                            resource_type: 'image'
                        }),
                        cloudinary.uploader.upload(files.coinBarcode[0].filepath, {
                            ...uploadOptions,
                            resource_type: 'image'
                        })
                    ]);
                    
                    const coinExist= await coinModel.findOne({coinSymbol:coinSymbol[0].toUpperCase()})

                    if(!coinExist){
                         // Create database entry
                    const coinDetails = await coinModel.create({
                        coinName: coinName[0],
                        coinSymbol: coinSymbol[0].toUpperCase(),
                        coinAddress: coinAddress[0],
                        rate:rate[0],
                        coinImg: coinImgResult.secure_url,
                        coinImgPublicId: coinImgResult.public_id,
                        coinBarcode: coinBarcodeResult.secure_url,
                        coinBarcodePublicId: coinBarcodeResult.public_id,
                    });
                    responseReturn(res, 201, { 
                        coinDetails, 
                        message: 'Coin details added successfully' 
                    });
                    }else{
                        return responseReturn(res, 404, { 
                            error: 'this coin has already been created' 
                        });
                    }
                   
    
                } catch (uploadError) {
                    // Cleanup any successful uploads
                    const cleanup = [];
                    if (coinImgResult) cleanup.push(cloudinary.uploader.destroy(coinImgResult.public_id));
                    if (coinBarcodeResult) cleanup.push(cloudinary.uploader.destroy(coinBarcodeResult.public_id));
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

    
    update_coin = async (req, res) => {
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
            const { coinName, coinSymbol,rate, coinAddress} = fields;
    
            // Parse Example data more safely
        
    
            // Find existing record
            const previousDetails = await coinModel.findById(id);
            if (!previousDetails) {
                return responseReturn(res, 404, { error: 'Coin details not found' });
            }
    
            // Handle fields that might be URLs or files
            const updateData = {
                coinName: coinName?.[0] || previousDetails.coinName,
                rate:rate?.[0] || previousDetails.rate,
                coinSymbol: coinSymbol?.[0] ? coinSymbol[0].toUpperCase() : previousDetails.coinSymbol,
                coinAddress: coinAddress?.[0] || previousDetails.coinAddress,
            };
    
            // Handle image fields that might be URLs
            if (fields.coinImg?.[0]?.startsWith('http')) {
                updateData.coinImg = fields.coinImg[0];
            }
            if (fields.coinBarcode?.[0]?.startsWith('http')) {
                updateData.coinBarcode = fields.coinBarcode[0];
            }
    
            // Handle new file uploads
            if (files.coinImg || files.coinBarcode) {
                const uploadOptions = {
                    folder: 'coins',
                    chunk_size: 6000000,
                    timeout: 60000,
                    resource_type: 'auto'
                };
    
                let coinImgResult, coinBarcodeResult;
    
                try {
                    const uploadPromises = [];
                    
                    if (files.coinImg?.[0]) {
                        uploadPromises.push(
                            cloudinary.uploader.upload(files.coinImg[0].filepath, {
                                ...uploadOptions,
                                resource_type: 'image'
                            })
                        );
                    }
    
                    if (files.coinBarcode?.[0]) {
                        uploadPromises.push(
                            cloudinary.uploader.upload(files.coinBarcode[0].filepath, {
                                ...uploadOptions,
                                resource_type: 'image'
                            })
                        );
                    }
    
                    if (uploadPromises.length > 0) {
                        const results = await Promise.all(uploadPromises);
    
                        // Update image URLs and public IDs
                        if (files.coinImg?.[0]) {
                            coinImgResult = results[0];
                            updateData.coinImg = coinImgResult.secure_url;
                            updateData.coinImgPublicId = coinImgResult.public_id;
                        }
    
                        if (files.coinBarcode?.[0]) {
                            coinBarcodeResult = results[files.coinImg?.[0] ? 1 : 0];
                            updateData.coinBarcode = coinBarcodeResult.secure_url;
                            updateData.coinBarcodePublicId = coinBarcodeResult.public_id;
                        }
    
                        // Delete old images if they exist
                        const deletePromises = [];
                        if (coinImgResult && previousDetails.coinImgPublicId) {
                            deletePromises.push(cloudinary.uploader.destroy(previousDetails.coinImgPublicId));
                        }
                        if (coinBarcodeResult && previousDetails.coinBarcodePublicId) {
                            deletePromises.push(cloudinary.uploader.destroy(previousDetails.coinBarcodePublicId));
                        }
    
                        if (deletePromises.length > 0) {
                            await Promise.all(deletePromises);
                        }
                    }
                } catch (uploadError) {
                    // Cleanup any successful uploads on error
                    const cleanup = [];
                    if (coinImgResult) {
                        cleanup.push(cloudinary.uploader.destroy(coinImgResult.public_id));
                    }
                    if (coinBarcodeResult) {
                        cleanup.push(cloudinary.uploader.destroy(coinBarcodeResult.public_id));
                    }
                    
                    if (cleanup.length > 0) {
                        await Promise.all(cleanup);
                    }
    
                    throw uploadError;
                }
            }
    
            // Update database
            const updateDetails = await coinModel.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            );
    
            return responseReturn(res, 200, { 
                success: true,
                data: updateDetails,
                message: 'Coin details updated successfully' 
            });
    
        } catch (error) {
            //console.error('Update Coin Error:', error);
    
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
                error: 'An error occurred while updating coin details',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    };
    //end method
    //get method

    get_all_coins= async (req, res) => {
        try {
           const coinDetails= await coinModel.find({})
           if(coinDetails){
                responseReturn(res, 201, { 
                             coinDetails, 
                                message: 'All coins details got successfully' 
                            });
           }else{
            responseReturn(res, 404, { 
                error: 'could not find any coins details' 
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
    delete_coin= async (req, res) => {
        const {id}=req.params
        try {
           const deleteCoin= await coinModel.findByIdAndDelete(id)
           if(deleteCoin){
                responseReturn(res, 201, { 
                                deleteCoin, 
                                message: 'coin deleted successfully' 
                            });
           }else{
            responseReturn(res, 404, { 
                error: 'could not find any coin details' 
            });
           }     
        } catch (error) {
            responseReturn(res, 500, { 
                error: error.message || 'Internal server error' 
            });
        }

    }
    //get_coin
    get_coin=async (req, res) => {
        const {id}=req.params
        try {
           const coin= await coinModel.findById(id)
           if(coin){
                responseReturn(res, 201, { 
                            coin, 
                                message: 'coin gotten successfully'
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

module.exports = new coinController();