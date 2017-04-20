/**
 * Uno-Counter component
 */
(function () {
    var app = angular.module('myApp', ['ngMaterial']);

    app.component('unoCounter', {
        templateUrl: './uno-counter.component.html',
        controller: function ($timeout) {
            this.model = model;
            this.advanced = false;
            this.icons = true;
            this._4k = false;
            this.get4kNumber = function () {
                return Math.floor(this.model.count / 4) + 1;
            };
            this._lastbutton = '';
            this._cancelTimeout = function () {
                if (this._timeout) {
                    $timeout.cancel(this._timeout);
                }
            }
            this.fullDK = function () {
                this.model.addDonkeyKong();
                this.model.addFFA();
                this.model.addFFA();
                this.model.addFFA();
                this._cancelTimeout();
                this._lastbutton = 'fdk';
            };
            this.addDK = function () {
                this.model.addDonkeyKong();
                this._lastbutton = 'dk';
                this._cancelTimeout();
                var ctrl = this;
                this._timeout = $timeout(function() {
                    ctrl._lastbutton = '';
                }, 3000);
            }
            this.addFFA = function () {
                this.model.addFFA();
                this._cancelTimeout();
                this._lastbutton = 'ffa';
            }
            this.clearCount = function () {
                this.model.clearCount();
                this._cancelTimeout();
                this._lastbutton = '';
            }
        }
    });

    function CounterModel() {
        this.clearCount();
    }

    Object.defineProperty(CounterModel.prototype, 'count', {
        get: function () {
            return 2 + (this.dkCount * 2) + (this.ffaCount * 2) + this._advCount;
        }
    });

    CounterModel.prototype.addDonkeyKong = function () {
        this._ffaCount = 0;
        this.dkCount++;
    };

    CounterModel.prototype.canFreeForAll = function () {
        return this._ffaCount < 3;
    };

    CounterModel.prototype.addAdvanced = function (number) {
        this._advCount += number;
    };

    CounterModel.prototype.addFFA = function () {
        if (this.canFreeForAll()) {
            this._ffaCount++;
            this.ffaCount++;
        }
    };

    CounterModel.prototype.clearCount = function () {
        this._ffaCount = 0;
        this.dkCount = 0;
        this.ffaCount = 0;
        this._advCount = 0;
    };

    var model = new CounterModel();

    angular.bootstrap(document, ['myApp']);

})();
