import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SalaService } from '../../../../core/services/sala.service';
import { Sala } from '../../../../core/models/sala';
import { ContainerComponent } from '../../../../shared/components/container/container';

@Component({
  selector: 'app-sala-lista',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    ContainerComponent
  ],
  templateUrl: './sala-lista.html',
  styleUrl: './sala-lista.css'
})
export class SalaListaComponent implements OnInit {
  private readonly salaService = inject(SalaService);
  private readonly router = inject(Router);

  salas$!: Observable<Sala[]>;

  ngOnInit(): void {
    this.carregarSalas();
  }

  carregarSalas(): void {
    this.salas$ = this.salaService.listar();
  }

  editar(id: number): void {
    this.router.navigate(['/salas', id, 'editar']);
  }

  excluir(id: number): void {
    if (confirm('Deseja realmente excluir esta sala?')) {
      this.salaService.excluir(id).subscribe({
        next: () => this.carregarSalas(),
        error: (err) => console.error('Erro ao excluir sala:', err)
      });
    }
  }
}