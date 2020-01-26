import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[BlockPaste]"
})
export class BlockPasteDirective {
  constructor() {}
  @HostListener("paste", ["$event"]) blockPaste(e: KeyboardEvent) {
    e.preventDefault();
  }
}
