const frames = [
	'(-°□°)-  ┬─┬',
	'(╯°□°)╯    ]',
	'(╯°□°)╯  ︵  ┻━┻',
	'(╯°□°)╯      ┻━┻'
];
const { sleep } = require('./../../utils/utils')


exports.run = async (client, message, args) => {
    const msg = await message.channel.send('(\\\\°□°)\\\\  ┬─┬');
    for (const frame of frames) {
        await sleep("250")
        await msg.edit(frame);
    }
    return message;
};

exports.help = {
    name: "tableflip",
    description: "Shows an animation of a tableflip",
    aliases: ["tf", "flip"],
};