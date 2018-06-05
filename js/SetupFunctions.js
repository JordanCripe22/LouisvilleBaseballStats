//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param jsonMatchupList Type: JSON Array
    Return Type: Array of Matchup objects
*/
function loadMatchupList(jsonMatchupList){
    let matchupList = [];

    for (let i = 0; i < jsonMatchupList.length; i++){
        if(jsonMatchupList[i]['result'] !== ''){
            let matchup = new Matchup(jsonMatchupList[i]);
            matchupList.push(matchup);
        }
    }

    return matchupList;
}//loadMatchupList

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param matchupList Type: Array of Matchup objects
    Return Type: Array of Batter objects
*/
function loadBatterList(matchupList){

    let batterList = [];

    for (let i = 0; i < matchupList.length; i++){

        let j = 0;
        let curMatchup = matchupList[i];

        while(j < batterList.length){
            if (curMatchup.isBatter(batterList[j])){
                batterList[j].addMatchup(curMatchup);
                j = batterList.length + 1;
            } else {
                j++;
            }//if/else:
        }//while: j

        if (j === batterList.length){
            let newBatter = new Batter(curMatchup);
            batterList.push(newBatter);
        }//if:

    }//for: i

    return batterList;
}//loadBatterList

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param matchupList Type: Array of Matchup objects
    Return Type: Array of Pitcher objects
*/
function loadPitcherList(matchupList){
    let pitcherList = [];
    for (let i = 0; i < matchupList.length; i++){

        let j = 0;
        let curMatchup = matchupList[i];

        while(j < pitcherList.length){
            if (curMatchup.isPitcher(pitcherList[j])){
                pitcherList[j].addMatchup(curMatchup);
                j = pitcherList.length + 1;
            } else {
                j++;
            }//if/else:
        }//while: j

        if (j === pitcherList.length){
            let newPitcher = new Pitcher(curMatchup);
            pitcherList.push(newPitcher);
        }//if: not found

    }//for: i

    return pitcherList;
}//loadPitcherList

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param batterList Type: Array of Batter objects
    @param pitcherList Type: Array of Pitcher objects
    Return Type: Array of Team objects
*/
function loadTeamList(batterList, pitcherList){
    let teamList = [];

    for (let i = 0; i < batterList.length; i++){
        let j = 0;
        let curBatter = batterList[i];
        while (j < teamList.length){
            if (curBatter.isTeamMember(teamList[j])){
                teamList[j].addBatter(curBatter);
                j = teamList.length + 1;
            } else {
                j++;
            }//if/else:
        }//while:

        if(j === teamList.length){
            let team = new Team(curBatter.teamId);
            team.addBatter(curBatter);
            teamList.push(team);
        }//if: not found
    }//for: batterList

    for (let i = 0; i < pitcherList.length; i++){
        let j = 0;
        let curPitcher = pitcherList[i];
        while (j < teamList.length){
            if (curPitcher.isTeamMember(teamList[j])){
                teamList[j].addPitcher(curPitcher);
                j = teamList.length + 1;
            } else {
                j++;
            }//if/else:
        }//while:

        if(j === teamList.length){
            let team = new Team(curPitcher.teamId);
            team.addPitcher(curPitcher);
            teamList.push(team);
        }//if: not found
    }//for:
    return teamList;
}//loadTeamList

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param batterList Type: Array of Batter objects
    @param pitcherList Type: Array of Pitcher objects
    Return Type: Array of Team objects
*/
function addBaseRunningToBatters(matchupList, batterList){
    for (let i = 0; i < matchupList.length; i++){
        let baseRunnerList = matchupList[i].baseRunnerList;
        for (let j = 0; j < baseRunnerList.length; j++){

            let curRunner = baseRunnerList[j];
            let k = 0;

            while(k < batterList.length){
                if (batterList[k].batterId == curRunner.runnerId){
                    batterList[k].baseRunnerList.push(curRunner);
                    k = batterList.length + 1;
                } else {
                    k++;
                }//if/else:
            }//while: k

        }//for: j
    }//for: i
    return batterList;
}//addBaseRunningToBatters

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param teamId Type: String
    Return Type: Team object
*/
function getTeamById(teamId){
    for (let i = 0; i < rootTeamList.length; i++){
        let curTeam = rootTeamList[i];
        if(teamId === curTeam.teamId){
            return curTeam;
        }//if:
    }//for:
}//getTeamById

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param batterId Type: String
    Return Type: Batter object
*/
function getBatterById(batterId){
    for (let i = 0; i < rootBatterList.length; i++){
        let curBatter = rootBatterList[i];
        if(batterId === curBatter.batterId){
            return curBatter;
        }//if:
    }//for:
}//getBatterById

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param teamId Type: String
    Return Type: Pitcher object
*/
function getPitcherById(pitcherId){
    for (let i = 0; i < rootPitcherList.length; i++){
        let curPitcher = rootPitcherList[i];
        if(pitcherId === curPitcher.pitcherId){
            return curPitcher;
        }//if:
    }//for:
}//getPitcherById
