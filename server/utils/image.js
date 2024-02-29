const Jimp = require('jimp');

const compressImg = async (img) => {
	return Jimp.read(new Buffer.from(img.data))
		.then(async (res) => {
			const data = await res
				.resize(250, 250)
				.quality(60)
				.clone()
				.getBufferAsync(img.mimetype);
			console.log(data);
			return {
				data: data,
				contentType: img.mimetype,
			};
		})
		.catch((err) => {
			throw err;
		});
};

module.exports = { compressImg };
