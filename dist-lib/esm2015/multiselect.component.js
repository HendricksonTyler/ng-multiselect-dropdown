/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, HostListener, forwardRef, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ListItem } from './multiselect.model';
export const /** @type {?} */ DROPDOWN_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiSelectComponent),
    multi: true
};
const /** @type {?} */ noop = () => { };
const ɵ0 = noop;
export class MultiSelectComponent {
    /**
     * @param {?} cdr
     */
    constructor(cdr) {
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
    /**
     * @param {?} value
     * @return {?}
     */
    set placeholder(value) {
        if (value) {
            this._placeholder = value;
        }
        else {
            this._placeholder = 'Select';
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set settings(value) {
        if (value) {
            this._settings = Object.assign(this.defaultSettings, value);
        }
        else {
            this._settings = Object.assign(this.defaultSettings);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set data(value) {
        if (!value) {
            this._data = [];
        }
        else {
            // const _items = value.filter((item: any) => {
            //   if (typeof item === 'string' || (typeof item === 'object' && item && item[this._settings.idField] && item[this._settings.textField])) {
            //     return item;
            //   }
            // });
            this._data = value.map((item) => typeof item === 'string'
                ? new ListItem(item)
                : new ListItem({
                    id: item[this._settings.idField],
                    text: this.getValue(item, this._settings.textField)
                }));
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onFilterTextChange($event) {
        this.onFilterChange.emit($event);
    }
    /**
     * @param {?} item
     * @param {?} nestedPath
     * @return {?}
     */
    getValue(item, nestedPath) {
        const /** @type {?} */ nestedProps = nestedPath.split('.');
        if (nestedProps.length === 1) {
            return item[nestedPath];
        }
        else {
            let /** @type {?} */ nestedItem = item;
            nestedProps.forEach((nestedProp) => {
                if (nestedItem) {
                    nestedItem = nestedItem[nestedProp];
                }
            });
            return nestedItem;
        }
    }
    /**
     * @param {?} $event
     * @param {?} item
     * @return {?}
     */
    onItemClick($event, item) {
        if (this.disabled) {
            return false;
        }
        const /** @type {?} */ found = this.isSelected(item);
        const /** @type {?} */ allowAdd = this._settings.limitSelection === -1 ||
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
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== undefined && value !== null && value.length > 0) {
            if (this._settings.singleSelection) {
                try {
                    if (value.length >= 1) {
                        const /** @type {?} */ firstItem = value;
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
                const /** @type {?} */ _data = value.map((item) => typeof item === 'string'
                    ? new ListItem(item)
                    : new ListItem({
                        id: item[this._settings.idField],
                        text: item[this._settings.textField]
                    }));
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
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @return {?}
     */
    onTouched() {
        this.closeDropdown();
        this.onTouchedCallback();
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackByFn(index, item) {
        return item.id;
    }
    /**
     * @param {?} clickedItem
     * @return {?}
     */
    isSelected(clickedItem) {
        let /** @type {?} */ found = false;
        this.selectedItems.forEach(item => {
            if (clickedItem.id === item.id) {
                found = true;
            }
        });
        return found;
    }
    /**
     * @return {?}
     */
    isLimitSelectionReached() {
        return this._settings.limitSelection === this.selectedItems.length;
    }
    /**
     * @return {?}
     */
    isAllItemsSelected() {
        return this._data.length === this.selectedItems.length;
    }
    /**
     * @return {?}
     */
    showButton() {
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
    }
    /**
     * @return {?}
     */
    itemShowRemaining() {
        return this.selectedItems.length - this._settings.itemsShowLimit;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    addSelected(item) {
        if (this._settings.singleSelection) {
            this.selectedItems = [];
            this.selectedItems.push(item);
        }
        else {
            this.selectedItems.push(item);
        }
        this.onChangeCallback(this.emittedValue(this.selectedItems));
        this.onSelect.emit(this.emittedValue(item));
    }
    /**
     * @param {?} itemSel
     * @return {?}
     */
    removeSelected(itemSel) {
        this.selectedItems.forEach(item => {
            if (itemSel.id === item.id) {
                this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
            }
        });
        this.onChangeCallback(this.emittedValue(this.selectedItems));
        this.onDeSelect.emit(this.emittedValue(itemSel));
    }
    /**
     * @param {?} val
     * @return {?}
     */
    emittedValue(val) {
        let /** @type {?} */ selected = [];
        if (Array.isArray(val)) {
            val.map(item => {
                if (item.id === item.text) {
                    selected.push(item.text);
                }
                else {
                    selected.push(this.objectify(item));
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
    }
    /**
     * @param {?} val
     * @return {?}
     */
    objectify(val) {
        const /** @type {?} */ obj = {};
        obj[this._settings.idField] = val.id;
        obj[this._settings.textField] = val.text;
        return obj;
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    toggleDropdown(evt) {
        evt.preventDefault();
        if (this.disabled && this._settings.singleSelection) {
            return;
        }
        this._settings.defaultOpen = !this._settings.defaultOpen;
        if (!this._settings.defaultOpen) {
            this.onDropDownClose.emit();
        }
    }
    /**
     * @return {?}
     */
    closeDropdown() {
        this._settings.defaultOpen = false;
        // clear search text
        if (this._settings.clearSearchFilter) {
            this.filter.text = '';
        }
        this.onDropDownClose.emit();
    }
    /**
     * @return {?}
     */
    toggleSelectAll() {
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
    }
}
MultiSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-multiselect-dropdown',
                template: `<div tabindex="=0" (blur)="onTouched()" class="multiselect-dropdown" (clickOutside)="closeDropdown()">
  <div [class.disabled]="disabled">
    <span tabindex="-1" class="dropdown-btn" (click)="toggleDropdown($event)">
      <span *ngIf="selectedItems.length == 0">{{_placeholder}}</span>
      <span class="selected-item" *ngFor="let item of selectedItems;trackBy: trackByFn;let k = index" [hidden]="k > _settings.itemsShowLimit-1">
        {{item.text}}
        <a style="padding-top:2px;padding-left:2px;color:white" (click)="onItemClick($event,item)">x</a>
      </span>
      <span style="float:right !important;padding-right:4px">
        <span style="padding-right: 6px;" *ngIf="itemShowRemaining()>0">+{{itemShowRemaining()}}</span>
        <span [ngClass]="_settings.defaultOpen ? 'dropdown-up' : 'dropdown-down'"></span>
      </span>
    </span>
  </div>
  <div class="dropdown-list" [hidden]="!_settings.defaultOpen">
    <ul class="item1">
      <li (click)="toggleSelectAll()" *ngIf="_data.length > 0 && !_settings.singleSelection && _settings.enableCheckAll && _settings.limitSelection===-1" class="multiselect-item-checkbox" style="border-bottom: 1px solid #ccc;padding:10px">
        <input type="checkbox" aria-label="multiselect-select-all" [checked]="isAllItemsSelected()" [disabled]="disabled || isLimitSelectionReached()" />
        <div>{{!isAllItemsSelected() ? _settings.selectAllText : _settings.unSelectAllText}}</div>
      </li>
      <li class="filter-textbox" *ngIf="_data.length>0 && _settings.allowSearchFilter">
        <input type="text" aria-label="multiselect-search" [readOnly]="disabled" [placeholder]="_settings.searchPlaceholderText" [(ngModel)]="filter.text" (ngModelChange)="onFilterTextChange($event)">
      </li>
    </ul>
    <ul class="item2" [style.maxHeight]="_settings.maxHeight+'px'">
      <li *ngFor="let item of _data | ng2ListFilter:filter; let i = index;" (click)="onItemClick($event,item)" class="multiselect-item-checkbox">
        <input type="checkbox" aria-label="multiselect-item" [checked]="isSelected(item)" [disabled]="disabled || (isLimitSelectionReached() && !isSelected(item))" />
        <div>{{item.text}}</div>
      </li>
      <li class='no-data' *ngIf="_data.length == 0">
        <h5>{{_settings.noDataAvailablePlaceholderText}}</h5>
      </li>
    </ul>
  </div>
</div>`,
                styles: [`.multiselect-dropdown{position:relative;width:100%;font-size:inherit;font-family:inherit}.multiselect-dropdown .dropdown-btn{display:inline-block;border:1px solid #adadad;width:100%;padding:6px 12px;margin-bottom:0;font-weight:400;line-height:1.52857143;text-align:left;vertical-align:middle;cursor:pointer;background-image:none;border-radius:4px}.multiselect-dropdown .dropdown-btn .selected-item{border:1px solid #337ab7;margin-right:4px;background:#337ab7;padding:0 5px;color:#fff;border-radius:2px;float:left}.multiselect-dropdown .dropdown-btn .selected-item a{text-decoration:none}.multiselect-dropdown .dropdown-btn .selected-item:hover{box-shadow:1px 1px #959595}.multiselect-dropdown .dropdown-btn .dropdown-down{display:inline-block;top:10px;width:0;height:0;border-top:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .dropdown-btn .dropdown-up{display:inline-block;width:0;height:0;border-bottom:10px solid #adadad;border-left:10px solid transparent;border-right:10px solid transparent}.multiselect-dropdown .disabled>span{background-color:#eceeef}.dropdown-list{position:absolute;padding-top:6px;width:100%;z-index:9999;border:1px solid #ccc;border-radius:3px;background:#fff;margin-top:10px;box-shadow:0 1px 5px #959595}.dropdown-list ul{padding:0;list-style:none;overflow:auto;margin:0}.dropdown-list li{padding:6px 10px;cursor:pointer;text-align:left}.dropdown-list .filter-textbox{border-bottom:1px solid #ccc;position:relative;padding:10px}.dropdown-list .filter-textbox input{border:0;width:100%;padding:0 0 0 26px}.dropdown-list .filter-textbox input:focus{outline:0}.multiselect-item-checkbox input[type=checkbox]{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.multiselect-item-checkbox input[type=checkbox]:focus+div:before,.multiselect-item-checkbox input[type=checkbox]:hover+div:before{border-color:#337ab7;background-color:#f2f2f2}.multiselect-item-checkbox input[type=checkbox]:active+div:before{transition-duration:0s}.multiselect-item-checkbox input[type=checkbox]+div{position:relative;padding-left:2em;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;margin:0;color:#000}.multiselect-item-checkbox input[type=checkbox]+div:before{box-sizing:content-box;content:'';color:#337ab7;position:absolute;top:50%;left:0;width:14px;height:14px;margin-top:-9px;border:2px solid #337ab7;text-align:center;transition:.4s}.multiselect-item-checkbox input[type=checkbox]+div:after{box-sizing:content-box;content:'';position:absolute;-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:50%;transform-origin:50%;transition:transform .2s ease-out,-webkit-transform .2s ease-out;background-color:transparent;top:50%;left:4px;width:8px;height:3px;margin-top:-4px;border-style:solid;border-color:#fff;border-width:0 0 3px 3px;-o-border-image:none;border-image:none;-webkit-transform:rotate(-45deg) scale(0);transform:rotate(-45deg) scale(0)}.multiselect-item-checkbox input[type=checkbox]:disabled+div:before{border-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:disabled:focus+div:before .multiselect-item-checkbox input[type=checkbox]:disabled:hover+div:before{background-color:inherit}.multiselect-item-checkbox input[type=checkbox]:disabled:checked+div:before{background-color:#ccc}.multiselect-item-checkbox input[type=checkbox]:checked+div:after{content:'';transition:transform .2s ease-out,-webkit-transform .2s ease-out;-webkit-transform:rotate(-45deg) scale(1);transform:rotate(-45deg) scale(1)}.multiselect-item-checkbox input[type=checkbox]:checked+div:before{-webkit-animation:.2s ease-in borderscale;animation:.2s ease-in borderscale;background:#337ab7}@-webkit-keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}@keyframes borderscale{50%{box-shadow:0 0 0 2px #337ab7}}`],
                providers: [DROPDOWN_CONTROL_VALUE_ACCESSOR],
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
MultiSelectComponent.ctorParameters = () => [
    { type: ChangeDetectorRef, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlzZWxlY3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctbXVsdGlzZWxlY3QtZHJvcGRvd24vIiwic291cmNlcyI6WyJtdWx0aXNlbGVjdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksRUFDWix1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBd0IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsUUFBUSxFQUFxQixNQUFNLHFCQUFxQixDQUFDO0FBRWxFLE1BQU0sQ0FBQyx1QkFBTSwrQkFBK0IsR0FBUTtJQUNsRCxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUM7SUFDbkQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBQ0YsdUJBQU0sSUFBSSxHQUFHLEdBQUcsRUFBRSxJQUFHLENBQUM7O0FBMkN0QixNQUFNOzs7O0lBOEZKLFlBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO3FCQTVGVixFQUFFOzZCQUNNLEVBQUU7OEJBQ2xCLElBQUk7NEJBQ2IsUUFBUTtzQkFDSixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOytCQUNMO1lBQ25DLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsT0FBTyxFQUFFLElBQUk7WUFDYixTQUFTLEVBQUUsTUFBTTtZQUNqQixjQUFjLEVBQUUsSUFBSTtZQUNwQixhQUFhLEVBQUUsWUFBWTtZQUMzQixlQUFlLEVBQUUsY0FBYztZQUMvQixpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLGNBQWMsRUFBRSxDQUFDLENBQUM7WUFDbEIs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Z0JBQ2gySCxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztnQkFDNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozs7WUFwREMsaUJBQWlCOzs7NEJBZ0ZoQixLQUFLO3lCQVFMLEtBQUs7eUJBR0wsS0FBSztxQkFTTCxLQUFLOytCQXVCTCxNQUFNLFNBQUMsZ0JBQWdCO2dDQUV2QixNQUFNLFNBQUMsaUJBQWlCO3lCQUd4QixNQUFNLFNBQUMsVUFBVTsyQkFHakIsTUFBTSxTQUFDLFlBQVk7NEJBR25CLE1BQU0sU0FBQyxhQUFhOzhCQUdwQixNQUFNLFNBQUMsZUFBZTswQkF5R3RCLFlBQVksU0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBIb3N0TGlzdGVuZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTkdfVkFMVUVfQUNDRVNTT1IsIENvbnRyb2xWYWx1ZUFjY2Vzc29yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTGlzdEl0ZW0sIElEcm9wZG93blNldHRpbmdzIH0gZnJvbSAnLi9tdWx0aXNlbGVjdC5tb2RlbCc7XG5cbmV4cG9ydCBjb25zdCBEUk9QRE9XTl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBNdWx0aVNlbGVjdENvbXBvbmVudCksXG4gIG11bHRpOiB0cnVlXG59O1xuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZy1tdWx0aXNlbGVjdC1kcm9wZG93bicsXG4gIHRlbXBsYXRlOiBgPGRpdiB0YWJpbmRleD1cIj0wXCIgKGJsdXIpPVwib25Ub3VjaGVkKClcIiBjbGFzcz1cIm11bHRpc2VsZWN0LWRyb3Bkb3duXCIgKGNsaWNrT3V0c2lkZSk9XCJjbG9zZURyb3Bkb3duKClcIj5cbiAgPGRpdiBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIj5cbiAgICA8c3BhbiB0YWJpbmRleD1cIi0xXCIgY2xhc3M9XCJkcm9wZG93bi1idG5cIiAoY2xpY2spPVwidG9nZ2xlRHJvcGRvd24oJGV2ZW50KVwiPlxuICAgICAgPHNwYW4gKm5nSWY9XCJzZWxlY3RlZEl0ZW1zLmxlbmd0aCA9PSAwXCI+e3tfcGxhY2Vob2xkZXJ9fTwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzPVwic2VsZWN0ZWQtaXRlbVwiICpuZ0Zvcj1cImxldCBpdGVtIG9mIHNlbGVjdGVkSXRlbXM7dHJhY2tCeTogdHJhY2tCeUZuO2xldCBrID0gaW5kZXhcIiBbaGlkZGVuXT1cImsgPiBfc2V0dGluZ3MuaXRlbXNTaG93TGltaXQtMVwiPlxuICAgICAgICB7e2l0ZW0udGV4dH19XG4gICAgICAgIDxhIHN0eWxlPVwicGFkZGluZy10b3A6MnB4O3BhZGRpbmctbGVmdDoycHg7Y29sb3I6d2hpdGVcIiAoY2xpY2spPVwib25JdGVtQ2xpY2soJGV2ZW50LGl0ZW0pXCI+eDwvYT5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIHN0eWxlPVwiZmxvYXQ6cmlnaHQgIWltcG9ydGFudDtwYWRkaW5nLXJpZ2h0OjRweFwiPlxuICAgICAgICA8c3BhbiBzdHlsZT1cInBhZGRpbmctcmlnaHQ6IDZweDtcIiAqbmdJZj1cIml0ZW1TaG93UmVtYWluaW5nKCk+MFwiPit7e2l0ZW1TaG93UmVtYWluaW5nKCl9fTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gW25nQ2xhc3NdPVwiX3NldHRpbmdzLmRlZmF1bHRPcGVuID8gJ2Ryb3Bkb3duLXVwJyA6ICdkcm9wZG93bi1kb3duJ1wiPjwvc3Bhbj5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L3NwYW4+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24tbGlzdFwiIFtoaWRkZW5dPVwiIV9zZXR0aW5ncy5kZWZhdWx0T3BlblwiPlxuICAgIDx1bCBjbGFzcz1cIml0ZW0xXCI+XG4gICAgICA8bGkgKGNsaWNrKT1cInRvZ2dsZVNlbGVjdEFsbCgpXCIgKm5nSWY9XCJfZGF0YS5sZW5ndGggPiAwICYmICFfc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uICYmIF9zZXR0aW5ncy5lbmFibGVDaGVja0FsbCAmJiBfc2V0dGluZ3MubGltaXRTZWxlY3Rpb249PT0tMVwiIGNsYXNzPVwibXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveFwiIHN0eWxlPVwiYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2M7cGFkZGluZzoxMHB4XCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBhcmlhLWxhYmVsPVwibXVsdGlzZWxlY3Qtc2VsZWN0LWFsbFwiIFtjaGVja2VkXT1cImlzQWxsSXRlbXNTZWxlY3RlZCgpXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkIHx8IGlzTGltaXRTZWxlY3Rpb25SZWFjaGVkKClcIiAvPlxuICAgICAgICA8ZGl2Pnt7IWlzQWxsSXRlbXNTZWxlY3RlZCgpID8gX3NldHRpbmdzLnNlbGVjdEFsbFRleHQgOiBfc2V0dGluZ3MudW5TZWxlY3RBbGxUZXh0fX08L2Rpdj5cbiAgICAgIDwvbGk+XG4gICAgICA8bGkgY2xhc3M9XCJmaWx0ZXItdGV4dGJveFwiICpuZ0lmPVwiX2RhdGEubGVuZ3RoPjAgJiYgX3NldHRpbmdzLmFsbG93U2VhcmNoRmlsdGVyXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGFyaWEtbGFiZWw9XCJtdWx0aXNlbGVjdC1zZWFyY2hcIiBbcmVhZE9ubHldPVwiZGlzYWJsZWRcIiBbcGxhY2Vob2xkZXJdPVwiX3NldHRpbmdzLnNlYXJjaFBsYWNlaG9sZGVyVGV4dFwiIFsobmdNb2RlbCldPVwiZmlsdGVyLnRleHRcIiAobmdNb2RlbENoYW5nZSk9XCJvbkZpbHRlclRleHRDaGFuZ2UoJGV2ZW50KVwiPlxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICAgIDx1bCBjbGFzcz1cIml0ZW0yXCIgW3N0eWxlLm1heEhlaWdodF09XCJfc2V0dGluZ3MubWF4SGVpZ2h0KydweCdcIj5cbiAgICAgIDxsaSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBfZGF0YSB8IG5nMkxpc3RGaWx0ZXI6ZmlsdGVyOyBsZXQgaSA9IGluZGV4O1wiIChjbGljayk9XCJvbkl0ZW1DbGljaygkZXZlbnQsaXRlbSlcIiBjbGFzcz1cIm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3hcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGFyaWEtbGFiZWw9XCJtdWx0aXNlbGVjdC1pdGVtXCIgW2NoZWNrZWRdPVwiaXNTZWxlY3RlZChpdGVtKVwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCAoaXNMaW1pdFNlbGVjdGlvblJlYWNoZWQoKSAmJiAhaXNTZWxlY3RlZChpdGVtKSlcIiAvPlxuICAgICAgICA8ZGl2Pnt7aXRlbS50ZXh0fX08L2Rpdj5cbiAgICAgIDwvbGk+XG4gICAgICA8bGkgY2xhc3M9J25vLWRhdGEnICpuZ0lmPVwiX2RhdGEubGVuZ3RoID09IDBcIj5cbiAgICAgICAgPGg1Pnt7X3NldHRpbmdzLm5vRGF0YUF2YWlsYWJsZVBsYWNlaG9sZGVyVGV4dH19PC9oNT5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgPC9kaXY+XG48L2Rpdj5gLFxuICBzdHlsZXM6IFtgLm11bHRpc2VsZWN0LWRyb3Bkb3due3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMCU7Zm9udC1zaXplOmluaGVyaXQ7Zm9udC1mYW1pbHk6aW5oZXJpdH0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRyb3Bkb3duLWJ0bntkaXNwbGF5OmlubGluZS1ibG9jaztib3JkZXI6MXB4IHNvbGlkICNhZGFkYWQ7d2lkdGg6MTAwJTtwYWRkaW5nOjZweCAxMnB4O21hcmdpbi1ib3R0b206MDtmb250LXdlaWdodDo0MDA7bGluZS1oZWlnaHQ6MS41Mjg1NzE0Mzt0ZXh0LWFsaWduOmxlZnQ7dmVydGljYWwtYWxpZ246bWlkZGxlO2N1cnNvcjpwb2ludGVyO2JhY2tncm91bmQtaW1hZ2U6bm9uZTtib3JkZXItcmFkaXVzOjRweH0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRyb3Bkb3duLWJ0biAuc2VsZWN0ZWQtaXRlbXtib3JkZXI6MXB4IHNvbGlkICMzMzdhYjc7bWFyZ2luLXJpZ2h0OjRweDtiYWNrZ3JvdW5kOiMzMzdhYjc7cGFkZGluZzowIDVweDtjb2xvcjojZmZmO2JvcmRlci1yYWRpdXM6MnB4O2Zsb2F0OmxlZnR9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG4gLnNlbGVjdGVkLWl0ZW0gYXt0ZXh0LWRlY29yYXRpb246bm9uZX0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRyb3Bkb3duLWJ0biAuc2VsZWN0ZWQtaXRlbTpob3Zlcntib3gtc2hhZG93OjFweCAxcHggIzk1OTU5NX0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRyb3Bkb3duLWJ0biAuZHJvcGRvd24tZG93bntkaXNwbGF5OmlubGluZS1ibG9jazt0b3A6MTBweDt3aWR0aDowO2hlaWdodDowO2JvcmRlci10b3A6MTBweCBzb2xpZCAjYWRhZGFkO2JvcmRlci1sZWZ0OjEwcHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJpZ2h0OjEwcHggc29saWQgdHJhbnNwYXJlbnR9Lm11bHRpc2VsZWN0LWRyb3Bkb3duIC5kcm9wZG93bi1idG4gLmRyb3Bkb3duLXVwe2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjA7aGVpZ2h0OjA7Ym9yZGVyLWJvdHRvbToxMHB4IHNvbGlkICNhZGFkYWQ7Ym9yZGVyLWxlZnQ6MTBweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItcmlnaHQ6MTBweCBzb2xpZCB0cmFuc3BhcmVudH0ubXVsdGlzZWxlY3QtZHJvcGRvd24gLmRpc2FibGVkPnNwYW57YmFja2dyb3VuZC1jb2xvcjojZWNlZWVmfS5kcm9wZG93bi1saXN0e3Bvc2l0aW9uOmFic29sdXRlO3BhZGRpbmctdG9wOjZweDt3aWR0aDoxMDAlO3otaW5kZXg6OTk5OTtib3JkZXI6MXB4IHNvbGlkICNjY2M7Ym9yZGVyLXJhZGl1czozcHg7YmFja2dyb3VuZDojZmZmO21hcmdpbi10b3A6MTBweDtib3gtc2hhZG93OjAgMXB4IDVweCAjOTU5NTk1fS5kcm9wZG93bi1saXN0IHVse3BhZGRpbmc6MDtsaXN0LXN0eWxlOm5vbmU7b3ZlcmZsb3c6YXV0bzttYXJnaW46MH0uZHJvcGRvd24tbGlzdCBsaXtwYWRkaW5nOjZweCAxMHB4O2N1cnNvcjpwb2ludGVyO3RleHQtYWxpZ246bGVmdH0uZHJvcGRvd24tbGlzdCAuZmlsdGVyLXRleHRib3h7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2NjYztwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nOjEwcHh9LmRyb3Bkb3duLWxpc3QgLmZpbHRlci10ZXh0Ym94IGlucHV0e2JvcmRlcjowO3dpZHRoOjEwMCU7cGFkZGluZzowIDAgMCAyNnB4fS5kcm9wZG93bi1saXN0IC5maWx0ZXItdGV4dGJveCBpbnB1dDpmb2N1c3tvdXRsaW5lOjB9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF17Ym9yZGVyOjA7Y2xpcDpyZWN0KDAgMCAwIDApO2hlaWdodDoxcHg7bWFyZ2luOi0xcHg7b3ZlcmZsb3c6aGlkZGVuO3BhZGRpbmc6MDtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxcHh9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06Zm9jdXMrZGl2OmJlZm9yZSwubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpob3ZlcitkaXY6YmVmb3Jle2JvcmRlci1jb2xvcjojMzM3YWI3O2JhY2tncm91bmQtY29sb3I6I2YyZjJmMn0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTphY3RpdmUrZGl2OmJlZm9yZXt0cmFuc2l0aW9uLWR1cmF0aW9uOjBzfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdK2Rpdntwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nLWxlZnQ6MmVtO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luOjA7Y29sb3I6IzAwMH0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XStkaXY6YmVmb3Jle2JveC1zaXppbmc6Y29udGVudC1ib3g7Y29udGVudDonJztjb2xvcjojMzM3YWI3O3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDowO3dpZHRoOjE0cHg7aGVpZ2h0OjE0cHg7bWFyZ2luLXRvcDotOXB4O2JvcmRlcjoycHggc29saWQgIzMzN2FiNzt0ZXh0LWFsaWduOmNlbnRlcjt0cmFuc2l0aW9uOi40c30ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XStkaXY6YWZ0ZXJ7Ym94LXNpemluZzpjb250ZW50LWJveDtjb250ZW50OicnO3Bvc2l0aW9uOmFic29sdXRlOy13ZWJraXQtdHJhbnNmb3JtOnNjYWxlKDApO3RyYW5zZm9ybTpzY2FsZSgwKTstd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46NTAlO3RyYW5zZm9ybS1vcmlnaW46NTAlO3RyYW5zaXRpb246dHJhbnNmb3JtIC4ycyBlYXNlLW91dCwtd2Via2l0LXRyYW5zZm9ybSAuMnMgZWFzZS1vdXQ7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDt0b3A6NTAlO2xlZnQ6NHB4O3dpZHRoOjhweDtoZWlnaHQ6M3B4O21hcmdpbi10b3A6LTRweDtib3JkZXItc3R5bGU6c29saWQ7Ym9yZGVyLWNvbG9yOiNmZmY7Ym9yZGVyLXdpZHRoOjAgMCAzcHggM3B4Oy1vLWJvcmRlci1pbWFnZTpub25lO2JvcmRlci1pbWFnZTpub25lOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpIHNjYWxlKDApO3RyYW5zZm9ybTpyb3RhdGUoLTQ1ZGVnKSBzY2FsZSgwKX0ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpkaXNhYmxlZCtkaXY6YmVmb3Jle2JvcmRlci1jb2xvcjojY2NjfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmRpc2FibGVkOmZvY3VzK2RpdjpiZWZvcmUgLm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06ZGlzYWJsZWQ6aG92ZXIrZGl2OmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOmluaGVyaXR9Lm11bHRpc2VsZWN0LWl0ZW0tY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF06ZGlzYWJsZWQ6Y2hlY2tlZCtkaXY6YmVmb3Jle2JhY2tncm91bmQtY29sb3I6I2NjY30ubXVsdGlzZWxlY3QtaXRlbS1jaGVja2JveCBpbnB1dFt0eXBlPWNoZWNrYm94XTpjaGVja2VkK2RpdjphZnRlcntjb250ZW50OicnO3RyYW5zaXRpb246dHJhbnNmb3JtIC4ycyBlYXNlLW91dCwtd2Via2l0LXRyYW5zZm9ybSAuMnMgZWFzZS1vdXQ7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKC00NWRlZykgc2NhbGUoMSk7dHJhbnNmb3JtOnJvdGF0ZSgtNDVkZWcpIHNjYWxlKDEpfS5tdWx0aXNlbGVjdC1pdGVtLWNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hdOmNoZWNrZWQrZGl2OmJlZm9yZXstd2Via2l0LWFuaW1hdGlvbjouMnMgZWFzZS1pbiBib3JkZXJzY2FsZTthbmltYXRpb246LjJzIGVhc2UtaW4gYm9yZGVyc2NhbGU7YmFja2dyb3VuZDojMzM3YWI3fUAtd2Via2l0LWtleWZyYW1lcyBib3JkZXJzY2FsZXs1MCV7Ym94LXNoYWRvdzowIDAgMCAycHggIzMzN2FiN319QGtleWZyYW1lcyBib3JkZXJzY2FsZXs1MCV7Ym94LXNoYWRvdzowIDAgMCAycHggIzMzN2FiN319YF0sXG4gIHByb3ZpZGVyczogW0RST1BET1dOX0NPTlRST0xfVkFMVUVfQUNDRVNTT1JdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNdWx0aVNlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgcHVibGljIF9zZXR0aW5nczogSURyb3Bkb3duU2V0dGluZ3M7XG4gIHB1YmxpYyBfZGF0YTogQXJyYXk8TGlzdEl0ZW0+ID0gW107XG4gIHB1YmxpYyBzZWxlY3RlZEl0ZW1zOiBBcnJheTxMaXN0SXRlbT4gPSBbXTtcbiAgcHVibGljIGlzRHJvcGRvd25PcGVuID0gdHJ1ZTtcbiAgX3BsYWNlaG9sZGVyID0gJ1NlbGVjdCc7XG4gIGZpbHRlcjogTGlzdEl0ZW0gPSBuZXcgTGlzdEl0ZW0odGhpcy5kYXRhKTtcbiAgZGVmYXVsdFNldHRpbmdzOiBJRHJvcGRvd25TZXR0aW5ncyA9IHtcbiAgICBzaW5nbGVTZWxlY3Rpb246IGZhbHNlLFxuICAgIGlkTW9kZTogZmFsc2UsXG4gICAgaWRGaWVsZDogJ2lkJyxcbiAgICB0ZXh0RmllbGQ6ICd0ZXh0JyxcbiAgICBlbmFibGVDaGVja0FsbDogdHJ1ZSxcbiAgICBzZWxlY3RBbGxUZXh0OiAnU2VsZWN0IEFsbCcsXG4gICAgdW5TZWxlY3RBbGxUZXh0OiAnVW5TZWxlY3QgQWxsJyxcbiAgICBhbGxvd1NlYXJjaEZpbHRlcjogZmFsc2UsXG4gICAgbGltaXRTZWxlY3Rpb246IC0xLFxuICAgIGNsZWFyU2VhcmNoRmlsdGVyOiB0cnVlLFxuICAgIG1heEhlaWdodDogMTk3LFxuICAgIGl0ZW1zU2hvd0xpbWl0OiA5OTk5OTk5OTk5OTksXG4gICAgc2VhcmNoUGxhY2Vob2xkZXJUZXh0OiAnU2VhcmNoJyxcbiAgICBub0RhdGFBdmFpbGFibGVQbGFjZWhvbGRlclRleHQ6ICdObyBkYXRhIGF2YWlsYWJsZScsXG4gICAgY2xvc2VEcm9wRG93bk9uU2VsZWN0aW9uOiBmYWxzZSxcbiAgICBzaG93U2VsZWN0ZWRJdGVtc0F0VG9wOiBmYWxzZSxcbiAgICBkZWZhdWx0T3BlbjogZmFsc2VcbiAgfTtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IHBsYWNlaG9sZGVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gJ1NlbGVjdCc7XG4gICAgfVxuICB9XG4gIEBJbnB1dCgpXG4gIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBzZXR0aW5ncyh2YWx1ZTogSURyb3Bkb3duU2V0dGluZ3MpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX3NldHRpbmdzID0gT2JqZWN0LmFzc2lnbih0aGlzLmRlZmF1bHRTZXR0aW5ncywgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24odGhpcy5kZWZhdWx0U2V0dGluZ3MpO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZTogQXJyYXk8YW55Pikge1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY29uc3QgX2l0ZW1zID0gdmFsdWUuZmlsdGVyKChpdGVtOiBhbnkpID0+IHtcbiAgICAgIC8vICAgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJyB8fCAodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnICYmIGl0ZW0gJiYgaXRlbVt0aGlzLl9zZXR0aW5ncy5pZEZpZWxkXSAmJiBpdGVtW3RoaXMuX3NldHRpbmdzLnRleHRGaWVsZF0pKSB7XG4gICAgICAvLyAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0pO1xuICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlLm1hcChcbiAgICAgICAgKGl0ZW06IGFueSkgPT5cbiAgICAgICAgICB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgID8gbmV3IExpc3RJdGVtKGl0ZW0pXG4gICAgICAgICAgICA6IG5ldyBMaXN0SXRlbSh7XG4gICAgICAgICAgICAgICAgaWQ6IGl0ZW1bdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0sXG4gICAgICAgICAgICAgICAgdGV4dDogdGhpcy5nZXRWYWx1ZShpdGVtLCB0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGQpXG4gICAgICAgICAgICAgICAgLy8gdGV4dDogaXRlbVt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdXG4gICAgICAgICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoJ29uRmlsdGVyQ2hhbmdlJylcbiAgb25GaWx0ZXJDaGFuZ2U6IEV2ZW50RW1pdHRlcjxMaXN0SXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgnb25Ecm9wRG93bkNsb3NlJylcbiAgb25Ecm9wRG93bkNsb3NlOiBFdmVudEVtaXR0ZXI8TGlzdEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgnb25TZWxlY3QnKVxuICBvblNlbGVjdDogRXZlbnRFbWl0dGVyPExpc3RJdGVtPiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoJ29uRGVTZWxlY3QnKVxuICBvbkRlU2VsZWN0OiBFdmVudEVtaXR0ZXI8TGlzdEl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgnb25TZWxlY3RBbGwnKVxuICBvblNlbGVjdEFsbDogRXZlbnRFbWl0dGVyPEFycmF5PExpc3RJdGVtPj4gPSBuZXcgRXZlbnRFbWl0dGVyPEFycmF5PGFueT4+KCk7XG5cbiAgQE91dHB1dCgnb25EZVNlbGVjdEFsbCcpXG4gIG9uRGVTZWxlY3RBbGw6IEV2ZW50RW1pdHRlcjxBcnJheTxMaXN0SXRlbT4+ID0gbmV3IEV2ZW50RW1pdHRlcjxBcnJheTxhbnk+PigpO1xuXG4gIHByaXZhdGUgb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSBub29wO1xuICBwcml2YXRlIG9uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSBub29wO1xuXG4gIG9uRmlsdGVyVGV4dENoYW5nZSgkZXZlbnQpIHtcbiAgICB0aGlzLm9uRmlsdGVyQ2hhbmdlLmVtaXQoJGV2ZW50KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBnZXRWYWx1ZShpdGVtOiBhbnksIG5lc3RlZFBhdGg6IHN0cmluZykge1xuICAgIGNvbnN0IG5lc3RlZFByb3BzID0gbmVzdGVkUGF0aC5zcGxpdCgnLicpO1xuICBcbiAgICBpZiAobmVzdGVkUHJvcHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBpdGVtW25lc3RlZFBhdGhdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBuZXN0ZWRJdGVtID0gaXRlbTtcbiAgICAgICAgbmVzdGVkUHJvcHMuZm9yRWFjaCgobmVzdGVkUHJvcCkgPT4ge1xuICAgICAgICAgICAgaWYgKG5lc3RlZEl0ZW0pIHtcbiAgICAgICAgICAgICAgICBuZXN0ZWRJdGVtID0gbmVzdGVkSXRlbVtuZXN0ZWRQcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIHJldHVybiBuZXN0ZWRJdGVtO1xuICAgIH1cbn1cblxuICBvbkl0ZW1DbGljaygkZXZlbnQ6IGFueSwgaXRlbTogTGlzdEl0ZW0pIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGZvdW5kID0gdGhpcy5pc1NlbGVjdGVkKGl0ZW0pO1xuICAgIGNvbnN0IGFsbG93QWRkID1cbiAgICAgIHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID09PSAtMSB8fFxuICAgICAgKHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID4gMCAmJlxuICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoIDwgdGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24pO1xuICAgIGlmICghZm91bmQpIHtcbiAgICAgIGlmIChhbGxvd0FkZCkge1xuICAgICAgICB0aGlzLmFkZFNlbGVjdGVkKGl0ZW0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkKGl0ZW0pO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICB0aGlzLl9zZXR0aW5ncy5zaW5nbGVTZWxlY3Rpb24gJiZcbiAgICAgIHRoaXMuX3NldHRpbmdzLmNsb3NlRHJvcERvd25PblNlbGVjdGlvblxuICAgICkge1xuICAgICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgfVxuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgY29uc3QgZmlyc3RJdGVtID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXG4gICAgICAgICAgICAgIHR5cGVvZiBmaXJzdEl0ZW0gPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgPyBuZXcgTGlzdEl0ZW0oZmlyc3RJdGVtKVxuICAgICAgICAgICAgICAgIDogbmV3IExpc3RJdGVtKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IGZpcnN0SXRlbVt0aGlzLl9zZXR0aW5ncy5pZEZpZWxkXSxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogZmlyc3RJdGVtW3RoaXMuX3NldHRpbmdzLnRleHRGaWVsZF1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZS5ib2R5Lm1zZyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IF9kYXRhID0gdmFsdWUubWFwKFxuICAgICAgICAgIChpdGVtOiBhbnkpID0+XG4gICAgICAgICAgICB0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgPyBuZXcgTGlzdEl0ZW0oaXRlbSlcbiAgICAgICAgICAgICAgOiBuZXcgTGlzdEl0ZW0oe1xuICAgICAgICAgICAgICAgICAgaWQ6IGl0ZW1bdGhpcy5fc2V0dGluZ3MuaWRGaWVsZF0sXG4gICAgICAgICAgICAgICAgICB0ZXh0OiBpdGVtW3RoaXMuX3NldHRpbmdzLnRleHRGaWVsZF1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgICBpZiAodGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPiAwKSB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gX2RhdGEuc3BsaWNlKDAsIHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBfZGF0YTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMgPSBbXTtcbiAgICB9XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHZhbHVlKTtcbiAgfVxuXG4gIC8vIEZyb20gQ29udHJvbFZhbHVlQWNjZXNzb3IgaW50ZXJmYWNlXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgLy8gRnJvbSBDb250cm9sVmFsdWVBY2Nlc3NvciBpbnRlcmZhY2VcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIC8vIFNldCB0b3VjaGVkIG9uIGJsdXJcbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXG4gIHB1YmxpYyBvblRvdWNoZWQoKSB7XG4gICAgdGhpcy5jbG9zZURyb3Bkb3duKCk7XG4gICAgdGhpcy5vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgdHJhY2tCeUZuKGluZGV4LCBpdGVtKSB7XG4gICAgcmV0dXJuIGl0ZW0uaWQ7XG4gIH1cblxuICBpc1NlbGVjdGVkKGNsaWNrZWRJdGVtOiBMaXN0SXRlbSkge1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgaWYgKGNsaWNrZWRJdGVtLmlkID09PSBpdGVtLmlkKSB7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm91bmQ7XG4gIH1cblxuICBpc0xpbWl0U2VsZWN0aW9uUmVhY2hlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3MubGltaXRTZWxlY3Rpb24gPT09IHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGg7XG4gIH1cblxuICBpc0FsbEl0ZW1zU2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGEubGVuZ3RoID09PSB0aGlzLnNlbGVjdGVkSXRlbXMubGVuZ3RoO1xuICB9XG5cbiAgc2hvd0J1dHRvbigpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xuICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID4gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyB0aGlzLl9zZXR0aW5ncy5lbmFibGVDaGVja0FsbCA9IHRoaXMuX3NldHRpbmdzLmxpbWl0U2VsZWN0aW9uID09PSAtMSA/IHRydWUgOiBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlOyAvLyAhdGhpcy5fc2V0dGluZ3Muc2luZ2xlU2VsZWN0aW9uICYmIHRoaXMuX3NldHRpbmdzLmVuYWJsZUNoZWNrQWxsICYmIHRoaXMuX2RhdGEubGVuZ3RoID4gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gc2hvdWxkIGJlIGRpc2FibGVkIGluIHNpbmdsZSBzZWxlY3Rpb24gbW9kZVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGl0ZW1TaG93UmVtYWluaW5nKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJdGVtcy5sZW5ndGggLSB0aGlzLl9zZXR0aW5ncy5pdGVtc1Nob3dMaW1pdDtcbiAgfVxuXG4gIGFkZFNlbGVjdGVkKGl0ZW06IExpc3RJdGVtKSB7XG4gICAgaWYgKHRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICB0aGlzLnNlbGVjdGVkSXRlbXMucHVzaChpdGVtKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgfVxuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLmVtaXR0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbXMpKTtcbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQodGhpcy5lbWl0dGVkVmFsdWUoaXRlbSkpO1xuICB9XG5cbiAgcmVtb3ZlU2VsZWN0ZWQoaXRlbVNlbDogTGlzdEl0ZW0pIHtcbiAgICB0aGlzLnNlbGVjdGVkSXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtU2VsLmlkID09PSBpdGVtLmlkKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcy5zcGxpY2UodGhpcy5zZWxlY3RlZEl0ZW1zLmluZGV4T2YoaXRlbSksIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMub25DaGFuZ2VDYWxsYmFjayh0aGlzLmVtaXR0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbXMpKTtcbiAgICB0aGlzLm9uRGVTZWxlY3QuZW1pdCh0aGlzLmVtaXR0ZWRWYWx1ZShpdGVtU2VsKSk7XG4gIH1cblxuICBlbWl0dGVkVmFsdWUodmFsOiBhbnkpOiBhbnkge1xuICAgIGxldCBzZWxlY3RlZCA9IFtdO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIHZhbC5tYXAoaXRlbSA9PiB7XG4gICAgICAgIGlmIChpdGVtLmlkID09PSBpdGVtLnRleHQpIHtcbiAgICAgICAgICBzZWxlY3RlZC5wdXNoKGl0ZW0udGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZWN0ZWQucHVzaCh0aGlzLm9iamVjdGlmeShpdGVtKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodmFsKSB7XG4gICAgICAgIGlmICh2YWwuaWQgPT09IHZhbC50ZXh0KSB7XG4gICAgICAgICAgcmV0dXJuIHZhbC50ZXh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLm9iamVjdGlmeSh2YWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xuICAgICAgc2VsZWN0ZWQgPSBzZWxlY3RlZFswXTtcblxuICAgICAgaWYgKHRoaXMuX3NldHRpbmdzLmlkTW9kZSAmJiBzZWxlY3RlZCkge1xuICAgICAgICBzZWxlY3RlZCA9IHNlbGVjdGVkW3RoaXMuX3NldHRpbmdzLmlkRmllbGRdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZWxlY3RlZDtcbiAgfVxuXG4gIG9iamVjdGlmeSh2YWw6IExpc3RJdGVtKSB7XG4gICAgY29uc3Qgb2JqID0ge307XG4gICAgb2JqW3RoaXMuX3NldHRpbmdzLmlkRmllbGRdID0gdmFsLmlkO1xuICAgIG9ialt0aGlzLl9zZXR0aW5ncy50ZXh0RmllbGRdID0gdmFsLnRleHQ7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHRvZ2dsZURyb3Bkb3duKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICh0aGlzLmRpc2FibGVkICYmIHRoaXMuX3NldHRpbmdzLnNpbmdsZVNlbGVjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zZXR0aW5ncy5kZWZhdWx0T3BlbiA9ICF0aGlzLl9zZXR0aW5ncy5kZWZhdWx0T3BlbjtcbiAgICBpZiAoIXRoaXMuX3NldHRpbmdzLmRlZmF1bHRPcGVuKSB7XG4gICAgICB0aGlzLm9uRHJvcERvd25DbG9zZS5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgY2xvc2VEcm9wZG93bigpIHtcbiAgICB0aGlzLl9zZXR0aW5ncy5kZWZhdWx0T3BlbiA9IGZhbHNlO1xuICAgIC8vIGNsZWFyIHNlYXJjaCB0ZXh0XG4gICAgaWYgKHRoaXMuX3NldHRpbmdzLmNsZWFyU2VhcmNoRmlsdGVyKSB7XG4gICAgICB0aGlzLmZpbHRlci50ZXh0ID0gJyc7XG4gICAgfVxuICAgIHRoaXMub25Ecm9wRG93bkNsb3NlLmVtaXQoKTtcbiAgfVxuXG4gIHRvZ2dsZVNlbGVjdEFsbCgpIHtcbiAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaXNBbGxJdGVtc1NlbGVjdGVkKCkpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRJdGVtcyA9IHRoaXMuX2RhdGEuc2xpY2UoKTtcbiAgICAgIHRoaXMub25TZWxlY3RBbGwuZW1pdCh0aGlzLmVtaXR0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gW107XG4gICAgICB0aGlzLm9uRGVTZWxlY3RBbGwuZW1pdCh0aGlzLmVtaXR0ZWRWYWx1ZSh0aGlzLnNlbGVjdGVkSXRlbXMpKTtcbiAgICB9XG4gICAgdGhpcy5vbkNoYW5nZUNhbGxiYWNrKHRoaXMuZW1pdHRlZFZhbHVlKHRoaXMuc2VsZWN0ZWRJdGVtcykpO1xuICB9XG59XG4iXX0=