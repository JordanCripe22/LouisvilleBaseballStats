class Batter {

    constructor(batterId, matchup){
        this.batterMatchups = [];
        this.baseRunnerList = [];

        this.gameList = [];
        this.batterStats = new BatterStats(this);

        this.batterId = matchup.batterId;
        this.firstName = matchup.batterFirstName;
        this.lastName = matchup.batterLastName;
        this.teamId = matchup.batterTeam;
        this.batHand = null;
        this.throwHand = null;
        this.freshmanYear = null;
        this.position = null;

        this.addMatchup(matchup);
    }//constructor

    updateStats(matchupList){
        this.batterStats = new BatterStats(this);
        this.batterStats.calcBasicStats(matchupList);
    }

    loadGameList(){
        this.gameList = [];
        for (let i = 0; i < this.batterMatchups.length; i++){
            let curMatchup = this.batterMatchups[i];
            let j = 0;
            while (j < this.gameList.length){
                let curGame = this.gameList[j]
                if (curGame.isBatterGame(curMatchup)){
                    this.gameList[j].addMatchup(curMatchup);
                    j = this.gameList.length + 1;
                } else {
                    j++;
                }
            }

            if (j === this.gameList.length){
                let tempBatterGame = new BatterGame(curMatchup);
                this.gameList.push(tempBatterGame);
            }
        }
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

    moveRunnersRating(matchupList){
        let totalOpportunities = [];
        let totalMovedRunners = [];

        for (let i = 0; i < matchupList.length; i++){
            if (isPlateAppearance(matchupList[i])){
                let mob = matchupList[i]['menOnBase'];
                let adv = matchupList[i]['advancedMenOnBase'];
                let result = matchupList[i]['result'];

                let twoOutsMultiplier = 1;
                if (matchupList[i]['outs'] === '2'){
                    twoOutsMultiplier = 1.5;
                }

                let opportunities = 0;
                let movedRunners = 0;

                if (result === '1B'){
                    movedRunners += 1;
                    opportunities += 0.5;
                } else if (result === 'BS'){
                    movedRunners += 1;
                    opportunities += 0.5;
                } else if (result === '2B'){
                    movedRunners += 2;
                    opportunities += 1;
                } else if (result === '3B'){
                    movedRunners += 3;
                    opportunities += 1;
                } else if (result === 'HR'){
                    movedRunners += 4;
                    opportunities += 1;
                } else if (result === 'GDP' || result === 'LDP' || result === 'FDP'){
                    opportunities +=  2;
                } else {

                }

                if (mob === '0'){
                    if (adv !== '0') {
                        console.log('ERROR: ADV: ' + adv + ' with no one on base');
                    }
                } else if (mob === '1') {
                    if (adv === '2'){
                        opportunities++;
                        movedRunners += 1 * twoOutsMultiplier;
                    } else if (adv === '3') {
                        opportunities++;
                        movedRunners += 2 * twoOutsMultiplier;
                    } else if (adv === '4') {
                        opportunities++;
                        movedRunners += 3 * twoOutsMultiplier;
                    } else if (adv === '0') {
                        opportunities++;
                    } else {
                        opportunities =  1;
                        console.log('ERROR: MOB: 1, ADV: ' + adv);
                    }
                } else if (mob === '2') {
                    if (adv === '3'){
                        opportunities = 1;
                        movedRunners += 0.5 * twoOutsMultiplier;
                    } else if (adv === '4') {
                        opportunities = 1;
                        movedRunners += 1.5 * twoOutsMultiplier;
                    } else if (adv === '0') {
                        opportunities++;
                    } else {
                        opportunities = 1;
                        console.log('ERROR: MOB: 2, ADV: ' + adv);
                    }

                } else if (mob === '3') {
                    if (adv === '4'){
                        opportunities = 1;
                        movedRunners += 0.5 * twoOutsMultiplier;
                    } else if (adv === '0') {
                        opportunities = 1;
                    } else {
                        opportunities = 1;
                        console.log('ERROR: MOB: 3, ADV: ' + adv);
                    }

                } else if (mob === '12') {
                    if (adv === '23'){
                        opportunities =  2;
                        movedRunners += 2 * twoOutsMultiplier;
                    } else if (adv === '24') {
                        opportunities =  2;
                        movedRunners += 3 * twoOutsMultiplier;
                    } else if (adv === '34') {
                        opportunities =  2;
                        movedRunners += 4 * twoOutsMultiplier;
                    } else if (adv === '44') {
                        opportunities =  2;
                        movedRunners += 5 * twoOutsMultiplier;
                    } else if (adv === '3') {
                        opportunities =  2;
                        movedRunners += 0.5 * twoOutsMultiplier;
                    } else if (adv === '0') {
                        opportunities =  2;
                    } else {
                        opportunities =  2;
                        console.log('ERROR: MOB: 12, ADV: ' + adv);
                    }
                } else if (mob === '23') {
                    if (adv === '4'){
                        opportunities =  2;
                        movedRunners += 0.5 * twoOutsMultiplier;
                    } else if (adv === '34') {
                        opportunities =  2;
                        movedRunners += 1.5 * twoOutsMultiplier;
                    } else if (adv === '44') {
                        opportunities =  2;
                        movedRunners += 2.5 * twoOutsMultiplier;
                    } else if (adv === '0') {
                        opportunities =  2;
                    } else {
                        opportunities =  2;
                        console.log('ERROR: MOB: 23, ADV: ' + adv);
                    }
                } else if (mob === '13') {
                    if (adv === '4'){
                        opportunities =  2;
                        movedRunners += 1 * twoOutsMultiplier;
                    } else if (adv === '24') {
                        opportunities =  2;
                        movedRunners += 2 * twoOutsMultiplier;
                    } else if (adv === '34') {
                        opportunities =  2;
                        movedRunners += 2.5 * twoOutsMultiplier;
                    } else if (adv === '44') {
                        opportunities =  2;
                        movedRunners += 3 * twoOutsMultiplier;
                    } else if (adv === '2') {
                        opportunities =  2;
                        movedRunners += 0.5 * twoOutsMultiplier;
                    } else if (adv === '0') {
                        opportunities =  2;
                    } else {
                        opportunities =  2;
                        console.log('ERROR: MOB: 13, ADV: ' + adv);
                    }
                } else if (mob === '123') {
                    if (adv === '4'){
                        opportunities =  3;
                        movedRunners += 1 * twoOutsMultiplier;
                    } else if (adv === '34') {
                        opportunities =  3;
                        movedRunners += 2 * twoOutsMultiplier;
                    } else if (adv === '234') {
                        opportunities =  3;
                        movedRunners += 3 * twoOutsMultiplier;
                    } else if (adv === '244') {
                        opportunities =  3;
                        movedRunners += 4 * twoOutsMultiplier;
                    } else if (adv === '344') {
                        opportunities =  3;
                        movedRunners += 4.5 * twoOutsMultiplier;
                    } else if (adv === '444') {
                        opportunities =  3;
                        movedRunners += 5 * twoOutsMultiplier;
                    } else if (adv === '0') {
                        opportunities =  3;
                    } else {
                        opportunities =  3;
                        console.log('ERROR: MOB: 123, ADV: ' + adv);
                    }
                } else {
                    console.log('Missing Men On Base: ' + mob)
                }

                if(opportunities > 0){
                    totalOpportunities.push(opportunities);
                    totalMovedRunners.push(movedRunners);
                }

            }//if: isPlateAppearance

        }//for:

        let opportunitiesSum = 0;
        let movedRunnersSum = 0;
        for (let i = 0; i < totalOpportunities.length; i++){
            opportunitiesSum += totalOpportunities[i];
            movedRunnersSum += totalMovedRunners[i];
        }

        console.log(totalOpportunities);
        console.log(totalMovedRunners);
        console.log(movedRunnersSum);
        console.log(opportunitiesSum);

        return movedRunnersSum/opportunitiesSum;
    }

    addMatchup(matchup){
        this.batterMatchups.push(matchup);
    }//addMatchup

    getPlateAppearances(){
        let plateAppearanceList = [];

        for (let i = 0; i < this.batterMatchups.length; i++) {
            if ( isPlateAppearance(this.batterMatchups[i]) ) {
                plateAppearanceList.push(this.batterMatchups[i]);
            }//if:
        }//for

        return plateAppearanceList;
    }//getPlateAppearances

    getAtBats(){
        let atBatList = [];

        for (let i = 0; i < this.batterMatchups.length; i++){
            if ( isAtBat(this.batterMatchups[i]) ) {
                atBatList.push(this.batterMatchups[i]);
            }//if:
        }//for

        return atBatList;
    }//getAtBats

    getBaseRunning(){
        let baseRunningList = [];

        for (let i = 0; i < this.batterMatchups.length; i++){
            if ( isBaseRunning(this.batterMatchups[i]) ) {
                baseRunningList.push(this.batterMatchups[i]);
            }//if:
        }//for

        return baseRunningList;
    }//getBaseRunning

    isTeamMember(team){
        return this.teamId === team.teamId;
    }





}//CLASS: Batter
