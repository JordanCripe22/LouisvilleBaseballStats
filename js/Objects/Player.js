class Player{
    constructor(playerId, matchup){
        this.playerMatchups = [];

        this.gameList = [];
        this.playerStats = new PlayerStats(this);

        this.playerId = playerId;
        if(playerId === matchup.batterId){
            this.firstName = matchup.batterFirstName;
            this.lastName = matchup.batterLastName;
        } else if (playerId === matchup.pitcherId){
            this.firstName = matchup.pitcherFirstName;
            this.lastName = matchup.pitcherLastName;
        } else {
            console.log('unrecognized playerId')
        }//if/else:


        this.teamId = matchup.batterTeam;
        this.batHand = null;
        this.throwHand = null;
        this.freshmanYear = null;
        this.position = null;

        this.addMatchup(matchup);
    }//constructor

    addMatchup(matchup){
        this.playerMatchups.push(matchup);
    }//addMatchup
}
