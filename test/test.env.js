'use strict';

window.ENV =  {
    mock: false, optimize: false, environment: 'test'
};
System.set('ENV', System.newModule({ 'default': window.ENV, __useDefault: true }));
