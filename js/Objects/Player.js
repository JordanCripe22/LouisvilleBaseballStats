class Player{

    constructor(playerId, matchup){

        this.matchupList = [];
        this.gameList = [];

        this.playerId = playerId;

        if(playerId === matchup.batterId){
            this.firstName = matchup.batterFirstName;
            this.lastName = matchup.batterLastName;
            this.teamId = matchup.batterTeam;
        } else if (playerId === matchup.pitcherId){
            this.firstName = matchup.pitcherFirstName;
            this.lastName = matchup.pitcherLastName;
            this.teamId = matchup.pitcherTeam;
        } else {
            console.log('unrecognized playerId')
        }//if/else:

        this.batHand = null;
        this.throwHand = null;
        this.freshmanYear = null;
        this.position = null;

        this.addMatchup(matchup);

    }//constructor

    addMatchup(matchup){
        this.matchupList.push(matchup);
    }//addMatchup

    getAtBats(){
        let atBatList = [];
        for (let i = 0; i < this.matchupList.length; i++){
            if ( this.matchupList[i].isAtBat() ) {
                atBatList.push(this.matchupList[i]);
            }//if:
        }//for
        return atBatList;
    }//getAtBats

    getPlateAppearances(){
        let plateAppearanceList = [];
        for (let i = 0; i < this.matchupList.length; i++){
            if (this.matchupList[i].isPlateAppearance()) {
                plateAppearanceList.push(this.matchupList[i]);
            }//if:
        }//for
        return atBatList;
    }//getAtBats

    loadGameList(){
        this.gameList = [];
        for (let i = 0; i < this.matchupList.length; i++){
            let curMatchup = this.matchupList[i];
            let j = 0;
            while (j < this.gameList.length){
                let curGame = this.gameList[j]
                if (curGame.isBatterGame(curMatchup)){
                    this.gameList[j].addMatchup(curMatchup);
                    j = this.gameList.length + 1;
                } else {
                    j++;
                }//if/else:
            }//while: j

            if (j === this.gameList.length){
                let tempBatterGame = new BatterGame(curMatchup);
                this.gameList.push(tempBatterGame);
            }//if:
        }//for: i
    }//loadGameList

    isTeamMember(team){
        return this.teamId === team.teamId;
    }//isTeamMember
}
