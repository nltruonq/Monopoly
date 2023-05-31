// bP: A01
// cR: 
// price to buy: 
        // { lv1: A01 = bP
        //   lv2: A02 = 1.5*bP
        //   lv3: A03 = 2.5*bP
        // } 
// price to pay : A0i * cR (i : 1->3)
// price to upgrade: A0j - A0i 
// redemption price: A0i * rR


export class City{
    constructor(boardIndex,city,basePrice,commonRatio,redemptionRatio){
        this.boardIndex=boardIndex
        this.city=city,
        this.basePrice=basePrice
        this.commonRatio=commonRatio
        this.redemptionRatio=redemptionRatio
    }
    fPriceToBuy=function(level){
        if(level===1){
            return this.basePrice
        }
        else if(level===2){
            return this.basePrice* 1.5
        }
        else {
            return this.basePrice*2.5
        }
    }

    fPriceToPay=function(level){
        return this.redemptionRatio* this.fPriceToBuy(boardIndex,level)
    }

    fPriceToUpgrade=function(currentLevel,nextLevel){
        return this.fPriceToBuy(nextLevel)- this.fPriceToBuy(currentLevel)
    }

    redemptionPrice = function(level){
        return this.redemptionRatio* this.fPriceToBuy(level)
    }
}


