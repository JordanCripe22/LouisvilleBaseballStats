class Pitcher extends Player {

    constructor(player){

        super(player.playerId);

        this.firstName = player.firstName;
        this.lastName = player.lastName;
        this.teamId = player.teamId;
        this.batHand = player.batHand;
        this.throwHand = player.throwHand;
        this.freshmanYear = player.freshmanYear;
        this.position = player.position;

        this.matchupList = [];
        this.gameList = [];

    }//constructor

    updateStats(matchupList){
        this.pitcherStats = new PitcherStats(this);
        this.pitcherStats.calcBasicStats(matchupList);
    }//updateStats

}//CLASS: Pitcher
