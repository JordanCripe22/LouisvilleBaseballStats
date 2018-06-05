class Filter {

    constructor(){
        this.categoryText = "";
        this.categoryValue = "";

        this.restraintText = "";
        this.restraintValue = "";

        this.text = "";
    }

    parseLevels(lvl1Text, lvl1Value, lvl2Text, lvl2Value, lvl3Text, lvl3Value){
        this.categoryText = lvl1Text;
        this.categoryValue = lvl1Value;

        this.restraintText = lvl2Text;
        this.restraintValue = lvl2Value;

        this.text = lvl3Text;
    }

    createFilterCategory(){
        let categoryRow = document.createElement('tr');
        categoryRow.setAttribute('category', this.categoryValue);

        let categoryCell = document.createElement('th');
        categoryCell.setAttribute('category', this.categoryValue);

        let categoryContainer = document.createElement('div');
        categoryContainer.classList.add('filter-category');

        let filterX = document.createElement('button');
        filterX.classList.add('x');
        filterX.innerHTML = "&#10006;";

        filterX.onclick = function(e) {
            categoryRow.remove();
        }

        filterX.onmouseover = function(e){
            filterX.style.color = 'red';
        }

        filterX.onmouseout = function(e){
            filterX.style.color = 'black';
        }

        let filterText = document.createElement('span');
        filterText.textContent = this.categoryText;

        categoryContainer.appendChild(filterX);
        categoryContainer.appendChild(filterText);

        let restraintCell = document.createElement('td');

        categoryCell.appendChild(categoryContainer);
        categoryRow.appendChild(categoryCell);
        categoryRow.appendChild(restraintCell);

        return categoryRow;
    }

    createFilterContainer(){

        let filterContainer = document.createElement('span');
        filterContainer.classList.add('filter-container');

        let filterX = document.createElement('button');
        filterX.classList.add('x');
        filterX.innerHTML = "&#10006;";

        filterX.onclick = function(e) {
            filterContainer.remove();
        }

        filterX.onmouseover = function(e){
            filterX.style.color = 'red';
        }

        filterX.onmouseout = function(e){
            filterX.style.color = 'black';
        }

        let filterText = document.createElement('span');
        filterText.textContent = this.restraintText;


        filterContainer.setAttribute('category', this.categoryValue);
        filterContainer.setAttribute('restraint', this.restraintValue);
        filterContainer.appendChild(filterX);
        filterContainer.appendChild(filterText);

        return filterContainer;
    }
}
