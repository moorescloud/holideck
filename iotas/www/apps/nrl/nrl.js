function nrl() {
	
	this.appStart = appStart;
	this.appQuit = appQuit;
	this.pickClub = pickClub;

	this.team_list = team_list;

	var team_list = {

		"broncos": 6,
		"bulldogs": 5,
		"raiders": 11,
		"sharks": 10,
		"titans": 15,
		"seaeagles": 4,
		"storm": 9,
		"knights": 14,
		"warriors": 7,
		"cowboys": 16,
		"eels": 2,
		"panthers": 8,
		"dragons": 12,
		"rabbitohs": 1, 
		"roosters": 3,
		"tigers": 13
	}


	function pickClub(team_name) {
		team =  team_name.substring(1);
		console.log("team_name " + team);
		console.log(team_list[team])
		currentLight.nrl(team_list[team]);
	}

	function appStart() {
		console.log("nrl.appStart");
	}
	
	function appQuit() {
		console.log("nrl.appQuit");
	}
	
}
