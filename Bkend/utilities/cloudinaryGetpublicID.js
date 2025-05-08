module.exports.getPublicId = (imageUrl) => {
    try {
        const urlParts = imageUrl.split('/');
        // Find the index after 'upload'
        const uploadIndex = urlParts.findIndex(part => part === 'upload');
        if (uploadIndex === -1) return null;
        
        // Get all parts after 'upload', excluding file extension
        const relevantParts = urlParts.slice(uploadIndex + 1);
        const lastPart = relevantParts[relevantParts.length - 1];
        relevantParts[relevantParts.length - 1] = lastPart.split('.')[0];
        
       
        return relevantParts.join('/').split('/').slice(1).join('/')

    } catch (error) {
        console.error('Error extracting public_id:', error);
        return null;
    }
};