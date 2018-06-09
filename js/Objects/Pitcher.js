class Pitcher extends Player {

    constructor(matchup){
        super(matchup.pitcherId, matchup);
        this.pitcherStats = new PitcherStats(this);
    }//constructor

    updateStats(matchupList){
        this.pitcherStats = new PitcherStats(this);
        this.pitcherStats.calcBasicStats(matchupList);
    }//updateStats

}//CLASS: Pitcher
