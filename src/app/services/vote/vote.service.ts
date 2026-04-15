// services/vote.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VoteData {
  nombreCompleto: string;
  documento: string;      // Cambiado de 'cedula' a 'documento' para coincidir con el HTML
  edad: number;           // Agregado
  municipio: string;      // Agregado
  telefono: string;
  correo: string;
  selectedOption: number;
  optionName: string;
  bestFlavor: string;
  bestAtention: string;
  bestPackaging: string;
}

export interface VoteResponse {
  message: string;
  vote: any;
}

export interface StatisticsResponse {
  totalVotes: number;
  results: Array<{
    option: number;
    optionName: string;
    votes: number;
    percentage: string;
  }>;
  winner: any;
  lastUpdated: Date;
}

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  private apiUrl = 'https://api.crunchy-munch.com/api/vote2026';

  constructor(private http: HttpClient) {}

  // Crear un nuevo voto
  createVote(voteData: VoteData): Observable<VoteResponse> {
    return this.http.post<VoteResponse>(`${this.apiUrl}/create`, voteData);
  }

  // Verificar si un documento ya ha votado
  checkVote(documento: string): Observable<{documento: string, hasVoted: boolean}> {
    return this.http.get<{documento: string, hasVoted: boolean}>(`${this.apiUrl}/check/${documento}`);
  }

  // Verificar si un correo ya ha votado
  checkVoteByEmail(correo: string): Observable<{correo: string, hasVoted: boolean}> {
    return this.http.get<{correo: string, hasVoted: boolean}>(`${this.apiUrl}/check-email`, {
      params: { correo }
    });
  }

  // Obtener estadísticas
  getStatistics(): Observable<StatisticsResponse> {
    return this.http.get<StatisticsResponse>(`${this.apiUrl}/statistics`);
  }

  // Obtener todos los votos (admin)
  getAllVotes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
}