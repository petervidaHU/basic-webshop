import {
    uploadImageService,
} from '../services/imageServices.js';

const uploadController = async (req, res, next) => {
    const file = req.files.file;
    const { type } = req.query;
    console.log('file cont',file.size)
    //console.log('file cont');
    
    try {
    const filename = await uploadImageService(file, type);
    res.status(200).json(filename);
    } catch (err) {
        res.status(400)
        next(err)
    }
  };

export {uploadController}