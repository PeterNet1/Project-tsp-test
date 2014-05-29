function BaseModel () {
	return PCD ({
		loggedIn: null,
		players: new Object(),
		playerName: null,
		characterId: null
	});
}

function LevelModel() {
	this.tileGrid = null;
	this.columnsCount = null;
	this.textures = null;
	this.collidables = null;
}

var Movement = {
	LEFT:"LEFT",
	RIGHT:"RIGHT",
	UP:"UP",
	DOWN:"DOWN",
	HOLD:"HOLD"
}

function PlayerModel() {
	this.name = null;
	this.characterId = null;
	//Should be a member of the Movement object
	this.movement = null;
	this.characterRectX;
	this.characterRectY;
	this.characterSpeed;
}