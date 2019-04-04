/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function IDropdownSettings() { }
function IDropdownSettings_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    IDropdownSettings.prototype.singleSelection;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.idMode;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.idField;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.textField;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.enableCheckAll;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.selectAllText;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.unSelectAllText;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.allowSearchFilter;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.clearSearchFilter;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.maxHeight;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.itemsShowLimit;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.limitSelection;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.searchPlaceholderText;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.noDataAvailablePlaceholderText;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.closeDropDownOnSelection;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.showSelectedItemsAtTop;
    /** @type {?|undefined} */
    IDropdownSettings.prototype.defaultOpen;
}
export class ListItem {
    /**
     * @param {?} source
     */
    constructor(source) {
        if (typeof source === 'string') {
            this.id = this.text = source;
        }
        if (typeof source === 'object') {
            this.id = source.id;
            this.text = source.text;
        }
    }
}
function ListItem_tsickle_Closure_declarations() {
    /** @type {?} */
    ListItem.prototype.id;
    /** @type {?} */
    ListItem.prototype.text;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlzZWxlY3QubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1tdWx0aXNlbGVjdC1kcm9wZG93bi8iLCJzb3VyY2VzIjpbIm11bHRpc2VsZWN0Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLE1BQU07Ozs7Z0JBSWUsTUFBVztRQUM1QixFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7U0FDOUI7UUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDekI7O0NBRUoiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIElEcm9wZG93blNldHRpbmdzIHtcbiAgc2luZ2xlU2VsZWN0aW9uPzogYm9vbGVhbjtcbiAgaWRNb2RlPzogYm9vbGVhbjtcbiAgaWRGaWVsZD86IHN0cmluZztcbiAgdGV4dEZpZWxkPzogc3RyaW5nO1xuICBlbmFibGVDaGVja0FsbD86IGJvb2xlYW47XG4gIHNlbGVjdEFsbFRleHQ/OiBzdHJpbmc7XG4gIHVuU2VsZWN0QWxsVGV4dD86IHN0cmluZztcbiAgYWxsb3dTZWFyY2hGaWx0ZXI/OiBib29sZWFuO1xuICBjbGVhclNlYXJjaEZpbHRlcj86IGJvb2xlYW47XG4gIG1heEhlaWdodD86IG51bWJlcjtcbiAgaXRlbXNTaG93TGltaXQ/OiBudW1iZXI7XG4gIGxpbWl0U2VsZWN0aW9uPzogbnVtYmVyO1xuICBzZWFyY2hQbGFjZWhvbGRlclRleHQ/OiBzdHJpbmc7XG4gIG5vRGF0YUF2YWlsYWJsZVBsYWNlaG9sZGVyVGV4dD86IHN0cmluZztcbiAgY2xvc2VEcm9wRG93bk9uU2VsZWN0aW9uPzogYm9vbGVhbjtcbiAgc2hvd1NlbGVjdGVkSXRlbXNBdFRvcD86IGJvb2xlYW47XG4gIGRlZmF1bHRPcGVuPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIExpc3RJdGVtIHtcbiAgaWQ6IFN0cmluZztcbiAgdGV4dDogU3RyaW5nO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3Rvcihzb3VyY2U6IGFueSkge1xuICAgIGlmICh0eXBlb2Ygc291cmNlID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5pZCA9IHRoaXMudGV4dCA9IHNvdXJjZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgPT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLmlkID0gc291cmNlLmlkO1xuICAgICAgdGhpcy50ZXh0ID0gc291cmNlLnRleHQ7XG4gICAgfVxuICB9XG59XG4iXX0=