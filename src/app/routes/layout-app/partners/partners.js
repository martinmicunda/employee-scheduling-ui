/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import './add/add';
import './edit/edit';
import template from './partners.html!text';
import {RouteConfig, Inject} from '../../../ng-decorators'; // jshint unused: false

//start-non-standard
@RouteConfig('app.partners', {
    url: '/partners',
    template: template,
    resolve: {
        init: ['PartnerModel', PartnerModel => PartnerModel.initCollection()]
    }
})
@Inject('FormService', 'PartnerResource', 'PartnerModel')
//end-non-standard
class Partners {
    constructor(FormService, PartnerResource, PartnerModel) {
        this.partners = PartnerModel.getCollection();
        this.FormService = FormService;
        this.PartnerResource = PartnerResource;
    }

    deletePartner(partner) {
        this.PartnerResource.delete(partner.id).then(() => {
            this.partners.splice(this.partners.indexOf(partner), 1);
            this.FormService.success(this);
        },(response) => {
            this.FormService.failure(this, response);
        });
    }
}
//http://stackoverflow.com/questions/25046191/is-it-good-practice-to-combine-create-and-edit-controllers-in-angularjs
