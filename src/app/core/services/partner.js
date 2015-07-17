/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import {Service, Inject} from '../../ng-decorators'; // jshint unused: false

//start-non-standard
@Service({
    serviceName: 'PartnerService'
})
//end-non-standard
class PartnerService {
    constructor() {
        this.partners = [];
    }

    getPartners() {
        return this.partners;
    }

    setPartners(partners) {
        this.partners = partners;
    }

    addPartner(partner) {
        this.partners.push(partner);
    }

    updatePartner(partner) {
        for (let i = 0; i < this.partners.length; i++) {
            if(this.partners[i].id === partner.id) {
                this.partners[i] = partner;
            }
        }
    }
}

