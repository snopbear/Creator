import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import swal from "sweetalert2";
import { ActivatedRoute } from "@angular/router";
import { ServiceService } from "../service/service.service";
@Component({
  selector: "app-read-from-json",
  templateUrl: "./read-from-json.component.html",
  styleUrls: ["./read-from-json.component.css"]
})
export class ReadFromJsonComponent implements OnInit {
  model;
  success = false;
  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.serviceService.get().subscribe((response: any[]) => {
      this.model = response[1];
    });
  }

  submit(item: any) {
    // debugger;
    // let valid = true;
    // let validationArray = JSON.parse(JSON.stringify(this.model.tabs));
    // validationArray.reverse().forEach(field => {
    //   console.log(field.label + "=>" + field.required + "=>" + field.value);
    //   if (field.required && !field.value && field.type != "checkbox") {
    //     swal("Error", "Please enter " + field.label, "error");
    //     valid = false;
    //     return false;
    //   }
    //   if (field.required && field.regex) {
    //     let regex = new RegExp(field.regex);
    //     if (regex.test(field.value) == false) {
    //       swal("Error", field.errorText, "error");
    //       valid = false;
    //       return false;
    //     }
    //   }
    //   if (field.required && field.type == "checkbox") {
    //     if (field.values.filter(r => r.selected).length == 0) {
    //       swal("Error", "Please enterrr " + field.label, "error");
    //       valid = false;
    //       return false;
    //     }
    //   }
    // });
    // if (!valid) {
    //   return false;
    // }
    // console.log("Save", this.model);

    // let input = new FormData();
    // input.append("attributes", JSON.stringify(this.model.attributes));

    // // input.append("formId", this.model._id);
    // // input.append("attributes", JSON.stringify(this.model.attributes));
    // this.http.post("http://localhost:50952/weatherforecast", input).subscribe(
    //   r => {
    //     debugger;
    //     console.log(r);
    //     swal("Success", "You have contact sucessfully", "success");
    //     this.success = true;
    //   },
    //   error => {
    //     swal("Error", error.message, "error");
    //   }
    // );
  }
}
