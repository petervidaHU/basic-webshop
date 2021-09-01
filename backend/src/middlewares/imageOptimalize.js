import sharp from 'sharp';

export default async function imageOptimalize(req, res, next) {
    console.log(req.files.file, "form image is here");
    console.log(req.files.file.data, "form image buffer data is here");

    const sized = await sharp(req.files.file.data)
    .rotate(90)
    .resize({
        width: 200,
        height: 200,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy
    })
    .toFormat('png')
    .toFile(`${process.cwd()}/src/images/${file.name}`);
       // .toBuffer();

    console.log('sized: ', sized)
    req.files.file.data = sized;
    next();

}
