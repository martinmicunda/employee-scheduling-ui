/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

export const USER_ROLES = Object.freeze({ADMIN: 'admin', MANAGER: 'manager'});
// http://labs.qandidate.com/blog/2014/10/16/using-the-accept-header-to-version-your-api/
export const HEADER_API_VERSION = 'application/vnd.employee-scheduling.api+json;version=1'; // application/vnd.employee-scheduling.v1+json
export const PROFILE_COMPLETNESS_TYPES = Object.freeze({ACCOUNT: 'account', EDIT_EMPLOYEE: 'edit-employee', ADD_EMPLOYEE: 'add-employee'});
