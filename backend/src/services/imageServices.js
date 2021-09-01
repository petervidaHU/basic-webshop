import { nanoid } from 'nanoid'
import { ValidationError, DatabaseError } from './errorClass.js';
import path from 'path';
import sharp from 'sharp';

const uploadImageService = async (file, type) => {
    if (!file) {
        throw new ValidationError('File megadása kötelező');
    }
    if (!type) {
        throw new ValidationError('Kategória vagy termék???');
    }

    const fileName = `${nanoid()}-${type}.png`;

    try {
        await sharp(file.data)
            .resize({
                width: 300,
                height: 300,
                fit: sharp.fit.cover,
                position: sharp.strategy.entropy
            })
            .toColourspace('rgb16')
            .toFormat('png')
            .toFile(`${process.cwd()}/src/images/${fileName}`);
        return fileName;
    } catch (err) {
        throw new DatabaseError(`SHARP service hiba--${err.message}`);
    }
};

export { uploadImageService };