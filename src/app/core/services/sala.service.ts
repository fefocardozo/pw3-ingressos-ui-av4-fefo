import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sala } from '../models/sala';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = 'http://172.16.48.4:8080/salas';

  // Lista todas as salas ativas
  listar(): Observable<Sala[]> {
    return this.http.get<Sala[]>(this.API_URL);
  }

  // Busca uma sala por ID
  buscarPorId(id: number): Observable<Sala> {
    return this.http.get<Sala>(`${this.API_URL}/${id}`);
  }

  // Salva a sala: se já tiver id faz PUT, senão faz POST
  salvar(sala: Partial<Sala>): Observable<Sala> {
    if (sala.id) {
      return this.http.put<Sala>(`${this.API_URL}/${sala.id}`, sala);
    }
    return this.http.post<Sala>(this.API_URL, sala);
  }

  // Inativa/remove uma sala pelo ID
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}