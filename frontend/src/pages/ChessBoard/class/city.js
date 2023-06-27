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
import { Cell } from "./cell"



export class City extends Cell{
    constructor(boardIndex,city,basePrice,commonRatio,redemptionRatio){
        super(boardIndex)
        this.city=city
        this.basePrice=basePrice
        this.commonRatio=commonRatio
        this.redemptionRatio=redemptionRatio
    }
    fPriceToBuy(level){
        if(level===1){
            return this.basePrice
        }
        else if(level===2){
            return Math.round(this.basePrice* 1.5)
        }
        else if (level===3){
            return Math.round(this.basePrice*2.5)
        }
        else return ""
    }

    fPriceToPay(level){
        return Math.round(this.commonRatio* this.fPriceToBuy(level))
    }

    fPriceToUpgrade(currentLevel,nextLevel){
        return this.fPriceToBuy(nextLevel)- this.fPriceToBuy(currentLevel)
    }

    fRedemptionPrice(level){
        return Math.round(this.redemptionRatio* this.fPriceToBuy(level))
    }

    fPriceToSell(level){
        return Math.round(0.8* this.fPriceToBuy(level))
    }
}


