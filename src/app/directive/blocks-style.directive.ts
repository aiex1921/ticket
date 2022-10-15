import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';


@Directive({
  selector: '[appBlocksStyle]',
  host: {'(document:keyup)': 'initKeyUp($event)'}
})
export class BlocksStyleDirective implements OnInit, AfterViewInit, OnChanges{
  @Input() selector:string;
  @Input() initFirst:boolean = false;

  @Output() renderComplete = new EventEmitter();

  private items: HTMLElement[];
  private index: number = 0;



  constructor(private el: ElementRef) { }

  ngOnInit(): void {
  }


  ngAfterViewInit(){
    console.log(1);
    if (this.selector){
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      if (this.initFirst){
        if (this.items[0]){
          (this.items[0] as HTMLElement).setAttribute('style', 'border: 2px solid red');
        }
      }
    }
    console.log(3);
  }



  ngOnChanges(data: SimpleChanges) {
  }

  initKeyUp(ev:KeyboardEvent): void{
    console.log('ev',ev);
    if(ev.key === 'ArrowRight' || ev.key === 'ArrowLeft'){
      (this.items[this.index] as HTMLElement).removeAttribute('style');
    }

      if (ev.key === 'ArrowRight'){
        this.index++;
        if (this.items[this.index]){
          (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red' );
        }
      } else if (ev.key === 'ArrowLeft'){
        this.index--;
        if (this.items[this.index]) {
          (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
        }
      }
  }


}

