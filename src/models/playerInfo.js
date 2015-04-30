import {inject} from 'aurelia-framework';

export class PlayerInfo {
  BackpackSize = 50; // Is this really needed? Basically just used to make the displaying of the size easier...
  Money = 5000;
  Drugs = new Map();
  BackpackSpace = 50;

  constructor(){
  }

  HasDrug(drugName) {
    return this.Drugs.has(drugName);
  }

  BuyDrug(drugName, count, pricePerDrug) {
    count = parseInt(count); // this doesn't belong here... Figure out how to fix the modal's pass through

    if (this.BackpackSpace - count <= 0) {
      return 'You can\'t fit that much ' + drugName + ' in your backpack! The cops would see it if it\'s hanging out like that.';
    }

    let drugCost = pricePerDrug * count;
    if(this.Money < drugCost) {
      return 'You don\'t have enough cash for that much ' + drugName + '. If you rip off your supplier, you\'ll never be able to buy from them again.';
      // Idea: Let people rip off their supplier then never have drugs available in this town again...
    }

    let curDrugCount = 0;
    if (this.Drugs.has(drugName)) {
      curDrugCount = this.Drugs.get(drugName);
    }
    this.Drugs.set(drugName, curDrugCount + count);
    this.BackpackSpace -= count;
    this.Money -= drugCost;
    return null; // Don't like that null is the success retVal, but it's an error msg being return otherwise so it does work... Go back to throwing?
  }

  SellDrug(drugName, count, pricePerDrug) {
    if(!this.Drugs.has(drugName)) {
      throw drugName + ' was attempted to be sold but wasn\'t present in the backpack';
    }

    let newDrugCount = this.Drugs.get(drugName) - count;
    if(newDrugCount < 0) {
      throw 'Attempted to sell more ' + drugName + ' than the player had in the backpack';
    }

    this.Drugs.set(drugName, newDrugCount);
    this.BackpackSpace += count;
    this.Money += (count * pricePerDrug);
  }
}
