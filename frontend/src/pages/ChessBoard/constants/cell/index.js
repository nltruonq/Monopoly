import { City } from "../../class/city";
import { Sea } from "../../class/sea";
import { Tax } from "../../class/tax";
import { Corner } from "../../class/corner";
import { types } from "../locations/type";
import { locations } from "../locations/data";
import { Chance } from "../../class/chance";


// khởi tạo các ô bàn cờ => gán class
export const cells= locations.map((location)=>{
    const {type,...rest}=location

    if(type===types.CITY){
      let cell=new City(rest.boardIndex,rest.city,rest.basePrice,rest.commonRatio,rest.redemptionRatio)
      return cell
    }
    else if(type ===types.CHANCE){
      let cell= new Chance(rest)
      return cell
    }
    else if(type===types.SEA){
      let cell = new Sea(rest.boardIndex,rest.basePrice,rest.priceToBuy,rest.priceToPay)
      return cell
    }
    else if(type === types.TAX){
      let cell= new Tax(rest)
      return cell
    }
    else {
      let cell = new Corner(rest)
      return cell
    }

  })