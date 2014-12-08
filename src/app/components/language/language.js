import LanguageResource from './language.resource';
import languageResourceMock from './language.resource.mock';

export default angular.module('app.language', [])
    .service('LanguageResource', LanguageResource)
    .run(languageResourceMock);
