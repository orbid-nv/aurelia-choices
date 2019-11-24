import { bindable, autoinject, bindingMode } from "aurelia-framework";
import Choices from "choices.js";
import * as C  from "choices.js";
import {Choices as Choicesns}  from "choices.js"
@autoinject()
export class OrChoices {
  @bindable public message: string = "";
  public choicesElement: HTMLInputElement;

 
  public config: any = {} ;
  @bindable( { defaultBindingMode: bindingMode.fromView })
  public choicesInstance: Choices;
  private attached() {
    this.initChoices();
  }

  private initChoices(){
    this.initialiseProperties();
    this.initialiseFunctions();
    if(this.choicesInstance){
      this.choicesInstance.destroy();
     //if innerhtml isn't cleared sometimes nodes will apear double when recreated.  
      this.choicesElement.innerHTML="";
    }
    if(!this.oMultiple){
      this.buildPlaceholder();
    }else{
      this.setMultipleAttribute();
    }
    if(this.oChoices)
      this.config.choices=this.oChoices;
    this.choicesInstance = new Choices(this.choicesElement,this.config);
    this.choicesInstance.passedElement.element.addEventListener('change',(e)=>{
      this.oValue = this.choicesInstance.getValue(true);
    });
  }
  private buildPlaceholder(){
    if(this.oPlaceholder && this.oPlaceholderValue && !this.oMultiple){
      const node = document.createElement("option");    
      node.setAttribute("value","");
      node.setAttribute("placeholder","");
      node.text=this.oPlaceholderValue;
      this.choicesElement.insertBefore(node,this.choicesElement.firstChild);
    }
  }
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public oValue
  private oValueChanged(newValue, oldValue){
    console.log(newValue);
    if (this.choicesInstance) {
      this.choicesInstance.setChoiceByValue(this.oValue);
    }
  }
  @bindable()
  public oChoices: any[];
  private oChoicesChanged(newValue, oldValue){
    console.log("oChoices");
    if (this.choicesInstance) {
      this.choicesInstance.setChoices(this.oChoices, this.oChoicesValue,this.oChoicesLabelName,true);
    }
  }

  public 
//events

// public registerEvents(){
//     let self = this;
//     this.choicesElement.addEventListener(
//         'choice',
//         function(event: any) {
//           // do something creative here...
//           self.choicesElement.dispatchEvent(
// 			new CustomEvent("o-on-choice", {
// 				bubbles: true,
// 				detail: { choice: event.detail.choice}
// 			})
// 		);
//         },
//         false,
//       );
// }

//functions:
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oSorter: Function;
private oSorterChanged(newValue, oldValue){
    if (this.choicesInstance) {
        this.initChoices();
    }
}

private initialiseFunctions(){
    if(this.oSorter!==undefined && this.oSorter!==null){
        this.config.sorter = this.oSorter;
    }
}
  //extra bindables
  @bindable()
  public oChoicesLabelName: string = "label";
  private oChoicesLabelChangedName(newValue, oldValue){
    console.log("oChoicesLabelName");
    if (this.choicesInstance && this.oChoices) {
      this.choicesInstance.setChoices(this.oChoices, this.oChoicesValue,this.oChoicesLabelName,true);
    }
  }
  @bindable()
  public oChoicesValue: string = "value";
  private oChoicesLabelChanged(newValue, oldValue){
    console.log("oChoicesValue");
    if (this.choicesInstance && this.oChoices) {
      this.choicesInstance.setChoices(this.oChoices, this.oChoicesValue,this.oChoicesLabelName,true);
    }
  }
  @bindable()
  public oMultiple: boolean = false;
  private oMultipleChanged(newValue, oldValue){
    console.log("multiple");
    this.setMultipleAttribute();
    if (this.choicesInstance) {
      this.initChoices();
    }
  }
  private setMultipleAttribute(){
    if(!this.choicesElement)return;
    if(this.oMultiple){
      this.choicesElement.setAttribute("multiple","true");
    }else{
      this.choicesElement.removeAttribute("multiple");
    }
  }
  //--- GENERATED CODE ---
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oAddItemFilter:string|RegExp|Choicesns.Types.filterFunction|null;
private oAddItemFilterChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oAddItemText:string|Choicesns.Types.noticeStringFunction;
private oAddItemTextChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oAddItems:boolean;
private oAddItemsChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oAppendValue:string|null;
private oAppendValueChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oCallbackOnCreateTemplates:any|null;
private oCallbackOnCreateTemplatesChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oCallbackOnInit:any|null;
private oCallbackOnInitChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oClassNames:Choicesns.ClassNames;
private oClassNamesChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oCustomAddItemText:string|Choicesns.Types.noticeStringFunction;
private oCustomAddItemTextChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oDelimiter:string;
private oDelimiterChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oDuplicateItemsAllowed:boolean;
private oDuplicateItemsAllowedChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oEditItems:boolean;
private oEditItemsChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oItemSelectText:string;
private oItemSelectTextChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oItems:any|any;
private oItemsChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oLoadingText:string;
private oLoadingTextChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oMaxItemCount:number;
private oMaxItemCountChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oMaxItemText:string|Choicesns.Types.noticeLimitFunction;
private oMaxItemTextChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oNoChoicesText:string|Choicesns.Types.stringFunction;
private oNoChoicesTextChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oNoResultsText:string|Choicesns.Types.stringFunction;
private oNoResultsTextChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oPaste:boolean;
private oPasteChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oPlaceholder:boolean;
private oPlaceholderChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oPlaceholderValue:string|null;
private oPlaceholderValueChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oPosition:"auto"|"top";
private oPositionChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oPrependValue:string|null;
private oPrependValueChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oRemoveItemButton:boolean;
private oRemoveItemButtonChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oRemoveItems:boolean;
private oRemoveItemsChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oRenderChoiceLimit:number;
private oRenderChoiceLimitChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oRenderSelectedChoices:"auto"|"always";
private oRenderSelectedChoicesChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oResetScrollPosition:boolean;
private oResetScrollPositionChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oSearchChoices:boolean;
private oSearchChoicesChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oSearchEnabled:boolean;
private oSearchEnabledChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oSearchFields:string[];
private oSearchFieldsChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oSearchFloor:number;
private oSearchFloorChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oSearchPlaceholderValue:string|null;
private oSearchPlaceholderValueChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oSearchResultLimit:number;
private oSearchResultLimitChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oShouldSort:boolean;
private oShouldSortChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oShouldSortItems:boolean;
private oShouldSortItemsChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oSilent:boolean;
private oSilentChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oUniqueItemText:string|Choicesns.Types.noticeStringFunction;
private oUniqueItemTextChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
@bindable({ defaultBindingMode: bindingMode.twoWay })
public oValueComparer:Choicesns.Types.valueCompareFunction;
private oValueComparerChanged(newValue, oldValue){
if (this.choicesInstance) {
    this.initChoices();
}
}
private initialiseProperties(){
if(this.oAddItemFilter!==undefined && this.oAddItemFilter!==null){
    this.config.addItemFilter = this.oAddItemFilter
}
if(this.oAddItemText!==undefined && this.oAddItemText!==null){
    this.config.addItemText = this.oAddItemText
}
if(this.oAddItems!==undefined && this.oAddItems!==null){
    this.config.addItems = this.oAddItems
}
if(this.oAppendValue!==undefined && this.oAppendValue!==null){
    this.config.appendValue = this.oAppendValue
}
if(this.oCallbackOnCreateTemplates!==undefined && this.oCallbackOnCreateTemplates!==null){
    this.config.callbackOnCreateTemplates = this.oCallbackOnCreateTemplates
}
if(this.oCallbackOnInit!==undefined && this.oCallbackOnInit!==null){
    this.config.callbackOnInit = this.oCallbackOnInit
}
if(this.oClassNames!==undefined && this.oClassNames!==null){
    this.config.classNames = this.oClassNames
}
if(this.oCustomAddItemText!==undefined && this.oCustomAddItemText!==null){
    this.config.customAddItemText = this.oCustomAddItemText
}
if(this.oDelimiter!==undefined && this.oDelimiter!==null){
    this.config.delimiter = this.oDelimiter
}
if(this.oDuplicateItemsAllowed!==undefined && this.oDuplicateItemsAllowed!==null){
    this.config.duplicateItemsAllowed = this.oDuplicateItemsAllowed
}
if(this.oEditItems!==undefined && this.oEditItems!==null){
    this.config.editItems = this.oEditItems
}
if(this.oItemSelectText!==undefined && this.oItemSelectText!==null){
    this.config.itemSelectText = this.oItemSelectText
}
if(this.oItems!==undefined && this.oItems!==null){
    this.config.items = this.oItems
}
if(this.oLoadingText!==undefined && this.oLoadingText!==null){
    this.config.loadingText = this.oLoadingText
}
if(this.oMaxItemCount!==undefined && this.oMaxItemCount!==null){
    this.config.maxItemCount = this.oMaxItemCount
}
if(this.oMaxItemText!==undefined && this.oMaxItemText!==null){
    this.config.maxItemText = this.oMaxItemText
}
if(this.oNoChoicesText!==undefined && this.oNoChoicesText!==null){
    this.config.noChoicesText = this.oNoChoicesText
}
if(this.oNoResultsText!==undefined && this.oNoResultsText!==null){
    this.config.noResultsText = this.oNoResultsText
}
if(this.oPaste!==undefined && this.oPaste!==null){
    this.config.paste = this.oPaste
}
if(this.oPlaceholder!==undefined && this.oPlaceholder!==null){
    this.config.placeholder = this.oPlaceholder
}
if(this.oPlaceholderValue!==undefined && this.oPlaceholderValue!==null){
    this.config.placeholderValue = this.oPlaceholderValue
}
if(this.oPosition!==undefined && this.oPosition!==null){
    this.config.position = this.oPosition
}
if(this.oPrependValue!==undefined && this.oPrependValue!==null){
    this.config.prependValue = this.oPrependValue
}
if(this.oRemoveItemButton!==undefined && this.oRemoveItemButton!==null){
    this.config.removeItemButton = this.oRemoveItemButton
}
if(this.oRemoveItems!==undefined && this.oRemoveItems!==null){
    this.config.removeItems = this.oRemoveItems
}
if(this.oRenderChoiceLimit!==undefined && this.oRenderChoiceLimit!==null){
    this.config.renderChoiceLimit = this.oRenderChoiceLimit
}
if(this.oRenderSelectedChoices!==undefined && this.oRenderSelectedChoices!==null){
    this.config.renderSelectedChoices = this.oRenderSelectedChoices
}
if(this.oResetScrollPosition!==undefined && this.oResetScrollPosition!==null){
    this.config.resetScrollPosition = this.oResetScrollPosition
}
if(this.oSearchChoices!==undefined && this.oSearchChoices!==null){
    this.config.searchChoices = this.oSearchChoices
}
if(this.oSearchEnabled!==undefined && this.oSearchEnabled!==null){
    this.config.searchEnabled = this.oSearchEnabled
}
if(this.oSearchFields!==undefined && this.oSearchFields!==null){
    this.config.searchFields = this.oSearchFields
}
if(this.oSearchFloor!==undefined && this.oSearchFloor!==null){
    this.config.searchFloor = this.oSearchFloor
}
if(this.oSearchPlaceholderValue!==undefined && this.oSearchPlaceholderValue!==null){
    this.config.searchPlaceholderValue = this.oSearchPlaceholderValue
}
if(this.oSearchResultLimit!==undefined && this.oSearchResultLimit!==null){
    this.config.searchResultLimit = this.oSearchResultLimit
}
if(this.oShouldSort!==undefined && this.oShouldSort!==null){
    this.config.shouldSort = this.oShouldSort
}
if(this.oShouldSortItems!==undefined && this.oShouldSortItems!==null){
    this.config.shouldSortItems = this.oShouldSortItems
}
if(this.oSilent!==undefined && this.oSilent!==null){
    this.config.silent = this.oSilent
}
if(this.oUniqueItemText!==undefined && this.oUniqueItemText!==null){
    this.config.uniqueItemText = this.oUniqueItemText
}
if(this.oValueComparer!==undefined && this.oValueComparer!==null){
    this.config.valueComparer = this.oValueComparer
}
}
//--- END GENERATED CODE ---
}