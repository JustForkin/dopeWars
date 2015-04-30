import {inject, bindable} from 'aurelia-framework';
import {PlayerService} from './services/playerService';

@inject(PlayerService)
export class DrugList{
  @bindable drugs = null;
  showBSModal = false;
  modal_title = "";
  modal_body = "";
  modalDrugCost = 0;
  modalDrugName = '';
  modal_success_label = "";

  constructor(playerService){
    this.PlayerService = playerService;
    this.Player = null;

    this.PlayerService.GetPlayer().then(player => {
      this.Player = player;
    });
  }

  buySellDrug(drug) {
    this.showBSModal = true;
    if(!this.Player.HasDrug(drug.Name)) {
      this.modal_title = "Buy " + drug.Name;
      this.modal_body = 'modalBodies/buyDrug';
      this.modal_success_label = "Buy";
      drug.BuyAmount = 0;
      this.modalModel = drug;
    }
  }

  closeBSModal() {
    this.showBSModal = false;
  }

  bsModalSuccess() {
    let errorMessage = this.Player.BuyDrug(this.modalModel.Name, this.modalModel.BuyAmount, this.modalModel.Price);
    if(errorMessage == null) {
      this.showBSModal = false;
    } else {
      this.modalModel.ErrorMessage = errorMessage;
    }
  }
}
