class Team {
    constructor(teamId){
        this.teamId = teamId;
        this.teamLocation = null;
        this.nickname = null;

        this.batterList = [];
        this.pitcherList = [];
    }

    addBatter(b){
        this.batterList.push(b);
    }

    addPitcher(p){
        this.pitcherList.push(p);
    }

    addTotalBatter(){
        let teamTotalBatterMatchups = [];

        for(let i = 0; i < this.batterList.length; i++) {
            let curBatter = this.batterList[i];
            for(let j = 0; j < curBatter.batterMatchups.length; j++){
                let curMatchup = curBatter.batterMatchups[j]
                teamTotalBatterMatchups.push(curMatchup);
            }//for: j
        }//for: i

        let teamTotalBatter = new Batter(teamTotalBatterMatchups[0]);
        teamTotalBatter.batterMatchups = teamTotalBatterMatchups;
        teamTotalBatter.batterId = 'total';
        teamTotalBatter.firstName = 'Total';
        teamTotalBatter.lastName = '';

        this.addBatter(teamTotalBatter);
    }

    addTotalPitcher(){
        let teamTotalPitcherMatchups = [];

        for(let i = 0; i < this.pitcherList.length; i++) {
            let curPitcher = this.pitcherList[i];
            for(let j = 0; j < curPitcher.pitcherMatchups.length; j++){
                let curMatchup = curPitcher.pitcherMatchups[j]
                teamTotalPitcherMatchups.push(curMatchup);
            }//for: j
        }//for: i

        let teamTotalPitcher = new Pitcher(teamTotalPitcherMatchups[0]);
        teamTotalPitcher.pitcherMatchups = teamTotalPitcherMatchups;
        teamTotalPitcher.pitcherId = 'total';
        teamTotalPitcher.firstName = 'Total';
        teamTotalPitcher.lastName = '';

        this.addPitcher(teamTotalPitcher);
    }


    /**
        Requires: Exists a player in this.playerList matching @param playerId
        Ensures: Return of Player object matching t@param playerId
    */
    getPlayer(playerId){
        let i = 0;
        while(this.playerList[i].playerId !== playerId){
            i++;
        }
        return this.playerList[i];
    }

    /**
        Requires: Exists a player in this.playerList with corresponding playerId
                for every playerId in @param playerIdList
        Ensures: Return array of Player objects matching the incoming playerId
                from @param playerIdList
    */
    getListOfPlayers(playerIdList){
        listOfPlayerObjects = []
        for (let i = 0; i < playerIdList.length; i++){
            let j = 0;
            while(this.playerList[j].playerId !==  playerIdList[i]){
                j++;
            }//while:
            let foundPlayer = this.playerList[j];
            listOfPlayerObjects.push(foundPlayer);
        }//for:

        return listOfPlayerObjects;
    }
}