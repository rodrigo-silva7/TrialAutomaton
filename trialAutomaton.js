
const discord = require('discord.js');
const {prefix, token, inscricao} = require('./config.json');
const trial = require('./trial.js');
const client = new discord.Client();


/*temporário*/

var listaTrial = [];
var event;

//trial.iniciar();



client.once('ready', function() {
	console.log('\n------------------------------\nTrial Automaton - Discord Bot para organizar trials\nno game Elder Scrolls Online.\n\nautor: Rodrigo Silva <rodrigo.silva7@tutamail.com>\n\n -- Bot ligado e funcionando! --');	
})

client.on('message', (message) => {


	/* Trial Bot */

	/* Interação*/
	if (message.content.startsWith (prefix + "trial")) {
		let trialArgs = message.content.split(" ");

		switch(trialArgs[1]) {
			case 'ajuda': 

				trial.ajuda(message);
				return;

			case 'raid-lider':

				trial.cadastrarRaidLider(message);
				return;

			case 'criar':
			
				listaTrial.push(trial.criarTrial(message, trialArgs, message.author.id));
				return;

			case 'ativas': 

				if (listaTrial.length == 0) {
					message.channel.send("Não existem trials ativas no momento... :crying_cat_face:");
					return;
				}

				message.channel.send ("Trials ativas:\n");

				listaTrial.forEach( function(trial) {
					message.channel.send (" -- " + trial.run + " -- Raid Lider: " + '<@' + trial.raidLider + '>' + " -- Horário: " + trial.horario);
				});

			return;

			default:
				message.reply("Não entendi o que você quer de mim... :crying_cat_face:");
		}
	}

	
});

	/* Escutando reações*/


client.on('messageReactionAdd', (reaction, user) => {

	if (user.bot == true) return;

	var changed = false;

	var trial;

	listaTrial.forEach(function(trl) {
		
		if (trl.msgid == reaction.message.id) {
			trial = trl;
			return;
	}})


	if (trial.ativa == true) {
		if (reaction.emoji.name == '🛡') {
			trial.addPlayer(user.id, 'tank');
			changed = true;	
		} else if (reaction.emoji.name == '⛪') {
			trial.addPlayer(user.id, 'heal');
			changed = true;
		} else if (reaction.emoji.name == '⚔') {
			trial.addPlayer(user.id, 'dps');
			changed = true;
		}
	}

	if (changed == true)
			reaction.message.edit(trial.modeloTrial);
});

client.on('messageReactionRemove', (reaction, user) => {
	if (user.bot == true) return;

	var changed = false;

	var trial;

	listaTrial.forEach(function(trl) {
		
		if (trl.msgid == reaction.message.id) {
			trial = trl;
			return;
	}})


	if (trial.ativa == true) {
		if (reaction.emoji.name == '🛡') {
			trial.rmPlayer(user.id, 'tank');
			changed = true;	
		} else if (reaction.emoji.name == '⛪') {
			trial.rmPlayer(user.id, 'heal');
			changed = true;
		} else if (reaction.emoji.name == '⚔') {
			trial.rmPlayer(user.id, 'dps');
			changed = true;
		}
	}
	
	if (changed == true)
			reaction.message.edit(trial.modeloTrial);
});



client.login(token);

