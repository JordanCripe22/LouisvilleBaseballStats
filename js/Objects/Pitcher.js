class Pitcher {

    constructor(matchup){
        this.pitcherMatchups = [];
        this.gameList = [];

        this.pitcherStats = new PitcherStats(this);

        this.pitcherId = matchup.pitcherId;
        this.firstName = matchup.pitcherFirstName;
        this.lastName = matchup.pitcherLastName;
        this.teamId = matchup.pitcherTeam;
        this.batHand = null;
        this.throwHand = null;
        this.freshmanYear = null;
        this.position = null;

        this.addMatchup(matchup);
    }//constructor

    updateStats(matchupList){
        this.pitcherStats = new PitcherStats(this);
        this.pitcherStats.calcBasicStats(matchupList);
    }

    loadGameList(){
        for (let i = 0; i < this.pitcherMatchups.length; i++){
            let curMatchup = this.pitcherMatchups[i];
            let j = 0;
            while (j < this.gameList.length){
                let curGame = this.gameList[j];
                if (curGame.isPitcherGame(curMatchup)){
                    this.gameList[j].addMatchup(curMatchup);
                    j = this.gameList.length + 1;
                } else {
                    j++;
                }
            }

            if (j === this.gameList.length){
                let tempPitcherGame = new PitcherGame(curMatchup);
                this.gameList.push(tempPitcherGame);
            }
        }

    }

    addMatchup(matchup){
        this.pitcherMatchups.push(matchup);
    }//addMatchup

    isTeamMember(team){
        return this.teamId === team.teamId;
    }

}//CLASS: Pitcher
