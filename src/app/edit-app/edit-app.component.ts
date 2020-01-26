import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { DndDropEvent, DropEffect } from "ngx-drag-drop";
import { field, value } from "../global.model";
import { ActivatedRoute } from "@angular/router";
import swal from "sweetalert2";
import { ServiceService } from "../service/service.service";
import { HttpClient } from "@angular/common/http";
import { AccordionConfig } from "ngx-bootstrap/accordion";
import { NgForm } from "@angular/forms";
import { TabDirective } from "ngx-bootstrap/tabs";
import { daLocale } from "ngx-bootstrap/chronos/i18n/da";
import { OwlFormFieldModule, OwlInputModule } from "owl-ng";
import {
  MatTabChangeEvent,
  MatTableDataSource,
  MatPaginator,
  MatSort
} from "@angular/material";
import { Guid } from "../shared/classes/_guid/guid";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
declare var $: any;
declare var moment: any;

export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), { closeOthers: true });
}

@Component({
  selector: "app-edit-app",
  templateUrl: "./edit-app.component.html",
  styleUrls: ["./edit-app.component.css"],
  providers: [{ provide: AccordionConfig, useFactory: getAccordionConfig }]
})
export class EditAppComponent implements OnInit, AfterViewInit {
  // #region Manage Tabs and Occordions
  modelId = Guid.newGuid();
  headerClicked;
  tabHeaderValue;
  selectedTabIndex = 0;
  selectedTabId = 1;
  occordionHeaderValue;

  // #endregion Manage Tabs and Occordions

  // #region DataTable

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columns: Array<any> = [];
  displayedColumns: string[];

  positions: any[] = [];
  dataSource: MatTableDataSource<any>;
  isEmpty = true;
  columnsNumber = 2;
  // #endregion DataTable

  // #region
  value: value = {
    label: "",
    value: ""
  };
  success = false;

  fieldModels: Array<field> = [
    {
      type: "h1",
      icon: "fa fa-header",
      label: "H1",
      placeholder: "Heading 1",
      parent: "",
      relatedTo: "",
      category: "headings",
      material: "false"
    },
    {
      type: "h2",
      icon: "fa fa-header",
      label: "H2",
      placeholder: "Heading 2",
      parent: "",
      relatedTo: "",
      category: "headings",
      material: "false"
    },
    {
      type: "h3",
      icon: "fa fa-header",
      label: "H3",
      placeholder: "Heading 3",
      parent: "",
      relatedTo: "",
      category: "headings",
      material: "false"
    },
    {
      type: "h4",
      icon: "fa fa-header",
      label: "H4",
      placeholder: "Heading 4",
      parent: "",
      relatedTo: "",
      category: "headings",
      material: "false"
    },
    {
      type: "h5",
      icon: "fa fa-header",
      label: "H5",
      placeholder: "Heading 5",
      parent: "",
      relatedTo: "",
      category: "headings",
      material: "false"
    },
    {
      type: "h6",
      icon: "fa fa-header",
      label: "H6",
      placeholder: "Heading 6",
      parent: "",
      relatedTo: "",
      category: "headings",
      material: "false"
    },
    {
      type: "hr",
      icon: "fa fa-window-minimize",
      label: "Hr",
      subtype: "hr",
      handle: true,
      parent: "",
      relatedTo: "",
      category: "tag",
      material: "false"
    },
    {
      type: "paragraph",
      icon: "fa-paragraph",
      label: "Paragraph",
      placeholder: "Paragraph",
      parent: "",
      relatedTo: "",
      category: "typography",
      material: "false"
    },
    {
      type: "pre",
      icon: "fa fa-outdent",
      label: "pre",
      placeholder: "pre",
      parent: "",
      relatedTo: "",
      category: "typography",
      material: "false"
    },
    {
      type: "quote",
      icon: "fa fa-quote-left",
      label: "Quote",
      placeholder: "Quote",
      parent: "",
      relatedTo: "",
      category: "typography",
      material: "false"
    },
    {
      type: "bQuote",
      icon: "fa fa-quote-right",
      label: "Block Quote",
      placeholder: "block quote",
      parent: "",
      relatedTo: "",
      category: "typography",
      material: "false"
    },
    {
      type: "span",
      icon: "fa-font",
      label: "Span",
      placeholder: "Span",
      parent: "",
      relatedTo: "",
      category: "regular-controls",
      material: "false"
    },
    {
      type: "text",
      icon: "fa fa-text-width",
      label: "Text",
      description: "Enter your name",
      placeholder: "Enter your name",
      className: "form-control",
      subtype: "text",
      regex: "",
      handle: true,
      parent: "",
      relatedTo: "",
      category: "regular-controls",
      material: "false"
    },
    {
      type: "textarea",
      icon: "fa fa-text-height",
      label: "Textarea",
      parent: "",
      relatedTo: "",
      category: "regular-controls",
      material: "false"
    },
    {
      type: "email",
      icon: "fa-envelope",
      required: true,
      label: "Email",
      description: "Enter your email",
      placeholder: "Enter your email",
      className: "form-control",
      subtype: "text",
      regex: "^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+).([a-zA-Z]{2,5})$",
      errorText: "Please enter a valid email",
      handle: true,
      parent: "",
      relatedTo: "",
      category: "regular-controls",
      material: "false"
    },
    {
      type: "phone",
      icon: "fa-phone",
      label: "Phone",
      description: "Enter your phone",
      placeholder: "Enter your phone",
      className: "form-control",
      subtype: "text",
      regex: "^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$",
      errorText: "Please enter a valid phone number",
      handle: true,
      parent: "",
      relatedTo: "",
      category: "regular-controls",
      material: "false"
    },
    {
      type: "number",
      label: "Number",
      icon: "fa-html5",
      description: "Age",
      placeholder: "Enter your age",
      className: "form-control",
      value: "0",
      min: 0,
      max: 100,
      parent: "",
      relatedTo: "",
      category: "regular-controls",
      material: "false"
    },
    {
      type: "date",
      icon: "fa-calendar",
      label: "Date",
      placeholder: "Date",
      className: "form-control",
      parent: "",
      relatedTo: "",
      category: "regular-controls",
      material: "false"
    },
    {
      type: "datetime-range",
      icon: "fa fa-calendar-check-o",
      label: "DateTime Range",
      placeholder: "Date Time",
      className: "form-control",
      parent: "",
      relatedTo: "",
      category: "regular-controls",
      material: "false"
    },
    {
      type: "checkbox",
      required: true,
      label: "Checkbox",
      icon: "fa-list",
      description: "Checkbox",
      inline: true,
      values: [
        {
          label: "Option 1",
          value: "option-1"
        },
        {
          label: "Option 2",
          value: "option-2"
        }
      ],
      parent: "",
      relatedTo: "",
      category: "regular-controls",
      material: "false"
    },
    {
      type: "radio",
      icon: "fa-list-ul",
      label: "Radio",
      description: "Radio boxes",
      values: [
        {
          label: "Option 1",
          value: "option-1"
        },
        {
          label: "Option 2",
          value: "option-2"
        }
      ],
      parent: "",
      relatedTo: "",
      category: "regular-controls",
      material: "false"
    },
    {
      type: "autocomplete",
      icon: "fa-bars",
      label: "Select",
      description: "Select",
      placeholder: "Select",
      className: "form-control",
      values: [
        {
          label: "Option 1",
          value: "option-1"
        },
        {
          label: "Option 2",
          value: "option-2"
        },
        {
          label: "Option 3",
          value: "option-3"
        }
      ],
      parent: "",
      relatedTo: "",
      category: "regular-controls",
      material: "false"
    },
    {
      type: "file",
      icon: "fa-file",
      label: "File Upload",
      className: "form-control",
      subtype: "file",
      parent: "",
      relatedTo: "",
      category: "regular-controls",
      material: "false"
    },
    {
      type: "button",
      icon: "fa-paper-plane",
      subtype: "submit",
      label: "Submit",
      className: "btn",
      parent: "",
      relatedTo: "",
      category: "regular-controls",
      material: "false"
    },
    {
      type: "button-with-reset",
      icon: "fa fa-rocket",
      subtype: "submit",
      nestedType: "reset",
      label: "Submit",
      sublabel: "Clear",
      className: "btn",
      parent: "",
      relatedTo: "",
      category: "regular-controls",
      material: "false"
    },
    {
      type: "text-material",
      icon: "fa fa-text-width",
      label: "Text",
      description: "Enter your name",
      placeholder: "Enter your name",
      className: "form-control",
      subtype: "text",
      regex: "",
      handle: true,
      parent: "",
      relatedTo: "",
      category: "angular-material",
      material: "true",
      hideRequiredMarker: "true",
      appearance: "legacy",
      hintLabel: "",
      errorText: ""
    },
    {
      type: "text-length-material",
      icon: "fa fa-lock",
      label: "Text - Max",
      description: "Enter your name",
      placeholder: "Enter your name",
      className: "form-control",
      subtype: "text",
      regex: "",
      handle: true,
      parent: "",
      relatedTo: "",
      category: "angular-material",
      material: "true",
      hideRequiredMarker: "true",
      appearance: "",
      hintLabel: "",
      errorText: "",
      maxLength: "10"
    },

    {
      type: "clearable-material",
      icon: "fa fa-window-close-o",
      label: "Text - Clear",
      description: "Clearable",
      placeholder: "Clear",
      className: "form-control",
      subtype: "text",
      regex: "",
      handle: true,
      parent: "",
      relatedTo: "",
      category: "angular-material",
      material: "true",
      hideRequiredMarker: "true",
      appearance: "legacy",
      hintLabel: "",
      errorText: "",
      divider: true
    },
    {
      type: "textarea-material",
      icon: "fa fa-text-height",
      label: "Textarea",
      description: "Enter your name",
      placeholder: "Enter your name",
      className: "form-control",
      subtype: "text",
      regex: "",
      handle: true,
      parent: "",
      relatedTo: "",
      category: "angular-material",
      material: "true",
      hideRequiredMarker: "true",
      appearance: "legacy",
      hintLabel: "",
      errorText: ""
    },
    {
      type: "textarea-length-material",
      icon: "fa fa-lock",
      label: "Textarea - Max",
      description: "Enter your name",
      placeholder: "Enter your name",
      className: "form-control",
      subtype: "text",
      regex: "",
      handle: true,
      parent: "",
      relatedTo: "",
      category: "angular-material",
      material: "true",
      hideRequiredMarker: "true",
      appearance: "legacy",
      hintLabel: "",
      errorText: "",
      maxLength: "10",
      divider: true
    },
    {
      type: "email-material",
      icon: "fa-envelope",
      required: "",
      label: "Email",
      description: "Enter your email",
      placeholder: "Enter your email",
      className: "form-control",
      subtype: "text",
      regex: "^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+).([a-zA-Z]{2,5})$",
      errorText: "Please enter a valid email",
      handle: true,
      parent: "",
      relatedTo: "",
      category: "angular-material",
      material: "true",
      hideRequiredMarker: "true",
      appearance: "legacy",
      hintLabel: ""
    },
    {
      type: "phone-material",
      icon: "fa-phone",
      label: "Phone",
      description: "Enter your name",
      placeholder: "Enter your name",
      className: "form-control",
      subtype: "text",
      regex: "",
      handle: true,
      parent: "",
      relatedTo: "",
      category: "angular-material",
      material: "true",
      hideRequiredMarker: "true",
      appearance: "legacy",
      hintLabel: "",
      errorText: ""
    },
    {
      type: "number-material",
      icon: "fa-html5",
      label: "Number",
      description: "Enter your name",
      placeholder: "Enter your name",
      className: "form-control",
      subtype: "text",
      regex: "",
      handle: true,
      parent: "",
      relatedTo: "",
      category: "angular-material",
      material: "true",
      hideRequiredMarker: "true",
      appearance: "legacy",
      hintLabel: "",
      errorText: "",
      value: "20",
      min: 12,
      max: 90
    },
    {
      type: "basic-datepicker-material",
      icon: "fa fa-calendar",
      label: "Basic ",
      description: "Choose a date",
      placeholder: "Choose a date",
      className: "form-control",
      subtype: "text",
      regex: "",
      handle: true,
      parent: "",
      relatedTo: "",
      category: "angular-material-datepicker",
      material: "true",
      hideRequiredMarker: "true",
      errorText: ""
    },
    {
      type: "start-date-datepicker-material",
      icon: "fa fa-calendar-check-o",
      label: "Start date ",
      description: "Choose a date",
      placeholder: "Choose a date",
      className: "form-control",
      subtype: "text",
      regex: "",
      handle: true,
      parent: "",
      relatedTo: "",
      category: "angular-material-datepicker",
      material: "true",
      errorText: ""
    },
    {
      type: "min-max-validation-datepicker-material",
      icon: "fa fa-maxcdn",
      label: "Min & Max validation",
      description: "Choose a date",
      placeholder: "Choose a date",
      className: "form-control",
      subtype: "text",
      regex: "",
      handle: true,
      parent: "",
      relatedTo: "",
      category: "angular-material-datepicker",
      material: "true",
      errorText: "",
      minDate: new Date(),
      maxDate: new Date()
    },
    {
      type: "touch-ui-date-datepicker-material",
      icon: "fa fa-hand-pointer-o",
      label: "Touch UI",
      description: "Choose a date",
      placeholder: "Choose a date",
      className: "form-control",
      subtype: "text",
      regex: "",
      handle: true,
      parent: "",
      relatedTo: "",
      category: "angular-material-datepicker",
      material: "true",
      errorText: ""
    },
    {
      type: "open-method-date-datepicker-material",
      icon: "fa fa-fire",
      label: "Open",
      description: "Choose a date",
      placeholder: "Choose a date",
      className: "form-control",
      subtype: "text",
      regex: "",
      handle: true,
      parent: "",
      relatedTo: "",
      category: "angular-material-datepicker",
      material: "true",
      errorText: ""
    },
    {
      type: "datatable-material",
      icon: "fa fa-table",
      label: "Data Table",
      values: [
        {
          label: "Option 1",
          value: "option-1"
        },
        {
          label: "Option 2",
          value: "option-2"
        }
      ],
      parent: "",
      relatedTo: "",
      category: "angular-material-datatable",
      material: "true"
    }
  ];

  model: any = {
    id: this.modelId,
    name: "App name...",
    description: "App Description...",
    theme: {
      modelId: this.modelId,
      bgColor: "ffffff",
      textColor: "555555",
      bannerImage: ""
    },
    tabs: [
      {
        id: 1,
        header: "Tab 1",
        modelId: this.modelId,
        accordions: [
          {
            id: 1,
            header: "header 1",
            parentId: 1,
            fields: Array<field>(),
            modelId: this.modelId
          }
        ]
      }
    ]
  };

  report = false;

  reports: any = [];

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private http: HttpClient
  ) {}

  clickHeader(id: any) {
    this.headerClicked = id;
  }

  addHeader() {
    this.model.tabs[this.selectedTabIndex].accordions.push({
      id: this.model.tabs[this.selectedTabIndex].accordions.length + 1,
      header: "header ".concat(
        this.model.tabs[this.selectedTabIndex].accordions.length + 1
      ),
      parentId: this.modelId,
      fields: Array<field>()
    });
  }

  editHeader() {
    this.model.tabs[this.selectedTabIndex].accordions[
      this.headerClicked
    ].header = this.occordionHeaderValue;
  }

  selectedTab(selected: MatTabChangeEvent) {
    this.selectedTabIndex = selected.index;
  }
  addTab() {
    this.model.tabs.push({
      id: this.model.tabs.length + 1,
      header: "Tab ".concat(this.model.tabs.length + 1),
      accordions: [
        {
          id: 1,
          header: "header 1",
          parentId: this.modelId,
          fields: Array<field>()
        }
      ]
    });
  }

  editTab() {
    this.model.tabs[this.selectedTabIndex].header = this.tabHeaderValue;
  }

  // #region DataTable
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  returnColumns(item: any) {
    if (this.columnsNumber <= item.values.length) {
      this.columns = [];
      item.values.map(
        function(element) {
          this.columns.push(element);
        }.bind(this)
      );
      this.displayedColumns = this.columns.map(column => column.value);
      this.columnsNumber = item.values.length + 1;
    }
    return this.columns;
  }

  //#endregion DataTable

  ngOnInit() {
    // this.route.params.subscribe( params =>{
    //   console.log(params);
    //   this.us.getDataApi('/admin/getFormById',{id:params.id}).subscribe(r=>{
    //     console.log(r);
    //     this.model = r['data'];
    //   });
    // });
    // this.model = this.cs.data;
    // console.log(this.model.data);

    this.dataSource = new MatTableDataSource<any>(this.positions);
  }

  onDragStart(event: DragEvent) {
    console.log("drag started", JSON.stringify(event, null, 2));
  }

  onDragEnd(event: DragEvent) {
    console.log("drag ended", JSON.stringify(event, null, 2));
  }

  onDraggableCopied(event: DragEvent) {
    console.log("draggable copied", JSON.stringify(event, null, 2));
  }

  onDraggableLinked(event: DragEvent) {
    console.log("draggable linked", JSON.stringify(event, null, 2));
  }

  onDragged(item: any, list: any[], effect: DropEffect) {
    if (effect === "move") {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }

  onDragCanceled(event: DragEvent) {
    console.log("drag cancelled", JSON.stringify(event, null, 2));
  }

  onDragover(event: DragEvent) {
    console.log("dragover", JSON.stringify(event, null, 2));
  }

  onDrop(event: DndDropEvent, list?: any[]) {
    if (list && (event.dropEffect === "copy" || event.dropEffect === "move")) {
      if (event.dropEffect === "copy")
        event.data.name = event.data.type + "-" + new Date().getTime();
      let index = event.index;
      if (typeof index === "undefined") {
        index = list.length;
      }
      list.splice(index, 0, event.data);
    }
  }

  addValue(values) {
    debugger;
    values.push(this.value);
    this.value = { label: "", value: "" };
  }

  removeField(i: any, data: any) {
    debugger;
    swal({
      title: "Are you sure?",
      text: "Do you want to remove this field?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00B96F",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove!"
    }).then(result => {
      if (result.value) {
        debugger;
        this.model.tabs[this.selectedTabIndex].accordions.map(function(
          element
        ) {
          debugger;
          if (element.id == data.id) {
            element.fields.splice(i, 1);
          }
        });
      }
    });
  }

  updateForm() {
    debugger;
    let input = new FormData();
    input.append("id", this.model._id);
    input.append("name", this.model.name);
    input.append("description", this.model.description);
    input.append("bannerImage", this.model.theme.bannerImage);
    input.append("bgColor", this.model.theme.bgColor);
    input.append("textColor", this.model.theme.textColor);
    input.append("fields", JSON.stringify(this.model.fields));

    // this.us.putDataApi('/admin/updateForm',input).subscribe(r=>{
    //   console.log(r);
    //   swal('Success','App updated successfully','success');
    // });
  }

  toggleValue(item) {
    item.selected = !item.selected;
  }

  setMinDate(item: any) {
    item.minDate = new Date(item);
  }

  setMaxDate(item: any) {
    item.maxDate = new Date(item);
  }

  reset(playlistForm: NgForm) {
    playlistForm.resetForm();
  }
  submit(item: any) {
    debugger;
    let valid = true;
    let validationArray = JSON.parse(JSON.stringify(this.model.fields));
    validationArray.reverse().forEach(field => {
      console.log(field.label + "=>" + field.required + "=>" + field.value);
      if (field.required && !field.value && field.type != "checkbox") {
        swal("Error", "Please enter " + field.label, "error");
        valid = false;
        return false;
      }
      if (field.required && field.regex) {
        let regex = new RegExp(field.regex);
        if (regex.test(field.value) == false) {
          swal("Error", field.errorText, "error");
          valid = false;
          return false;
        }
      }
      if (field.required && field.type == "checkbox") {
        if (field.values.filter(r => r.selected).length == 0) {
          swal("Error", "Please enterrr " + field.label, "error");
          valid = false;
          return false;
        }
      }
    });
    if (!valid) {
      return false;
    }
    console.log("Save", this.model);

    let input = new FormData();
    input.append("fields", JSON.stringify(this.model.fields));

    // input.append("formId", this.model._id);
    // input.append("fields", JSON.stringify(this.model.fields));
    this.http.post("http://localhost:50952/weatherforecast", input).subscribe(
      r => {
        debugger;
        console.log(r);
        swal("Success", "You have contact sucessfully", "success");
        this.success = true;
      },
      error => {
        swal("Error", error.message, "error");
      }
    );
  }

  copy(item: any) {
    debugger;
    document.addEventListener("copy", (e: ClipboardEvent) => {
      e.clipboardData.setData("text/plain", JSON.stringify(item));
      e.preventDefault();
      document.removeEventListener("copy", null);
    });
    document.execCommand("copy");
  }
}
