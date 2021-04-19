module.exports = class DiscordMenu {
    constructor(
      channel = new Discord.TextChannel(),
      uid,
      pages = [],
      messages = [],
      time = 180000,
      reactions = { first: "⏪", back: "◀", next: "▶", last: "⏩", stop: "⏹" }
    ) {
      this.channel = channel;
      this.pages = pages;
      this.time = time;
      this.reactions = reactions;
      this.page = 1;
      this.messages = messages;
      channel.send(pages[0]).then((msg) => {
        this.msg = msg;
        this.addReactions();
        this.createReactionCollector(uid);
        this.createMessageCollector(uid);
      });
    }
    select(pg = 1) {
      this.page = pg;
      this.msg.edit(this.pages[pg - 1]);
    }
    createReactionCollector(uid) {
      let reactionCollector = this.msg.createReactionCollector(
        (r, u) => u.id == uid,
        { time: this.time }
      );
      this.reactionCollector = reactionCollector;
      reactionCollector.on("collect", (r) => {
        if (r.emoji.name == this.reactions.first) {
          if (this.page != 1) this.select(1);
        } else if (r.emoji.name == this.reactions.back) {
          if (this.page != 1) this.select(this.page - 1);
        } else if (r.emoji.name == this.reactions.next) {
          if (this.page != this.pages.length) this.select(this.page + 1);
        } else if (r.emoji.name == this.reactions.last) {
          if (this.page != this.pages.length) this.select(this.pages.length);
        } else if (r.emoji.name == this.reactions.stop) {
          reactionCollector.stop();
        }
        r.users.remove(uid);
      });
      reactionCollector.on("end", () => {
        this.endCollection();
      });
    }
    createMessageCollector(uid) {
      let messageCollector = this.channel.createMessageCollector(
        (m) =>
          m.author.id === uid &&
          this.messages.find(
            (m2) => m2.message.toLowerCase() === m.cleanContent.toLowerCase()
          ),
        { time: this.time }
      );
      this.messageCollector = messageCollector;
      messageCollector.on("collect", (m) => {
        this.endCollection();
        let msgTrigger = this.messages.find(
          (m2) => m2.message.toLowerCase() === m.cleanContent.toLowerCase()
        );
        if (msgTrigger && msgTrigger.fn) {
          msgTrigger.fn(m);
        }
      });
      messageCollector.on("end", () => {
        this.endCollection();
      });
    }
    endCollection() {
      this.msg.delete();
      if (this.reactionCollector && !this.reactionCollector.ended)
        this.reactionCollector.stop();
      if (this.messageCollector && !this.messageCollector.ended)
        this.messageCollector.stop();
    }
    async addReactions() {
      if (this.reactions.first) await this.msg.react(this.reactions.first);
      if (this.reactions.back) await this.msg.react(this.reactions.back);
      if (this.reactions.next) await this.msg.react(this.reactions.next);
      if (this.reactions.last) await this.msg.react(this.reactions.last);
      if (this.reactions.stop) await this.msg.react(this.reactions.stop);
    }
  };