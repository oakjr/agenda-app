import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Evento {
    id?: number;
    nome: string;
    descricao: string;
    data: string;
    local: string;
    tipo: 'Exclusivo' | 'Compartilhado';
    ativo?: boolean;
    participantesIds: number[];
}

@Injectable({
    providedIn: 'root'
})
export class EventoService {
    private readonly API = 'http://localhost:5000/api/eventos';

    constructor(private http: HttpClient) { }

    criarEvento(evento: Evento): Observable<any> {
        return this.http.post(this.API, evento);
    }

    listarEventos(): Observable<Evento[]> {
        return this.http.get<Evento[]>(this.API);
    }

    editarEvento(id: number, evento: Evento): Observable<any> {
        return this.http.put(`${this.API}/${id}`, evento);
    }

    deletarEvento(id: number): Observable<any> {
        return this.http.delete(`${this.API}/${id}`);
    }

    filtrarEventosPorTexto(texto: string): Observable<Evento[]> {
        return this.http.get<Evento[]>(`${this.API}?search=${texto}`);
    }

    filtrarEventosPorData(data: string): Observable<Evento[]> {
        return this.http.get<Evento[]>(`${this.API}?data=${data}`);
    }

    eventosDoDia(): Observable<Evento[]> {
        return this.http.get<Evento[]>(`${this.API}/hoje`);
    }

    eventosDaSemana(): Observable<Evento[]> {
        return this.http.get<Evento[]>(`${this.API}/semana`);
    }

    eventosDoMes(): Observable<Evento[]> {
        return this.http.get<Evento[]>(`${this.API}/mes`);
    }
}
