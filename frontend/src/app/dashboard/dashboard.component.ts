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
    carregando: boolean = false;
    filtroSelecionado: 'hoje' | 'semana' | 'mes' | null = null;
    mostrarModal: boolean = false;

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
        this.carregando = true;
        this.eventoService.listarEventos().subscribe(eventos => {
            this.eventos = eventos;
            this.filtroSelecionado = null;
            this.carregando = false;
        });
    }

    aplicarFiltroTexto(): void {
        const texto = this.filtroForm.get('texto')?.value;
        if (texto?.trim()) {
            this.carregando = true;
            this.eventoService.filtrarEventosPorTexto(texto).subscribe(res => {
                this.eventos = res;
                this.filtroSelecionado = null;
                this.carregando = false;
            });
        } else {
            this.carregarEventos();
        }
    }

    aplicarFiltroData(): void {
        const data = this.filtroForm.get('data')?.value;
        if (data) {
            this.carregando = true;
            this.eventoService.filtrarEventosPorData(data).subscribe(res => {
                this.eventos = res;
                this.filtroSelecionado = null;
                this.carregando = false;
            });
        }
    }

    filtrarHoje(): void {
        this.carregando = true;
        this.eventoService.eventosDoDia().subscribe(res => {
            this.eventos = res;
            this.filtroSelecionado = 'hoje';
            this.carregando = false;
        });
    }

    filtrarSemana(): void {
        this.carregando = true;
        this.eventoService.eventosDaSemana().subscribe(res => {
            this.eventos = res;
            this.filtroSelecionado = 'semana';
            this.carregando = false;
        });
    }

    filtrarMes(): void {
        this.carregando = true;
        this.eventoService.eventosDoMes().subscribe(res => {
            this.eventos = res;
            this.filtroSelecionado = 'mes';
            this.carregando = false;
        });
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
        if (confirm('Tem certeza que deseja excluir este evento?')) {
            this.eventoService.removerEvento(id).subscribe(() => this.carregarEventos());
        }
    }

    criarNovoEvento(): void {
        this.router.navigate(['/evento/novo']);
    }
}
