import { Cell } from "./cell"

export class Tax extends Cell{
    constructor(boardIndex){
        super(boardIndex)
    }
    payTax(current){
        return Math.round(-0.1*current)
    }
}