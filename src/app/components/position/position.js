import PositionResource from './position.resource';
import positionResourceMock from './position.resource.mock';

export default angular.module('app.position', [])
    .service('PositionResource', PositionResource)
    .run(positionResourceMock);
