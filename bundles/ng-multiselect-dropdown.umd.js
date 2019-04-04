(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng-multiselect-dropdown', ['exports', '@angular/core', '@angular/forms', '@angular/common'], factory) :
    (factory((global['ng-multiselect-dropdown'] = {}),global.ng.core,global.ng.forms,global.ng.common));
}(this, (function (exports,core,forms,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ListItem = (function () {
        function ListItem(source) {
            if (typeof source === 'string') {
                this.id = this.text = source;
            }
            if (typeof source === 'object') {
                this.id = source.id;
                this.text = source.text;
            }
        }
        return ListItem;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var /** @type {?} */ DROPDOWN_CONTROL_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: core.forwardRef(function () { return MultiSelectComponent; }),
        multi: true
    };
    var /** @type {?} */ noop = function () { };
    var MultiSelectComponent = (function () {
        function MultiSelectComponent(cdr) {
            this.cdr = cdr;
            this._data = [];
            this.selectedItems = [];
            this.isDropdownOpen = true;
            this._placeholder = 'Select';
            this.filter = new ListItem(this.data);
            this.defaultSettings = {
                singleSelection: false,
                idMode: false,
                idField: 'id',
                textField: 'text',
                enableCheckAll: true,
                selectAllText: 'Select All',
                unSelectAllText: 'UnSelect All',
                allowSearchFilter: false,
                limitSelection: -1,
                clearSearchFilter: true,
                maxHeight: 197,
                itemsShowLimit: 999999999999,
                searchPlaceholderText: 'Search',
                noDataAvailablePlaceholderText: 'No data available',
                closeDropDownOnSelection: false,
                showSelectedItemsAtTop: false,
                defaultOpen: false
            };
            this.disabled = false;
            this.onFilterChange = new core.EventEmitter();
            this.onDropDownClose = new core.EventEmitter();
            this.onSelect = new core.EventEmitter();
            this.onDeSelect = new core.EventEmitter();
            this.onSelectAll = new core.EventEmitter();
            this.onDeSelectAll = new core.EventEmitter();
            this.onTouchedCallback = noop;
            this.onChangeCallback = noop;
        }
        Object.defineProperty(MultiSelectComponent.prototype, "placeholder", {
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                if (value) {
                    this._placeholder = value;
                }
                else {
                    this._placeholder = 'Select';
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MultiSelectComponent.prototype, "settings", {
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                if (value) {
                    this._settings = Object.assign(this.defaultSettings, value);
                }
                else {
                    this._settings = Object.assign(this.defaultSettings);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MultiSelectComponent.prototype, "data", {
            set: /**
             * @param {?} value
             * @return {?}
             */ function (value) {
                var _this = this;
                if (!value) {
                    this._data = [];
                }
                else {
                    // const _items = value.filter((item: any) => {
                    //   if (typeof item === 'string' || (typeof item === 'object' && item && item[this._settings.idField] && item[this._settings.textField])) {
                    //     return item;
                    //   }
                    // });
                    this._data = value.map(function (item) {
                        return typeof item === 'string'
                            ? new ListItem(item)
                            : new ListItem({
                                id: item[_this._settings.idField],
                                text: _this.getValue(item, _this._settings.textField)
                            });
                    });
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} $event
         * @return {?}
         */
        MultiSelectComponent.prototype.onFilterTextChange = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                this.onFilterChange.emit($event);
            };
        /**
         * @param {?} item
         * @param {?} nestedPath
         * @return {?}
         */
        MultiSelectComponent.prototype.getValue = /**
         * @param {?} item
         * @param {?} nestedPath
         * @return {?}
         */
            function (item, nestedPath) {
                var /** @type {?} */ nestedProps = nestedPath.split('.');
                if (nestedProps.length === 1) {
                    return item[nestedPath];
                }
                else {
                    var /** @type {?} */ nestedItem_1 = item;
                    nestedProps.forEach(function (nestedProp) {
                        if (nestedItem_1) {
                            nestedItem_1 = nestedItem_1[nestedProp];
                        }
                    });
                    return nestedItem_1;
                }
            };
        /**
         * @param {?} $event
         * @param {?} item
         * @return {?}
         */
        MultiSelectComponent.prototype.onItemClick = /**
         * @param {?} $event
         * @param {?} item
         * @return {?}
         */
            function ($event, item) {
                if (this.disabled) {
                    return false;
                }
                var /** @type {?} */ found = this.isSelected(item);
                var /** @type {?} */ allowAdd = this._settings.limitSelection === -1 ||
                    (this._settings.limitSelection > 0 &&
                        this.selectedItems.length < this._settings.limitSelection);
                if (!found) {
                    if (allowAdd) {
                        this.addSelected(item);
                    }
                }
                else {
                    this.removeSelected(item);
                }
                if (this._settings.singleSelection &&
                    this._settings.closeDropDownOnSelection) {
                    this.closeDropdown();
                }
            };
        /**
         * @param {?} value
         * @return {?}
         */
        MultiSelectComponent.prototype.writeValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                var _this = this;
                if (value !== undefined && value !== null && value.length > 0) {
                    if (this._settings.singleSelection) {
                        try {
                            if (value.length >= 1) {
                                var /** @type {?} */ firstItem = value;
                                this.selectedItems = [
                                    typeof firstItem === 'string'
                                        ? new ListItem(firstItem)
                                        : new ListItem({
                                            id: firstItem[this._settings.idField],
                                            text: firstItem[this._settings.textField]
                                        })
                                ];
                            }
                        }
                        catch (e) {
                            // console.error(e.body.msg);
                        }
                    }
                    else {
                        var /** @type {?} */ _data = value.map(function (item) {
                            return typeof item === 'string'
                                ? new ListItem(item)
                                : new ListItem({
                                    id: item[_this._settings.idField],
                                    text: item[_this._settings.textField]
                                });
                        });
                        if (this._settings.limitSelection > 0) {
                            this.selectedItems = _data.splice(0, this._settings.limitSelection);
                        }
                        else {
                            this.selectedItems = _data;
                        }
                    }
                }
                else {
                    this.selectedItems = [];
                }
                this.onChangeCallback(value);
            };
        // From ControlValueAccessor interface
        /**
         * @param {?} fn
         * @return {?}
         */
        MultiSelectComponent.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onChangeCallback = fn;
            };
        // From ControlValueAccessor interface
        /**
         * @param {?} fn
         * @return {?}
         */
        MultiSelectComponent.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
            function (fn) {
                this.onTouchedCallback = fn;
            };
        /**
         * @return {?}
         */
        MultiSelectComponent.prototype.onTouched = /**
         * @return {?}
         */
            function () {
                this.closeDropdown();
                this.onTouchedCallback();
            };
        /**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
        MultiSelectComponent.prototype.trackByFn = /**
         * @param {?} index
         * @param {?} item
         * @return {?}
         */
            function (index, item) {
                return item.id;
            };
        /**
         * @param {?} clickedItem
         * @return {?}
         */
        MultiSelectComponent.prototype.isSelected = /**
         * @param {?} clickedItem
         * @return {?}
         */
            function (clickedItem) {
                var /** @type {?} */ found = false;
                this.selectedItems.forEach(function (item) {
                    if (clickedItem.id === item.id) {
                        found = true;
                    }
                });
                return found;
            };
        /**
         * @return {?}
         */
        MultiSelectComponent.prototype.isLimitSelectionReached = /**
         * @return {?}
         */
            function () {
                return this._settings.limitSelection === this.selectedItems.length;
            };
        /**
         * @return {?}
         */
        MultiSelectComponent.prototype.isAllItemsSelected = /**
         * @return {?}
         */
            function () {
                return this._data.length === this.selectedItems.length;
            };
        /**
         * @return {?}
         */
        MultiSelectComponent.prototype.showButton = /**
         * @return {?}
         */
            function () {
                if (!this._settings.singleSelection) {
                    if (this._settings.limitSelection > 0) {
                        return false;
                    }
                    // this._settings.enableCheckAll = this._settings.limitSelection === -1 ? true : false;
                    return true; // !this._settings.singleSelection && this._settings.enableCheckAll && this._data.length > 0;
                }
                else {
                    // should be disabled in single selection mode
                    return false;
                }
            };
        /**
         * @return {?}
         */
        MultiSelectComponent.prototype.itemShowRemaining = /**
         * @return {?}
         */
            function () {
                return this.selectedItems.length - this._settings.itemsShowLimit;
            };
        /**
         * @param {?} item
         * @return {?}
         */
        MultiSelectComponent.prototype.addSelected = /**
         * @param {?} item
         * @return {?}
         */
            function (item) {
                if (this._settings.singleSelection) {
                    this.selectedItems = [];
                    this.selectedItems.push(item);
                }
                else {
                    this.selectedItems.push(item);
                }
                this.onChangeCallback(this.emittedValue(this.selectedItems));
                this.onSelect.emit(this.emittedValue(item));
            };
        /**
         * @param {?} itemSel
         * @return {?}
         */
        MultiSelectComponent.prototype.removeSelected = /**
         * @param {?} itemSel
         * @return {?}
         */
            function (itemSel) {
                var _this = this;
                this.selectedItems.forEach(function (item) {
                    if (itemSel.id === item.id) {
                        _this.selectedItems.splice(_this.selectedItems.indexOf(item), 1);
                    }
                });
                this.onChangeCallback(this.emittedValue(this.selectedItems));
                this.onDeSelect.emit(this.emittedValue(itemSel));
            };
        /**
         * @param {?} val
         * @return {?}
         */
        MultiSelectComponent.prototype.emittedValue = /**
         * @param {?} val
         * @return {?}
         */
            function (val) {
                var _this = this;
                var /** @type {?} */ selected = [];
                if (Array.isArray(val)) {
                    val.map(function (item) {
                        if (item.id === item.text) {
                            selected.push(item.text);
                        }
                        else {
                            selected.push(_this.objectify(item));
                        }
                    });
                }
                else {
                    if (val) {
                        if (val.id === val.text) {
                            return val.text;
                        }
                        else {
                            return this.objectify(val);
                        }
                    }
                }
                if (this._settings.singleSelection) {
                    selected = selected[0];
                    if (this._settings.idMode && selected) {
                        selected = selected[this._settings.idField];
                    }
                }
                return selected;
            };
        /**
         * @param {?} val
         * @return {?}
         */
        MultiSelectComponent.prototype.objectify = /**
         * @param {?} val
         * @return {?}
         */
            function (val) {
                var /** @type {?} */ obj = {};
                obj[this._settings.idField] = val.id;
                obj[this._settings.textField] = val.text;
                return obj;
            };
        /**
         * @param {?} evt
         * @return {?}
         */
        MultiSelectComponent.prototype.toggleDropdown = /**
         * @param {?} evt
         * @return {?}
         */
            function (evt) {
                evt.preventDefault();
                if (this.disabled && this._settings.singleSelection) {
                    return;
                }
                this._settings.defaultOpen = !this._settings.defaultOpen;
                if (!this._settings.defaultOpen) {
                    this.onDropDownClose.emit();
                }
            };
        /**
         * @return {?}
         */
        MultiSelectComponent.prototype.closeDropdown = /**
         * @return {?}
         */
            function () {
                this._settings.defaultOpen = false;
                // clear search text
                if (this._settings.clearSearchFilter) {
                    this.filter.text = '';
                }
                this.onDropDownClose.emit();
            };
        /**
         * @return {?}
         */
        MultiSelectComponent.prototype.toggleSelectAll = /**
         * @return {?}
         */
            function () {
                if (this.disabled) {
                    return false;
                }
                if (!this.isAllItemsSelected()) {
                    this.selectedItems = this._data.slice();
                    this.onSelectAll.emit(this.emittedValue(this.selectedItems));
                }
                else {
                    this.selectedItems = [];
                    this.onDeSelectAll.emit(this.emittedValue(this.selectedItems));
                }
                this.onChangeCallback(this.emittedValue(this.selectedItems));
            };
        MultiSelectComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ng-multiselect-dropdown',
                        template: "<div tabindex=\"=0\" (blur)=\"onTouched()\" class=\"multiselect-dropdown\" (clickOutside)=\"closeDropdown()\">\n  <div [class.disabled]=\"disabled\">\n    <span tabindex=\"-1\" class=\"dropdown-btn\" (click)=\"toggleDropdown($event)\">\n      <span *ngIf=\"selectedItems.length == 0\">{{_placeholder}}</span>\n      <span class=\"selected-item\" *ngFor=\"let item of selectedItems;trackBy: trackByFn;let k = index\" [hidden]=\"k > _settings.itemsShowLimit-1\">\n        {{item.text}}\n        <a style=\"padding-top:2px;padding-left:2px;color:white\" (click)=\"onItemClick($event,item)\">x</a>\n      </span>\n      <span style=\"float:right !important;padding-right:4px\">\n        <span style=\"padding-right: 6px;\" *ngIf=\"itemShowRemaining()>0\">+{{itemShowRemaining()}}</span>\n        <span [ngClass]=\"_settings.defaultOpen ? 'dropdown-up' : 'dropdown-down'\"></span>\n      </span>\n    </span>\n  </div>\n  <div class=\"dropdown-list\" [hidden]=\"!_settings.defaultOpen\">\n    <ul class=\"item1\">\n      <li (click)=\"toggleSelectAll()\" *ngIf=\"_data.length > 0 && !_settings.singleSelection && _settings.enableCheckAll && _settings.limitSelection===-1\" class=\"multiselect-item-checkbox\" style=\"border-bottom: 1px solid #ccc;padding:10px\">\n        <input type=\"checkbox\" aria-label=\"multiselect-select-all\" [checked]=\"isAllItemsSelected()\" [disabled]=\"disabled || isLimitSelectionReached()\" />\n        <div>{{!isAllItemsSelected() ? _settings.selectAllText : _settings.unSelectAllText}}</div>\n      </li>\n      <li class=\"filter-textbox\" *ngIf=\"_data.length>0 && _settings.allowSearchFilter\">\n        <input type=\"text\" aria-label=\"multiselect-search\" [readOnly]=\"disabled\" [placeholder]=\"_settings.searchPlaceholderText\" [(ngModel)]=\"filter.text\" (ngModelChange)=\"onFilterTextChange($event)\">\n      </li>\n    </ul>\n    <ul class=\"item2\" [style.maxHeight]=\"_settings.maxHeight+'px'\">\n      <li *ngFor=\"let item of _data | ng2ListFilter:filter; let i = index;\" (click)=\"onItemClick($event,item)\" class=\"multiselect-item-checkbox\">\n        <input type=\"checkbox\" aria-label=\"multiselect-item\" [checked]=\"isSelected(item)\" [disabled]=\"disabled || (isLimitSelectionReached() && !isSelected(item))\" />\n        <div>{{item.text}}</div>\n      </li>\n      <li class='no-data' *ngIf=\"_data.length == 0\">\n        <h5>{{_settings.noDataAvailablePlaceholderText}}</h5>\n      </li>\n    </ul>\n  </div>\n</div>",
                        styles: [".multiselect-dropdown{position:relative;width:100%;font-size:inherit;font-family:inherit}.multiselect-dropdown .dropdown-btn{display:inline-block;border:1px solid #adadad;width:100%;padding:6px 12px;margin-bottom:0;font-weight:400;line-height:1.52857143;text-align:left;vertical-align:middle;cursor:pointer;background-image:none;border-radius:4px}.multiselect-dropdown .dropdown-btn .selected-item{border:1px solid #337ab7;margin-right:4px;background:#337ab7;padding:0 5px;color:#fff;border-radius:2px;float:left}.multiselect-dropdown .dropdown-btn .selected-item a{text-decoration:none}.multiselect-dropdown .dropdown-btn .selected-item:hover{box-shadow:1px 1px #959595}.multiselect-dropdown .dropdown-btn .dropdown-down{display:inline-block;top:10px;width:0;height:0;border-top:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .dropdown-btn .dropdown-up{display:inline-block;width:0;height:0;border-bottom:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .disabled>span{background-color:#eceeef}.dropdown-list{position:absolute;padding-top:6px;width:100%;z-index:9999;border:1px solid #ccc;border-radius:3px;background:#fff;margin-top:10px;box-shadow:0 1px 5px #959595}.dropdown-list ul{padding:0;list-style:none;overflow:auto;margin:0}.dropdown-list li{padding:6px 10px;cursor:pointer;text-align:left}.dropdown-list .filter-textbox{border-bottom:1px solid #ccc;position:relative;padding:10px}.dropdown-list .filter-textbox input{border:0;width:100%;padding:0 0 0 26px}.dropdown-list .filter-textbox input:focus{outline:0}.multiselect-item-checkbox input[type=checkbox]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.multiselect-item-checkbox input[type=checkbox]:focus+div:before,.multiselect-item-checkbox input[type=checkbox]:hover+div:before{border-color:#337ab7;background-color:#f2f2f2}.multiselect-item-checkbox input[type=checkbox]:active+div:before{transition-duration:0s}.multiselect-item-checkbox input[type=checkbox]+div{position:relative;padding-left:2em;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;margin:0;color:#000}.multiselect-item-checkbox input[type=checkbox]+div:before{box-sizing:content-box;content:'';color:#337ab7;position:absolute;top:50%;left:0;width:14px;height:14px;margin-top:-9px;border:2px solid #337ab7;text-align:center;transition:.4s}.multiselect-item-checkbox input[type=checkbox]+div:after{box-sizing:content-box;content:'';position:absolute;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:50%;transform-origin:50%;transition:transform .2s ease-out,-webkit-transform .2s ease-out;background-color:transparent;top:50%;left:4px;width:8px;height:3px;margin-top:-4px;border-style:solid;border-color:#fff;border-width:0 0 3px 3px;-o-border-image:none;border-image:none;-webkit-transform:rotate(-45deg) scale(0);transform:rotate(-45deg) scale(0)}.multiselect-item-checkbox input[type=checkbox]:disabled+div:before{border-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:disabled:focus+div:before .multiselect-item-checkbox input[type=checkbox]:disabled:hover+div:before{background-color:inherit}.multiselect-item-checkbox input[type=checkbox]:disabled:checked+div:before{background-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:checked+div:after{content:'';transition:transform .2s ease-out,-webkit-transform .2s ease-out;-webkit-transform:rotate(-45deg) scale(1);transform:rotate(-45deg) scale(1)}.multiselect-item-checkbox input[type=checkbox]:checked+div:before{-webkit-animation:.2s ease-in borderscale;animation:.2s ease-in borderscale;background:#337ab7}@-webkit-keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}@keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}"],
                        providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR],
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    },] },
        ];
        /** @nocollapse */
        MultiSelectComponent.ctorParameters = function () {
            return [
                { type: core.ChangeDetectorRef, },
            ];
        };
        MultiSelectComponent.propDecorators = {
            "placeholder": [{ type: core.Input },],
            "disabled": [{ type: core.Input },],
            "settings": [{ type: core.Input },],
            "data": [{ type: core.Input },],
            "onFilterChange": [{ type: core.Output, args: ['onFilterChange',] },],
            "onDropDownClose": [{ type: core.Output, args: ['onDropDownClose',] },],
            "onSelect": [{ type: core.Output, args: ['onSelect',] },],
            "onDeSelect": [{ type: core.Output, args: ['onDeSelect',] },],
            "onSelectAll": [{ type: core.Output, args: ['onSelectAll',] },],
            "onDeSelectAll": [{ type: core.Output, args: ['onDeSelectAll',] },],
            "onTouched": [{ type: core.HostListener, args: ['blur',] },],
        };
        return MultiSelectComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ClickOutsideDirective = (function () {
        function ClickOutsideDirective(_elementRef) {
            this._elementRef = _elementRef;
            this.clickOutside = new core.EventEmitter();
        }
        /**
         * @param {?} event
         * @param {?} targetElement
         * @return {?}
         */
        ClickOutsideDirective.prototype.onClick = /**
         * @param {?} event
         * @param {?} targetElement
         * @return {?}
         */
            function (event, targetElement) {
                if (!targetElement) {
                    return;
                }
                var /** @type {?} */ clickedInside = this._elementRef.nativeElement.contains(targetElement);
                if (!clickedInside) {
                    this.clickOutside.emit(event);
                }
            };
        ClickOutsideDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[clickOutside]'
                    },] },
        ];
        /** @nocollapse */
        ClickOutsideDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef, },
            ];
        };
        ClickOutsideDirective.propDecorators = {
            "clickOutside": [{ type: core.Output },],
            "onClick": [{ type: core.HostListener, args: ['document:click', ['$event', '$event.target'],] },],
        };
        return ClickOutsideDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ListFilterPipe = (function () {
        function ListFilterPipe() {
        }
        /**
         * @param {?} items
         * @param {?} filter
         * @return {?}
         */
        ListFilterPipe.prototype.transform = /**
         * @param {?} items
         * @param {?} filter
         * @return {?}
         */
            function (items, filter) {
                var _this = this;
                if (!items || !filter) {
                    return items;
                }
                return items.filter(function (item) { return _this.applyFilter(item, filter); });
            };
        /**
         * @param {?} item
         * @param {?} filter
         * @return {?}
         */
        ListFilterPipe.prototype.applyFilter = /**
         * @param {?} item
         * @param {?} filter
         * @return {?}
         */
            function (item, filter) {
                return !(filter.text && item.text && item.text.toLowerCase().indexOf(filter.text.toLowerCase()) === -1);
            };
        ListFilterPipe.decorators = [
            { type: core.Pipe, args: [{
                        name: 'ng2ListFilter',
                        pure: false
                    },] },
        ];
        return ListFilterPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgMultiSelectDropDownModule = (function () {
        function NgMultiSelectDropDownModule() {
        }
        /**
         * @return {?}
         */
        NgMultiSelectDropDownModule.forRoot = /**
         * @return {?}
         */
            function () {
                return {
                    ngModule: NgMultiSelectDropDownModule
                };
            };
        NgMultiSelectDropDownModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, forms.FormsModule],
                        declarations: [MultiSelectComponent, ClickOutsideDirective, ListFilterPipe],
                        exports: [MultiSelectComponent]
                    },] },
        ];
        return NgMultiSelectDropDownModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.MultiSelectComponent = MultiSelectComponent;
    exports.NgMultiSelectDropDownModule = NgMultiSelectDropDownModule;
    exports.ɵb = ClickOutsideDirective;
    exports.ɵc = ListFilterPipe;
    exports.ɵa = DROPDOWN_CONTROL_VALUE_ACCESSOR;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctbXVsdGlzZWxlY3QtZHJvcGRvd24udW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi9tdWx0aXNlbGVjdC5tb2RlbC50cyIsIm5nOi8vbmctbXVsdGlzZWxlY3QtZHJvcGRvd24vbXVsdGlzZWxlY3QuY29tcG9uZW50LnRzIiwibmc6Ly9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi9jbGljay1vdXRzaWRlLmRpcmVjdGl2ZS50cyIsIm5nOi8vbmctbXVsdGlzZWxlY3QtZHJvcGRvd24vbGlzdC1maWx0ZXIucGlwZS50cyIsIm5nOi8vbmctbXVsdGlzZWxlY3QtZHJvcGRvd24vbmctbXVsdGlzZWxlY3QtZHJvcGRvd24ubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgSURyb3Bkb3duU2V0dGluZ3Mge1xuICBzaW5nbGVTZWxlY3Rpb24/OiBib29sZWFuO1xuICBpZE1vZGU/OiBib29sZWFuO1xuICBpZEZpZWxkPzogc3RyaW5nO1xuICB0ZXh0RmllbGQ/OiBzdHJpbmc7XG4gIGVuYWJsZUNoZWNrQWxsPzogYm9vbGVhbjtcbiAgc2VsZWN0QWxsVGV4dD86IHN0cmluZztcbiAgdW5TZWxlY3RBbGxUZXh0Pzogc3RyaW5nO1xuICBhbGxvd1NlYXJjaEZpbHRlcj86IGJvb2xlYW47XG4gIGNsZWFyU2VhcmNoRmlsdGVyPzogYm9vbGVhbjtcbiAgbWF4SGVpZ2h0PzogbnVtYmVyO1xuICBpdGVtc1Nob3dMaW1pdD86IG51bWJlcjtcbiAgbGltaXRTZWxlY3Rpb24/OiBudW1iZXI7XG4gIHNlYXJjaFBsYWNlaG9sZGVyVGV4dD86IHN0cmluZztcbiAgbm9EYXRhQXZhaWxhYmxlUGxhY2Vob2xkZXJUZXh0Pzogc3RyaW5nO1xuICBjbG9zZURyb3BEb3duT25TZWxlY3Rpb24/OiBib29sZWFuO1xuICBzaG93U2VsZWN0ZWRJdGVtc0F0VG9wPzogYm9vbGVhbjtcbiAgZGVmYXVsdE9wZW4/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgTGlzdEl0ZW0ge1xuICBpZDogU3RyaW5nO1xuICB0ZXh0OiBTdHJpbmc7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHNvdXJjZTogYW55KSB7XG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLmlkID0gdGhpcy50ZXh0ID0gc291cmNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHNvdXJjZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHRoaXMuaWQgPSBzb3VyY2UuaWQ7XG4gICAgICB0aGlzLnRleHQgPSBzb3VyY2UudGV4dDtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSG9zdExpc3RlbmVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IExpc3RJdGVtLCBJRHJvcGRvd25TZXR0aW5ncyB9IGZyb20gJy4vbXVsdGlzZWxlY3QubW9kZWwnO1xuXG5leHBvcnQgY29uc3QgRFJPUERPV05fQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTXVsdGlTZWxlY3RDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctbXVsdGlzZWxlY3QtZHJvcGRvd24nLFxuICB0ZW1wbGF0ZTogYDxkaXYgdGFiaW5kZXg9XCI9MFwiIChibHVyKT1cIm9uVG91Y2hlZCgpXCIgY2xhc3M9XCJtdWx0aXNlbGVjdC1kcm9wZG93blwiIChjbGlja091dHNpZGUpPVwiY2xvc2VEcm9wZG93bigpXCI+XG4gIDxkaXYgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgPHNwYW4gdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwiZHJvcGRvd24tYnRuXCIgKGNsaWNrKT1cInRvZ2dsZURyb3Bkb3duKCRldmVudClcIj5cbiAgICAgIDxzcGFuICpuZ0lmPVwic2VsZWN0ZWRJdGVtcy5sZW5ndGggPT0gMFwiPnt7X3BsYWNlaG9sZGVyfX08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInNlbGVjdGVkLWl0ZW1cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzZWxlY3RlZEl0ZW1zO3RyYWNrQnk6IHRyYWNrQnlGbjtsZXQgayA9IGluZGV4XCIgW2hpZGRlbl09XCJrID4gX3NldHRpbmdzLml0ZW1zU2hvd0xpbWl0LTFcIj5cbiAgICAgICAge3tpdGVtLnRleHR9fVxuICAgICAgICA8YSBzdHlsZT1cInBhZGRpbmctdG9wOjJweDtwYWRkaW5nLWxlZnQ6MnB4O2NvbG9yOndoaXRlXCIgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCxpdGVtKVwiPng8L2E+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBzdHlsZT1cImZsb2F0OnJpZ2h0ICFpbXBvcnRhbnQ7cGFkZGluZy1yaWdodDo0cHhcIj5cbiAgICAgICAgPHNwYW4gc3R5bGU9XCJwYWRkaW5nLXJpZ2h0OiA2cHg7XCIgKm5nSWY9XCJpdGVtU2hvd1JlbWFpbmluZygpPjBcIj4re3tpdGVtU2hvd1JlbWFpbmluZygpfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIFtuZ0NsYXNzXT1cIl9zZXR0aW5ncy5kZWZhdWx0T3BlbiA/ICdkcm9wZG93bi11cCcgOiAnZHJvcGRvd24tZG93bidcIj48L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgPC9zcGFuPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImRyb3Bkb3duLWxpc3RcIiBbaGlkZGVuXT1cIiFfc2V0dGluZ3MuZGVmYXVsdE9wZW5cIj5cbiAgICA8dWwgY2xhc3M9XCJpdGVtMVwiPlxuICAgICAgPGxpIChjbGljayk9XCJ0b2dnbGVTZWxlY3RBbGwoKVwiICpuZ0lmPVwiX2RhdGEubGVuZ3RoID4gMCAmJiAhX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbiAmJiBfc2V0dGluZ3MuZW5hYmxlQ2hlY2tBbGwgJiYgX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uPT09LTFcIiBjbGFzcz1cIm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3hcIiBzdHlsZT1cImJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO3BhZGRpbmc6MTBweFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgYXJpYS1sYWJlbD1cIm11bHRpc2VsZWN0LXNlbGVjdC1hbGxcIiBbY2hlY2tlZF09XCJpc0FsbEl0ZW1zU2VsZWN0ZWQoKVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCBpc0xpbWl0U2VsZWN0aW9uUmVhY2hlZCgpXCIgLz5cbiAgICAgICAgPGRpdj57eyFpc0FsbEl0ZW1zU2VsZWN0ZWQoKSA/IF9zZXR0aW5ncy5zZWxlY3RBbGxUZXh0IDogX3NldHRpbmdzLnVuU2VsZWN0QWxsVGV4dH19PC9kaXY+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzPVwiZmlsdGVyLXRleHRib3hcIiAqbmdJZj1cIl9kYXRhLmxlbmd0aD4wICYmIF9zZXR0aW5ncy5hbGxvd1NlYXJjaEZpbHRlclwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBhcmlhLWxhYmVsPVwibXVsdGlzZWxlY3Qtc2VhcmNoXCIgW3JlYWRPbmx5XT1cImRpc2FibGVkXCIgW3BsYWNlaG9sZGVyXT1cIl9zZXR0aW5ncy5zZWFyY2hQbGFjZWhvbGRlclRleHRcIiBbKG5nTW9kZWwpXT1cImZpbHRlci50ZXh0XCIgKG5nTW9kZWxDaGFuZ2UpPVwib25GaWx0ZXJUZXh0Q2hhbmdlKCRldmVudClcIj5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgICA8dWwgY2xhc3M9XCJpdGVtMlwiIFtzdHlsZS5tYXhIZWlnaHRdPVwiX3NldHRpbmdzLm1heEhlaWdodCsncHgnXCI+XG4gICAgICA8bGkgKm5nRm9yPVwibGV0IGl0ZW0gb2YgX2RhdGEgfCBuZzJMaXN0RmlsdGVyOmZpbHRlcjsgbGV0IGkgPSBpbmRleDtcIiAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LGl0ZW0pXCIgY2xhc3M9XCJtdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94XCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBhcmlhLWxhYmVsPVwibXVsdGlzZWxlY3QtaXRlbVwiIFtjaGVja2VkXT1cImlzU2VsZWN0ZWQoaXRlbSlcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWQgfHwgKGlzTGltaXRTZWxlY3Rpb25SZWFjaGVkKCkgJiYgIWlzU2VsZWN0ZWQoaXRlbSkpXCIgLz5cbiAgICAgICAgPGRpdj57e2l0ZW0udGV4dH19PC9kaXY+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzPSduby1kYXRhJyAqbmdJZj1cIl9kYXRhLmxlbmd0aCA9PSAwXCI+XG4gICAgICAgIDxoNT57e19zZXR0aW5ncy5ub0RhdGFBdmFpbGFibGVQbGFjZWhvbGRlclRleHR9fTwvaDU+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIDwvZGl2PlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYC5tdWx0aXNlbGVjdC1kcm9wZG93bntwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxMDAlO2ZvbnQtc2l6ZTppbmhlcml0O2ZvbnQtZmFtaWx5OmluaGVyaXR9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG57ZGlzcGxheTppbmxpbmUtYmxvY2s7Ym9yZGVyOjFweCBzb2xpZCAjYWRhZGFkO3dpZHRoOjEwMCU7cGFkZGluZzo2cHggMTJweDttYXJnaW4tYm90dG9tOjA7Zm9udC13ZWlnaHQ6NDAwO2xpbmUtaGVpZ2h0OjEuNTI4NTcxNDM7dGV4dC1hbGlnbjpsZWZ0O3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtjdXJzb3I6cG9pbnRlcjtiYWNrZ3JvdW5kLWltYWdlOm5vbmU7Ym9yZGVyLXJhZGl1czo0cHh9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG4gLnNlbGVjdGVkLWl0ZW17Ym9yZGVyOjFweCBzb2xpZCAjMzM3YWI3O21hcmdpbi1yaWdodDo0cHg7YmFja2dyb3VuZDojMzM3YWI3O3BhZGRpbmc6MCA1cHg7Y29sb3I6I2ZmZjtib3JkZXItcmFkaXVzOjJweDtmbG9hdDpsZWZ0fS5tdWx0aXNlbGVjdC1kcm9wZG93biAuZHJvcGRvd24tYnRuIC5zZWxlY3RlZC1pdGVtIGF7dGV4dC1kZWNvcmF0aW9uOm5vbmV9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG4gLnNlbGVjdGVkLWl0ZW06aG92ZXJ7Ym94LXNoYWRvdzoxcHggMXB4ICM5NTk1OTV9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG4gLmRyb3Bkb3duLWRvd257ZGlzcGxheTppbmxpbmUtYmxvY2s7dG9wOjEwcHg7d2lkdGg6MDtoZWlnaHQ6MDtib3JkZXItdG9wOjEwcHggc29saWQgI2FkYWRhZDtib3JkZXItbGVmdDoxMHB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1yaWdodDoxMHB4IHNvbGlkIHRyYW5zcGFyZW50fS5tdWx0aXNlbGVjdC1kcm9wZG93biAuZHJvcGRvd24tYnRuIC5kcm9wZG93bi11cHtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDowO2hlaWdodDowO2JvcmRlci1ib3R0b206MTBweCBzb2xpZCAjYWRhZGFkO2JvcmRlci1sZWZ0OjEwcHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJpZ2h0OjEwcHggc29saWQgdHJhbnNwYXJlbnR9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kaXNhYmxlZD5zcGFue2JhY2tncm91bmQtY29sb3I6I2VjZWVlZn0uZHJvcGRvd24tbGlzdHtwb3NpdGlvbjphYnNvbHV0ZTtwYWRkaW5nLXRvcDo2cHg7d2lkdGg6MTAwJTt6LWluZGV4Ojk5OTk7Ym9yZGVyOjFweCBzb2xpZCAjY2NjO2JvcmRlci1yYWRpdXM6M3B4O2JhY2tncm91bmQ6I2ZmZjttYXJnaW4tdG9wOjEwcHg7Ym94LXNoYWRvdzowIDFweCA1cHggIzk1OTU5NX0uZHJvcGRvd24tbGlzdCB1bHtwYWRkaW5nOjA7bGlzdC1zdHlsZTpub25lO292ZXJmbG93OmF1dG87bWFyZ2luOjB9LmRyb3Bkb3duLWxpc3QgbGl7cGFkZGluZzo2cHggMTBweDtjdXJzb3I6cG9pbnRlcjt0ZXh0LWFsaWduOmxlZnR9LmRyb3Bkb3duLWxpc3QgLmZpbHRlci10ZXh0Ym94e2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNjY2M7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzoxMHB4fS5kcm9wZG93bi1saXN0IC5maWx0ZXItdGV4dGJveCBpbnB1dHtib3JkZXI6MDt3aWR0aDoxMDAlO3BhZGRpbmc6MCAwIDAgMjZweH0uZHJvcGRvd24tbGlzdCAuZmlsdGVyLXRleHRib3ggaW5wdXQ6Zm9jdXN7b3V0bGluZTowfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hde2JvcmRlcjowO2NsaXA6cmVjdCgwIDAgMCAwKTtoZWlnaHQ6MXB4O21hcmdpbjotMXB4O292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjA7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MXB4fS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmZvY3VzK2RpdjpiZWZvcmUsLm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06aG92ZXIrZGl2OmJlZm9yZXtib3JkZXItY29sb3I6IzMzN2FiNztiYWNrZ3JvdW5kLWNvbG9yOiNmMmYyZjJ9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06YWN0aXZlK2RpdjpiZWZvcmV7dHJhbnNpdGlvbi1kdXJhdGlvbjowc30ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XStkaXZ7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZy1sZWZ0OjJlbTt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO2N1cnNvcjpwb2ludGVyO21hcmdpbjowO2NvbG9yOiMwMDB9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF0rZGl2OmJlZm9yZXtib3gtc2l6aW5nOmNvbnRlbnQtYm94O2NvbnRlbnQ6Jyc7Y29sb3I6IzMzN2FiNztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6MDt3aWR0aDoxNHB4O2hlaWdodDoxNHB4O21hcmdpbi10b3A6LTlweDtib3JkZXI6MnB4IHNvbGlkICMzMzdhYjc7dGV4dC1hbGlnbjpjZW50ZXI7dHJhbnNpdGlvbjouNHN9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF0rZGl2OmFmdGVye2JveC1zaXppbmc6Y29udGVudC1ib3g7Y29udGVudDonJztwb3NpdGlvbjphYnNvbHV0ZTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCk7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjUwJTt0cmFuc2Zvcm0tb3JpZ2luOjUwJTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnMgZWFzZS1vdXQsLXdlYmtpdC10cmFuc2Zvcm0gLjJzIGVhc2Utb3V0O2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7dG9wOjUwJTtsZWZ0OjRweDt3aWR0aDo4cHg7aGVpZ2h0OjNweDttYXJnaW4tdG9wOi00cHg7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci1jb2xvcjojZmZmO2JvcmRlci13aWR0aDowIDAgM3B4IDNweDstby1ib3JkZXItaW1hZ2U6bm9uZTtib3JkZXItaW1hZ2U6bm9uZTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKSBzY2FsZSgwKTt0cmFuc2Zvcm06cm90YXRlKC00NWRlZykgc2NhbGUoMCl9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06ZGlzYWJsZWQrZGl2OmJlZm9yZXtib3JkZXItY29sb3I6I2NjY30ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpkaXNhYmxlZDpmb2N1cytkaXY6YmVmb3JlIC5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmRpc2FibGVkOmhvdmVyK2RpdjpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjppbmhlcml0fS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmRpc2FibGVkOmNoZWNrZWQrZGl2OmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiNjY2N9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06Y2hlY2tlZCtkaXY6YWZ0ZXJ7Y29udGVudDonJzt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnMgZWFzZS1vdXQsLXdlYmtpdC10cmFuc2Zvcm0gLjJzIGVhc2Utb3V0Oy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpIHNjYWxlKDEpO3RyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKSBzY2FsZSgxKX0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpjaGVja2VkK2RpdjpiZWZvcmV7LXdlYmtpdC1hbmltYXRpb246LjJzIGVhc2UtaW4gYm9yZGVyc2NhbGU7YW5pbWF0aW9uOi4ycyBlYXNlLWluIGJvcmRlcnNjYWxlO2JhY2tncm91bmQ6IzMzN2FiN31ALXdlYmtpdC1rZXlmcmFtZXMgYm9yZGVyc2NhbGV7NTAle2JveC1zaGFkb3c6MCAwIDAgMnB4ICMzMzdhYjd9fUBrZXlmcmFtZXMgYm9yZGVyc2NhbGV7NTAle2JveC1zaGFkb3c6MCAwIDAgMnB4ICMzMzdhYjd9fWBdLFxuICBwcm92aWRlcnM6IFtEUk9QRE9XTl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIHB1YmxpYyBfc2V0dGluZ3M6IElEcm9wZG93blNldHRpbmdzO1xuICBwdWJsaWMgX2RhdGE6IEFycmF5PExpc3RJdGVtPiA9IFtdO1xuICBwdWJsaWMgc2VsZWN0ZWRJdGVtczogQXJyYXk8TGlzdEl0ZW0+ID0gW107XG4gIHB1YmxpYyBpc0Ryb3Bkb3duT3BlbiA9IHRydWU7XG4gIF9wbGFjZWhvbGRlciA9ICdTZWxlY3QnO1xuICBmaWx0ZXI6IExpc3RJdGVtID0gbmV3IExpc3RJdGVtKHRoaXMuZGF0YSk7XG4gIGRlZmF1bHRTZXR0aW5nczogSURyb3Bkb3duU2V0dGluZ3MgPSB7XG4gICAgc2luZ2xlU2VsZWN0aW9uOiBmYWxzZSxcbiAgICBpZE1vZGU6IGZhbHNlLFxuICAgIGlkRmllbGQ6ICdpZCcsXG4gICAgdGV4dEZpZWxkOiAndGV4dCcsXG4gICAgZW5hYmxlQ2hlY2tBbGw6IHRydWUsXG4gICAgc2VsZWN0QWxsVGV4dDogJ1NlbGVjdCBBbGwnLFxuICAgIHVuU2VsZWN0QWxsVGV4dDogJ1VuU2VsZWN0IEFsbCcsXG4gICAgYWxsb3dTZWFyY2hGaWx0ZXI6IGZhbHNlLFxuICAgIGxpbWl0U2VsZWN0aW9uOiAtMSxcbiAgICBjbGVhclNlYXJjaEZpbHRlcjogdHJ1ZSxcbiAgICBtYXhIZWlnaHQ6IDE5NyxcbiAgICBpdGVtc1Nob3dMaW1pdDogOTk5OTk5OTk5OTk5LFxuICAgIHNlYXJjaFBsYWNlaG9sZGVyVGV4dDogJ1NlYXJjaCcsXG4gICAgbm9EYXRhQXZhaWxhYmxlUGxhY2Vob2xkZXJUZXh0OiAnTm8gZGF0YSBhdmFpbGFibGUnLFxuICAgIGNsb3NlRHJvcERvd25PblNlbGVjdGlvbjogZmFsc2UsXG4gICAgc2hvd1NlbGVjdGVkSXRlbXNBdFRvcDogZmFsc2UsXG4gICAgZGVmYXVsdE9wZW46IGZhbHNlXG4gIH07XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBwbGFjZWhvbGRlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wbGFjZWhvbGRlciA9ICdTZWxlY3QnO1xuICAgIH1cbiAgfVxuICBASW5wdXQoKVxuICBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgc2V0dGluZ3ModmFsdWU6IElEcm9wZG93blNldHRpbmdzKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl9zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24odGhpcy5kZWZhdWx0U2V0dGluZ3MsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHRoaXMuZGVmYXVsdFNldHRpbmdzKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IEFycmF5PGFueT4pIHtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB0aGlzLl9kYXRhID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNvbnN0IF9pdGVtcyA9IHZhbHVlLmZpbHRlcigoaXRlbTogYW55KSA9PiB7XG4gICAgICAvLyAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycgfHwgKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JyAmJiBpdGVtICYmIGl0ZW1bdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0gJiYgaXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdKSkge1xuICAgICAgLy8gICAgIHJldHVybiBpdGVtO1xuICAgICAgLy8gICB9XG4gICAgICAvLyB9KTtcbiAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZS5tYXAoXG4gICAgICAgIChpdGVtOiBhbnkpID0+XG4gICAgICAgICAgdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnXG4gICAgICAgICAgICA/IG5ldyBMaXN0SXRlbShpdGVtKVxuICAgICAgICAgICAgOiBuZXcgTGlzdEl0ZW0oe1xuICAgICAgICAgICAgICAgIGlkOiBpdGVtW3RoaXMuX3NldHRpbmdzLmlkRmllbGRdLFxuICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMuZ2V0VmFsdWUoaXRlbSwgdGhpcy5fc2V0dGluZ3MudGV4dEZpZWxkKVxuICAgICAgICAgICAgICAgIC8vIHRleHQ6IGl0ZW1bdGhpcy5fc2V0dGluZ3MudGV4dEZpZWxkXVxuICAgICAgICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdvbkZpbHRlckNoYW5nZScpXG4gIG9uRmlsdGVyQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TGlzdEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoJ29uRHJvcERvd25DbG9zZScpXG4gIG9uRHJvcERvd25DbG9zZTogRXZlbnRFbWl0dGVyPExpc3RJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoJ29uU2VsZWN0JylcbiAgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxMaXN0SXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCdvbkRlU2VsZWN0JylcbiAgb25EZVNlbGVjdDogRXZlbnRFbWl0dGVyPExpc3RJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoJ29uU2VsZWN0QWxsJylcbiAgb25TZWxlY3RBbGw6IEV2ZW50RW1pdHRlcjxBcnJheTxMaXN0SXRlbT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xuXG4gIEBPdXRwdXQoJ29uRGVTZWxlY3RBbGwnKVxuICBvbkRlU2VsZWN0QWxsOiBFdmVudEVtaXR0ZXI8QXJyYXk8TGlzdEl0ZW0+PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8YW55Pj4oKTtcblxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBvbkZpbHRlclRleHRDaGFuZ2UoJGV2ZW50KSB7XG4gICAgdGhpcy5vbkZpbHRlckNoYW5nZS5lbWl0KCRldmVudCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgZ2V0VmFsdWUoaXRlbTogYW55LCBuZXN0ZWRQYXRoOiBzdHJpbmcpIHtcbiAgICBjb25zdCBuZXN0ZWRQcm9wcyA9IG5lc3RlZFBhdGguc3BsaXQoJy4nKTtcbiAgXG4gICAgaWYgKG5lc3RlZFByb3BzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gaXRlbVtuZXN0ZWRQYXRoXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgbmVzdGVkSXRlbSA9IGl0ZW07XG4gICAgICAgIG5lc3RlZFByb3BzLmZvckVhY2goKG5lc3RlZFByb3ApID0+IHtcbiAgICAgICAgICAgIGlmIChuZXN0ZWRJdGVtKSB7XG4gICAgICAgICAgICAgICAgbmVzdGVkSXRlbSA9IG5lc3RlZEl0ZW1bbmVzdGVkUHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICByZXR1cm4gbmVzdGVkSXRlbTtcbiAgICB9XG59XG5cbiAgb25JdGVtQ2xpY2soJGV2ZW50OiBhbnksIGl0ZW06IExpc3RJdGVtKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBmb3VuZCA9IHRoaXMuaXNTZWxlY3RlZChpdGVtKTtcbiAgICBjb25zdCBhbGxvd0FkZCA9XG4gICAgICB0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA9PT0gLTEgfHxcbiAgICAgICh0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA+IDAgJiZcbiAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCA8IHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uKTtcbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBpZiAoYWxsb3dBZGQpIHtcbiAgICAgICAgdGhpcy5hZGRTZWxlY3RlZChpdGVtKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVTZWxlY3RlZChpdGVtKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhpcy5fc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uICYmXG4gICAgICB0aGlzLl9zZXR0aW5ncy5jbG9zZURyb3BEb3duT25TZWxlY3Rpb25cbiAgICApIHtcbiAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgIH1cbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0SXRlbSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW1xuICAgICAgICAgICAgICB0eXBlb2YgZmlyc3RJdGVtID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgID8gbmV3IExpc3RJdGVtKGZpcnN0SXRlbSlcbiAgICAgICAgICAgICAgICA6IG5ldyBMaXN0SXRlbSh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBmaXJzdEl0ZW1bdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0sXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGZpcnN0SXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGUuYm9keS5tc2cpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBfZGF0YSA9IHZhbHVlLm1hcChcbiAgICAgICAgICAoaXRlbTogYW55KSA9PlxuICAgICAgICAgICAgdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgID8gbmV3IExpc3RJdGVtKGl0ZW0pXG4gICAgICAgICAgICAgIDogbmV3IExpc3RJdGVtKHtcbiAgICAgICAgICAgICAgICAgIGlkOiBpdGVtW3RoaXMuX3NldHRpbmdzLmlkRmllbGRdLFxuICAgICAgICAgICAgICAgICAgdGV4dDogaXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID4gMCkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IF9kYXRhLnNwbGljZSgwLCB0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gX2RhdGE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgfVxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBTZXQgdG91Y2hlZCBvbiBibHVyXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBwdWJsaWMgb25Ub3VjaGVkKCkge1xuICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIHRyYWNrQnlGbihpbmRleCwgaXRlbSkge1xuICAgIHJldHVybiBpdGVtLmlkO1xuICB9XG5cbiAgaXNTZWxlY3RlZChjbGlja2VkSXRlbTogTGlzdEl0ZW0pIHtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChjbGlja2VkSXRlbS5pZCA9PT0gaXRlbS5pZCkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9XG5cbiAgaXNMaW1pdFNlbGVjdGlvblJlYWNoZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID09PSB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO1xuICB9XG5cbiAgaXNBbGxJdGVtc1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kYXRhLmxlbmd0aCA9PT0gdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtcbiAgfVxuXG4gIHNob3dCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcbiAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA+IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gdGhpcy5fc2V0dGluZ3MuZW5hYmxlQ2hlY2tBbGwgPSB0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA9PT0gLTEgPyB0cnVlIDogZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTsgLy8gIXRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbiAmJiB0aGlzLl9zZXR0aW5ncy5lbmFibGVDaGVja0FsbCAmJiB0aGlzLl9kYXRhLmxlbmd0aCA+IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNob3VsZCBiZSBkaXNhYmxlZCBpbiBzaW5nbGUgc2VsZWN0aW9uIG1vZGVcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpdGVtU2hvd1JlbWFpbmluZygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoIC0gdGhpcy5fc2V0dGluZ3MuaXRlbXNTaG93TGltaXQ7XG4gIH1cblxuICBhZGRTZWxlY3RlZChpdGVtOiBMaXN0SXRlbSkge1xuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KHRoaXMuZW1pdHRlZFZhbHVlKGl0ZW0pKTtcbiAgfVxuXG4gIHJlbW92ZVNlbGVjdGVkKGl0ZW1TZWw6IExpc3RJdGVtKSB7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoaXRlbVNlbC5pZCA9PT0gaXRlbS5pZCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMuc3BsaWNlKHRoaXMuc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGl0ZW0pLCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XG4gICAgdGhpcy5vbkRlU2VsZWN0LmVtaXQodGhpcy5lbWl0dGVkVmFsdWUoaXRlbVNlbCkpO1xuICB9XG5cbiAgZW1pdHRlZFZhbHVlKHZhbDogYW55KTogYW55IHtcbiAgICBsZXQgc2VsZWN0ZWQgPSBbXTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICB2YWwubWFwKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaXRlbS5pZCA9PT0gaXRlbS50ZXh0KSB7XG4gICAgICAgICAgc2VsZWN0ZWQucHVzaChpdGVtLnRleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGVjdGVkLnB1c2godGhpcy5vYmplY3RpZnkoaXRlbSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHZhbCkge1xuICAgICAgICBpZiAodmFsLmlkID09PSB2YWwudGV4dCkge1xuICAgICAgICAgIHJldHVybiB2YWwudGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RpZnkodmFsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcbiAgICAgIHNlbGVjdGVkID0gc2VsZWN0ZWRbMF07XG5cbiAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5pZE1vZGUgJiYgc2VsZWN0ZWQpIHtcbiAgICAgICAgc2VsZWN0ZWQgPSBzZWxlY3RlZFt0aGlzLl9zZXR0aW5ncy5pZEZpZWxkXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZWN0ZWQ7XG4gIH1cblxuICBvYmplY3RpZnkodmFsOiBMaXN0SXRlbSkge1xuICAgIGNvbnN0IG9iaiA9IHt9O1xuICAgIG9ialt0aGlzLl9zZXR0aW5ncy5pZEZpZWxkXSA9IHZhbC5pZDtcbiAgICBvYmpbdGhpcy5fc2V0dGluZ3MudGV4dEZpZWxkXSA9IHZhbC50ZXh0O1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB0b2dnbGVEcm9wZG93bihldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCAmJiB0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc2V0dGluZ3MuZGVmYXVsdE9wZW4gPSAhdGhpcy5fc2V0dGluZ3MuZGVmYXVsdE9wZW47XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncy5kZWZhdWx0T3Blbikge1xuICAgICAgdGhpcy5vbkRyb3BEb3duQ2xvc2UuZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlRHJvcGRvd24oKSB7XG4gICAgdGhpcy5fc2V0dGluZ3MuZGVmYXVsdE9wZW4gPSBmYWxzZTtcbiAgICAvLyBjbGVhciBzZWFyY2ggdGV4dFxuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5jbGVhclNlYXJjaEZpbHRlcikge1xuICAgICAgdGhpcy5maWx0ZXIudGV4dCA9ICcnO1xuICAgIH1cbiAgICB0aGlzLm9uRHJvcERvd25DbG9zZS5lbWl0KCk7XG4gIH1cblxuICB0b2dnbGVTZWxlY3RBbGwoKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzQWxsSXRlbXNTZWxlY3RlZCgpKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSB0aGlzLl9kYXRhLnNsaWNlKCk7XG4gICAgICB0aGlzLm9uU2VsZWN0QWxsLmVtaXQodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgdGhpcy5vbkRlU2VsZWN0QWxsLmVtaXQodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XG4gICAgfVxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLmVtaXR0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbXMpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tjbGlja091dHNpZGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBDbGlja091dHNpZGVEaXJlY3RpdmUge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB9XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgY2xpY2tPdXRzaWRlID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PigpO1xuXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCcsICckZXZlbnQudGFyZ2V0J10pXG4gICAgcHVibGljIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIHRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGlmICghdGFyZ2V0RWxlbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2xpY2tlZEluc2lkZSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyh0YXJnZXRFbGVtZW50KTtcbiAgICAgICAgaWYgKCFjbGlja2VkSW5zaWRlKSB7XG4gICAgICAgICAgICB0aGlzLmNsaWNrT3V0c2lkZS5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTGlzdEl0ZW0gfSBmcm9tICcuL211bHRpc2VsZWN0Lm1vZGVsJztcblxuQFBpcGUoe1xuICAgIG5hbWU6ICduZzJMaXN0RmlsdGVyJyxcbiAgICBwdXJlOiBmYWxzZVxufSlcbmV4cG9ydCBjbGFzcyBMaXN0RmlsdGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybShpdGVtczogTGlzdEl0ZW1bXSwgZmlsdGVyOiBMaXN0SXRlbSk6IExpc3RJdGVtW10ge1xuICAgICAgICBpZiAoIWl0ZW1zIHx8ICFmaWx0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXRlbXMuZmlsdGVyKChpdGVtOiBMaXN0SXRlbSkgPT4gdGhpcy5hcHBseUZpbHRlcihpdGVtLCBmaWx0ZXIpKTtcbiAgICB9XG5cbiAgICBhcHBseUZpbHRlcihpdGVtOiBMaXN0SXRlbSwgZmlsdGVyOiBMaXN0SXRlbSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIShmaWx0ZXIudGV4dCAmJiBpdGVtLnRleHQgJiYgaXRlbS50ZXh0LnRvTG93ZXJDYXNlKCkuaW5kZXhPZihmaWx0ZXIudGV4dC50b0xvd2VyQ2FzZSgpKSA9PT0gLTEpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNdWx0aVNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4vbXVsdGlzZWxlY3QuY29tcG9uZW50JztcbmltcG9ydCB7IENsaWNrT3V0c2lkZURpcmVjdGl2ZSB9IGZyb20gJy4vY2xpY2stb3V0c2lkZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTGlzdEZpbHRlclBpcGUgfSBmcm9tICcuL2xpc3QtZmlsdGVyLnBpcGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW011bHRpU2VsZWN0Q29tcG9uZW50LCBDbGlja091dHNpZGVEaXJlY3RpdmUsIExpc3RGaWx0ZXJQaXBlXSxcbiAgZXhwb3J0czogW011bHRpU2VsZWN0Q29tcG9uZW50XVxufSlcblxuZXhwb3J0IGNsYXNzIE5nTXVsdGlTZWxlY3REcm9wRG93bk1vZHVsZSB7XG4gICAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBuZ01vZHVsZTogTmdNdWx0aVNlbGVjdERyb3BEb3duTW9kdWxlXG4gICAgICB9O1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJOR19WQUxVRV9BQ0NFU1NPUiIsImZvcndhcmRSZWYiLCJFdmVudEVtaXR0ZXIiLCJDb21wb25lbnQiLCJDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSIsIkNoYW5nZURldGVjdG9yUmVmIiwiSW5wdXQiLCJPdXRwdXQiLCJIb3N0TGlzdGVuZXIiLCJEaXJlY3RpdmUiLCJFbGVtZW50UmVmIiwiUGlwZSIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFvQkEsSUFBQTswQkFJcUIsTUFBVztZQUM1QixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQzthQUM5QjtZQUNE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