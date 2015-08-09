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
@Inject('FormService', 'PartnerModel')
//end-non-standard
class Partners {
    constructor(FormService, PartnerModel) {
        this.partners = PartnerModel.getCollection();
        this.FormService = FormService;
        this.PartnerModel = PartnerModel;
    }

    deletePartner(partner) {
        this.FormService.delete(this.PartnerModel, partner, this);
    }
}
