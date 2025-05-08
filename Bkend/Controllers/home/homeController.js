const { responseReturn } = require("../../utilities/response");
const { formidable } = require('formidable');
const { cloudinary, configureCloudinary } = require('../../utilities/cloudinaryConfig');
const homeModel = require("../../Models/HomeModel");
const socialModel = require("../../Models/SocialModel");
const coinModel=require("../../Models/coinModel");
const cashModel = require("../../Models/cashPayModel");

configureCloudinary();

class homeController {

   create_home_info = async (req, res) => {
    const form = formidable();
    let imageResult;

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return responseReturn(res, 500, { error: 'Error parsing form data' });
        }

        try {
            const { TokenName, TokenRate,TokenSymbol } = fields;
            
            // Validation
            if (!TokenName || !TokenRate || !TokenSymbol || !files.TokenImage) {
                return responseReturn(res, 400, { error: 'All fields are required' });
            }

            // Increased timeout and parallel uploads
            const uploadOptions = {
                folder: 'homeDetails',
                chunk_size: 6000000, // 6MB chunks for video
                timeout: 30000 // 30 seconds timeout
            };

            // Upload image
            imageResult = await cloudinary.uploader.upload(files.TokenImage[0].filepath, {
                ...uploadOptions,
                resource_type: 'image'
            });

            // Create database entry
            const homeDetails = await homeModel.create({
                TokenName: TokenName[0],
                TokenSymbol:TokenSymbol[0],
                TokenImage: imageResult.secure_url,
                TokenImagePublicId: imageResult.public_id,
                TokenRate: parseFloat(TokenRate[0])
            });

            responseReturn(res, 201, { 
                homeDetails, 
                message: 'Home details added successfully' 
            });

        } catch (error) {
            console.error('Cloudinary Upload Error:', error);
            
            // Cleanup any successful uploads
            if (imageResult) {
                try {
                    await cloudinary.uploader.destroy(imageResult.public_id);
                } catch (cleanupError) {
                    console.error('Cleanup error:', cleanupError);
                }
            }

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




update_home_info = async (req, res) => {
    // Initialize formidable with options
    const form = formidable({
        multiples: true,
        maxFileSize: 50 * 1024 * 1024, // 50MB max file size
        keepExtensions: true
    });

    try {
        // Convert form.parse to Promise
        const [fields, files] = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                resolve([fields, files]);
            });
        });

        const { id } = req.params;
        const { TokenName, TokenRate,TokenSymbol } = fields;

        // Validation
        if (!id) {
            return responseReturn(res, 400, { error: 'ID parameter is required' });
        }

        if (!TokenName?.[0] || !TokenRate?.[0] || !TokenSymbol?.[0]) {
            return responseReturn(res, 400, { error: 'Token name and rate are required' });
        }
      
        // Find existing record first to ensure it exists
        const previousDetails = await homeModel.findById(id);
        if (!previousDetails) {
            return responseReturn(res, 404, { error: 'Home details not found' });
        }

        // Configure Cloudinary upload options
        const uploadOptions = {
            folder: 'homeDetails',
            chunk_size: 6000000, // 6MB chunks
            timeout: 60000, // 60 seconds timeout
            resource_type: 'auto' // Let Cloudinary detect resource type
        };

        let imageResult;
        let updateData = {
            TokenName: TokenName[0],
            TokenSymbol:TokenSymbol[0],
            TokenRate: parseFloat(TokenRate[0])
        };

        // Check if new image is being uploaded
        if (files.TokenImage?.[0]) {
            // Validate file types if image is present
            const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
            
            if (!allowedImageTypes.includes(files.TokenImage[0].mimetype)) {
                return responseReturn(res, 400, { 
                    error: 'Invalid image type. Allowed types: JPEG, PNG, WebP' 
                });
            }

            try {
                // Upload new image
                imageResult = await cloudinary.uploader.upload(files.TokenImage[0].filepath, {
                    ...uploadOptions,
                    resource_type: 'image'
                });

                // Add image data to update object
                updateData.TokenImage = imageResult.secure_url;
                updateData.TokenImagePublicId = imageResult.public_id;
            } catch (uploadError) {
                // Cleanup any successful uploads on error
                if (imageResult) {
                    try {
                        await cloudinary.uploader.destroy(imageResult.public_id);
                    } catch (cleanupError) {
                        console.error('Cleanup error:', cleanupError);
                    }
                }
                throw uploadError; // Re-throw to be caught by outer try-catch
            }
        }

        // Update database
        const updateDetails = await homeModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true } // Return updated document
        );

        // Delete old files only after successful update and if new image was uploaded
        if (imageResult && previousDetails.TokenImagePublicId) {
            try {
                await cloudinary.uploader.destroy(previousDetails.TokenImagePublicId);
            } catch (deleteError) {
                console.error('Error deleting old image:', deleteError);
                // Continue anyway, as the update was successful
            }
        }

        return responseReturn(res, 200, { 
            success: true,
            data: updateDetails,
            message: 'Home details updated successfully' 
        });

    } catch (error) {
        console.error('Update Home Info Error:', error);

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
            error: 'An error occurred while updating home details',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
    
   

    get_home_info= async (req, res) => {

      
        try {
           const homeDetails= await homeModel.find({})
           if(homeDetails){
                responseReturn(res, 201, { 
                                homeDetails:homeDetails[0], 
                                message: 'All Home details gotten successfully' 
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
    //end method
    get_general_info= async (req, res) => {
       
        try {
           const homeDetails= await homeModel.find({}) 
           const socialDetails= await socialModel.find({})
           const coinDetails= await coinModel.find({})
           const CashPayDetails = await cashModel.find({})
           if(homeDetails){
             const genData={
                homeDetails:homeDetails[0],
                socialDetails:socialDetails[0],
                coinDetails:coinDetails,
                CashPayDetails:CashPayDetails
             }
                responseReturn(res, 201, { 
                    homeDetails:genData, 
                    message: 'All Home details gotten successfully' 
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

module.exports = new homeController();