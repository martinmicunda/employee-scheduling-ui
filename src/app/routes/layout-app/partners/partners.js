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
        partners: ['PartnerResource', PartnerResource => PartnerResource.getList()],
    }
})
@Inject('partners', 'FormService', 'PartnerService', 'filterFilter')
//end-non-standard
class Partners {
    constructor(partners, FormService, PartnerService, filterFilter) {
        this.partners = partners;
        this.FormService = FormService;
        this.filteredPartners = Object.assign(partners);
        PartnerService.setPartners(partners);
        this.positions = PartnerService.getPartners();
        this.filterField = '';
        this.filterFilter = filterFilter;
        // pagination
        this.currentPage = 1;
        this.partnersPerPage = 10;
        this.listViewTable = true;
    }

    filterPartners() {
        this.filteredPartners = this.filterFilter(this.partners, {name: this.filterField});
    }

    deletePartner(partner) {
        partner.remove().then(() => {
            this.partners.splice(this.partners.indexOf(partner), 1);
            this.filteredPartners.splice(this.filteredPartners.indexOf(partner), 1);
        },(response) => {
            this.FormService.failure(this, response);
        });
    }
}
