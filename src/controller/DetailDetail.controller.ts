import MessageToast from "sap/m/MessageToast";
import Event from "sap/ui/base/Event";
import EventBus from "sap/ui/core/EventBus";
import BaseController from "./BaseController";
import Context from "sap/ui/model/Context";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageBox from "sap/m/MessageBox";
import { IOwner } from "../interface/Interface";

/**
 * @namespace webapp.typescript.controller
 */
export default class DetailDetail extends BaseController {
  oEventBus: EventBus;

  public onInit(): void {
    this.oEventBus = this.getOwnerComponent().getEventBus();
  }

  public handleClose() {
    MessageToast.show(this.i18n("loadingNewPageMessage"));
    this.oEventBus.publish("flexible", "setDetailPage");
  }

  /**
   *
   * @param oEvent An Event object consisting of an ID, a source and a map of parameters.
   * Implements sap.ui.base.
   * Poolable and therefore an event object in the event handler will be reset by
   * sap.ui.base.ObjectPool after the event handler is done.
   */
  public handleNavToManage(oEvent: Event) {
    const sPath: string = (this.getView()?.getBindingContext() as Context).getPath();
    const oCreatedBy: object = ((this.getModel() as JSONModel).getProperty(sPath) as IOwner).createdBy;

    if (!this.getSupportModel().getProperty("/auth")) this.loadAuthorizationDialog();
    else if (!oCreatedBy || Object.values(oCreatedBy)[0] === this.getSupportModel().getProperty("/auth/email")) {
      this.oEventBus.publish("navigation", "navToMain", oEvent);
    } else MessageBox.error(this.i18n("authorizationMTPageErrorMessage"));
  }

  /**
   *
   * @param oEvent An Event object consisting of an ID, a source and a map of parameters.
   * Implements sap.ui.base.
   * Poolable and therefore an event object in the event handler will be reset by
   * sap.ui.base.ObjectPool after the event handler is done.
   */
  public handleNavToTest(oEvent: Event) {
    this.oEventBus.publish("navigation", "navToTesting", oEvent);
  }
}
