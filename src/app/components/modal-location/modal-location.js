/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import template from './modal-location.html!text';
import {View, Component, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Component({
    selector: 'modal-location'
})
@View({
    template: template
})
@Inject('ModalModel', 'LocationModel', 'FormService')
//end-non-standard
class LocationModal {
    constructor(ModalModel, LocationModel, FormService) {
        this.modal = ModalModel.getItem();
        this.location = LocationModel.getItem();
        this.statusTypes = ['active', 'inactive'];
        this.isDefaultLocation = this.location.id && !(this.location.default && this.location.id);
        this.result = null;
        this.isSubmitting = null;
        this.FormService = FormService;
        this.LocationModel = LocationModel;
        this.saveButtonOptions = FormService.getModalSaveButtonOptions();
    }

    cancel() {
        this.modal.dismiss('cancel');
    }

    save(form) {
        if(!form.$valid) {return;}
        this.isSubmitting = true;

        if(this.location.id && this.location.default && this.isDefaultLocation) {
            let defaultLocation = this.LocationModel.getDefaultLocation();
            defaultLocation.default = false;
            this.location.status = 'active';
            // TODO: (martin) should I try to do a bulk update?
            this.LocationModel.save(this.location).then(() => {
                this.FormService.save(this.LocationModel, defaultLocation, this, form);
            }, (response) => {
                this.FormService.failure(this, response);
            });
        } else {
            if(this.LocationModel.getCollection().length === 0) {
                this.location.default = true;
            }
            this.FormService.save(this.LocationModel, this.location, this, form);
        }
    }
}
