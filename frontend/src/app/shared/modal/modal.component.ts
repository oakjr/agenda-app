import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() titulo = '';
  @Input() mensagem = '';
  @Input() visivel = false;
  @Output() fechar = new EventEmitter<void>();

  onClose() {
    this.fechar.emit();
  }
}
