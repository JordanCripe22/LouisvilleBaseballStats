class SprayChart {
    constructor(batter){
        this.batter = batter;
        this.matchupList = batter.batterMatchups;
        this.directionList = this.groupByDirection();
        this.showDirections();
        this.drawField();
    }

    groupByDirection(){
        let directionList = [];
        for (let i = 0; i < this.matchupList.length; i++){
            if (this.matchupList[i].hasDirection()){
                let j = 0;

                while(j < directionList.length){
                    if (directionList[j][0].direction === this.matchupList[i].direction){
                        directionList[j].push(this.matchupList[i]);
                        j = directionList.length + 1;
                    } else {
                        j++;
                    }//if/else:
                }//while:

                if(j === directionList.length){
                    let newDirection = [];
                    newDirection.push(this.matchupList[i]);
                    directionList.push(newDirection);
                }//if:
            }//if:
        }//for: i
        return directionList;
    }//groupByDirection

    drawField(){
        let canvas = document.getElementById("fieldCanvas");
        let w = canvas.width;
        let h = canvas.height;

        let calcDistance = function(x1, y1, x2, y2){
            return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
        }

        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(0.5 * w, 0.95 * h);
        ctx.lineTo(0.1 * w, 0.4 * h);
        ctx.stroke();

        ctx.beginPath();
        const arcRadius = calcDistance(0.1 * w, 0.95 * h, 0.9 * w, 0.95 * h) / 2;
        ctx.arc(0.5 * w, 0.4 * h, arcRadius * 1.5, Math.PI, 2 * Math.PI);
        ctx.stroke();

        ctx.moveTo(0.5 * w, 0.95 * h);
        ctx.lineTo(0.9 * w, 0.4 * h);
        ctx.stroke();
    }




    showDirections(){
        console.log(this.directionList.length);
        for(let i = 0; i < this.directionList.length; i++){
            console.log(this.directionList[i][0].direction);
        }
    }




}//CLASS: SprayChart
