import { Directive,
   ElementRef, 
   Renderer2,
   HostListener} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef,
    private renderer: Renderer2) {}
    /**
   * Implementa evento de mouseenter para o elemento da diretiva.
   * 
   */
@HostListener('mouseenter') onmouseenter() {
        //adiciona uma classe que dá destaque ao alemento onde o mause passou
        this.renderer.addClass(this.el.nativeElement, 'highlight');
      }
      /**
       * Implementa evento de mouseleave para o elemento da diretiva.
       *
       */
@HostListener('mouseleave') onmouseleave() {
  //remove a classe de destaque quando o mouse sair de sobre o elemento.
        this.renderer.removeClass(this.el.nativeElement, 'highlight');

      }
     
    
    }

