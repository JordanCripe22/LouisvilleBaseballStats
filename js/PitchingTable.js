
class PitchingTable{

    constructor(pitcherList){
        this.pitcherList = pitcherList;
        this.filterList = [];

        this.lvl1Text = "Year";
        this.lvl1Value = "gameYear";

        this.lvl2Text = "2018"
        this.lvl2Value = "18";

        this.lvl3Text = "";
        this.lvl3Value = "none";

        this.initialize();
    }

    initialize(){
        this.getTableBody().appendChild(this.createTableHeaderRow());
        this.addArrowEventListeners();
        this.addColumnHoverEventListeners();
    }

    getTableBody(){
        return document.getElementById('pitchingTableBody');
    }


    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        Return Type: Void
            updates the current state of the filters at all three levels
    */
    updateCurrentLevels(){
        let lvl1 = document.getElementById('pitchingFilter1');
        this.lvl1Value = lvl1.value;
        this.lvl1Text = lvl1.options[lvl1.selectedIndex].textContent;

        let lvl2 = document.getElementById('pitchingFilter2');
        this.lvl2Value = lvl2.value;
        this.lvl2Text = lvl2.options[lvl2.selectedIndex].textContent;

        this.lvl3Text = document.getElementById('pitchingFilter3').textContent;
        this.lvl3Value = document.getElementById('pitchingFilter3').value;
        //TODO: update level 3
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        Return Type: Void
            resets filter list and clears existing user created filters
    */
    removeAllFilters(){
        document.getElementById('currentPitchingFiltersTableBody').remove();

        let filterTable = document.getElementById('currentPitchingFiltersTable');

        let newTableBody = document.createElement('tbody');
        newTableBody.setAttribute('id', 'currentPitchingFiltersTableBody');

        filterTable.appendChild(newTableBody);

        this.filterList = [];
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        Return Type: Void
            updates filter list based on dropdowns and input boxes
    */
    updateFilterList(){
        this.filterList = []
        let currentFilters = document.getElementById('currentPitchingFiltersTableBody').querySelectorAll(".filter-container");
        for(let i = 0; i < currentFilters.length; i++){
            let curCategory = currentFilters[i].getAttribute('category');
            let curRestraint = currentFilters[i].getAttribute('restraint');
            let newFilter = new Filter();
            newFilter.categoryValue = curCategory;
            newFilter.restraintValue = curRestraint;
            this.filterList.push(newFilter);
        }
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        Return Type: Void
            adds new filter to this.filterList
            called when addFilter button is clicked
    */
    addFilter(){
        this.updateCurrentLevels();
        let newFilter = new Filter();
        newFilter.parseLevels(this.lvl1Text, this.lvl1Value, this.lvl2Text, this.lvl2Value, this.lvl3Text, this.lvl3Value);
        this.filterList.push(newFilter);

        let filterContainer = newFilter.createFilterContainer();
        let filterTableBody = document.getElementById('currentPitchingFiltersTableBody');
        let i = 0;
        while(i < filterTableBody.children.length){
            let curContainer = filterTableBody.children[i];
            if (curContainer.getAttribute('category') === newFilter.categoryValue) {
                curContainer.appendChild(filterContainer);
                break;
            } else {
                i++;
            }
        }

        //New category
        if(i === filterTableBody.children.length){
            let categoryRow = newFilter.createFilterCategory();
            categoryRow.children[1].appendChild(filterContainer);
            filterTableBody.appendChild(categoryRow);
        }
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        Return Type: Void
            resets pitchingTable
    */
    resetTable(){
        let table = this.getTableBody();
        //clear existing rows
        while(table.children.length > 1){
            table.deleteRow(1);
        }//clear
    }//resetTable

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        Return Type: HTML Element
            return header row to be placed at the top of pitchingTable
    */
    createTableHeaderRow(){
        let row = document.createElement('tr');
        row.classList.add('table-header-row');

        row.appendChild(this.createTableHeaderCell('Pitcher', 'header-main-col-1', ''));
        row.appendChild(this.createTableHeaderCell('IP', 'ip-col', 'header-main-col-5'));
        row.appendChild(this.createTableHeaderCell('H', 'h-col', 'header-main-col-4'));
        row.appendChild(this.createTableHeaderCell('AB', 'ab-col', 'header-main-col-5'));
        row.appendChild(this.createTableHeaderCell('AVG', 'avg-col', 'header-main-col-6'));
        row.appendChild(this.createTableHeaderCell('2B', 'doubles-col', 'header-main-col-4'));
        row.appendChild(this.createTableHeaderCell('3B', 'triples-col', 'header-main-col-4'));
        row.appendChild(this.createTableHeaderCell('HR', 'hr-col', 'header-main-col-4'));
        row.appendChild(this.createTableHeaderCell('SLG', 'slg-col', 'header-main-col-6'));
        row.appendChild(this.createTableHeaderCell('BB', 'bb-col', 'header-main-col-4'));
        row.appendChild(this.createTableHeaderCell('HBP', 'hbp-col', 'header-main-col-5'));
        //row.appendChild(this.createTableHeaderCell('OBP', 'obp-col', 'header-main-col-6'));
        //Evan new
        row.appendChild(this.createTableHeaderCell('WHIP', 'whip-col', 'header-main-col-6'));
        row.appendChild(this.createTableHeaderCell('GO', 'go-col', 'header-main-col-4'));
        row.appendChild(this.createTableHeaderCell('FO', 'fo-col', 'header-main-col-4'));
        row.appendChild(this.createTableHeaderCell('LO', 'lo-col', 'header-main-col-4'));
        row.appendChild(this.createTableHeaderCell('K', 'k-col', 'header-main-col-4'));
        row.appendChild(this.createTableHeaderCell('KL', 'kl-col', 'header-main-col-4'));
        row.appendChild(this.createTableHeaderCell('SH', 'sh-col', 'header-main-col-4'));
        row.appendChild(this.createTableHeaderCell('SF', 'sf-col', 'header-main-col-4'));
        row.appendChild(this.createTableHeaderCell('GDP', 'gdp-col', 'header-main-col-5'));

        return row;
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        Return Type: HTML Element
    */
    createTableHeaderCell(text, colType, colWidth) {
        let cell = document.createElement('th');
        cell.classList.add(colType);
        cell.setAttribute('col-type', colType.split('-')[0]);

        let cellContainer = document.createElement('div');

        if(colWidth !== ''){
            cellContainer.classList.add(colWidth);
        }//if:

        let textSpan = document.createElement('span');
        textSpan.textContent = text;

        let sortArrow = document.createElement('button');
        sortArrow.classList.add('sort-arrow');
        sortArrow.innerHTML = "&#8675;";
        sortArrow.style.display = 'none';
        sortArrow.style.color = 'white';
        sortArrow.style.backgroundColor = 'red';
        sortArrow.style.outline = 'none';
        sortArrow.setAttribute('arrow-orientation', 'down');

        sortArrow.style.border = 'none';

        cellContainer.appendChild(textSpan);
        cellContainer.appendChild(sortArrow);

        cell.appendChild(cellContainer);
        return cell;
    }//createTableHeaderCell

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        Return Type: Void
    */
    addColumnHoverEventListeners(){
        let headerColumns = this.getTableBody().querySelectorAll('th:not(.header-main-col-1)');
        let self = this;

        for (let i = 0 ; i < headerColumns.length; i++){
            let curHeaderColumn = headerColumns[i];

            //Mouse Over
            curHeaderColumn.addEventListener('mouseover', function(){

                let columnType = curHeaderColumn.getAttribute('col-type') + '-col';
                let columnCells = self.getTableBody().querySelectorAll('.' + columnType +':not(th)');

                for (let j = 0 ; j < columnCells.length; j++){
                    columnCells[j].style.backgroundColor = '#dddddd';
                }//for:
            });//mouseout

            //Mouse Out
            curHeaderColumn.addEventListener('mouseout', function(){
                //if not sorted column
                if (!curHeaderColumn.querySelector('button').classList.contains('sorted-col')){

                    let columnType = curHeaderColumn.getAttribute('col-type') + '-col';
                    let columnCells = self.getTableBody().querySelectorAll('.' + columnType +':not(th)');

                    for (let j = 0 ; j < columnCells.length; j++){
                        columnCells[j].style.backgroundColor = 'inherit';
                    }//for:
                }//if: not sorted column
            });//mouseout
        }//for: header columns

    }//addColumnHoverEventListeners

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        Return Type: Void
    */
    addArrowEventListeners(){
        let self = this;

        const UP_ARROW = "&#8593;";
        const DOWN_ARROW = "&#8595;";

        let tableBody = this.getTableBody();
        let arrows = tableBody.querySelectorAll('.sort-arrow');

        for (let i = 0; i < arrows.length; i++){

            let curArrowCell = arrows[i].parentNode;
            let curArrow = arrows[i];

            curArrow.style.fontSize = '14px';

            //Mouse In
            curArrowCell.addEventListener('mouseover', function(){
                curArrow.style.display = 'inline-block';
                curArrow.style.color = 'white';

                if (curArrow.getAttribute('arrow-orientation') === 'down'){
                    curArrow.innerHTML = DOWN_ARROW;
                } else {
                    curArrow.innerHTML = UP_ARROW;
                }

            });

            //Mouse Out
            curArrowCell.addEventListener('mouseout', function(){

                if(!curArrow.classList.contains('sorted-col')){
                    curArrow.style.display = 'none';
                }

                if (curArrow.getAttribute('arrow-orientation') === 'down'){
                    curArrow.innerHTML = UP_ARROW;
                } else {
                    curArrow.innerHTML = DOWN_ARROW;
                }

            });//mouseout

            //Click
            curArrowCell.addEventListener('click', function(){
                let sortedCol = tableBody.querySelectorAll('.sorted-col')[0];

                if (sortedCol){
                    //Reset currently sorted column back to default
                    sortedCol.classList.remove('sorted-col');
                    sortedCol.style.display = 'none';
                    curArrow.style.color = 'red';

                    let oldType = sortedCol.parentNode.parentNode.getAttribute('col-type') + '-col';
                    let oldCells = tableBody.querySelectorAll('.' + oldType +':not(th)');

                    for (let j = 0; j < oldCells.length; j++){
                        oldCells[j].style.backgroundColor = 'inherit';
                    }//for:
                }//if:

                let cell = curArrow;
                while(cell.tagName && cell.tagName !== 'TH'){
                    cell = cell.parentNode;
                }//while

                let columnType = cell.getAttribute('col-type') + '-col';
                let columnCells = tableBody.querySelectorAll('.' + columnType +':not(th)');
                let arrowOrientation = curArrow.getAttribute('arrow-orientation');

                curArrow.classList.add('sorted-col');

                if (arrowOrientation === 'down'){
                    curArrow.setAttribute('arrow-orientation', 'up');
                    curArrow.innerHTML = UP_ARROW;
                } else {
                    curArrow.setAttribute('arrow-orientation', 'down');
                    curArrow.innerHTML = DOWN_ARROW;
                }//if/else:

                curArrow.style.display = 'inline-block';
                curArrow.style.color = 'white';

                self.orderTableByColumn(columnType, arrowOrientation);

                let newColumnCells = tableBody.querySelectorAll('.' + columnType +':not(th)');

                for (let j = 0; j < newColumnCells.length; j++){
                    newColumnCells[j].style.backgroundColor = '#dddddd';
                }//for:
            });//click
        }//for: arrows
    }//addArrowEventListeners

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        Return Type: Void
    */
    orderTableByColumn(columnType, arrowOrientation){
        let columnCells = this.getTableBody().querySelectorAll('.' + columnType +':not(th)');

        let curPitcherIndex = 0;
        let curRowIndex = 0;

        let visiblePitchers = [];
        let visibleCellValues = [];
        let hiddenPitchers = [];

        while (curRowIndex < columnCells.length){

            let curPitcherCell = columnCells[curRowIndex].parentNode.querySelector('.pitcher-col');
            let curPitcherId = curPitcherCell.getAttribute('pitcher-id');
            let curCellValue = parseFloat(columnCells[curRowIndex].textContent);

            if (curPitcherId === 'total'){
                curRowIndex++;
                hiddenPitchers.push(this.pitcherList[curPitcherIndex])
            } else if(curPitcherId === this.pitcherList[curPitcherIndex].playerId){

                let backTrackIndex = visiblePitchers.length - 1;
                let indexToInsert = -1;

                while(backTrackIndex > -1 && indexToInsert < 0){
                    let backTrackValue = visibleCellValues[backTrackIndex];
                    if (arrowOrientation === 'up'){
                        if(curCellValue > backTrackValue){
                            indexToInsert = backTrackIndex;
                        }
                    } else {
                        if(curCellValue < backTrackValue){
                            indexToInsert = backTrackIndex;
                        }
                    }
                    backTrackIndex--;
                }//while:
                curRowIndex++;

                if(backTrackIndex === -1 && indexToInsert < 0){
                    visiblePitchers.splice(0, 0, this.pitcherList[curPitcherIndex]);
                    visibleCellValues.splice(0, 0, curCellValue);
                } else {
                    visiblePitchers.splice(indexToInsert + 1, 0, this.pitcherList[curPitcherIndex]);
                    visibleCellValues.splice(indexToInsert + 1, 0, curCellValue);
                }//if/else:

            } else {
                hiddenPitchers.push(this.pitcherList[curPitcherIndex]);
            }//if/else:

            curPitcherIndex++;

        }//while:

        while(curPitcherIndex < this.pitcherList.length){
            hiddenPitchers.push(this.pitcherList[curPitcherIndex]);
            curPitcherIndex++;
        }//while:

        visiblePitchers = visiblePitchers.concat(hiddenPitchers);
        this.pitcherList = visiblePitchers;
        this.update();

    }//orderTableByColumn


    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        @param options Type: JSON object
        Return Type: Void
            resets filter 2 to have @param options and updates filter 3
    */
    updateLevel2(options){
        let select = this.clearPitchingFilter2();
        for(let i = 0; i < options.length; i++){
            let tempOption = document.createElement('option');
            tempOption.setAttribute('value', options[i]['value']);
            tempOption.textContent = options[i]['text'];
            select.appendChild(tempOption);
        }
        this.updateLevel3(options[0].hasOwnProperty('inputBox'));
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        @param hasInputBox Type: Boolean
        Return Type: Void
            adds input box to level 3 if @param hasInputBox
    */
    updateLevel3(hasInputBox){
        let level3Container = this.clearPitchingFilter3();

        if (hasInputBox) {
            let inputBox = document.createElement('input');
            level3Container.appendChild(inputBox);
        }//if:
    }//updateLevel3

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        Return Type: HTML Element
            removes all children from pitchingFilter2
    */
    clearPitchingFilter2(){
        let secondFilterSelect = document.getElementById('pitchingFilter2');

        while (secondFilterSelect.firstChild){
            secondFilterSelect.firstChild.remove();
        }//while:
        return secondFilterSelect;
    }//clearPitchingFilter2

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        Return Type: HTML Element
            removes all children from pitchingFilter3
    */
    clearPitchingFilter3(){
        let thirdFilterSelect = document.getElementById('pitchingFilter3');

        while (thirdFilterSelect.firstChild){
            thirdFilterSelect.firstChild.remove();
        }
        return thirdFilterSelect;
    }//clearPitchingFilter3

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        @param pitcherStats Type: PitcherStats
        Return Type: Boolean
            checks if @param pitcherStats atBats satisfies the
            minimumBattersFaced (from: user input)
    */
    hasMinimumBattersFaced(pitcherStats){
        let minBF = document.getElementById('minimumBattersFaced').querySelector('input').value;
        if(pitcherStats.countAtBats() >= parseInt(minBF)){
            return true;
        } else {
            return false;
        }
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        Return Type: HTML Element
    */
    createTableCell(colType, text){
        let cell = document.createElement('td');
        cell.classList.add(colType + '-col');
        cell.setAttribute('col-type', colType);
        cell.textContent = text;
        return cell
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        @param pitcherStats Type: PitcherStats
        Return Type: Void
            adds row to pitching table
    */
    addPitcherRow(pitcher){
        let pitcherStats = pitcher.pitcherStats;
        if (this.hasMinimumBattersFaced(pitcherStats)){
            let pitcherRow = document.createElement('tr');
            let pitcherCell = document.createElement('th');
            pitcherCell.classList.add('header-main-col-1');
            pitcherCell.classList.add('pitcher-col');
            pitcherCell.setAttribute('pitcher-id', pitcherStats.playerId);

            if (pitcherStats.playerId === 'total') {
                pitcherRow.classList.add('total');
                pitcherCell.style.backgroundColor = '#cccccc';
                pitcherCell.style.color = 'black';
                pitcherCell.textContent = 'Total';
            } else {
                let pitcherTag = document.createElement('a');
                pitcherTag.setAttribute('href', 'pitcher.html');
                pitcherTag.onclick = function(){
                    sessionStorage.setItem('curPitcherId', pitcherStats.playerId);
                }

                pitcherTag.textContent = pitcherStats.firstName + " " + pitcherStats.lastName;
                pitcherCell.appendChild(pitcherTag);
            }

            pitcherRow.appendChild(pitcherCell);
            pitcherRow.appendChild(this.createTableCell('ip', pitcherStats.displayInningsPitched()));
            pitcherRow.appendChild(this.createTableCell('h', pitcherStats.countHits()));
            pitcherRow.appendChild(this.createTableCell('ab', pitcherStats.countAtBats()));
            pitcherRow.appendChild(this.createTableCell('avg', pitcherStats.getAverage()));
            pitcherRow.appendChild(this.createTableCell('doubles', pitcherStats.doubles));
            pitcherRow.appendChild(this.createTableCell('triples', pitcherStats.triples));
            pitcherRow.appendChild(this.createTableCell('hr', pitcherStats.homeRuns));
            pitcherRow.appendChild(this.createTableCell('slg', pitcherStats.getSlugging()));
            pitcherRow.appendChild(this.createTableCell('bb', pitcherStats.walks));
            pitcherRow.appendChild(this.createTableCell('hbp', pitcherStats.hitByPitch));
            //pitcherRow.appendChild(this.createTableCell('obp', pitcherStats.getOnBase()));
            //Evan new
            pitcherRow.appendChild(this.createTableCell('whip', pitcherStats.getWHIP()));
            pitcherRow.appendChild(this.createTableCell('go', pitcherStats.groundOuts));
            pitcherRow.appendChild(this.createTableCell('fo', pitcherStats.flyOuts));
            pitcherRow.appendChild(this.createTableCell('lo', pitcherStats.lineOuts));
            pitcherRow.appendChild(this.createTableCell('k', pitcherStats.countStrikeOuts()));
            pitcherRow.appendChild(this.createTableCell('kl', pitcherStats.strikeOutsLooking));
            pitcherRow.appendChild(this.createTableCell('sh', pitcherStats.sacBunts));
            pitcherRow.appendChild(this.createTableCell('sf', pitcherStats.sacFlys));
            pitcherRow.appendChild(this.createTableCell('gdp', pitcherStats.countGDP()));

            let pitchingTable = this.getTableBody();
            pitchingTable.appendChild(pitcherRow);
        }//ifHasMinimumAtBats
    }//addPitcherRow

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        @param pitcher Type: Pitcher
        Return Type: Array of Matchup objects
            Only return Matchup objects that satisfy conditions in this.filterList
    */
    filterMatchups(pitcher){

        let i = 0;
        let matched = pitcher.matchupList;
        let matchupList = pitcher.matchupList;

        while (i < this.filterList.length){

            let curCategory = this.filterList[i].categoryValue;
            let restraintList = [];

            while(i < this.filterList.length - 1 && curCategory === this.filterList[i+1].categoryValue){
                let splitRestraints = this.filterList[i].restraintValue.split(';');
                restraintList.push.apply(restraintList, splitRestraints);
                i++;
            }

            let splitRestraints = this.filterList[i].restraintValue.split(';');
            restraintList.push.apply(restraintList, splitRestraints);

            if (this.filterList[i].categoryValue === "gameYear"){
                matched = parseMatchupsInYears(restraintList, matchupList);
            } else if (this.filterList[i].categoryValue === "menOnBase"){
                matched = parseMatchupsWithMenOnBase(restraintList, matchupList);
            } else if (this.filterList[i].categoryValue === "outs"){
                matched = parseMatchupsWithOuts(restraintList, matchupList);
            } else if (this.filterList[i].categoryValue === "count"){
                matched = parseMatchupsWithCount(restraintList, matchupList);
            } else if (this.filterList[i].categoryValue === "inning"){
                matched = parseMatchupsInInnings(restraintList, matchupList);
            } else if (this.filterList[i].categoryValue === "dayOfWeek"){
                matched = parseMatchupsOnDays(restraintList, matchupList);
            } else if (this.filterList[i].categoryValue === "month"){
                matched = parseMatchupsInMonth(restraintList, matchupList);
            } else if (this.filterList[i].categoryValue === "opposingTeam"){
                matched = parseMatchupsVsTeams(restraintList, matchupList);
            } else if (this.filterList[i].categoryValue === "opposingPitcher"){
                matched = parseMatchupsVsPitcher(restraintList, matchupList);
            } else if (this.filterList[i].categoryValue === "gameScore"){
                matched = parseMatchupsScoreBetween(restraintList, matchupList);
            } else if (this.filterList[i].categoryValue === "latest"){
                matched = parseLastAppearances(restraintList, matchupList);
            }

            matchupList = matched;
            i++;

        }//while: loop filterList
        return matched;
    }//filterMatchups

    update(){
        this.resetTable();
        this.updateFilterList();
        for(let i = 0; i < this.pitcherList.length; i++){
            let tempPitcher = this.pitcherList[i];
            let filteredMatchups = this.filterMatchups(tempPitcher);
            tempPitcher.updateStats(filteredMatchups);
            this.addPitcherRow(tempPitcher);
        }//for:
    }//update

}//CLASS: PitchingTable
