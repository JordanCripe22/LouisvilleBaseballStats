class Player{
    constructor(matchup){
        this.playerMatchups = [];

        this.gameList = [];
        this.playerStats = new PlayerStats(this);

        this.playerId = matchup.playerId;
        this.firstName = matchup.playerFirstName;
        this.lastName = matchup.playerLastName;
        this.teamId = matchup.batterTeam;
        this.batHand = null;
        this.throwHand = null;
        this.freshmanYear = null;
        this.position = null;

        this.addMatchup(matchup);
    }//constructor
}
