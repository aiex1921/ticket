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
  host: {'(document:keyup)': 'initKeyUp($event)'},
  exportAs: 'blocksStyle'
})
export class BlocksStyleDirective implements OnInit, AfterViewInit, OnChanges{
  @Input() selector:string;
  @Input() initFirst:boolean = false;

  @Output() renderComplete = new EventEmitter();

  private items: HTMLElement[];
  private index: number = 4;
  public $event: KeyboardEvent;
  activeElementIndex: number = this.index;



  constructor(private el: ElementRef) {}

  ngOnInit(): void {}


  ngAfterViewInit(){
    if (this.selector){
      this.items = this.el.nativeElement.querySelectorAll(this.selector);
      if (this.initFirst){
        if (this.items[0]){
          (this.items[0] as HTMLElement).setAttribute('style', 'border: 2px solid red');
        }
      }
    }
    setTimeout(() => {
      this.renderComplete.emit(true);
    })
  }

  ngOnChanges(data: SimpleChanges) {}

  initKeyUp(ev:KeyboardEvent): void{
    console.log('ev',ev);
    console.log(this.items.length-1);
    if((ev.key === 'ArrowRight' && this.index !== this.items.length-1) || (ev.key === 'ArrowLeft'  && this.index !== 0)){
      (this.items[this.index] as HTMLElement).removeAttribute('style');
    }

     if (ev.key === 'ArrowRight' && this.index < this.items.length - 1){
        this.index++;
        if (this.index <= this.items.length-1){
          (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red' );
        }
      } else if (ev.key === 'ArrowLeft' && this.index > 0){
        this.index--;
        if (this.index >= 0) {
          (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
        }
      }
    this.activeElementIndex = this.index;
    console.log(this.index);
  }

  initStyle(index:number){
    if (this.items[index]){
      (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
    }
  }
}

