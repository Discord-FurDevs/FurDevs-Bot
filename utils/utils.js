const exec = require("child_process").exec;
const random = require("crypto-random-string");


function load(client, dir, command){
    try {
        const props = require(`../commands/${dir}/${command}`);
        if (props.init) {
            props.init(client);
        }
        client.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
        return false;
    } catch (e) {
        return `Error: Unable to load command ${command}: ${e}`;
    }
}

function reload(client, command){
    try {
        const props = require(`../commands/${command}`);
        if (props.init) {
            props.init(client);
        }
        client.commands.delete(props.help.name, props);
        client.commands.set(props.help.name, props);
        console.log(`Reloaded ${props.help.name}`)
        props.help.aliases.forEach(alias => {
          client.aliases.delete(alias, props.help.name);
            client.aliases.set(alias, props.help.name);
        });
        return false;
    } catch (e) {
        return `Error: Unable to load command ${command}: ${e}`;
    }
}

function execute(command) {
    return new Promise((resolve) => {
      exec(command, async (err, stdout, stderr) => {
        if (err != null) {
          resolve([err, null]);
        } else if (typeof stderr != "string") {
          resolve([stderror, null]);
        } else {
          resolve([null, stdout]);
        }
      });
    });
}

function uid(){
    var intial = Date.now().toString(16);
    return `${inital}${random({ length: 16 - intial.length })}`
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}






exports.execute = execute;
exports.uid = uid
exports.load = load
exports.reload = reload
exports.sleep = sleep