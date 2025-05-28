import { Component, OnInit } from '@angular/core';
import { EventoService, Evento } from '../services/evento.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    eventos: Evento[] = [];
    filtroTexto = '';
    dataSelecionada: string = '';

    constructor(private eventoService: EventoService) { }

    ngOnInit(): void {
        this.carregarEventos();
    }

    carregarEventos(): void {
        this.eventoService.listarEventos().subscribe(eventos => this.eventos = eventos);
    }

    aplicarFiltroTexto(): void {
        if (this.filtroTexto.trim()) {
            this.eventoService.filtrarEventosPorTexto(this.filtroTexto).subscribe(res => this.eventos = res);
        } else {
            this.carregarEventos();
        }
    }

    aplicarFiltroData(): void {
        if (this.dataSelecionada) {
            this.eventoService.filtrarEventosPorData(this.dataSelecionada).subscribe(res => this.eventos = res);
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
}
