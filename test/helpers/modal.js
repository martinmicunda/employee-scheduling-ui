/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

const fakeModal = {
    result: {
        then: function (confirmCallback, cancelCallback) {
            this.confirmCallBack = confirmCallback;
            this.cancelCallback = cancelCallback;
            return this;
        },
        catch: function (cancelCallback) {
            this.cancelCallback = cancelCallback;
            return this;
        },
        finally: function (finallyCallback) {
            this.finallyCallback = finallyCallback;
            return this;
        }
    },
    open: function() {
        return this.result;
    },
    close: function (item) {
        this.result.confirmCallBack(item);
    },
    dismiss: function (item) {
        this.result.cancelCallback(item);
    },
    finally: function () {
        this.result.finallyCallback();
    }
};

export {fakeModal};
