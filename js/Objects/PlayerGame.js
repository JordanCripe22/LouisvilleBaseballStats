class PlayerGame {

    constructor(gameId, playerId){
        this.gameId = gameId;
        this.playerId = playerId;
    }//constructor

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

}//CLASS: PlayerGame
