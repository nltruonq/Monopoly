import { Cell } from "./cell"

export class Sea extends Cell{
    constructor(boardIndex,basePrice,priceToBuy,priceToPay){
        super(boardIndex)
        this.basePrice=basePrice
        this.priceToBuy=priceToBuy
        this.priceToPay=priceToPay
    }
    fPriceToSell(){
        return Math.round(0.8 * this.basePrice)
    }
}