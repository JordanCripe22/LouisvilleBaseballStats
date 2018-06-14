class Player{

    constructor(playerId){

        this.playerId = playerId;
        this.firstName = null;
        this.lastName = null;
        this.teamId = null;
        this.batHand = null;
        this.throwHand = null;
        this.freshmanYear = null;
        this.position = null;

    }//constructor

    initialize(firstName, lastName, teamId, batHand, throwHand, freshmanYear, position){
        this.firstName = firstName;
        this.lastName = lastName;
        this.teamId = teamId;
        this.batHand = batHand;
        this.throwHand = throwHand;
        this.freshmanYear = freshmanYear;
        this.position = position;
    }

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
                if (curGame.isGame(curMatchup)){
                    this.gameList[j].addMatchup(curMatchup);
                    j = this.gameList.length + 1;
                } else {
                    j++;
                }//if/else:
            }//while: j

            if (j === this.gameList.length){
                let tempBatterGame = new PlayerGame(curMatchup.gameId, this.playerId);
                this.gameList.push(tempBatterGame);
            }//if:
        }//for: i
    }//loadGameList

    isTeamMember(team){
        return this.teamId === team.teamId;
    }//isTeamMember
}
