import {
  Directive,
  Output,
  Input,
  EventEmitter,
  HostBinding,
  HostListener,
  ElementRef,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  @HostBinding('class.fileover') fileOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();
  @Output() wrongFileDropped = new EventEmitter<string>();


  constructor(private elementRef: ElementRef, private renderer: Renderer2){}

  // Dragover listener
  @HostListener('dragover', ['$event'])
  public onDragOver(event: any): void {
    //console.log(event);
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event:any) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
  }

  // Drop listener
  @HostListener('drop',  ['$event'])
  public ondrop(event:any) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
    let files = event.dataTransfer.files;

    // console.log(files);
    if (files.length > 0) {
      let file = files[0];
      if(file.name.endsWith("pdf")){
        this.renderer.setStyle(this.elementRef.nativeElement, 'border', "dashed 1px blue");
        this.fileDropped.emit(file);
      }else{

        this.renderer.setStyle(this.elementRef.nativeElement, 'border', "dashed 1px red");
        this.wrongFileDropped.emit("Wrong File Type. Please select or drop PDF only")
      }
    }
  }
}
