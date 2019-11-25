export class App {
	public message: string = "from Aurelia!";
	public choices: any[] = [
		{
			value: "Option 11",
			label: "Option 111",
			label2: "Test 1"
		},
		{
			value: "Option 211",
			label: "Option 211111",
			label2: "Test 2",
			selected: false,
			disabled: false,
			customProperties: {
				description: "Custom description about Option 2",
				random: "Another random custom property"
			}
		},

		{
			value: "Option 4",
			label: "Option 4",
			label2: "Test 1",
			selected: false,
			disabled: false
		},
		{
			value: "Option 5",
			label: "Option 5",
			label2: "Test 1",
			selected: false,
			disabled: false
		},
		{
			value: "Option 5",
			label: "Option 5",
			label2: "Test 1",
			selected: false,
			disabled: false
		},
		{
			value: "ik ben tim",
			label: "Option 5111",
			label2: "Test 1",
			selected: false,
			disabled: false
		},
		{
			value: "Option 3",
			label: "Option 31",
			label2: "Test 1",
			selected: false,
			disabled: false
		}
	];
	public multiple = false;
	public selectedValue: string;
	public renderChoiceLimit: number;
	public maxItemCount: number;
	public removeItems: boolean = true;
	public duplicateItemsAllowed: boolean = true;
	public searchEnabled = true;
	public searchChoices = true;
	public searchFields = ["name", "alpha3Code"];
	public shouldSort = true;
	public itemSelectText;
	public cInstance;
	public choicesLabelName = "label";
	public choicesValueName = "value";
	public async search(event) {
		console.log(event);
		var result = await fetch(
			"https://restcountries.eu/rest/v2/name/" + event.detail.value
		);
		this.choices = await result.json();
	}

	public isRemoteSearch = false;
	public async toggleRemoteSearch() {
		this.searchChoices = false;
		this.isRemoteSearch = true;
		this.choicesLabelName = "name";
		this.choicesValueName = "alpha3Code";
		var result = await fetch("https://restcountries.eu/rest/v2/all");
		this.choices = await result.json();
	}
	public searchRemote(event) {}

	public sorter = function(a, b) {
		return b.label.length - a.label.length;
	};
	public valueComparer = function(a, b) {
		return a.length - b.length;
	};
	public callbackOnCreateTemplates = function(template) {
		return {
			item: (classNames, data) => {
				return template(`
          <div class="${classNames.item} ${
					data.highlighted
						? classNames.highlightedState
						: classNames.itemSelectable
				} ${
					data.placeholder ? classNames.placeholder : ""
				}" data-item data-id="${data.id}" data-value="${data.value}" ${
					data.active ? 'aria-selected="true"' : ""
				} ${data.disabled ? 'aria-disabled="true"' : ""}>
            <span>&bigstar;</span> ${data.label}
          </div>
        `);
			},
			choice: (classNames, data) => {
				return template(`
          <div class="${classNames.item} ${classNames.itemChoice} ${
					data.disabled
						? classNames.itemDisabled
						: classNames.itemSelectable
				}" data-select-text="${this.itemSelectText}" data-choice ${
					data.disabled
						? 'data-choice-disabled aria-disabled="true"'
						: "data-choice-selectable"
				} data-id="${data.id}" data-value="${data.value}" ${
					data.groupId > 0 ? 'role="treeitem"' : 'role="option"'
				}>
            <span>&bigstar;</span> ${data.label}
          </div>
        `);
			}
		};
	};

	public callbackOnInit() {
		console.log("test init");
	}
	public test(event) {
		console.log(event);
		console.log("dit is een test");
	}
	public classNames = {
		containerOuter: "choices",
		containerInner: "choices__inner test"
		// input: 'choices__input',
		// inputCloned: 'choices__input--cloned',
		// list: 'choices__list',
		// listItems: 'choices__list--multiple',
		// listSingle: 'choices__list--single',
		// listDropdown: 'choices__list--dropdown',
		// item: 'choices__item',
		// itemSelectable: 'choices__item--selectable',
		// itemDisabled: 'choices__item--disabled',
		// itemOption: 'choices__item--choice',
		// group: 'choices__group',
		// groupHeading : 'choices__heading',
		// button: 'choices__button',
		// activeState: 'is-active',
		// focusState: 'is-focused',
		// openState: 'is-open',
		// disabledState: 'is-disabled',
		// highlightedState: 'is-highlighted',
		// selectedState: 'is-selected',
		// flippedState: 'is-flipped',
	};
	public renderSelectedChoices = "auto";
	clicked() {
		// this.multiple = !this.multiple;
		this.cInstance.showDropdown();
		// eslint-disable-next-line no-alert
		// this.choices = [{
		//   value: 'Option 1',
		//   label: 'Option 1',
		//   label2: 'Test 1',
		//   selected: false,
		//   disabled: false,
		// },
		// {
		//   value: 'Option 2',
		//   label: 'Option 2',
		//   label2: 'Test 2',
		//   selected: false,
		//   disabled: false,
		//   customProperties: {
		//     description: 'Custom description about Option 2',
		//     random: 'Another random custom property'
		//   },
		// }];
	}
}
