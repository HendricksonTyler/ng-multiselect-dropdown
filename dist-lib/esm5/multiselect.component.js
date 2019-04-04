/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, HostListener, forwardRef, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ListItem } from './multiselect.model';
export var /** @type {?} */ DROPDOWN_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MultiSelectComponent; }),
    multi: true
};
var /** @type {?} */ noop = function () { };
var ɵ0 = noop;
var MultiSelectComponent = /** @class */ (function () {
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
        this.onFilterChange = new EventEmitter();
        this.onDropDownClose = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onDeSelect = new EventEmitter();
        this.onSelectAll = new EventEmitter();
        this.onDeSelectAll = new EventEmitter();
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(MultiSelectComponent.prototype, "placeholder", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
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
         */
        function (value) {
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
         */
        function (value) {
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
                catch (/** @type {?} */ e) {
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
        { type: Component, args: [{
                    selector: 'ng-multiselect-dropdown',
                    template: "<div tabindex=\"=0\" (blur)=\"onTouched()\" class=\"multiselect-dropdown\" (clickOutside)=\"closeDropdown()\">\n  <div [class.disabled]=\"disabled\">\n    <span tabindex=\"-1\" class=\"dropdown-btn\" (click)=\"toggleDropdown($event)\">\n      <span *ngIf=\"selectedItems.length == 0\">{{_placeholder}}</span>\n      <span class=\"selected-item\" *ngFor=\"let item of selectedItems;trackBy: trackByFn;let k = index\" [hidden]=\"k > _settings.itemsShowLimit-1\">\n        {{item.text}}\n        <a style=\"padding-top:2px;padding-left:2px;color:white\" (click)=\"onItemClick($event,item)\">x</a>\n      </span>\n      <span style=\"float:right !important;padding-right:4px\">\n        <span style=\"padding-right: 6px;\" *ngIf=\"itemShowRemaining()>0\">+{{itemShowRemaining()}}</span>\n        <span [ngClass]=\"_settings.defaultOpen ? 'dropdown-up' : 'dropdown-down'\"></span>\n      </span>\n    </span>\n  </div>\n  <div class=\"dropdown-list\" [hidden]=\"!_settings.defaultOpen\">\n    <ul class=\"item1\">\n      <li (click)=\"toggleSelectAll()\" *ngIf=\"_data.length > 0 && !_settings.singleSelection && _settings.enableCheckAll && _settings.limitSelection===-1\" class=\"multiselect-item-checkbox\" style=\"border-bottom: 1px solid #ccc;padding:10px\">\n        <input type=\"checkbox\" aria-label=\"multiselect-select-all\" [checked]=\"isAllItemsSelected()\" [disabled]=\"disabled || isLimitSelectionReached()\" />\n        <div>{{!isAllItemsSelected() ? _settings.selectAllText : _settings.unSelectAllText}}</div>\n      </li>\n      <li class=\"filter-textbox\" *ngIf=\"_data.length>0 && _settings.allowSearchFilter\">\n        <input type=\"text\" aria-label=\"multiselect-search\" [readOnly]=\"disabled\" [placeholder]=\"_settings.searchPlaceholderText\" [(ngModel)]=\"filter.text\" (ngModelChange)=\"onFilterTextChange($event)\">\n      </li>\n    </ul>\n    <ul class=\"item2\" [style.maxHeight]=\"_settings.maxHeight+'px'\">\n      <li *ngFor=\"let item of _data | ng2ListFilter:filter; let i = index;\" (click)=\"onItemClick($event,item)\" class=\"multiselect-item-checkbox\">\n        <input type=\"checkbox\" aria-label=\"multiselect-item\" [checked]=\"isSelected(item)\" [disabled]=\"disabled || (isLimitSelectionReached() && !isSelected(item))\" />\n        <div>{{item.text}}</div>\n      </li>\n      <li class='no-data' *ngIf=\"_data.length == 0\">\n        <h5>{{_settings.noDataAvailablePlaceholderText}}</h5>\n      </li>\n    </ul>\n  </div>\n</div>",
                    styles: [".multiselect-dropdown{position:relative;width:100%;font-size:inherit;font-family:inherit}.multiselect-dropdown .dropdown-btn{display:inline-block;border:1px solid #adadad;width:100%;padding:6px 12px;margin-bottom:0;font-weight:400;line-height:1.52857143;text-align:left;vertical-align:middle;cursor:pointer;background-image:none;border-radius:4px}.multiselect-dropdown .dropdown-btn .selected-item{border:1px solid #337ab7;margin-right:4px;background:#337ab7;padding:0 5px;color:#fff;border-radius:2px;float:left}.multiselect-dropdown .dropdown-btn .selected-item a{text-decoration:none}.multiselect-dropdown .dropdown-btn .selected-item:hover{box-shadow:1px 1px #959595}.multiselect-dropdown .dropdown-btn .dropdown-down{display:inline-block;top:10px;width:0;height:0;border-top:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .dropdown-btn .dropdown-up{display:inline-block;width:0;height:0;border-bottom:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .disabled>span{background-color:#eceeef}.dropdown-list{position:absolute;padding-top:6px;width:100%;z-index:9999;border:1px solid #ccc;border-radius:3px;background:#fff;margin-top:10px;box-shadow:0 1px 5px #959595}.dropdown-list ul{padding:0;list-style:none;overflow:auto;margin:0}.dropdown-list li{padding:6px 10px;cursor:pointer;text-align:left}.dropdown-list .filter-textbox{border-bottom:1px solid #ccc;position:relative;padding:10px}.dropdown-list .filter-textbox input{border:0;width:100%;padding:0 0 0 26px}.dropdown-list .filter-textbox input:focus{outline:0}.multiselect-item-checkbox input[type=checkbox]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.multiselect-item-checkbox input[type=checkbox]:focus+div:before,.multiselect-item-checkbox input[type=checkbox]:hover+div:before{border-color:#337ab7;background-color:#f2f2f2}.multiselect-item-checkbox input[type=checkbox]:active+div:before{transition-duration:0s}.multiselect-item-checkbox input[type=checkbox]+div{position:relative;padding-left:2em;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;margin:0;color:#000}.multiselect-item-checkbox input[type=checkbox]+div:before{box-sizing:content-box;content:'';color:#337ab7;position:absolute;top:50%;left:0;width:14px;height:14px;margin-top:-9px;border:2px solid #337ab7;text-align:center;transition:.4s}.multiselect-item-checkbox input[type=checkbox]+div:after{box-sizing:content-box;content:'';position:absolute;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:50%;transform-origin:50%;transition:transform .2s ease-out,-webkit-transform .2s ease-out;background-color:transparent;top:50%;left:4px;width:8px;height:3px;margin-top:-4px;border-style:solid;border-color:#fff;border-width:0 0 3px 3px;-o-border-image:none;border-image:none;-webkit-transform:rotate(-45deg) scale(0);transform:rotate(-45deg) scale(0)}.multiselect-item-checkbox input[type=checkbox]:disabled+div:before{border-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:disabled:focus+div:before .multiselect-item-checkbox input[type=checkbox]:disabled:hover+div:before{background-color:inherit}.multiselect-item-checkbox input[type=checkbox]:disabled:checked+div:before{background-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:checked+div:after{content:'';transition:transform .2s ease-out,-webkit-transform .2s ease-out;-webkit-transform:rotate(-45deg) scale(1);transform:rotate(-45deg) scale(1)}.multiselect-item-checkbox input[type=checkbox]:checked+div:before{-webkit-animation:.2s ease-in borderscale;animation:.2s ease-in borderscale;background:#337ab7}@-webkit-keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}@keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}"],
                    providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR],
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    MultiSelectComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
    ]; };
    MultiSelectComponent.propDecorators = {
        "placeholder": [{ type: Input },],
        "disabled": [{ type: Input },],
        "settings": [{ type: Input },],
        "data": [{ type: Input },],
        "onFilterChange": [{ type: Output, args: ['onFilterChange',] },],
        "onDropDownClose": [{ type: Output, args: ['onDropDownClose',] },],
        "onSelect": [{ type: Output, args: ['onSelect',] },],
        "onDeSelect": [{ type: Output, args: ['onDeSelect',] },],
        "onSelectAll": [{ type: Output, args: ['onSelectAll',] },],
        "onDeSelectAll": [{ type: Output, args: ['onDeSelectAll',] },],
        "onTouched": [{ type: HostListener, args: ['blur',] },],
    };
    return MultiSelectComponent;
}());
export { MultiSelectComponent };
function MultiSelectComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MultiSelectComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MultiSelectComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MultiSelectComponent.propDecorators;
    /** @type {?} */
    MultiSelectComponent.prototype._settings;
    /** @type {?} */
    MultiSelectComponent.prototype._data;
    /** @type {?} */
    MultiSelectComponent.prototype.selectedItems;
    /** @type {?} */
    MultiSelectComponent.prototype.isDropdownOpen;
    /** @type {?} */
    MultiSelectComponent.prototype._placeholder;
    /** @type {?} */
    MultiSelectComponent.prototype.filter;
    /** @type {?} */
    MultiSelectComponent.prototype.defaultSettings;
    /** @type {?} */
    MultiSelectComponent.prototype.disabled;
    /** @type {?} */
    MultiSelectComponent.prototype.onFilterChange;
    /** @type {?} */
    MultiSelectComponent.prototype.onDropDownClose;
    /** @type {?} */
    MultiSelectComponent.prototype.onSelect;
    /** @type {?} */
    MultiSelectComponent.prototype.onDeSelect;
    /** @type {?} */
    MultiSelectComponent.prototype.onSelectAll;
    /** @type {?} */
    MultiSelectComponent.prototype.onDeSelectAll;
    /** @type {?} */
    MultiSelectComponent.prototype.onTouchedCallback;
    /** @type {?} */
    MultiSelectComponent.prototype.onChangeCallback;
    /** @type {?} */
    MultiSelectComponent.prototype.cdr;
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlzZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctbXVsdGlzZWxlY3QtZHJvcGRvd24vIiwic291cmNlcyI6WyJtdWx0aXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsUUFBUSxFQUFxQixNQUFNLHFCQUFxQixDQUFDO0FBRWxFLE1BQU0sQ0FBQyxxQkFBTSwrQkFBK0IsR0FBUTtJQUNsRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLG9CQUFvQixFQUFwQixDQUFvQixDQUFDO0lBQ25ELEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUNGLHFCQUFNLElBQUksR0FBRyxlQUFRLENBQUM7OztJQXlJcEIsOEJBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO3FCQTVGVixFQUFFOzZCQUNNLEVBQUU7OEJBQ2xCLElBQUk7NEJBQ2IsUUFBUTtzQkFDSixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOytCQUNMO1lBQ25DLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsT0FBTyxFQUFFLElBQUk7WUFDYixTQUFTLEVBQUUsTUFBTTtZQUNqQixjQUFjLEVBQUUsSUFBSTtZQUNwQixhQUFhLEVBQUUsWUFBWTtZQUMzQixlQUFlLEVBQUUsY0FBYztZQUMvQixpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLGNBQWMsRUFBRSxDQUFDLENBQUM7WUFDbEIsaUJBQWlCLEVBQUUsSUFB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QUFDLENBQUMsQ0FBQztTQUNoRTtRQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0tBQzlEOztnQkE5V0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLFFBQVEsRUFBRSw0NkVBa0NMO29CQUNMLE1BQU0sRUFBRSxDQUFDLHMxSEFBczFILENBQUM7b0JBQ2gySCxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztvQkFDNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7O2dCQXBEQyxpQkFBaUI7OztnQ0FnRmhCLEtBQUs7NkJBUUwsS0FBSzs2QkFHTCxLQUFLO3lCQVNMLEtBQUs7bUNBdUJMLE1BQU0sU0FBQyxnQkFBZ0I7b0NBRXZCLE1BQU0sU0FBQyxpQkFBaUI7NkJBR3hCLE1BQU0sU0FBQyxVQUFVOytCQUdqQixNQUFNLFNBQUMsWUFBWTtnQ0FHbkIsTUFBTSxTQUFDLGFBQWE7a0NBR3BCLE1BQU0sU0FBQyxlQUFlOzhCQXlHdEIsWUFBWSxTQUFDLE1BQU07OytCQTFQdEI7O1NBNkRhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSG9zdExpc3RlbmVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTFVFX0FDQ0VTU09SLCBDb250cm9sVmFsdWVBY2Nlc3NvciB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IExpc3RJdGVtLCBJRHJvcGRvd25TZXR0aW5ncyB9IGZyb20gJy4vbXVsdGlzZWxlY3QubW9kZWwnO1xuXG5leHBvcnQgY29uc3QgRFJPUERPV05fQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTXVsdGlTZWxlY3RDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZVxufTtcbmNvbnN0IG5vb3AgPSAoKSA9PiB7fTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmctbXVsdGlzZWxlY3QtZHJvcGRvd24nLFxuICB0ZW1wbGF0ZTogYDxkaXYgdGFiaW5kZXg9XCI9MFwiIChibHVyKT1cIm9uVG91Y2hlZCgpXCIgY2xhc3M9XCJtdWx0aXNlbGVjdC1kcm9wZG93blwiIChjbGlja091dHNpZGUpPVwiY2xvc2VEcm9wZG93bigpXCI+XG4gIDxkaXYgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCI+XG4gICAgPHNwYW4gdGFiaW5kZXg9XCItMVwiIGNsYXNzPVwiZHJvcGRvd24tYnRuXCIgKGNsaWNrKT1cInRvZ2dsZURyb3Bkb3duKCRldmVudClcIj5cbiAgICAgIDxzcGFuICpuZ0lmPVwic2VsZWN0ZWRJdGVtcy5sZW5ndGggPT0gMFwiPnt7X3BsYWNlaG9sZGVyfX08L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cInNlbGVjdGVkLWl0ZW1cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzZWxlY3RlZEl0ZW1zO3RyYWNrQnk6IHRyYWNrQnlGbjtsZXQgayA9IGluZGV4XCIgW2hpZGRlbl09XCJrID4gX3NldHRpbmdzLml0ZW1zU2hvd0xpbWl0LTFcIj5cbiAgICAgICAge3tpdGVtLnRleHR9fVxuICAgICAgICA8YSBzdHlsZT1cInBhZGRpbmctdG9wOjJweDtwYWRkaW5nLWxlZnQ6MnB4O2NvbG9yOndoaXRlXCIgKGNsaWNrKT1cIm9uSXRlbUNsaWNrKCRldmVudCxpdGVtKVwiPng8L2E+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBzdHlsZT1cImZsb2F0OnJpZ2h0ICFpbXBvcnRhbnQ7cGFkZGluZy1yaWdodDo0cHhcIj5cbiAgICAgICAgPHNwYW4gc3R5bGU9XCJwYWRkaW5nLXJpZ2h0OiA2cHg7XCIgKm5nSWY9XCJpdGVtU2hvd1JlbWFpbmluZygpPjBcIj4re3tpdGVtU2hvd1JlbWFpbmluZygpfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIFtuZ0NsYXNzXT1cIl9zZXR0aW5ncy5kZWZhdWx0T3BlbiA/ICdkcm9wZG93bi11cCcgOiAnZHJvcGRvd24tZG93bidcIj48L3NwYW4+XG4gICAgICA8L3NwYW4+XG4gICAgPC9zcGFuPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImRyb3Bkb3duLWxpc3RcIiBbaGlkZGVuXT1cIiFfc2V0dGluZ3MuZGVmYXVsdE9wZW5cIj5cbiAgICA8dWwgY2xhc3M9XCJpdGVtMVwiPlxuICAgICAgPGxpIChjbGljayk9XCJ0b2dnbGVTZWxlY3RBbGwoKVwiICpuZ0lmPVwiX2RhdGEubGVuZ3RoID4gMCAmJiAhX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbiAmJiBfc2V0dGluZ3MuZW5hYmxlQ2hlY2tBbGwgJiYgX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uPT09LTFcIiBjbGFzcz1cIm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3hcIiBzdHlsZT1cImJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjO3BhZGRpbmc6MTBweFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgYXJpYS1sYWJlbD1cIm11bHRpc2VsZWN0LXNlbGVjdC1hbGxcIiBbY2hlY2tlZF09XCJpc0FsbEl0ZW1zU2VsZWN0ZWQoKVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCBpc0xpbWl0U2VsZWN0aW9uUmVhY2hlZCgpXCIgLz5cbiAgICAgICAgPGRpdj57eyFpc0FsbEl0ZW1zU2VsZWN0ZWQoKSA/IF9zZXR0aW5ncy5zZWxlY3RBbGxUZXh0IDogX3NldHRpbmdzLnVuU2VsZWN0QWxsVGV4dH19PC9kaXY+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzPVwiZmlsdGVyLXRleHRib3hcIiAqbmdJZj1cIl9kYXRhLmxlbmd0aD4wICYmIF9zZXR0aW5ncy5hbGxvd1NlYXJjaEZpbHRlclwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBhcmlhLWxhYmVsPVwibXVsdGlzZWxlY3Qtc2VhcmNoXCIgW3JlYWRPbmx5XT1cImRpc2FibGVkXCIgW3BsYWNlaG9sZGVyXT1cIl9zZXR0aW5ncy5zZWFyY2hQbGFjZWhvbGRlclRleHRcIiBbKG5nTW9kZWwpXT1cImZpbHRlci50ZXh0XCIgKG5nTW9kZWxDaGFuZ2UpPVwib25GaWx0ZXJUZXh0Q2hhbmdlKCRldmVudClcIj5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgICA8dWwgY2xhc3M9XCJpdGVtMlwiIFtzdHlsZS5tYXhIZWlnaHRdPVwiX3NldHRpbmdzLm1heEhlaWdodCsncHgnXCI+XG4gICAgICA8bGkgKm5nRm9yPVwibGV0IGl0ZW0gb2YgX2RhdGEgfCBuZzJMaXN0RmlsdGVyOmZpbHRlcjsgbGV0IGkgPSBpbmRleDtcIiAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LGl0ZW0pXCIgY2xhc3M9XCJtdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94XCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBhcmlhLWxhYmVsPVwibXVsdGlzZWxlY3QtaXRlbVwiIFtjaGVja2VkXT1cImlzU2VsZWN0ZWQoaXRlbSlcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWQgfHwgKGlzTGltaXRTZWxlY3Rpb25SZWFjaGVkKCkgJiYgIWlzU2VsZWN0ZWQoaXRlbSkpXCIgLz5cbiAgICAgICAgPGRpdj57e2l0ZW0udGV4dH19PC9kaXY+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzPSduby1kYXRhJyAqbmdJZj1cIl9kYXRhLmxlbmd0aCA9PSAwXCI+XG4gICAgICAgIDxoNT57e19zZXR0aW5ncy5ub0RhdGFBdmFpbGFibGVQbGFjZWhvbGRlclRleHR9fTwvaDU+XG4gICAgICA8L2xpPlxuICAgIDwvdWw+XG4gIDwvZGl2PlxuPC9kaXY+YCxcbiAgc3R5bGVzOiBbYC5tdWx0aXNlbGVjdC1kcm9wZG93bntwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxMDAlO2ZvbnQtc2l6ZTppbmhlcml0O2ZvbnQtZmFtaWx5OmluaGVyaXR9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG57ZGlzcGxheTppbmxpbmUtYmxvY2s7Ym9yZGVyOjFweCBzb2xpZCAjYWRhZGFkO3dpZHRoOjEwMCU7cGFkZGluZzo2cHggMTJweDttYXJnaW4tYm90dG9tOjA7Zm9udC13ZWlnaHQ6NDAwO2xpbmUtaGVpZ2h0OjEuNTI4NTcxNDM7dGV4dC1hbGlnbjpsZWZ0O3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtjdXJzb3I6cG9pbnRlcjtiYWNrZ3JvdW5kLWltYWdlOm5vbmU7Ym9yZGVyLXJhZGl1czo0cHh9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG4gLnNlbGVjdGVkLWl0ZW17Ym9yZGVyOjFweCBzb2xpZCAjMzM3YWI3O21hcmdpbi1yaWdodDo0cHg7YmFja2dyb3VuZDojMzM3YWI3O3BhZGRpbmc6MCA1cHg7Y29sb3I6I2ZmZjtib3JkZXItcmFkaXVzOjJweDtmbG9hdDpsZWZ0fS5tdWx0aXNlbGVjdC1kcm9wZG93biAuZHJvcGRvd24tYnRuIC5zZWxlY3RlZC1pdGVtIGF7dGV4dC1kZWNvcmF0aW9uOm5vbmV9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG4gLnNlbGVjdGVkLWl0ZW06aG92ZXJ7Ym94LXNoYWRvdzoxcHggMXB4ICM5NTk1OTV9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG4gLmRyb3Bkb3duLWRvd257ZGlzcGxheTppbmxpbmUtYmxvY2s7dG9wOjEwcHg7d2lkdGg6MDtoZWlnaHQ6MDtib3JkZXItdG9wOjEwcHggc29saWQgI2FkYWRhZDtib3JkZXItbGVmdDoxMHB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1yaWdodDoxMHB4IHNvbGlkIHRyYW5zcGFyZW50fS5tdWx0aXNlbGVjdC1kcm9wZG93biAuZHJvcGRvd24tYnRuIC5kcm9wZG93bi11cHtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDowO2hlaWdodDowO2JvcmRlci1ib3R0b206MTBweCBzb2xpZCAjYWRhZGFkO2JvcmRlci1sZWZ0OjEwcHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJpZ2h0OjEwcHggc29saWQgdHJhbnNwYXJlbnR9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kaXNhYmxlZD5zcGFue2JhY2tncm91bmQtY29sb3I6I2VjZWVlZn0uZHJvcGRvd24tbGlzdHtwb3NpdGlvbjphYnNvbHV0ZTtwYWRkaW5nLXRvcDo2cHg7d2lkdGg6MTAwJTt6LWluZGV4Ojk5OTk7Ym9yZGVyOjFweCBzb2xpZCAjY2NjO2JvcmRlci1yYWRpdXM6M3B4O2JhY2tncm91bmQ6I2ZmZjttYXJnaW4tdG9wOjEwcHg7Ym94LXNoYWRvdzowIDFweCA1cHggIzk1OTU5NX0uZHJvcGRvd24tbGlzdCB1bHtwYWRkaW5nOjA7bGlzdC1zdHlsZTpub25lO292ZXJmbG93OmF1dG87bWFyZ2luOjB9LmRyb3Bkb3duLWxpc3QgbGl7cGFkZGluZzo2cHggMTBweDtjdXJzb3I6cG9pbnRlcjt0ZXh0LWFsaWduOmxlZnR9LmRyb3Bkb3duLWxpc3QgLmZpbHRlci10ZXh0Ym94e2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNjY2M7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzoxMHB4fS5kcm9wZG93bi1saXN0IC5maWx0ZXItdGV4dGJveCBpbnB1dHtib3JkZXI6MDt3aWR0aDoxMDAlO3BhZGRpbmc6MCAwIDAgMjZweH0uZHJvcGRvd24tbGlzdCAuZmlsdGVyLXRleHRib3ggaW5wdXQ6Zm9jdXN7b3V0bGluZTowfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hde2JvcmRlcjowO2NsaXA6cmVjdCgwIDAgMCAwKTtoZWlnaHQ6MXB4O21hcmdpbjotMXB4O292ZXJmbG93OmhpZGRlbjtwYWRkaW5nOjA7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6MXB4fS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmZvY3VzK2RpdjpiZWZvcmUsLm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06aG92ZXIrZGl2OmJlZm9yZXtib3JkZXItY29sb3I6IzMzN2FiNztiYWNrZ3JvdW5kLWNvbG9yOiNmMmYyZjJ9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06YWN0aXZlK2RpdjpiZWZvcmV7dHJhbnNpdGlvbi1kdXJhdGlvbjowc30ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XStkaXZ7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZy1sZWZ0OjJlbTt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO2N1cnNvcjpwb2ludGVyO21hcmdpbjowO2NvbG9yOiMwMDB9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF0rZGl2OmJlZm9yZXtib3gtc2l6aW5nOmNvbnRlbnQtYm94O2NvbnRlbnQ6Jyc7Y29sb3I6IzMzN2FiNztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6MDt3aWR0aDoxNHB4O2hlaWdodDoxNHB4O21hcmdpbi10b3A6LTlweDtib3JkZXI6MnB4IHNvbGlkICMzMzdhYjc7dGV4dC1hbGlnbjpjZW50ZXI7dHJhbnNpdGlvbjouNHN9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF0rZGl2OmFmdGVye2JveC1zaXppbmc6Y29udGVudC1ib3g7Y29udGVudDonJztwb3NpdGlvbjphYnNvbHV0ZTstd2Via2l0LXRyYW5zZm9ybTpzY2FsZSgwKTt0cmFuc2Zvcm06c2NhbGUoMCk7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOjUwJTt0cmFuc2Zvcm0tb3JpZ2luOjUwJTt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnMgZWFzZS1vdXQsLXdlYmtpdC10cmFuc2Zvcm0gLjJzIGVhc2Utb3V0O2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7dG9wOjUwJTtsZWZ0OjRweDt3aWR0aDo4cHg7aGVpZ2h0OjNweDttYXJnaW4tdG9wOi00cHg7Ym9yZGVyLXN0eWxlOnNvbGlkO2JvcmRlci1jb2xvcjojZmZmO2JvcmRlci13aWR0aDowIDAgM3B4IDNweDstby1ib3JkZXItaW1hZ2U6bm9uZTtib3JkZXItaW1hZ2U6bm9uZTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKSBzY2FsZSgwKTt0cmFuc2Zvcm06cm90YXRlKC00NWRlZykgc2NhbGUoMCl9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06ZGlzYWJsZWQrZGl2OmJlZm9yZXtib3JkZXItY29sb3I6I2NjY30ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpkaXNhYmxlZDpmb2N1cytkaXY6YmVmb3JlIC5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmRpc2FibGVkOmhvdmVyK2RpdjpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjppbmhlcml0fS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmRpc2FibGVkOmNoZWNrZWQrZGl2OmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiNjY2N9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06Y2hlY2tlZCtkaXY6YWZ0ZXJ7Y29udGVudDonJzt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnMgZWFzZS1vdXQsLXdlYmtpdC10cmFuc2Zvcm0gLjJzIGVhc2Utb3V0Oy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpIHNjYWxlKDEpO3RyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKSBzY2FsZSgxKX0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpjaGVja2VkK2RpdjpiZWZvcmV7LXdlYmtpdC1hbmltYXRpb246LjJzIGVhc2UtaW4gYm9yZGVyc2NhbGU7YW5pbWF0aW9uOi4ycyBlYXNlLWluIGJvcmRlcnNjYWxlO2JhY2tncm91bmQ6IzMzN2FiN31ALXdlYmtpdC1rZXlmcmFtZXMgYm9yZGVyc2NhbGV7NTAle2JveC1zaGFkb3c6MCAwIDAgMnB4ICMzMzdhYjd9fUBrZXlmcmFtZXMgYm9yZGVyc2NhbGV7NTAle2JveC1zaGFkb3c6MCAwIDAgMnB4ICMzMzdhYjd9fWBdLFxuICBwcm92aWRlcnM6IFtEUk9QRE9XTl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTXVsdGlTZWxlY3RDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIHB1YmxpYyBfc2V0dGluZ3M6IElEcm9wZG93blNldHRpbmdzO1xuICBwdWJsaWMgX2RhdGE6IEFycmF5PExpc3RJdGVtPiA9IFtdO1xuICBwdWJsaWMgc2VsZWN0ZWRJdGVtczogQXJyYXk8TGlzdEl0ZW0+ID0gW107XG4gIHB1YmxpYyBpc0Ryb3Bkb3duT3BlbiA9IHRydWU7XG4gIF9wbGFjZWhvbGRlciA9ICdTZWxlY3QnO1xuICBmaWx0ZXI6IExpc3RJdGVtID0gbmV3IExpc3RJdGVtKHRoaXMuZGF0YSk7XG4gIGRlZmF1bHRTZXR0aW5nczogSURyb3Bkb3duU2V0dGluZ3MgPSB7XG4gICAgc2luZ2xlU2VsZWN0aW9uOiBmYWxzZSxcbiAgICBpZE1vZGU6IGZhbHNlLFxuICAgIGlkRmllbGQ6ICdpZCcsXG4gICAgdGV4dEZpZWxkOiAndGV4dCcsXG4gICAgZW5hYmxlQ2hlY2tBbGw6IHRydWUsXG4gICAgc2VsZWN0QWxsVGV4dDogJ1NlbGVjdCBBbGwnLFxuICAgIHVuU2VsZWN0QWxsVGV4dDogJ1VuU2VsZWN0IEFsbCcsXG4gICAgYWxsb3dTZWFyY2hGaWx0ZXI6IGZhbHNlLFxuICAgIGxpbWl0U2VsZWN0aW9uOiAtMSxcbiAgICBjbGVhclNlYXJjaEZpbHRlcjogdHJ1ZSxcbiAgICBtYXhIZWlnaHQ6IDE5NyxcbiAgICBpdGVtc1Nob3dMaW1pdDogOTk5OTk5OTk5OTk5LFxuICAgIHNlYXJjaFBsYWNlaG9sZGVyVGV4dDogJ1NlYXJjaCcsXG4gICAgbm9EYXRhQXZhaWxhYmxlUGxhY2Vob2xkZXJUZXh0OiAnTm8gZGF0YSBhdmFpbGFibGUnLFxuICAgIGNsb3NlRHJvcERvd25PblNlbGVjdGlvbjogZmFsc2UsXG4gICAgc2hvd1NlbGVjdGVkSXRlbXNBdFRvcDogZmFsc2UsXG4gICAgZGVmYXVsdE9wZW46IGZhbHNlXG4gIH07XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBwbGFjZWhvbGRlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl9wbGFjZWhvbGRlciA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9wbGFjZWhvbGRlciA9ICdTZWxlY3QnO1xuICAgIH1cbiAgfVxuICBASW5wdXQoKVxuICBkaXNhYmxlZCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgc2V0dGluZ3ModmFsdWU6IElEcm9wZG93blNldHRpbmdzKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLl9zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24odGhpcy5kZWZhdWx0U2V0dGluZ3MsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHRoaXMuZGVmYXVsdFNldHRpbmdzKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IGRhdGEodmFsdWU6IEFycmF5PGFueT4pIHtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB0aGlzLl9kYXRhID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNvbnN0IF9pdGVtcyA9IHZhbHVlLmZpbHRlcigoaXRlbTogYW55KSA9PiB7XG4gICAgICAvLyAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycgfHwgKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0JyAmJiBpdGVtICYmIGl0ZW1bdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0gJiYgaXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdKSkge1xuICAgICAgLy8gICAgIHJldHVybiBpdGVtO1xuICAgICAgLy8gICB9XG4gICAgICAvLyB9KTtcbiAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZS5tYXAoXG4gICAgICAgIChpdGVtOiBhbnkpID0+XG4gICAgICAgICAgdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnXG4gICAgICAgICAgICA/IG5ldyBMaXN0SXRlbShpdGVtKVxuICAgICAgICAgICAgOiBuZXcgTGlzdEl0ZW0oe1xuICAgICAgICAgICAgICAgIGlkOiBpdGVtW3RoaXMuX3NldHRpbmdzLmlkRmllbGRdLFxuICAgICAgICAgICAgICAgIHRleHQ6IHRoaXMuZ2V0VmFsdWUoaXRlbSwgdGhpcy5fc2V0dGluZ3MudGV4dEZpZWxkKVxuICAgICAgICAgICAgICAgIC8vIHRleHQ6IGl0ZW1bdGhpcy5fc2V0dGluZ3MudGV4dEZpZWxkXVxuICAgICAgICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCdvbkZpbHRlckNoYW5nZScpXG4gIG9uRmlsdGVyQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TGlzdEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoJ29uRHJvcERvd25DbG9zZScpXG4gIG9uRHJvcERvd25DbG9zZTogRXZlbnRFbWl0dGVyPExpc3RJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoJ29uU2VsZWN0JylcbiAgb25TZWxlY3Q6IEV2ZW50RW1pdHRlcjxMaXN0SXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCdvbkRlU2VsZWN0JylcbiAgb25EZVNlbGVjdDogRXZlbnRFbWl0dGVyPExpc3RJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoJ29uU2VsZWN0QWxsJylcbiAgb25TZWxlY3RBbGw6IEV2ZW50RW1pdHRlcjxBcnJheTxMaXN0SXRlbT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xuXG4gIEBPdXRwdXQoJ29uRGVTZWxlY3RBbGwnKVxuICBvbkRlU2VsZWN0QWxsOiBFdmVudEVtaXR0ZXI8QXJyYXk8TGlzdEl0ZW0+PiA9IG5ldyBFdmVudEVtaXR0ZXI8QXJyYXk8YW55Pj4oKTtcblxuICBwcml2YXRlIG9uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gbm9vcDtcbiAgcHJpdmF0ZSBvbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gbm9vcDtcblxuICBvbkZpbHRlclRleHRDaGFuZ2UoJGV2ZW50KSB7XG4gICAgdGhpcy5vbkZpbHRlckNoYW5nZS5lbWl0KCRldmVudCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgZ2V0VmFsdWUoaXRlbTogYW55LCBuZXN0ZWRQYXRoOiBzdHJpbmcpIHtcbiAgICBjb25zdCBuZXN0ZWRQcm9wcyA9IG5lc3RlZFBhdGguc3BsaXQoJy4nKTtcbiAgXG4gICAgaWYgKG5lc3RlZFByb3BzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gaXRlbVtuZXN0ZWRQYXRoXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgbmVzdGVkSXRlbSA9IGl0ZW07XG4gICAgICAgIG5lc3RlZFByb3BzLmZvckVhY2goKG5lc3RlZFByb3ApID0+IHtcbiAgICAgICAgICAgIGlmIChuZXN0ZWRJdGVtKSB7XG4gICAgICAgICAgICAgICAgbmVzdGVkSXRlbSA9IG5lc3RlZEl0ZW1bbmVzdGVkUHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIFxuICAgICAgICByZXR1cm4gbmVzdGVkSXRlbTtcbiAgICB9XG59XG5cbiAgb25JdGVtQ2xpY2soJGV2ZW50OiBhbnksIGl0ZW06IExpc3RJdGVtKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBmb3VuZCA9IHRoaXMuaXNTZWxlY3RlZChpdGVtKTtcbiAgICBjb25zdCBhbGxvd0FkZCA9XG4gICAgICB0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA9PT0gLTEgfHxcbiAgICAgICh0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA+IDAgJiZcbiAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aCA8IHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uKTtcbiAgICBpZiAoIWZvdW5kKSB7XG4gICAgICBpZiAoYWxsb3dBZGQpIHtcbiAgICAgICAgdGhpcy5hZGRTZWxlY3RlZChpdGVtKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVTZWxlY3RlZChpdGVtKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhpcy5fc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uICYmXG4gICAgICB0aGlzLl9zZXR0aW5ncy5jbG9zZURyb3BEb3duT25TZWxlY3Rpb25cbiAgICApIHtcbiAgICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgIH1cbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0SXRlbSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW1xuICAgICAgICAgICAgICB0eXBlb2YgZmlyc3RJdGVtID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgID8gbmV3IExpc3RJdGVtKGZpcnN0SXRlbSlcbiAgICAgICAgICAgICAgICA6IG5ldyBMaXN0SXRlbSh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBmaXJzdEl0ZW1bdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0sXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGZpcnN0SXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGUuYm9keS5tc2cpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBfZGF0YSA9IHZhbHVlLm1hcChcbiAgICAgICAgICAoaXRlbTogYW55KSA9PlxuICAgICAgICAgICAgdHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgID8gbmV3IExpc3RJdGVtKGl0ZW0pXG4gICAgICAgICAgICAgIDogbmV3IExpc3RJdGVtKHtcbiAgICAgICAgICAgICAgICAgIGlkOiBpdGVtW3RoaXMuX3NldHRpbmdzLmlkRmllbGRdLFxuICAgICAgICAgICAgICAgICAgdGV4dDogaXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID4gMCkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IF9kYXRhLnNwbGljZSgwLCB0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gX2RhdGE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgfVxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XG4gIH1cblxuICAvLyBGcm9tIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGludGVyZmFjZVxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICAvLyBTZXQgdG91Y2hlZCBvbiBibHVyXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBwdWJsaWMgb25Ub3VjaGVkKCkge1xuICAgIHRoaXMuY2xvc2VEcm9wZG93bigpO1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIHRyYWNrQnlGbihpbmRleCwgaXRlbSkge1xuICAgIHJldHVybiBpdGVtLmlkO1xuICB9XG5cbiAgaXNTZWxlY3RlZChjbGlja2VkSXRlbTogTGlzdEl0ZW0pIHtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChjbGlja2VkSXRlbS5pZCA9PT0gaXRlbS5pZCkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGZvdW5kO1xuICB9XG5cbiAgaXNMaW1pdFNlbGVjdGlvblJlYWNoZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID09PSB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO1xuICB9XG5cbiAgaXNBbGxJdGVtc1NlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kYXRhLmxlbmd0aCA9PT0gdGhpcy5zZWxlY3RlZEl0ZW1zLmxlbmd0aDtcbiAgfVxuXG4gIHNob3dCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcbiAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA+IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gdGhpcy5fc2V0dGluZ3MuZW5hYmxlQ2hlY2tBbGwgPSB0aGlzLl9zZXR0aW5ncy5saW1pdFNlbGVjdGlvbiA9PT0gLTEgPyB0cnVlIDogZmFsc2U7XG4gICAgICByZXR1cm4gdHJ1ZTsgLy8gIXRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbiAmJiB0aGlzLl9zZXR0aW5ncy5lbmFibGVDaGVja0FsbCAmJiB0aGlzLl9kYXRhLmxlbmd0aCA+IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHNob3VsZCBiZSBkaXNhYmxlZCBpbiBzaW5nbGUgc2VsZWN0aW9uIG1vZGVcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpdGVtU2hvd1JlbWFpbmluZygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoIC0gdGhpcy5fc2V0dGluZ3MuaXRlbXNTaG93TGltaXQ7XG4gIH1cblxuICBhZGRTZWxlY3RlZChpdGVtOiBMaXN0SXRlbSkge1xuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XG4gICAgdGhpcy5vblNlbGVjdC5lbWl0KHRoaXMuZW1pdHRlZFZhbHVlKGl0ZW0pKTtcbiAgfVxuXG4gIHJlbW92ZVNlbGVjdGVkKGl0ZW1TZWw6IExpc3RJdGVtKSB7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICBpZiAoaXRlbVNlbC5pZCA9PT0gaXRlbS5pZCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMuc3BsaWNlKHRoaXMuc2VsZWN0ZWRJdGVtcy5pbmRleE9mKGl0ZW0pLCAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLm9uQ2hhbmdlQ2FsbGJhY2sodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XG4gICAgdGhpcy5vbkRlU2VsZWN0LmVtaXQodGhpcy5lbWl0dGVkVmFsdWUoaXRlbVNlbCkpO1xuICB9XG5cbiAgZW1pdHRlZFZhbHVlKHZhbDogYW55KTogYW55IHtcbiAgICBsZXQgc2VsZWN0ZWQgPSBbXTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICB2YWwubWFwKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaXRlbS5pZCA9PT0gaXRlbS50ZXh0KSB7XG4gICAgICAgICAgc2VsZWN0ZWQucHVzaChpdGVtLnRleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGVjdGVkLnB1c2godGhpcy5vYmplY3RpZnkoaXRlbSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHZhbCkge1xuICAgICAgICBpZiAodmFsLmlkID09PSB2YWwudGV4dCkge1xuICAgICAgICAgIHJldHVybiB2YWwudGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5vYmplY3RpZnkodmFsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcbiAgICAgIHNlbGVjdGVkID0gc2VsZWN0ZWRbMF07XG5cbiAgICAgIGlmICh0aGlzLl9zZXR0aW5ncy5pZE1vZGUgJiYgc2VsZWN0ZWQpIHtcbiAgICAgICAgc2VsZWN0ZWQgPSBzZWxlY3RlZFt0aGlzLl9zZXR0aW5ncy5pZEZpZWxkXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZWN0ZWQ7XG4gIH1cblxuICBvYmplY3RpZnkodmFsOiBMaXN0SXRlbSkge1xuICAgIGNvbnN0IG9iaiA9IHt9O1xuICAgIG9ialt0aGlzLl9zZXR0aW5ncy5pZEZpZWxkXSA9IHZhbC5pZDtcbiAgICBvYmpbdGhpcy5fc2V0dGluZ3MudGV4dEZpZWxkXSA9IHZhbC50ZXh0O1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB0b2dnbGVEcm9wZG93bihldnQpIHtcbiAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCAmJiB0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fc2V0dGluZ3MuZGVmYXVsdE9wZW4gPSAhdGhpcy5fc2V0dGluZ3MuZGVmYXVsdE9wZW47XG4gICAgaWYgKCF0aGlzLl9zZXR0aW5ncy5kZWZhdWx0T3Blbikge1xuICAgICAgdGhpcy5vbkRyb3BEb3duQ2xvc2UuZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlRHJvcGRvd24oKSB7XG4gICAgdGhpcy5fc2V0dGluZ3MuZGVmYXVsdE9wZW4gPSBmYWxzZTtcbiAgICAvLyBjbGVhciBzZWFyY2ggdGV4dFxuICAgIGlmICh0aGlzLl9zZXR0aW5ncy5jbGVhclNlYXJjaEZpbHRlcikge1xuICAgICAgdGhpcy5maWx0ZXIudGV4dCA9ICcnO1xuICAgIH1cbiAgICB0aGlzLm9uRHJvcERvd25DbG9zZS5lbWl0KCk7XG4gIH1cblxuICB0b2dnbGVTZWxlY3RBbGwoKSB7XG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmlzQWxsSXRlbXNTZWxlY3RlZCgpKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSB0aGlzLl9kYXRhLnNsaWNlKCk7XG4gICAgICB0aGlzLm9uU2VsZWN0QWxsLmVtaXQodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IFtdO1xuICAgICAgdGhpcy5vbkRlU2VsZWN0QWxsLmVtaXQodGhpcy5lbWl0dGVkVmFsdWUodGhpcy5zZWxlY3RlZEl0ZW1zKSk7XG4gICAgfVxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLmVtaXR0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbXMpKTtcbiAgfVxufVxuIl19