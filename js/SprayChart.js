class SprayChart {
    constructor(batter){
        this.batter = batter;
        this.matchupList = batter.matchupList;
        this.directionList = this.groupByDirection();


        this.left = [];
        this.middle = [];
        this.right = [];

        this.initialize();
    }

    initialize(){
        this.showDirections();
        this.drawField();
        this.groupLeftRightMiddle();
        console.log('left');
        this.showPercentages(this.left);
        console.log('middle');
        this.showPercentages(this.middle);
        console.log('right');
        this.showPercentages(this.right);
    }//initialize

    showPercentages(matchupList){
        let hit = 0;
        let go = 0;
        let fo = 0;
        let lo = 0;
        for(let i = 0; i < matchupList.length; i++){
            if (matchupList[i].isGroundOut()){
                go++;
            } else if (matchupList[i].isFlyout()){
                fo++;
            } else if (matchupList[i].isLineOut()){
                lo++;
            } else if (matchupList[i].isHit()){
                hit++;
            }//if/els:
        }//for: i

        let total = go + fo + lo + hit;

        console.log('GO: ' + (go/total).toFixed(3));
        console.log('FO: ' + (fo/total).toFixed(3));
        console.log('LO: ' + (lo/total).toFixed(3));
        console.log('Hit: ' + (hit/total).toFixed(3));
    }//showPercentages

    groupLeftRightMiddle(){
        const leftDirectionList = ['4.5', '5', '5.5', '6', '7', '7.5'];
        const rightDirectionList = ['2.5', '3', '3.5', '4', '9', '8.5'];

        for(let i = 0; i < this.matchupList.length; i++){
            if (this.matchupList[i].hasDirection){
                if(leftDirectionList.indexOf(this.matchupList[i].direction) !== -1){
                    this.left.push(this.matchupList[i]);
                } else if(rightDirectionList.indexOf(this.matchupList[i].direction) !== -1) {
                    this.right.push(this.matchupList[i]);
                } else {
                    this.middle.push(this.matchupList[i]);
                }//if/else: LRC
            }//if: has direction
        }//for: i
    }//groupLeftRightMiddle

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

        const unit = canvas.width;
        if(canvas.width !== canvas.height){
            console.log('Not Unit ');
        }

        let calcDistance = function(x1, y1, x2, y2){
            return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
        }

        let invertY = function(firstQuadrant){
            let fourthQuadrant = unit - firstQuadrant;
            return fourthQuadrant;
        }

        let leftLine = function(x){
            return invertY(-x + 0.5 * unit);
        }

        let rightLine = function(x){
            return invertY(x - 0.5 * unit);
        }


        const Mx = 0.5 * unit;
        const My = 0.5 * unit;

        const Lx = 0;
        const Ly = 0.5 * unit;

        const Rx = unit;
        const Ry = 0.5 * unit;

        const iLx = 0.2 * unit;
        const iLy = leftLine(0.2 * unit);

        const iRx = 0.8 * unit;
        const iRy = rightLine(0.8 * unit);

        const warningTrack = 0.05;

        var ctx = canvas.getContext("2d");

        //warning track
        ctx.beginPath();
        ctx.fillStyle = "brown";
        ctx.moveTo(Mx, unit);

        ctx.lineTo(Lx, Ly);
        ctx.quadraticCurveTo(Mx, -0.25 * unit, Rx, Ry);
        ctx.lineTo(Mx, unit);

        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.moveTo(Mx, (1-warningTrack) * unit);

        ctx.lineTo(Lx + warningTrack * unit, Ly);
        ctx.quadraticCurveTo(Mx, (2 * warningTrack - 0.25) * unit, Rx - warningTrack * unit, Ry);
        ctx.lineTo(Mx, (1-warningTrack) * unit);

        ctx.closePath();
        ctx.stroke();
        ctx.fill();



        /*
        //infield outline
        ctx.beginPath();
        ctx.fillStyle = "brown";

        ctx.moveTo(Mx, unit);
        ctx.lineTo(iLx , iLy);
        ctx.quadraticCurveTo(Mx, 0.8 *  My, iRx, iRy);
        ctx.lineTo(Mx, unit);

        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        */




    }


    showDirections(){
        console.log(this.directionList.length);
        for(let i = 0; i < this.directionList.length; i++){
            console.log(this.directionList[i][0].direction);
        }
    }




}//CLASS: SprayChart
