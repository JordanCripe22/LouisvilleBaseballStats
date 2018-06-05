class Runner {

    constructor(jsonMatchup, runnerIndex){

        this.runnerFirstName = jsonMatchup['baseRunnersFirstName'][runnerIndex];
        this.runnerLastName = jsonMatchup['baseRunnersLastName'][runnerIndex];
        this.runnerTeam = jsonMatchup['batterTeam'];

        this.runnerId = this.runnerTeam + this.runnerFirstName + this.runnerLastName;

        this.runsScored = jsonMatchup['runsScored'][runnerIndex];
        this.runnerResults = jsonMatchup['baseRunnersResult'][runnerIndex].split(' ');
        this.inningOrder = jsonMatchup['inningOrder'][runnerIndex + 1];

        this.responsiblePitcherId = null;
        this.currentPitcherId = jsonMatchup['pitcherTeam'] + jsonMatchup['pitcherFirstName'] + jsonMatchup['pitcherLastName'];

    }//constructor

    isOut(){
        const baseRunningOutList = [
            'TO1', 'TO2', 'TO3', 'TO4', 'O1', 'O2', 'O3', 'O4', 'CS', 'PO', 'OOP'
        ];

        let i = 0;
        while(i < this.runnerResults.length){
            if (baseRunningOutList.indexOf(this.runnerResults[i]) === -1){
                i++;
            } else {
                return true;
            }//if/else:
        }//while:

        return false;
    }//isOut


}//CLASS: Runner
