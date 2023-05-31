import { City } from "../../class/city";
import { Sea } from "../../class/sea";
import { Tax } from "../../class/tax";
import { Corner } from "../../class/corner";
import { types } from "../locations/type";
import { locations } from "../locations/data";
import { Chance } from "../../class/chance";

export const cells= locations.map((location)=>{
    const {type,...rest}=location
    
    if(type===types.CITY){
      let cell=new City(rest)
      return cell
    }
    else if(type ===types.CHANCE){
      let cell= new Chance(rest)
      return cell
    }
    else if(type===types.SEA){
      let cell = new Sea(rest)
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