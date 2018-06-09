class Team {
    constructor(teamId){
        this.teamId = teamId;
        this.teamLocation = null;
        this.nickname = null;

        this.batterList = [];
        this.pitcherList = [];
    }

    getAllBatterMatchups(){
        let teamBatterMatchups = [];
        for(let i = 0; i < this.batterList.length; i++){
            for(let j = 0; j < this.batterList[i].playerMatchups.length; j++){
                let tempMatchup = this.batterList[i].playerMatchups[j];
                teamBatterMatchups.push(tempMatchup);
            }//for: j
        }//for: i
        teamBatterMatchups = mergeSort(teamBatterMatchups);
        return teamBatterMatchups;
    }//getAllBatterMatchups

    getAllPitcherMatchups(){
        let teamPitcherMatchups = [];
        for(let i = 0; i < this.pitcherList.length; i++){
            for(let j = 0; j < this.pitcherList[i].matchupList.length; j++){
                let tempMatchup = this.pitcherList[i].matchupList[j];
                teamPitcherMatchups.push(tempMatchup);
            }//for: j
        }//for: i
        teamPitcherMatchups = mergeSort(teamPitcherMatchups);
        return teamPitcherMatchups;
    }//getAllPitcherMatchups

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
            for(let j = 0; j < curBatter.matchupList.length; j++){
                let curMatchup = curBatter.matchupList[j];
                teamTotalBatterMatchups.push(curMatchup);
            }//for: j
        }//for: i

        let teamTotalBatter = new Batter(teamTotalBatterMatchups[0]);
        teamTotalBatter.matchupList = teamTotalBatterMatchups;
        teamTotalBatter.playerId = 'total';
        teamTotalBatter.firstName = 'Total';
        teamTotalBatter.lastName = '';

        this.addBatter(teamTotalBatter);
    }

    addTotalPitcher(){
        let teamTotalPitcherMatchups = [];

        for(let i = 0; i < this.pitcherList.length; i++) {
            let curPitcher = this.pitcherList[i];
            for(let j = 0; j < curPitcher.matchupList.length; j++){
                let curMatchup = curPitcher.matchupList[j]
                teamTotalPitcherMatchups.push(curMatchup);
            }//for: j
        }//for: i

        let teamTotalPitcher = new Pitcher(teamTotalPitcherMatchups[0]);
        teamTotalPitcher.matchupList = teamTotalPitcherMatchups;
        teamTotalPitcher.playerId = 'total';
        teamTotalPitcher.firstName = 'Total';
        teamTotalPitcher.lastName = '';

        this.addPitcher(teamTotalPitcher);
    }


    /**
        Requires: Exists a player in this.playerList matching @param playerId
        Ensures: Return of Player object matching @param playerId
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
