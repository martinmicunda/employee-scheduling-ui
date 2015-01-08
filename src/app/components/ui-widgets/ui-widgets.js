import mmUnsavedFormWarningModal from './form/unsaved-form-warning-modal';
import mmReallyClick from './really-click/really-click';
import mmScrollUp from './mm-scroll-up/scroll-up.directive';

export default angular.module('mm.ui-widgets', [mmUnsavedFormWarningModal.name, mmReallyClick.name, mmScrollUp.name]);
