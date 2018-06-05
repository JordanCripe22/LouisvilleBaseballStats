class Consistency{

    constructor(player, isBatter){
        this.player = player;
        this.isBatter = isBatter;
    }

    /**
        @param matchupList
        @param groupSize
        @param incrementSize
        Return Type: Array of Floats fixed to 3 decimal places
        REQUIRES: incrementSize > 0
    */
    continuoslyGroupBattingAverage(matchupList, groupSize, incrementSize){

        let groupList = [];
        let curGroup = [];

        let calcAverage = function(matchupList){
            return (countHits(matchupList) / matchupList.length).toFixed(3);
        }

        //load ordered list of matchups with only at bats
        let atBatList = parseAtBats(matchupList);
        atBatList = orderMatchupsDescending(atBatList);

        //initialize first group
        let curGroup = atBatList.splice(0, groupSize);

        //add first group
        groupList.push(calcAverage(curGroup));

        while(atBatList.length > 0){
            //remove incrementSize matchups from atBatList
            let atBatsToAdd = atBatList.splice(0, incrementSize);

            //remove incrementSize matchups from curGroup
            curGroup.splice(0, incrementSize);

            curGroup = curGroup.concat(toAddAtBats);
            groupList.push(calcAverage(curGroup));
        }//while:

        return groupList;

    }//continuoslyGroupAtBats

    hittingConsistencyRating(matchupList){
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
                }
            }
        }
        streakList.push(curStreak);
        console.log(streakList);

        let numerator = 0;
        let denominator = 0;
        for(let i = 0; i < streakList.length; i++){
            numerator += 1 + streakList[i] * (streakList[i] - 1);
            denominator += streakList[i] + 1;
        }
        console.log(numerator);
        console.log(denominator);
        console.log(denominator/numerator);
    }


    reachBaseConsistencyRating(matchupList){
        let sortedList = getLastAppearances(matchupList.length, matchupList);
        let streakList = []
        let curStreak = 0;
        for (let i = 0; i < sortedList.length; i++){
            if (isPlateAppearance(sortedList[i])){
                if (isHit(sortedList[i])){
                    streakList.push(curStreak);
                    curStreak = 0;
                } else {
                    curStreak++;
                }
            }
        }
        streakList.push(curStreak);
        console.log(streakList);

        let numerator = 0;
        let denominator = 0;
        for(let i = 0; i < streakList.length; i++){
            numerator += 1 + streakList[i] * (streakList[i] - 1);
            denominator += streakList[i] + 1;
        }
        console.log(numerator);
        console.log(denominator);
        console.log(denominator/numerator);
    }

}//CLASS: Consistency
