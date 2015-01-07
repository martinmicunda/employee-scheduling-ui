import mmUnsavedFormWarningModal from './form/unsaved-form-warning-modal';
import mmReallyClick from './really-click/really-click';

export default angular.module('mm.ui-widgets', [mmUnsavedFormWarningModal.name, mmReallyClick.name]);
