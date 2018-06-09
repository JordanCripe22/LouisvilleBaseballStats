
class BattingTable{

    constructor(batterList){
        this.batterList = batterList;
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
        return document.getElementById('battingTableBody');
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        Return Type: Void
            updates the current state of the filters at all three levels
    */
    updateCurrentLevels(){
        let lvl1 = document.getElementById('battingFilter1');
        this.lvl1Value = lvl1.value;
        this.lvl1Text = lvl1.options[lvl1.selectedIndex].textContent;

        let lvl2 = document.getElementById('battingFilter2');
        this.lvl2Value = lvl2.value;
        this.lvl2Text = lvl2.options[lvl2.selectedIndex].textContent;

        this.lvl3Text = document.getElementById('battingFilter3').textContent;
        this.lvl3Value = document.getElementById('battingFilter3').value;
        //TODO: update level 3
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        Return Type: Void
            resets filter list and clears existing user created filters
    */
    removeAllFilters(){
        document.getElementById('currentBattingFiltersTableBody').remove();

        let filterTable = document.getElementById('currentBattingFiltersTable');

        let newTableBody = document.createElement('tbody');
        newTableBody.setAttribute('id', 'currentBattingFiltersTableBody');

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
        let currentFilters = document.getElementById('currentBattingFiltersTableBody').querySelectorAll(".filter-container");
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
        let filterTableBody = document.getElementById('currentBattingFiltersTableBody');
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
            resets battingTable
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
            return header row to be placed at the top of battingTable
    */
    createTableHeaderRow(){
        let row = document.createElement('tr');
        row.classList.add('table-header-row');

        row.appendChild(this.createTableHeaderCell('Batter', 'header-main-col-1', ''));
        row.appendChild(this.createTableHeaderCell('H', 'h-col', 'header-main-col-4'));
        row.appendChild(this.createTableHeaderCell('AB', 'ab-col', 'header-main-col-5'));
        row.appendChild(this.createTableHeaderCell('AVG', 'avg-col', 'header-main-col-6'));
        row.appendChild(this.createTableHeaderCell('2B', 'doubles-col', 'header-main-col-4'));
        row.appendChild(this.createTableHeaderCell('3B', 'triples-col', 'header-main-col-4'));
        row.appendChild(this.createTableHeaderCell('HR', 'hr-col', 'header-main-col-4'));
        row.appendChild(this.createTableHeaderCell('SLG', 'slg-col', 'header-main-col-6'));
        row.appendChild(this.createTableHeaderCell('BB', 'bb-col', 'header-main-col-4'));
        row.appendChild(this.createTableHeaderCell('HBP', 'hbp-col', 'header-main-col-5'));
        row.appendChild(this.createTableHeaderCell('OBP', 'obp-col', 'header-main-col-6'));
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
            return header cell
    */
    createTableHeaderCell(text, colType, colWidth) {
        let cell = document.createElement('th');
        cell.classList.add(colType);
        cell.setAttribute('col-type', colType.split('-')[0]);

        let cellContainer = document.createElement('div');

        if(colWidth !== ''){
            cellContainer.classList.add(colWidth);
        }

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
    }

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

    orderTableByColumn(columnType, arrowOrientation){
        let columnCells = this.getTableBody().querySelectorAll('.' + columnType +':not(th)');

        let curBatterIndex = 0;
        let curRowIndex = 0;

        let visibleBatters = [];
        let visibleCellValues = [];
        let hiddenBatters = [];

        while (curRowIndex < columnCells.length){

            let curBatterCell = columnCells[curRowIndex].parentNode.querySelector('.batter-col');
            let curBatterId = curBatterCell.getAttribute('batter-id');
            let curCellValue = parseFloat(columnCells[curRowIndex].textContent);

            if (curBatterId === 'total'){
                curRowIndex++;
                hiddenBatters.push(this.batterList[curBatterIndex])
            } else if(curBatterId === this.batterList[curBatterIndex].playerId){

                let backTrackIndex = visibleBatters.length - 1;
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
                    visibleBatters.splice(0, 0, this.batterList[curBatterIndex]);
                    visibleCellValues.splice(0, 0, curCellValue);
                } else {
                    visibleBatters.splice(indexToInsert + 1, 0, this.batterList[curBatterIndex]);
                    visibleCellValues.splice(indexToInsert + 1, 0, curCellValue);
                }

            } else {
                hiddenBatters.push(this.batterList[curBatterIndex]);
            }//if/else:

            curBatterIndex++;

        }//while:

        while(curBatterIndex < this.batterList.length){
            hiddenBatters.push(this.batterList[curBatterIndex]);
            curBatterIndex++;
        }

        visibleBatters = visibleBatters.concat(hiddenBatters);
        this.batterList = visibleBatters;
        this.update();

    }//orderTableByColumn

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        @param options Type: JSON object
        Return Type: Void
            resets filter 2 to have @param options and updates filter 3
    */
    updateLevel2(arrOptions){
        let select = this.clearBatterFilter2();
        for(let i = 0; i < arrOptions.length; i++){
            let tempOption = document.createElement('option');
            tempOption.setAttribute('value', arrOptions[i]['value']);
            tempOption.textContent = arrOptions[i]['text'];
            select.appendChild(tempOption);
        }
        this.updateLevel3(arrOptions[0].hasOwnProperty('inputBox'));
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        @param hasInputBox Type: Boolean
        Return Type: Void
            adds input box to level 3 if @param hasInputBox
    */
    updateLevel3(hasInputBox){
        let level3Container = this.clearBatterFilter3();

        if (hasInputBox) {
            let inputBox = document.createElement('input');
            level3Container.appendChild(inputBox);
        }

    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        Return Type: HTML Element
            removes all children from battingFilter2
    */
    clearBatterFilter2(){
        let secondFilterSelect = document.getElementById('battingFilter2');

        while (secondFilterSelect.firstChild){
            secondFilterSelect.firstChild.remove();
        }
        return secondFilterSelect;
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        Return Type: HTML Element
            removes all children from battingFilter3
    */
    clearBatterFilter3(){
        let thirdFilterSelect = document.getElementById('battingFilter3');

        while (thirdFilterSelect.firstChild){
            thirdFilterSelect.firstChild.remove();
        }
        return thirdFilterSelect;
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        @param batterStats Type: BatterStats
        Return Type: Boolean
            checks if @param batterStats atBats satisfies the
            minimumBattersFaced (from: user input)
    */
    hasMinimumAtBats(batterStats){
        let minAB = document.getElementById('minimumAtBats').querySelector('input').value;
        if(batterStats.countAtBats() >= parseInt(minAB)){
            return true;
        } else {
            return false;
        }
    }

    createTableCell(colType, text){
        let cell = document.createElement('td');
        cell.classList.add(colType + '-col');
        cell.setAttribute('col-type', colType);
        cell.textContent = text;
        return cell
    }

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        @param batter Type: Batter
        Return Type: Void
            adds row to batting table
    */
    addBatterRow(batter){
        let batterStats = batter.batterStats;

        if (this.hasMinimumAtBats(batterStats)){
            let batterRow = document.createElement('tr');
            let batterCell = document.createElement('th');
            batterCell.classList.add('header-main-col-1');
            batterCell.classList.add('batter-col');
            batterCell.setAttribute('batter-id', batterStats.playerId);

            if (batterStats.playerId === 'total') {
                batterRow.classList.add('total');
                batterCell.style.backgroundColor = '#cccccc';
                batterCell.style.color = 'black';
                batterCell.textContent = 'Total';
            } else {
                let batterTag = document.createElement('a');
                batterTag.setAttribute('href', 'batter.html');
                batterTag.onclick = function(){
                    sessionStorage.setItem('curBatterId', batterStats.playerId);
                }

                batterTag.textContent = batterStats.firstName + " " + batterStats.lastName;
                batterCell.appendChild(batterTag);
            }

            batterRow.appendChild(batterCell);
            batterRow.appendChild(this.createTableCell('h', batterStats.countHits()));
            batterRow.appendChild(this.createTableCell('ab', batterStats.countAtBats()));
            batterRow.appendChild(this.createTableCell('avg', batterStats.getAverage()));
            batterRow.appendChild(this.createTableCell('doubles', batterStats.doubles));
            batterRow.appendChild(this.createTableCell('triples', batterStats.triples));
            batterRow.appendChild(this.createTableCell('hr', batterStats.homeRuns));
            batterRow.appendChild(this.createTableCell('slg', batterStats.getSlugging()));
            batterRow.appendChild(this.createTableCell('bb', batterStats.walks));
            batterRow.appendChild(this.createTableCell('hbp', batterStats.hitByPitch));
            batterRow.appendChild(this.createTableCell('obp', batterStats.getOnBase()));
            batterRow.appendChild(this.createTableCell('go', batterStats.groundOuts));
            batterRow.appendChild(this.createTableCell('fo', batterStats.flyOuts));
            batterRow.appendChild(this.createTableCell('lo', batterStats.lineOuts));
            batterRow.appendChild(this.createTableCell('k', batterStats.countStrikeOuts()));
            batterRow.appendChild(this.createTableCell('kl', batterStats.strikeOutsLooking));
            batterRow.appendChild(this.createTableCell('sh', batterStats.sacBunts));
            batterRow.appendChild(this.createTableCell('sf', batterStats.sacFlys));
            batterRow.appendChild(this.createTableCell('gdp', batterStats.countGDP()));

            let battingTable = this.getTableBody();
            battingTable.appendChild(batterRow);
        }//ifHasMinimumAtBats
    }//addBatterRow

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    /**
        @param batter Type: Batter
        Return Type: Array of Matchup objects
            Only return Matchup objects that satisfy conditions in this.filterList
    */
    filterMatchups(batter){
        let i = 0;
        let matched = batter.matchupList;
        let matchupList = batter.matchupList;

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
    }

    update(){
        this.resetTable();
        this.updateFilterList();
        for(let i = 0; i < this.batterList.length; i++){
            let tempBatter = this.batterList[i];
            let filteredMatchups = this.filterMatchups(tempBatter);
            tempBatter.updateStats(filteredMatchups);
            this.addBatterRow(tempBatter);
        }//for:
    }//update

}//CLASS: BattingTable
