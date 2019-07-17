

function  RaidLider(id, canal, cargos) {
	this.id = id;
	this.canal = canal;
	this.cargos = cargos;
}

function Trial(raidlider, run, horario) {	

	this.msgid;
	this.ativa = true;
	this.raidLider = raidlider;
	this.run = run;
	this.trialID = Math.floor((Math.random() * 1000) + 1);	

	this.mt = '';
	this.ot = '';
	this.heal = [];
	this.dps = [];
	this.replaceTank = [];
	this.replaceDPS = [];
	this.replaceHeal = [];

	/* tratamento do horário/conversão para date()
	algoritmo da Banguie (com pequenos ajustes)*/
    
    let day;
    let month;
	let hour;
	let min;
    let year = new Date().getFullYear();

    if (horario[0].search(":") > -1) {
        hour = parseInt(horario[0].substring(0, 2));
        min = parseInt(horario[0].substring(3));
       //console.log("Teste 1: "+hour+":"+min);
    } else {
        hour = parseInt(horario[0].substring(0));
        min = 0;
        //console.log("Teste 1: "+hour+":"+min);
    }
   
    
    if (horario[1] != null) {
    	if(horario[1].search("/") > -1) {
    	    day = parseInt(horario[1].substring(0, 2));
    	    month = parseInt(horario[1].substring(3, 5)) - 1;
    	    //console.log("Teste 2: "+day+"/"+month+"/"+year);
    	} else {
    		day = parseInt(horario[1].substring(0, 2));
    	    month = new Date().getMonth();
    	}
	} else {
    	    day = new Date().getDate();
    	    month = new Date().getMonth();
    	    //console.log("Teste 2: "+day+"/"+month+"/"+year);
    }
    

	this.horario = new Date(year, month, day, hour, min, 0, 0);

	/* fim do algoritmo de tratamento do horário*/

	this.modeloTrial = "Trial: " + this.run + 
					   " -- Horário: " + checkdata(this.horario.getHours()) + ":" + checkdata(this.horario.getMinutes()) + " - " + checkdata(this.horario.getDate()) + "/" + checkdata((this.horario.getMonth() + 1).toString()) + 
					   " -- Raid Lider: "+ '<@' + this.raidLider + '>' +
					   "\nPara se inscrever, reagir com o ícone da role.\n" + 
					   "\n:shield: MT: " +
					   "\n:shield: OT: " +
					   "\n:church: H1: " +
					   "\n:church: H2: " +
					   "\n:crossed_swords: DPS1: " +
					   "\n:crossed_swords: DPS2: " +
					   "\n:crossed_swords: DPS3: " +
					   "\n:crossed_swords: DPS4: " +
					   "\n:crossed_swords: DPS5: " +
					   "\n:crossed_swords: DPS6: " +
					   "\n:crossed_swords: DPS7: " +
					   "\n:crossed_swords: DPS8: " +
					   "\n\n -- Replace:\nTank: " + this.replaceTank +
					   "\nHealer: " + this.replaceHeal +
					   "\nDPS: " + this.replaceDPS;


	this.addPlayer = function(id, role) {
	
	switch(role) {
		case 'tank':
			if (this.mt == '')
				this.mt = id;
			else if (this.ot == '')
				this.ot = id; 
			else this.replaceTank.push(id); 
			break;

		case 'dps':
			if (this.dps.length < 8)
				this.dps.push(id);
			else this.replaceDPS.push(id);
			break;

		case 'heal':
			if (this.heal.length < 2)
				this.heal.push(id);
			else this.replaceHeal.push(id);

		}

		this.modeloTrial =  "Trial: " + this.run + 
							" -- Horário: " + checkdata(this.horario.getHours()) + ":" + checkdata(this.horario.getMinutes()) + " - " + checkdata(this.horario.getDate()) + "/" + checkdata((this.horario.getMonth() + 1).toString()) + 
							" -- Raid Lider: "+ '<@' + this.raidLider + '>' +
							"\nPara se inscrever, reagir com o ícone da role.\n" + 
							"\n:shield: MT: " + check(this.mt) +
							"\n:shield: OT: " + check(this.ot) +
							"\n:church: H1: " + check(this.heal[0]) +
							"\n:church: H2: " + check(this.heal[1]) +
							"\n:crossed_swords: DPS1: " + check(this.dps[0]) +
							"\n:crossed_swords: DPS2: " + check(this.dps[1]) +
							"\n:crossed_swords: DPS3: " + check(this.dps[2]) +
							"\n:crossed_swords: DPS4: " + check(this.dps[3]) +
							"\n:crossed_swords: DPS5: " + check(this.dps[4]) +
							"\n:crossed_swords: DPS6: " + check(this.dps[5]) +
							"\n:crossed_swords: DPS7: " + check(this.dps[6]) +
							"\n:crossed_swords: DPS8: " + check(this.dps[7]) +
							"\n\n -- Replace:\n:shield: Tank: " + check2(this.replaceTank) +
							"\n:church: Healer: " + check2(this.replaceHeal) +
							"\n:crossed_swords: DPS: " + check2(this.replaceDPS);

	};
	


	this.rmPlayer = function(id, role) {

		switch(role) {

			case 'tank':
				if (this.mt == id) {

					this.mt = this.ot;

					if (this.replaceTank.length != 0) {

						this.ot = thisreplaceTank[0];
						this.replaceTank.splice(0,1);

					} else this.ot = '';	
				} 
				else if (this.ot == id) {

					if (this.replaceTank.length != 0) {

						this.ot = thisreplaceTank[0];
						this.replaceTank.splice(0,1);

					} else this.ot = '';
				} 
				else {		

					for (var x = 0 ; x < 6; x++) {
						if (this.replaceTank[x] == id)
							this.replaceTank.splice(x, 1);
					}}
				break;

		case 'dps':
		
			for (var x = 0; x < 8; x++) {
				if (this.dps[x] == id) {
					this.dps.splice(x, 1);
					if (this.replaceDPS.length != 0) {
						this.dps.push(this.replaceDPS[0]);
						this.replaceDPS.splice(0,1);
					}
				}
			}

			for (var x = 0; x < 10; x++) {
				if(this.replaceDPS[x] == id)
					this.replaceDPS.splice(x, 1);
			}
			break;

		case 'heal':
		
			for (var x = 0; x < 2; x++) {
				if(this.heal[x] == id) {
					this.heal.splice(x, 1);
					if (this.replaceHeal.length != 0) {
						this.heal.push(this.replaceHeal[0]);
						this.replaceHeal.splice(0,1);
					}
				}
			}

			for (var x = 0; x < 10; x++) {
				if(this.replaceHeal[x] == id)
					this.replaceHeal.splice(x, 1);
			}

		}

		this.modeloTrial =  "Trial: " + this.run + 
							" -- Horário: " + checkdata(this.horario.getHours()) + ":" + checkdata(this.horario.getMinutes()) + " - " + checkdata(this.horario.getDate()) + "/" + checkdata((this.horario.getMonth() + 1).toString()) + 
							" -- Raid Lider: "+ '<@' + this.raidLider + '>' +
							"\nPara se inscrever, reagir com o ícone da role.\n" + 
							"\n:shield: MT: " + check(this.mt) +
							"\n:shield: OT: " + check(this.ot) +
							"\n:church: H1: " + check(this.heal[0]) +
							"\n:church: H2: " + check(this.heal[1]) +
							"\n:crossed_swords: DPS1: " + check(this.dps[0]) +
							"\n:crossed_swords: DPS2: " + check(this.dps[1]) +
							"\n:crossed_swords: DPS3: " + check(this.dps[2]) +
							"\n:crossed_swords: DPS4: " + check(this.dps[3]) +
							"\n:crossed_swords: DPS5: " + check(this.dps[4]) +
							"\n:crossed_swords: DPS6: " + check(this.dps[5]) +
							"\n:crossed_swords: DPS7: " + check(this.dps[6]) +
							"\n:crossed_swords: DPS8: " + check(this.dps[7]) +
							"\n\n -- Replace:\n:shield: Tank: " + check2(this.replaceTank) +
							"\n:church: Healer: " + check2(this.replaceHeal) +
							"\n:crossed_swords: DPS: " + check2(this.replaceDPS);


	};


}


/*checa a string dos inscritos na run, e retorna já no formato de menção do discord*/ 
check = function (str) {
	if ((str == '') || (str == null))
		return '';
	return ('<@' + str + '>');
};

/*checa string dos replaces e retorna string com a lista em formato de menção*/
check2 = function (array) {
	if (array.length == 0)
		return '';
	var str = '<@' + array.join('>, <@') + '>';
	return str;
};

checkdata = function (str) {
	var str2;
	if (str.length == 1)
		str2 = '0' + str;
	else str2 = str;
	return str2;
};


/*function iniciar() {
	//iniciar lista de raid liders e trials ativas
}*/


exports.ajuda = function (message) {
	message.reply ("bem vindo à ajuda do Trial Automaton, um Discord-bot gerenciador de trials do game Elder Scrolls Online!" +
				   "\n\nPara se cadastrar como raid-lider, digite o comando abaixo e te mandarei uma PM para começar a organizar suas trials." +
				   "```!!trial raid-lider```" +
				   "\nPara criar uma trial, digite o comando abaixo observando a sintaxe correta e irei fazer o serviço pra você." +
				   "```!!trial criar <Nome da Trial> <Data e Horário no formato \"xx:xx xx/xx\">```" +
				   "\nPara ver as trials ativas no momento, digite ```!!trial ativas```")
}


exports.cadastrarRaidLider = function (message) {
	message.channel.send( "Em breve!")
}


exports.criarTrial = function (message, trialArgs, id){
	
	var horario  = [];
	horario.push(trialArgs[3]);
	horario.push(trialArgs[4]);

	var trial = new Trial(id, trialArgs[2], horario);

	/*TO DO: proteção de entrada*/

	message.channel.send(trial.modeloTrial)	
		.then( mensagem => {
			trial.msgid = mensagem.id;
	    	mensagem.react('🛡');
	        mensagem.react('⛪');
	        mensagem.react('⚔');
		});

	/*teste date()*/
	//console.log("Teste 3: " + trial.horario);
	

	setTimeout(function() {
		message.channel.send("Inscritos na trial " + trial.run +", de " + check(trial.raidLider) + 
		", favor logar. Faltam 15 minutos para o início da run.\n" +
		check(trial.mt) + ", " + check(trial.ot) + ", " + check2(trial.heal) + ", " + check2(trial.dps));
		trial.ativa = false; 
	}, (trial.horario.valueOf() - Date.now() - (60 * 15000)));
		
	return trial;
};




	
