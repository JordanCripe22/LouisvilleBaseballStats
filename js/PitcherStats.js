class PitcherStats extends PlayerStats{

    constructor(pitcher) {
        super(pitcher);
    }

    countInningsPitched(){
        let outsRecorded = 0;
        for(let i = 0; i < this.matchupList.length; i++){
            outsRecorded += this.matchupList[i].countOuts();
        }//for: i
        return (outsRecorded / 3);
    }//countInningsPitched

    //returns innings pitched + {.0, .1, .2}
    displayInningsPitched(){
        let outsRecorded = 0;
        for(let i = 0; i < this.matchupList.length; i++){
            outsRecorded += this.matchupList[i].countOuts();
        }//for: i
        return (Math.floor(outsRecorded / 3) + (outsRecorded % 3) * 0.1).toFixed(1);
    }//displayInningsPitched

    getWHIP(){
        if(this.countInningsPitched() === 0){
            return this.countInningsPitched().toFixed(3).toString();
        } //if: IP = 0
        else{
            return ((this.walks + this.countHits()) / this.countInningsPitched()).toFixed(3).toString();
        } //else: IP > 0
    }//getWHIP

}//CLASS: PitcherStats
