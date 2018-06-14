//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param jsonRosterList Type: JSON Array
    @return Type: Array of Matchup objects
*/
function loadRosterList(jsonRosterList){
    let rosterList = [];
    let teamKeyList = [];
    for(let teamKey in jsonRosterList){
        teamKeyList.push(teamKey);
    } //for: teamKey

    for(let i = 0; i < teamKeyList.length; i++){
        let curTeam = teamKeyList[i];
        let tempRoster = new Roster(teamKeyList[i]);
        for(let j = 0; j < jsonRosterList[curTeam].length; j++){
            let playerJSON = jsonRosterList[curTeam][j]
            let tempPlayer =  new Player(playerJSON['playerId']);
            tempPlayer.initialize(
                playerJSON['firstName'],
                playerJSON['lastName'],
                playerJSON['team'],
                playerJSON['batHand'],
                playerJSON['throwHand'],
                playerJSON['freshmanYear'],
                playerJSON['positon']
            );

            tempRoster.addPlayer(tempPlayer);
        }//for: j
        rosterList.push(tempRoster);
    }//for: i
    return rosterList;
}//loadRosterList

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param jsonMatchupList Type: JSON Array
    @return Type: Array of Matchup objects
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
    @return Type: Array of Batter objects
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
            let player = getPlayerById(curMatchup.batterId, curMatchup.batterTeam);
            let newBatter = new Batter(player);
            newBatter.matchupList.push(matchupList[i]);
            batterList.push(newBatter);
        }//if:

    }//for: i

    return batterList;
}//loadBatterList

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param matchupList Type: Array of Matchup objects
    @return Type: Array of Pitcher objects
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
            let player = getPlayerById(curMatchup.pitcherId, curMatchup.pitcherTeam);
            let newPitcher = new Pitcher(player);
            newPitcher.matchupList.push(matchupList[i]);
            pitcherList.push(newPitcher);
        }//if: not found
    }//for: i
    return pitcherList;
}//loadPitcherList

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param batterList Type: Array of Batter objects
    @param pitcherList Type: Array of Pitcher objects
    @return Type: Array of Team objects
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
    @param teamId Type: String
    @return Type: Team object
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
    @return Type: Batter object
*/
function getBatterById(batterId){
    for (let i = 0; i < rootBatterList.length; i++){
        let curBatter = rootBatterList[i];
        if(batterId === curBatter.playerId){
            return curBatter;
        }//if:
    }//for:
}//getBatterById

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param matchupList Type: Array of Matchup objects
    @param pitcherList Type: Array of Pitcher objects
    @return Type: Array of Pitcher objects
*/
function addResponsibleRunners(matchupList, pitcherList){
    for(let i = 0; i < matchupList.length; i++){
        let runnerList = matchupList[i].getExtraResponsible();
        count += runnerList.length;
        for (let j = 0; j < runnerList.length; j++){
            let k = 0;
            while (k < pitcherList.length){
                if(pitcherList[k].playerId === runnerList[j].pitcherResponsibleId){
                    pitcherList[k].extraRunners.push(runnerList[j]);
                    k = pitcherList.length;
                } else {
                    k++;
                }//if/else:
            }//while: k
        }//for: j
    }//for: i
    return pitcherList;
}//addResponsibleRunners

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param teamId Type: String
    @return Type: Pitcher object
*/
function getPitcherById(pitcherId){
    for (let i = 0; i < rootPitcherList.length; i++){
        let curPitcher = rootPitcherList[i];
        if(pitcherId === curPitcher.playerId){
            return curPitcher;
        }//if:
    }//for:
}//getPitcherById

function getPlayerById(playerId, teamId){
    let i = 0;
    let curRoster = null;

    while(i < rootRosterList.length){
        if (rootRosterList[i].teamId === teamId){

            curRoster = rootRosterList[i];
            i = rootRosterList.length;
            let j = 0;

            while(j < curRoster.playerList.length){

                let curPlayer = curRoster.playerList[j];
                if(curPlayer.playerId === playerId){
                    return curPlayer;
                }//if: found player
                j++;
            }//while: playerList
            curRoster = rootRosterList[i];
        }//if: found team
        i++;
    }//while: roster list
}//getPlayerById
