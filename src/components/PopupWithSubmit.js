import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) { // селектор попапа
    super(popupSelector); // наследует от Popup
  }

  open = () => {
    super.open();
  }
}
