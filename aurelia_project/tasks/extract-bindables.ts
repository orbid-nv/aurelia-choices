import * as gulp from "gulp";
import * as replace from "gulp-replace";
import * as typedoc from "gulp-typedoc";
import * as fs from "fs";
import * as hbsAll from "gulp-handlebars-all";
import * as hbHelpers from "handlebars-helpers";
import { FuseOptions } from 'fuse.js';
function readTs() {
	//instance.d.ts is de high-level ts file
	return gulp.src(["./temp/index.d.ts",]).pipe(
		typedoc({
			target: "es6",
			includeDeclarations: true,
			json: "./temp/choices.json",
			name: "choices-docs",
			mode: "modules",
			excludeExternals: true,
			version: true,
			includes: "./node_modules/fuse.js"
		} as typedoc.Options)
	);
}

function extractBindables() {
	var json = JSON.parse(fs.readFileSync("./temp/choices.json", "utf-8"));
	var jsObj = {};
	extractOptions(jsObj, json);

	//   var content = "export let bindables = " + JSON.stringify(jsObj);

	//   // write the js file to the file system
	//   fs.writeFile("./src/common/bindables.js", content, function(err) {
	//     if (err) {
	//       return console.log(err);
	//     }
	//   });
}
function convertType(type: any) {
	switch (type.type) {
		case "union":
			return type.types.map(x => x.name? x.name.replace("Choices.","Choicesns.") : x.value ?  '"' + x.value + '"' : "any").join("|");
			break;
		case "array":
			return type.elementType.name+"[]";
			break;
		case "reference":
		return type.name.indexOf(".") >-1 ? type.name.replace("Choices.","Choicesns."): "Choicesns."+type.name;
		break;
		default:
			return type.name;
			break;
	}
}
function extractOptions(jsObj, json) {
	var optionClasses = [];

	//all primitive properies, incl dates
	//var properties = json.children[0].children[1].type.types[2].declaration.children voor instance
	var listNotToMap = ["choices","fuseOptions"];
	var properties = json.children[0].children[0].children[6].children
		.filter(
			x =>
				(x.type.type === "intrinsic" || (x.type.type === "array" && x.type.elementType.type === "intrinsic") || x.type.type === "union" ||
					(x.type.type === "reference" )) &&
				!x.name.startsWith("_") && listNotToMap.indexOf(x.name)<0
		)
		.map(x => new FlProperty({ name: x.name, type: convertType(x.type) }));
    console.log(properties);
	gulp.src("./templates/choices.hbs")
		.pipe(
			hbsAll("html", {
				context: new FlConfig({ properties: properties }),

				partials: ["partials/*.hbs"],

				helpers: hbHelpers()
			})
		)
		.on("data", function(file) {
			gulp.src("./src/elements/or-choices.ts")
				.pipe(
					replace(
						/(?<=\/\/--- GENERATED CODE ---)[\s\S]*?(?=\/\/--- END GENERATED CODE ---)/,
						"\n" + file.contents.toString()
					)
				)
				.pipe(gulp.dest("./src/elements/"));
		});

	// get the kendo module
	// var kendoModule = kendo.children.find(function (i) { return i.name === "kendo" });
	// var jQueryInterface = kendo.children.find(function (i) { return i.name === "JQuery" && i.kindString === "Interface" });
	// var kendoMethods = jQueryInterface.children;

	// // loop over all kendo methods declarations:
	// // kendoAutoComplete(options: kendo.ui.AutoCompleteOptions): JQuery;
	// // kendoDraggable(options: kendo.ui.DraggableOptions): JQuery;
	// // and for each kendo method, find the id of the Options class (DraggableOptions, AutoCompleteOptions)
	// kendoMethods.forEach(function (method) {
	// 	if (method.name.startsWith('kendo')) {
	// 		var signatures = method.signatures;
	// 		signatures.forEach(function (signature) {
	// 			if (signature.parameters && signature.parameters.length > 0) {
	// 				optionClasses.push({
	// 					method: method.name, // kendoButton, kendoGrid
	// 					id: signature.parameters[0].type.id // id of the options class
	// 				});
	// 			}
	// 		});
	// 	}
	// });

	// // iterate over all modules and classes
	// // of every class matching an id we found above, add the properties to an array
	// kendoModule.children.forEach(function (module) {
	// 	// loop through all classes such as kendo.data.DataSource
	// 	iterativeOptionsLookup(module, optionClasses);
	// });

	// // sort a-z on method name (for readability)
	// optionClasses.sort(function (a, b) {
	// 	return (a.method > b.method) ? 1 : ((b.method > a.method) ? -1 : 0);
	// });

	// // create a flatter object so it can be easily read out by the plugin
	// optionClasses.forEach(function (optionClass) {
	// 	jsObj[optionClass.method] = optionClass.properties;
	// });
}

class FlConfig {
	public properties: FlProperty[];
	public constructor(init?: Partial<FlConfig>) {
		Object.assign(this, init);
	}
}

class FlProperty {
	public name: string;
	public type: string;
	public constructor(init?: Partial<FlProperty>) {
		Object.assign(this, init);
	}
}

export default gulp.series(readTs,extractBindables);
