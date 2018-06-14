class Pitcher extends Player {

    constructor(player){

        super(player.playerId);

        this.firstName = player.firstName;
        this.lastName = player.lastName;
        this.teamId = player.teamId;
        this.throwHand = player.throwHand;
        this.freshmanYear = player.freshmanYear;
        this.position = player.position;

        this.matchupList = [];
        this.gameList = [];

        this.extraRunners = [];

    }//constructor

    updateStats(matchupList){
        this.loadGameList();
        this.pitcherStats = new PitcherStats(this);
        this.pitcherStats.calcBasicStats(matchupList);
        console.log(this.firstName + ' ' + this.lastName + ' ERA: ' + this.pitcherStats.getERA());
    }//updateStats


    loadGameList(){
        //load matchups
        for (let i = 0; i < this.matchupList.length; i++){
            let curMatchup = this.matchupList[i];
            let j = 0;
            while (j < this.gameList.length){
                let curGame = this.gameList[j];
                if (curMatchup.isGame(curGame)){
                    this.gameList[j].addMatchup(curMatchup);
                    j = this.gameList.length + 1;
                } else {
                    j++;
                }//if/else:
            }//while: j

            //game not found, create new PitcherGame
            if (j === this.gameList.length){
                let tempPitcherGame = new PitcherGame(curMatchup.gameId, this.playerId);
                tempPitcherGame.addMatchup(curMatchup);
                this.gameList.push(tempPitcherGame);
            }//if:

        }//for: i

        //load extra runners
        for(let i = 0; i < this.extraRunners.length; i++){
            let curRunner = this.extraRunners[i];
            let j = 0;
            while (j < this.gameList.length){
                let curGame = this.gameList[j];
                if (curRunner.isGame(curGame)){
                    this.gameList[j].addExtraRunner(curRunner);
                    j = this.gameList.length;
                } else {
                    j++;
                }//if/else:
            }//while: j
        }//for: i

        //intialize games
        for(let i = 0; i < this.gameList.length; i++){
            this.gameList[i].loadRuns();
        }//for:

    }//loadGameList



}//CLASS: Pitcher
