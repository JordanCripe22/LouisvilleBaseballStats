
function mergeSort(list){
    if (list.length === 1){
        return list;
    } else {
        let list1 = list.splice(0, Math.floor(list.length/2));
        let list2 = list

        list1 = mergeSort(list1);
        list2 = mergeSort(list2);

        return merge(list1, list2);
    }//if/else:
}//mergeSort

function merge(list1, list2){
    let combinedList = [];
    while (list1.length > 0 && list2.length > 0){
        if (list1[0].compare(list2[0]) <= 0){
            let lower = list1.splice(0,1)[0];
            combinedList.push(lower);
        } else {
            let lower = list2.splice(0,1)[0];
            combinedList.push(lower);
        }//if/else:
    }//while:

    while (list1.length > 0){
        let rest = list1.splice(0, 1)[0];
        combinedList.push(rest);
    }//while:

    while (list2.length > 0){
        let rest = list2.splice(0, 1)[0];
        combinedList.push(rest);
    }//while:

    return combinedList;
}//merge:

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param yearList Type: Array of Strings
    @param matchupList Type: Array of Matchup Objects
    Return Type: Array of Matchup Objects
        Only return Matchup objects if the year is in @param yearList
*/
function parseMatchupsInYears(yearsList, matchupList){
    let matched = [];
    for(let i = 0; i < matchupList.length; i++){
        if (yearsList.indexOf(matchupList[i].gameYear) !== -1){
            matched.push(matchupList[i]);
        }//if: in list
    }//for: loop matchups
    return matched;
}//getMatchupsInYears

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param onBaseList Type: Array of Strings
    @param matchupList Type: Array of Matchup Objects
    Return Type: Array of Matchup Objects
        Only return Matchup objects if the menOnBase is in @param onBaseList
*/
function parseMatchupsWithMenOnBase(onBaseList, matchupList){
    let matched = [];
    for(let i = 0; i < matchupList.length; i++){
        let j = 0;
        if (onBaseList.indexOf(matchupList[i].menOnBase) !== -1){
            matched.push(matchupList[i]);
        }//if: in list
    }//for: loop matchups
    return matched;
}//getMatchupsWithMenOnBase

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param outsList Type: Array of Strings
    @param matchupList Type: Array of Matchup Objects
    Return Type: Array of Matchup Objects
        Only return Matchup objects if the outs is in @param outsList
*/
function parseMatchupsWithOuts(outsList, matchupList){
    let matched = [];
    if (outsList.indexOf('5') !== -1 && outsList.indexOf('0') === -1){
        for(let i = 0; i < matchupList.length; i++){
            if(matchupList[i].inningOrder === '0'){
                matched.push(matchupList[i]);
            }//if: leadoff
        }//for: loop matchups
    } else {
        for(let i = 0; i < matchupList.length; i++){
            if(outsList.indexOf(matchupList[i].outs) !== -1){
                matched.push(matchupList[i]);
            }//if: in list
        }//for: loop matchups
    }//if/else:
    return matched;
}//getMatchupsWithOuts

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param countList Type: Array of Strings
    @param matchupList Type: Array of Matchup Objects
    Return Type: Array of Matchup Objects
        Only return Matchup objects if the count is in @param countList
*/
function parseMatchupsWithCount(countList, matchupList){
    let matched = [];
    for(let i = 0; i < matchupList.length; i++){
        let j = 0;
        while(j < countList.length){
            let balls = countList[j][0];
            let strikes = countList[j][2];
            if(matchupList[i].balls === balls && matchupList[i].strikes === strikes){
                matched.push(matchupList[i]);
                j = countList.length;
            } else {
                j++;
            }//if/else: found
        }//while: loop years
    }//for: loop matchups
    return matched;
}//getMatchupsWithOuts

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param inningList Type: Array of Strings
    @param matchupList Type: Array of Matchup Objects
    Return Type: Array of Matchup Objects
        Only return Matchup objects if the inning is in @param inningList
*/
function parseMatchupsInInnings(inningList, matchupList){
    let matched = [];
    for(let i = 0; i < matchupList.length; i++){
        let j = 0;
        if(inningList.indexOf(matchupList[i].inning) !== -1){
            matched.push(matchupList[i]);
        } else if(inningList.indexOf('extra') !== -1
            && parseInt(matchupList[i].inning) > 9){
            matched.push(matchupList[i]);
        }//if/else:
    }//for: loop matchups
    return matched;
}//getMatchupsWithOuts

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param dayList Type: Array of Strings
    @param matchupList Type: Array of Matchup Objects
    Return Type: Array of Matchup Objects
        Only return Matchup objects if the day is in @param dayList
*/
function parseMatchupsOnDays(dayList, matchupList){
    let matched = [];
    for(let i = 0; i < matchupList.length; i++){
        let j = 0;
        let curDay = matchup[i].calcDayOfWeek();
        if (dayList.indexOf(curDay) !== -1){
            matched.push(matchupList[i]);
        }//if: in list
    }//for: loop matchups
    return matched;
}//getMatchupsWithOuts

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param monthList Type: Array of Strings
    @param matchupList Type: Array of Matchup Objects
    Return Type: Array of Matchup Objects
        Only return Matchup objects if the month is in @param monthList
*/
function parseMatchupsInMonth(monthList, matchupList){
    let matched = [];
    for(let i = 0; i < matchupList.length; i++){
        let curMonth = matchupList[i].calcMonth();
        if (monthList.indexOf(curMonth) !== -1){
            matched.push(matchupList[i]);
        }//if: in list
    }//for: loop matchups
    return matched;
}//getMatchupsWithOuts

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param opponentIdList Type: Array of Strings
    @param matchupList Type: Array of Matchup Objects
    Return Type: Array of Matchup Objects
        Only return Matchup objects if the opponentId is in @param opponentIdList
*/
function parseMatchupsVsTeams(opponentIdList, matchupList){
    let matchups = [];

    const conferenceIndex = opponentIdList.indexOf('conference');
    if (conferenceIndex !== -1 ){
        matchups = matchups.concat(parseMatchupsInConference(matchupList));
        opponentIdList.splice(conferenceIndex, 1);
    }

    const nonConferenceIndex = opponentIdList.indexOf('nonConference');
    if (nonConferenceIndex !== -1 ){
        matchups = matchups.concat(parseMatchupsNonConference(matchupList));
        opponentIdList.splice(nonConferenceIndex, 1);
    }

    matchups = matchups.concat(parseMatchupsVsOpponent(opponentIdList, matchupList));

    return matchups;
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param matchupList Type: Array of Matchup Objects
    Return Type: Array of Matchup Objects
        Only return Matchup objects if the matchup is in conference
*/
function parseMatchupsInConference(matchupList) {
    let matched = [];
    for(let i = 0; i < matchupList.length; i++){
        if (matchupList[i].isSameConference()){
            matched.push(matchupList[i]);
        }//if: conference
    }//for: loop matchups
    return matched;
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param matchupList Type: Array of Matchup Objects
    Return Type: Array of Matchup Objects
        Only return Matchup objects if the matchup is non conference
*/
function parseMatchupsNonConference(matchupList){
    let matched = [];
    for(let i = 0; i < matchupList.length; i++){
        if (!matchupList[i].isSameConference()){
            matched.push(matchupList[i]);
        }//if: non conference
    }//for: loop matchups
    return matched;
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param opponentIdList Type: Array of Strings
    @param matchupList Type: Array of Matchup Objects
    Return Type: Array of Matchup Objects
        Only return Matchup objects if the batterTeam or pitcherTeam
        is in @param opponentIdList
*/
function parseMatchupsVsOpponent(opponentIdList, matchupList){
    let matched = [];
    for(let i = 0; i < matchupList.length; i++){
        let j = 0;
        if (opponentIdList.indexOf(matchupList[i].battingTeam) !== -1
        ||  opponentIdList.indexOf(matchupList[i].pitchingTeam) !== -1){
              matched.push(matchupList[i]);
        }//if: in list
    }//for: loop matchups
    return matched;
}//getMatchupsWithOuts

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param pitcherIdList Type: Array of Strings
    @param matchupList Type: Array of Matchup Objects
    Return Type: Array of Matchup Objects
        Only return Matchup objects if the pitcherId is in @param pitcherIdList
*/
function parseMatchupsVsPitcher(pitcherIdList, matchupList){
    let matched = [];
    for(let i = 0; i < matchupList.length; i++){
        if (pitcherIdList.indexOf(matchupList[i].pitcherId) !== -1){
            matched.push(matchupList[i]);
        }//if: in list
    }//for: loop matchups
    return matched;
}//getMatchupsWithOuts

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param lowerBound Type: Integer
    @param upperBound Type: Integer
    @param matchupList Type: Array of Matchup Objects
    Return Type: Array of Matchup Objects
        Only return Matchup objects if the score is between
        the @param lowerBound and @param upperBound
*/
function parseMatchupsDiffScoreBetween(lowerBound, upperBound, matchupList){
    //TODO: write function
}//getMatchupsScoreBetween

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

/**
    @param matchupList Type: Array of Matchup Objects
    Return Type: Array of Matchup Objects
        Orders @param matchupList in descending order
*/
function orderMatchupsDescending(matchupList){
    return mergeSort(matchupList);
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

/**
    @param matchupList Type: Array of Matchup Objects
    Return Type: Array of Matchup Objects
        Orders @param matchupList in ascending order
*/
function orderMatchupsAscending(matchupList){
    return mergeSort(matchupList).reverse();
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

/**
    @param matchupList Type: Array of Matchup Objects
    Return Type: Array of Matchup Objects
        Only returns matchups that qualify as at bats
*/
function parseAtBats(matchupList){
    let matched = [];
    for(let i = 0; i < matchupList.length; i++){
        if(matchupList[i].isAtBat()){
            matched.push(matchupList[i]);
        }//if: matched
    }//for: i
    return matched;
}//parseAtBats

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

/**
    @param matchupList Type: Array of Matchup Objects
    Return Type: Array of Matchup Objects
        Only returns matchups that qualify as plate appearances
*/
function parsePlateAppearances(matchupList){
    let matched = [];
    for(let i = 0; i < matchupList.length; i++){
        if(matchupList[i].isPlateAppearance()){
            matched.push(matchupList[i]);
        }//if: matched
    }//for: i
    return matched;
}//parsePlateAppearances

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param lastX Type: Integer
    @param matchupList Type: Array of Matchup Objects
    Return Type: Array of Matchup Objects
        Only returns the @param lastX Matchup objects
*/
function parseLastAppearances(lastX, matchupList){
    let matched = [];
    let matched = orderMatchupsDescending(matchupList);
    matched = parsePlateAppearances(matched);
    return matched.splice(matched.length - lastX, lastX);
}//parseLastAppearances

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param matchupList Type: Array of Matchup Objects
    Return Type: Integer
        Counts number of hits in @param matchupList
*/
function countHits(matchupList){
    let count = 0;
    for(let i = 0; i < matchupList.length; i++){
        if(matchupList[i].isHit()){
            count++;
        }//if:
    }//for: i
    return count;
}//countHits

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param jsonArray Type: Array of JSON objects
    @param key Type: Strin
    @param value Type: String
    Return Type: Array of JSON objects
        Only returns JSON objects that has @param key equal to @param value
*/
function selectWhereEqual(jsonArray, key, value){
    let matched = [];
    for (let i = 0; i < jsonArray.length; i++){
        if(jsonArray[i][key] === value){
            matched.push(jsonArray[i]);
        }
    }
    return matched;
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param jsonArray Type: Array of JSON objects
    @param key Type: Strin
    @param value Type: String
    Return Type: Array of JSON objects
        Only returns JSON objects that has @param key not equal to @param value
*/
function selectWhereNotEqual(jsonArray, key, value){
    let matched = [];
    for (let i = 0; i < jsonArray.length; i++){
        if(jsonArray[i][key] !== value){
            matched.push(jsonArray[i]);
        }
    }
    return matched;
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param jsonArray Type: Array of JSON objects
    @param key Type: Strin
    @param value Type: String
    Return Type: Array of JSON objects
        Only returns JSON objects that has @param key greater than @param value
*/
function selectWhereGreater(jsonArray, key, value){
    let matched = []
    for (let i = 0; i < jsonArray.length; i++){
        if(parseInt(jsonArray[i][key]) > parseInt(value)){
            matched.push(jsonArray[i]);
        }
    }
    return matched;
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param jsonArray Type: Array of JSON objects
    @param key Type: Strin
    @param value Type: String
    Return Type: Array of JSON objects
        Only returns JSON objects that has @param key less than @param value
*/
function selectWhereLess(jsonArray, key, value){
    let matched = [];
    for (let i = 0; i < jsonArray.length; i++){
        if(parseInt(jsonArray[i][key]) < parseInt(value)){
            matched.push(jsonArray[i]);
        }
    }
    return matched;
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param jsonArray Type: Array of JSON objects
    @param key Type: Strin
    Return Type: Array of values
        returns the domain of the @param key
*/
function getDomain(jsonArray, key){
    let domain = [];
    for (let i = 0; i < jsonArray.length; i++){
        let tempValue = jsonArray[i][key];
        let j = 0;
        while(j < domain.length && tempValue !== domain[j]){
            j++;
        }//while:

        if(j === domain.length){
            domain.push(tempValue);
        }//if:
    }//for:
    return domain;
}//getDomain

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param jsonArray Type: Array of JSON objects
    @param keys Type: Array of Strings
    Return Type: Array of values
        returns the domain of tuples with @param keys
*/
function getTupleDomain(jsonArray, keys){
    let domain = [];
    let tuple = [];
    for (let i = 0; i < jsonArray.length; i++){
        let arrTuple = [];

        for(let j = 0; j < keys.length; j++){
            let tempValue = jsonArray[i][keys[j]];
            arrTuple.push(tempValue);
        }//for:

        let matched = false;
        let k = 0;
        while(k < domain.length && !matched){
            let l = 0;
            while(l < domain[k].length && domain[k][l] === arrTuple[l]){
                l++;
            }//while:

            if (l === domain[k].length){
                matched = true;
            } else {
                k++;
            }//if/else:
        }//while:

        if(k === domain.length){
            domain.push(arrTuple);
        }//if:

    }//for:
    return domain;
}//getTupleDomain


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param jsonArray Type: Array of JSON objects
    @param key Type: String
    @param value Type: String
    Return Type: Integer
        returns the number of times the @param key has a @param value
*/
function count(jsonArray, key, value){
    let count = 0;
    for (let i = 0; i < jsonArray.length; i++){
        if(jsonArray[i][key] === value){
            count ++;
        }
    }
    return count;
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/**
    @param jsonArray Type: Array of JSON objects
    @param key Type: String
    Return Type: Integer
        returns the sum of values with @param key
*/
function sum(jsonArray, key){
    let sum = 0;
    for (let i = 0; i < arr.length; i++){
        if(parseInt(arr[i][key])){
            sum += tempValue;
        }
    }
    return sum;
}
