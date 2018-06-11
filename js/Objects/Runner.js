class Runner {

    constructor(jsonRunner){

        this.result = jsonRunner['result'];
        this.playerId = jsonRunner['playerId'];
        this.runScored = jsonRunner['runScored'];

    }//constructor

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
