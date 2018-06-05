class BatterStats{

    constructor(batter) {
        this.matchupList = batter.batterMatchups;
        this.batterId = batter.batterId;
        this.firstName = batter.firstName;
        this.lastName = batter.lastName;

        this.singles = 0;
        this.doubles = 0;
        this.triples = 0;
        this.homeRuns = 0;

        this.groundOuts = 0;
        this.flyOuts = 0;
        this.lineOuts = 0;
        this.strikeOutsSwinging = 0;
        this.strikeOutsLooking = 0;
        this.buntOuts = 0;
        this.sacBunts = 0;
        this.sacFlys = 0;

        this.walks = 0;
        this.hitByPitch = 0;
        this.reachedOnError = 0;
        this.fieldersChoice = 0;
        this.catchersInterference = 0;

        this.calcBasicStats(batter.batterMatchups);

        /*
        *** NOT YET IMPLEMENTED ***
        this.stolenBases = 0;
        this.caughtStealing = 0;
        this.wildPitches = 0;
        this.pickedOff = 0;
        this.balks = 0;
        this.runnersInterference = 0;
        this.battersInterference = 0;
        this.advancedOnError = 0;
        this.thrownOut = 0;
        this.advancedOnThrow = 0;
        */
    }

    resetStats(){
        this.singles = 0;
        this.doubles = 0;
        this.triples = 0;
        this.homeRuns = 0;

        this.groundOuts = 0;
        this.flyOuts = 0;
        this.lineOuts = 0;
        this.strikeOutsSwinging = 0;
        this.strikeOutsLooking = 0;
        this.buntOuts = 0;
        this.sacBunts = 0;
        this.sacFlys = 0;

        this.walks = 0;
        this.hitByPitch = 0;
        this.reachedOnError = 0;
        this.fieldersChoice = 0;
        this.catchersInterference = 0;

        /*
        *** NOT YET IMPLEMENTED ***
        this.stolenBases = 0;
        this.caughtStealing = 0;
        this.wildPitches = 0;
        this.pickedOff = 0;
        this.balks = 0;
        this.runnersInterference = 0;
        this.battersInterference = 0;
        this.advancedOnError = 0;
        this.thrownOut = 0;
        this.advancedOnThrow = 0;
        */
    }

    countHits(){
        return this.singles + this.doubles + this.triples + this.homeRuns;
    }

    countAtBats(){
        return this.singles + this.doubles + this.triples + this.homeRuns
        + this.groundOuts + this.flyOuts + this.lineOuts + this.strikeOutsLooking
        + this.strikeOutsSwinging + this.buntOuts + this.reachedOnError
        + this.fieldersChoice;
    }

    countPlateAppearances(){
        return this.singles + this.doubles + this.triples + this.homeRuns
        + this.groundOuts + this.flyOuts + this.lineOuts + this.strikeOutsLooking
        + this.strikeOutsSwinging + this.buntOuts + this.reachedOnError
        + this.fieldersChoice + this.catchersInterference + this.hitByPitch
        + this.walks + this.sacFlys;
    }

    calcBasicStats(matchupList){
        this.resetStats();
        for (let i = 0; i < matchupList.length; i++){

            let res = matchupList[i].result;

            if (res === "1B" || res === "BS") {
                this.singles++;
            } else if (res === "2B") {
                this.doubles++;
            } else if (res === "3B") {
                this.triples++;
            } else if (res === "HR") {
                this.homeRuns++;
            } else if (res === "BS") {
                this.buntSingles++;
            } else if (res === "SACB" || res === "SACBFC" || res === "SACBRTE" || res === "SACBRFE" || res === "SACBROE") {
                this.sacBunts++;
            } else if (res === "SACF") {
                this.sacFlys++;
            } else if (res === "GO" || res === "GDP") {
                this.groundOuts++;
            } else if (res === "FO" || res === "FDP") {
                this.flyOuts++;
            } else if (res === "LO" || res === "LDP") {
                this.lineOuts++;
            } else if (res === "BO" || res === "BGO" || res === "BFO" || res === "BPO" || res === "BROE") {
                this.buntOuts++;
            } else if (res === "KS" || res === "KSWP" || res === "KSPB" || res === "BKO" || res === "KSROE") {
                this.strikeOutsSwinging++;
            } else if (res === "KL") {
                this.strikeOutsLooking++;
            } else if (res === "BB" || res === "IBB") {
                this.walks++;
            } else if (res === "HBP") {
                this.hitByPitch++;
            } else if (res === "RFE" || res === "RTE" || res === "ROE") {
                this.reachedOnError++;
            } else if (res === "FC") {
                this.fieldersChoice++;
            } else if (res === "CI") {
                this.catchersInterference++;
            } else if (res === "BR") {

            } else {
                console.log('Missing Result' + res);
            }
            /*
            else if (res === "SB") {
                this.stolenBases++;
            } else if (res === "CS") {
                this.caughtStealing++;
            } else if (res === "WP") {
                this.wildPitch++;
            } else if (res === "PB") {
                this.passedBalls++;
            } else if (res === "PO") {
                this.pickedOff++;
            } else if (res === "FPO") {
                this.failedPickOff++;
            } else if (res === "BLK") {
                this.balks++;
            } else if (res === "RI") {
                this.runnersInterference++;
            } else if (res === "BI") {
                this.battersInterference++;
            } else if (res === "ATE") {
                this.advancedOnThrowingError++;
            } else if (res === "TO") {
                this.thrownOut++;
            } else if (res === "AT") {
                this.advancedOnThrow++;
            } else if (res === "AFE") {
                this.advancedOnFieldingError++;
            } else if (res === "BR") {

            } else {
                console.log('Missing: ' + res);
            }
            */
        }
    }

    countStrikeOuts(){
        return this.strikeOutsLooking + this.strikeOutsSwinging;
    }

    countGDP(){
        let count = 0;
        for(let i = 0; i < this.matchupList.length; i++){
            let res = this.matchupList[i].result;
            if(res === "GDP"){
                count++;
            }
        }
        return count;
    }

    getSlugging(){
        const totalBases = this.countHits() + this.doubles + 2 * this.triples + this.homeRuns;
        return (totalBases / this.countAtBats()).toFixed(3);
    }

    getOnBase(){
        const onBase = this.countHits() + this.walks + this.hitByPitch;
        return (onBase / this.countPlateAppearances()).toFixed(3);
    }

    getAverage(){
        return (this.countHits() / this.countAtBats()).toFixed(3);
    }
}
