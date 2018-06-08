class BatterGame{

    constructor(matchup){
        this.batterId = matchup['batterId'];
        let dateValue = parseInt(matchup['gameYear']) * 1000000;
        dateValue += parseInt(matchup['gameMonth']) * 10000;
        dateValue += parseInt(matchup['gameDay']) * 100;
        dateValue += parseInt(matchup['gameHour']);
        this.gameId = matchup['awayTeam'] + '_' + matchup['homeTeam'] + '_' + dateValue.toString();

        this.matchupList = [];
        this.matchupList.push(matchup);
    }//constructor

    isBatterGame(matchup){
        let dateValue = parseInt(matchup['gameYear']) * 1000000;
        dateValue += parseInt(matchup['gameMonth']) * 10000;
        dateValue += parseInt(matchup['gameDay']) * 100;
        dateValue += parseInt(matchup['gameHour']);

        let gameDateValue = this.gameId.split('_')[2];

        if (dateValue.toString() === gameDateValue
            && this.batterId === matchup['batterId']){
            return true;
        } else {
            return false;
        }
    }

    addMatchup(matchup){
        this.matchupList.push(matchup);
    }

    getGameYear(){
        return parseInt(this.gameId.split('_')[2].substring(0,2));
    }

    getGameMonth(){
        return parseInt(this.gameId.split('_')[2].substring(2,4));
    }

    getGameDay(){
        return parseInt(this.gameId.split('_')[2].substring(4,6));
    }

    getGameHour(){
        return parseInt(this.gameId.split('_')[2].substring(6,8));
    }

    getHomeTeam(){
        return this.gameId.split('_')[1];
    }

    getAwayTeam(){
        return this.gameId.split('_')[0];
    }

}//CLASS: Game

class PitcherGame{

    constructor(matchup){
        this.pitcherId = matchup['pitcherId'];
        let dateValue = parseInt(matchup['gameYear']) * 1000000;
        dateValue += parseInt(matchup['gameMonth']) * 10000;
        dateValue += parseInt(matchup['gameDay']) * 100;
        dateValue += parseInt(matchup['gameHour']);
        this.gameId = matchup['awayTeam'] + '_' + matchup['homeTeam'] + '_' + dateValue.toString();

        this.matchupList = [];
        this.matchupList.push(matchup);
    }//constructor

    isPitcherGame(matchup){
        let dateValue = parseInt(matchup['gameYear']) * 1000000;
        dateValue += parseInt(matchup['gameMonth']) * 10000;
        dateValue += parseInt(matchup['gameDay']) * 100;
        dateValue += parseInt(matchup['gameHour']);

        let gameDateValue = this.gameId.split('_')[2];

        if (dateValue.toString() === gameDateValue
            && this.pitcherId === matchup['pitcherId']){
            return true;
        } else {
            return false;
        }
    }

    addMatchup(matchup){
        this.matchupList.push(matchup);
    }

    getGameYear(){
        return parseInt(this.gameId.split('_')[2].substring(0,2));
    }

    getGameMonth(){
        return parseInt(this.gameId.split('_')[2].substring(2,4));
    }

    getGameDay(){
        return parseInt(this.gameId.split('_')[2].substring(4,6));
    }

    getGameHour(){
        return parseInt(this.gameId.split('_')[2].substring(6,8));
    }

    getHomeTeam(){
        return this.gameId.split('_')[1];
    }

    getAwayTeam(){
        return this.gameId.split('_')[0];
    }

}//CLASS: PitcherGame
