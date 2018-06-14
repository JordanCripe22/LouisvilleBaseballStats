class Batter extends Player {

    constructor(player){

        super(player.playerId);

        this.firstName = player.firstName;
        this.lastName = player.lastName;
        this.teamId = player.teamId;
        this.batHand = player.batHand;
        this.freshmanYear = player.freshmanYear;
        this.position = player.position;

        this.matchupList = [];
        this.gameList = [];

        this.baseRunnerList = [];

    }//constructor

    updateStats(matchupList){
        this.batterStats = new BatterStats(this);
        this.batterStats.calcBasicStats(matchupList);
    }

    loadGameList(){
        for (let i = 0; i < this.matchupList.length; i++){
            let curMatchup = this.matchupList[i];
            let j = 0;
            while (j < this.gameList.length){
                let curGame = this.gameList[j]
                if (curMatchup.isGame(curGame)){
                    this.gameList[j].addMatchup(curMatchup);
                    j = this.gameList.length + 1;
                } else {
                    j++;
                }//if/else:
            }//while: j

            if (j === this.gameList.length){
                let tempBatterGame = new BatterGame(curMatchup.gameId, this.playerId);
                this.gameList.push(tempBatterGame);
            }//if:
        }//for: i
    }//loadGameList

    consistencyRating(matchupList){
        let sortedList = getLastAppearances(matchupList.length, matchupList);
        let streakList = []
        let curStreak = 0;
        for (let i = 0; i < sortedList.length; i++){
            if (isAtBat(sortedList[i])){
                if (isHit(sortedList[i])){
                    streakList.push(curStreak);
                    curStreak = 0;
                } else {
                    curStreak++;
                }//if/else:
            }//if:
        }//for:
        streakList.push(curStreak);

        let numerator = 0;
        let denominator = 0;
        for(let i = 0; i < streakList.length; i++){
            numerator += 1 + streakList[i] * (streakList[i] - 1);
            denominator += streakList[i] + 1;
        }//for: i
    }//consistencyRating

}//CLASS: Batter
