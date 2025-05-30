import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventoService, Evento } from '../services/evento.service';

@Component({
  selector: 'app-evento-form',
  templateUrl: './evento-form.component.html',
  styleUrls: ['./evento-form.component.css']
})
export class EventoFormComponent implements OnInit {
  form: FormGroup;
  editando: boolean = false;
  eventoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventoService: EventoService
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      data: ['', Validators.required],
      local: [''],
      tipo: ['Exclusivo', Validators.required],
      participantesIds: [[]]
    });
  }

  ngOnInit(): void {
    this.eventoId = Number(this.route.snapshot.paramMap.get('id'));
    this.editando = !!this.eventoId;

    if (this.editando) {
      this.eventoService.listarEventos().subscribe(eventos => {
        const evento = eventos.find(e => e.id === this.eventoId);
        if (evento) {
          this.form.patchValue(evento);
        }
      });
    }
  }

  salvar(): void {
    if (this.form.invalid) return;

    const dto = this.form.value;

    if (this.editando && this.eventoId) {
      this.eventoService.editarEvento(this.eventoId, dto).subscribe(() => this.router.navigate(['/dashboard']));
    } else {
      this.eventoService.criarEvento(dto).subscribe(() => this.router.navigate(['/dashboard']));
    }
  }
}
