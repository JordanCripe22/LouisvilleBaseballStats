class Batter extends Player{

    constructor(matchup){

        super(matchup.batterId, matchup);

        this.baseRunnerList = [];

        this.gameList = [];
        this.batterStats = new BatterStats(this);

    }//constructor

    updateStats(matchupList){
        this.batterStats = new BatterStats(this);
        this.batterStats.calcBasicStats(matchupList);
    }

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
