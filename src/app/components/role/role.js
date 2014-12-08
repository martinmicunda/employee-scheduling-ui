import RoleResource from './role.resource';
import roleResourceMock from './role.resource.mock';

export default angular.module('app.role', [])
    .service('RoleResource', RoleResource)
    .run(roleResourceMock);
