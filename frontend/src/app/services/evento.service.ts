import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Evento {
    id: number;
    nome: string;
    descricao: string;
    data: string;
    local: string;
    tipo: 'Exclusivo' | 'Compartilhado' | number;
    ativo: boolean;
    participantesIds: number[];
}

@Injectable({
    providedIn: 'root'
})
export class EventoService {
    private readonly api = 'http://localhost:5261/api/eventos';

    constructor(private http: HttpClient) { }

    listarEventos(): Observable<Evento[]> {
        return this.http.get<Evento[]>(this.api);
    }

    filtrarEventosPorTexto(texto: string): Observable<Evento[]> {
        return this.http.get<Evento[]>(`${this.api}?search=${texto}`);
    }

    filtrarEventosPorData(data: string): Observable<Evento[]> {
        return this.http.get<Evento[]>(`${this.api}?data=${data}`);
    }

    eventosDoDia(): Observable<Evento[]> {
        return this.http.get<Evento[]>(`${this.api}/hoje`);
    }

    eventosDaSemana(): Observable<Evento[]> {
        return this.http.get<Evento[]>(`${this.api}/semana`);
    }

    eventosDoMes(): Observable<Evento[]> {
        return this.http.get<Evento[]>(`${this.api}/mes`);
    }

    criarEvento(dto: Partial<Evento>): Observable<Evento> {
        return this.http.post<Evento>(this.api, dto);
    }

    editarEvento(id: number, dto: Partial<Evento>): Observable<Evento> {
        return this.http.put<Evento>(`${this.api}/${id}`, dto);
    }

    alterarStatus(id: number, ativo: boolean): Observable<Evento> {
        return this.http.patch<Evento>(`${this.api}/${id}/status?ativo=${ativo}`, {});
    }

    removerEvento(id: number): Observable<void> {
        return this.http.delete<void>(`${this.api}/${id}`);
    }
}
