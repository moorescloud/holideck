function afl() {
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	this.pickClub = pickClub;

	this.team_list = team_list;

	var team_list = {

		"swans": 1,
		"blues": 2,
		"magpies": 3,
		"bombers": 4,
		"hawks": 5,
		"crows": 6,
		"cats": 7,
		"giants": 8,
		"kangaroos": 9,
		"saints": 10,
		"lions": 11,
		"eagles": 12,
		"suns": 13,
		"bulldogs": 14,
		"tigers": 15, 
		"dockers": 16,
		"power": 17,
		"demons": 18
	}


	function pickClub(team_name) {
		team =  team_name.substring(1);
		console.log("team_name " + team);
		console.log(team_list[team])
		currentLight.afl(team_list[team]);
	}

	function appStart() {
		console.log("afl.appStart");
	}
	
	function appQuit() {
		console.log("afl.appQuit");
	}
	
}
