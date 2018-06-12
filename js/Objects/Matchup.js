class Matchup{

    constructor(jsonMatchup){

        //Game Info
        this.awayTeam = jsonMatchup['awayTeam'];
        this.homeTeam = jsonMatchup['homeTeam'];
        this.gameMonth = jsonMatchup['gameMonth'];
        this.gameDay = jsonMatchup['gameDay'];
        this.gameYear = jsonMatchup['gameYear'];
        this.gameHour = jsonMatchup['gameHour'];

        //Batter Info
        this.batterTeam = jsonMatchup['batterTeam'];
        this.batterFirstName = jsonMatchup['batterFirstName'];
        this.batterLastName = jsonMatchup['batterLastName'];
        this.batterId = jsonMatchup['batterId'];

        //Pitcher Info
        this.pitcherTeam = jsonMatchup['pitcherTeam'];
        this.pitcherFirstName = jsonMatchup['pitcherFirstName'];
        this.pitcherLastName = jsonMatchup['pitcherLastName'];
        this.pitcherId = jsonMatchup['pitcherId'];

        //Situation (Pre) Info
        this.inning = jsonMatchup['inning'];
        this.balls = jsonMatchup['balls'];
        this.strikes = jsonMatchup['strikes'];
        this.outs = jsonMatchup['outs'];
        this.inningOrder = jsonMatchup['inningOrder'][0];
        this.starterReliever = jsonMatchup['starterReliever'];
        this.batterTeamScore = jsonMatchup['batterTeamScore'];
        this.pitcherTeamScore = jsonMatchup['pitcherTeamScore'];
        this.menOnBase = jsonMatchup['menOnBase'];

        //Situation (Post) Info
        this.result = jsonMatchup['result'];
        this.direction = jsonMatchup['direction'].split('-')[0];
        this.advancedMenOnBase = jsonMatchup['advancedMenOnBase'];
        this.runsBattedIn = jsonMatchup['rbi'];

        //Base Running
        this.baseRunnerList = []

        for (let i = 0; i < jsonMatchup['baseRunners'].length; i++){
            let runner = new Runner(jsonMatchup['baseRunners'][i]);
            this.baseRunnerList.push(runner);
        }//for:

        this.runnerOnFirstId = jsonMatchup['onFirst']['runnerId'];
        this.runnerOnSecondId = jsonMatchup['onSecond']['runnerId'];
        this.runnerOnThirdId = jsonMatchup['onThird']['runnerId'];

        this.onFirstPitcherResponsibleId = jsonMatchup['onFirst']['pitcherResponsibleId'];
        this.onSecondPitcherResponsibleId = jsonMatchup['onSecond']['pitcherResponsibleId'];
        this.onThirdpitcherResponsibleId = jsonMatchup['onThird']['pitcherResponsibleId'];

        this.dateValue = calcDateValue(jsonMatchup);
        this.timeValue = calcTimeValue(jsonMatchup);

        this.gameId = this.awayTeam + '_' + this.homeTeam + '_' + this.dateValue.toString();

        this.JSON = jsonMatchup;

        function calcDateValue(jsonMatchup){
            let dateValue = parseInt(jsonMatchup['gameYear']) * 1000000;
            dateValue += parseInt(jsonMatchup['gameMonth']) * 10000;
            dateValue += parseInt(jsonMatchup['gameDay']) * 100;
            dateValue += parseInt(jsonMatchup['gameHour']);

            return dateValue;
        }//calcDateValue

        function calcTimeValue(jsonMatchup){
            return parseInt(jsonMatchup['inning']) * 100 + parseInt(jsonMatchup['inningOrder']);
        }//calcTimeValue

    }//constructor

    /**
        @param m Type: Matchup
        Return Type: Float
            0 if equal to @param m
            < 0 if occured before @param m
            > 0 if occured after @param m
    */
    compare(m){
        if (this.dateValue === m.dateValue){
            if (this.timeValue === m.timeValue){
                return 0;
            } else {
                return (this.timeValue - m.timeValue) * 0.0001;
            }//if/else:
        } else {
            return this.dateValue - m.dateValue;
        }//if/else:
    }//compare

    calcDayOfWeek(){
        //January 1st 2010 = 1 = Friday

        let dayNo = (parseInt(this.year) - 10) * 365 + Math.floor((parseInt(this.year)-10)/4);
        dayNo += parseInt(this.day);

        let daysBeforeMonth = [0, 31, 59, 120, 151, 181, 212, 243, 273, 304, 334];
        dayNo += daysBeforeMonth[parseInt(this.month)-1];
        if (this.month === "2"){
            if ((parseInt(this.year)-10) % 4 == 0 ){
                dayNo--;
            }
        }

        let dayOfWeekValues = ['fri','sat', 'sun', 'mon', 'tue', 'wed', 'thur'];
        let dayOfWeek = dayOfWeekValues[dayNo%7];

        return dayOfWeek;
    }

    calcMonth(){
        let monthStrings = [
            'jan','feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep',
            'oct', 'nov', 'dec'
        ];

        return monthStrings[parseInt(this.gameMonth) -1];
    }


    caclApproximateHour(){
        let startTime = parseInt(this.gameHour);
        let hoursIntoGame = Math.floor(parseInt(this.inning)/3);
        return (startTime + hoursIntoGame) % 24;
    }

    isSameConference(){
        const opponentList = [
            'LOU', 'BC', 'CLEM', 'DUK', 'FSU', 'GT', 'MIA', 'UNC',
            'NCST', 'ND', 'PITT', 'WF', 'UVA', 'VT'
        ];

        return opponentList.indexOf(this.pitcherTeam) !== -1
            && opponentList.indexOf(this.batterTeam) !== -1;
    }

    isHit(){
        const resultList = ['1B', '2B', '3B', 'HR', 'BS']

        return resultList.indexOf(this.result) !== -1;
    }

    isRunnerIdOnBase(runnerId){
        let tempString = "";

        if (this.runnerOnFirstId === runnerId){
            tempString += "1";
        }

        if (this.runnerOnSecondId === runnerId){
            tempString += "2"
        }

        if (this.runnerOnThirdId === runnerId){
            tempString += "3"
        }
        return parseInt(tempString);
    }

    isLeftyBatter(){
        let batter = getPlayerById(this.batterId);
        let pitcher = getPlayerById(this.pitcherId)
        if (batter.batHand === 'L') {
            return true;
        } else if(batter.batHand === 'S' && pitcher.throwHand === 'R') {
            return true;
        } else {
            return false;
        }
    }

    isLeftyPitcher(){
        let pitcher = getPlayerById(this.pitcherId);
        if (pitcher.throwHand === 'L') {
            return true;
        } else {
            return false;
        }
    }

    isRightyBatter(){
        let batter = getPlayerById(this.batterId);
        let pitcher = getPlayerById(this.pitcherId)
        if (batter.batHand === 'R') {
            return true;
        } else if(batter.batHand === 'S' && pitcher.throwHand === 'L') {
            return true;
        } else {
            return false;
        }
    }

    isRightyPitcher(){
        let pitcher = getPlayerById(this.pitcherId);
        if (pitcher.throwHand === 'R') {
            return true;
        } else {
            return false;
        }
    }

    isPlateAppearance(){
        const resultList = [
            'BB', 'KS', 'KL', '1B', '2B', '3B', 'HR', 'GO', 'FO', 'FC', 'HBP', 'ROE', 'BS',
            'SACB', 'SACF', 'LO', 'BO', 'BGO', 'BFO', 'BKO', 'BPO', 'KSWP', 'KSPB', 'KSROE',
            'IBB', 'RFE', 'RTE', 'LDP', 'FDP', 'GDP','SACBFC', 'SACBRTE', 'SACBRFE',
            'SACBROE', 'CI'
        ];

        return resultList.indexOf(this.result) !== -1;
    }

    isAtBat(){
        const resultList = [
            'KS', 'KL','1B', '2B', '3B', 'HR', 'GO', 'FO', 'FC', 'ROE', 'BS', 'LO', 'BO',
            'BGO', 'BFO', 'BKO', 'BPO', 'KSWP', 'KSPB', 'KSROE', 'RFE', 'RTE', 'LDP', 'FDP', 'GDP'
        ];

        return resultList.indexOf(this.result) !== -1;
    }

    isGroundOut(){
        const resultList = ['GO', 'GDP', 'FC'];

        if(resultList.indexOf(this.result) !== -1){
            return true;
        } else if (this.result === 'ROE' && this.direction.length < 2 && parseInt(this.direction) < 7){
            return true;
        } else {
            return false;
        }
    }

    isFlyout(){
        const resultList = ['FO', 'FDP'];
        if(resultList.indexOf(this.result) !== -1){
            return true;
        } else if (this.result === 'ROE' && this.direction.length < 2 && parseInt(this.direction) > 6){
            return true;
        } else {
            return false;
        }
    }

    isLineOut(){
        const resultList = ['LO', 'LDP'];

        if(resultList.indexOf(this.result) !== -1){
            return true;
        } else {
            return false;
        }
    }

    isStrikeOut(){
        const resultList = ['KS', 'KL', 'BKO', 'KSWP', 'KSPB', 'KSROE'];

        return resultList.indexOf(this.result) !== -1;
    }

    isReachedBase(){
        const resultList = [
            'BB', '1B', '2B', '3B', 'FC', 'HBP', 'ROE', 'BS', 'KSWP', 'KSPB',
            'KSROE', 'IBB', 'RFE', 'RTE', 'SACBFC', 'SACBRTE', 'SACBRFE', 'SACBROE',
            'CI'
        ];

        return resultList.indexOf(this.result) !== -1;
    }

    hasDirection(){
        if (parseInt(this.direction) > 0){
            return true;
        } else{
            return false;
        }
    }

    /**
        @param diff Type: Integer
    */
    isScoreWithin(diff){
        return Math.abs(this.homeScore - this.awayScore) <= diff;
    }

    isBatter(batter){
        return this.batterId === batter.playerId;
    }

    isPitcher(pitcher){
        return this.pitcherId === pitcher.playerId;
    }

    countOuts(){
        let outs = 0;

        const outList = [
            'KS', 'KL', 'GO', 'FO', 'SACB', 'SACF', 'LO',
            'BO', 'BGO', 'BFO', 'BKO', 'BPO','LDP', 'FDP', 'GDP'
        ];

        if(outList.indexOf(this.result) !== -1){
            outs++;
        }

        for(let i = 0; i < this.baseRunnerList.length; i++){
            if (this.baseRunnerList[i].isOut()){
                outs++;
            }//if:
        }//for:

        return outs;
    }//countOuts

}//CLASS: Matchup
