const channelRegex = /^(?:<#)?(\d{17,19})>?$/
const userOrMemberRegex = /^(?:<@!?)?(\d{17,19})>?$/


async function channelResolver(client, mention) {
    // Regular Channel support
    const channel = channelRegex.test(
      mention
    )
      ? await client.channels
          .fetch(
            channelRegex.exec(mention)[1]
          )
          .catch(() => null)
      : null;
    if (channel) return channel;

};

exports.channelResolver = channelResolver