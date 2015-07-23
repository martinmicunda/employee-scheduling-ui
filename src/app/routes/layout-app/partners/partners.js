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
@Inject('partners', 'FormService', 'PartnerResource', 'PartnerService', 'filterFilter')
//end-non-standard
class Partners {
    constructor(partners, FormService, PartnerResource, PartnerService, filterFilter) {
        PartnerService.setList(partners);
        this.partners = PartnerService.getList();
        this.FormService = FormService;
        this.PartnerResource = PartnerResource;
        this.filteredPartners = Object.assign(partners);
        this.filterField = '';
        this.filterFilter = filterFilter;
        // pagination
        this.currentPage = 1;
        this.partnersPerPage = 10;
    }

    filterPartners() {
        this.filteredPartners = this.filterFilter(this.partners, {name: this.filterField});
    }

    deletePartner(partner) {
        this.PartnerResource.delete(partner.id).then(() => {
            this.partners.splice(this.partners.indexOf(partner), 1);
            this.filteredPartners.splice(this.filteredPartners.indexOf(partner), 1);
        },(response) => {
            this.FormService.failure(this, response);
        });
    }
}
