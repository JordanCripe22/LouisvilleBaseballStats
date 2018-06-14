class Runner {

    constructor(gameId, jsonRunner){
        this.gameId = gameId;

        this.result = jsonRunner['result'];
        this.playerId = jsonRunner['playerId'];
        this.pitcherResponsibleId = jsonRunner['pitcherResponsible'];
        this.runScored = jsonRunner['runScored'];
    }//constructor

    isGame(game){
        return game.gameId === this.gameId;
    }

    isOut(){

        const baseRunningOutList = [
            'TO1', 'TO2', 'TO3', 'TO4', 'O1', 'O2', 'O3', 'O4', 'CS', 'PO', 'OOP'
        ];

        let i = 0;
        let resultList = this.result.split(' ');
        while(i < resultList.length){
            if (baseRunningOutList.indexOf(resultList[i]) === -1){
                i++;
            } else {
                return true;
            }//if/else:
        }//while:

        return false;
    }//isOut


}//CLASS: Runner
