class PitcherGame extends PlayerGame {

    constructor(gameId, pitcherId){
        super(gameId, pitcherId);

        this.matchupList = [];
        this.extraRunners = [];

        this.earnedRuns = 0;
        this.unearnedRuns = 0;
    }//constructor

    addExtraRunner(runner){
        this.extraRunners.push(runner);
    }

    loadRuns(){
        for(let i = 0; i < this.matchupList.length; i++){
            let curMatchup = this.matchupList[i];

            for(let j = 0; j < curMatchup.baseRunnerList.length; j++){
                let curRunner = curMatchup.baseRunnerList[j];
                if (curRunner.pitcherResponsibleId === this.playerId){
                    if (curRunner.runScored === '1'){
                        this.earnedRuns++;
                    } else if (curRunner.runScored === '1.1'){
                        this.unearnedRuns++;
                    }//if/else:
                }//if: pitcher responsible
            }//for: j
        }//for: i

        for(let i = 0; i < this.extraRunners.length; i++){
            let curRunner = this.extraRunners[i];
            if (curRunner.runScored === "1"){
                this.earnedRuns++;
            } else if (curRunner.runScored === '1.1'){
                this.unearnedRuns++;
            }//if/else:
        }//for: i
    }//loadRuns

    countRuns(){
        return this.earnedRuns + this.unearnedRuns;
    }




}//CLASS: BatterGame
