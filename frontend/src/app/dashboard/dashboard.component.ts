import { Component, OnInit } from '@angular/core';
import { EventoService, Evento } from '../services/evento.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    eventos: Evento[] = [];
    filtroForm: FormGroup;

    constructor(private eventoService: EventoService, private fb: FormBuilder, private router: Router) {
        this.filtroForm = this.fb.group({
            texto: [''],
            data: ['']
        });
    }

    ngOnInit(): void {
        this.carregarEventos();
    }

    carregarEventos(): void {
        this.eventoService.listarEventos().subscribe(eventos => this.eventos = eventos);
    }

    aplicarFiltroTexto(): void {
        const texto = this.filtroForm.get('texto')?.value;
        if (texto?.trim()) {
            this.eventoService.filtrarEventosPorTexto(texto).subscribe(res => this.eventos = res);
        } else {
            this.carregarEventos();
        }
    }

    aplicarFiltroData(): void {
        const data = this.filtroForm.get('data')?.value;
        if (data) {
            this.eventoService.filtrarEventosPorData(data).subscribe(res => this.eventos = res);
        }
    }

    filtrarHoje(): void {
        this.eventoService.eventosDoDia().subscribe(res => this.eventos = res);
    }

    filtrarSemana(): void {
        this.eventoService.eventosDaSemana().subscribe(res => this.eventos = res);
    }

    filtrarMes(): void {
        this.eventoService.eventosDoMes().subscribe(res => this.eventos = res);
    }

    toggleStatus(evento: Evento): void {
        const novoStatus = !evento.ativo;
        this.eventoService.alterarStatus(evento.id, novoStatus).subscribe(res => {
            evento.ativo = res.ativo;
        });
    }

    editarEvento(id: number): void {
        this.router.navigate([`/evento/${id}/editar`]);
    }

    removerEvento(id: number): void {
        this.eventoService.removerEvento(id).subscribe(() => this.carregarEventos());
    }

    criarNovoEvento(): void {
        this.router.navigate(['/evento/novo']);
    }
}
