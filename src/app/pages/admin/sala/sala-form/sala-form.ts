import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SalaService } from '../../../../core/services/sala.service';

@Component({
  selector: 'app-sala-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sala-form.html',
  styleUrls: ['./sala-form.css']
})
export class SalaFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly salaService = inject(SalaService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  formSala: FormGroup = this.fb.group({
    id: [null],
    nome: ['', [Validators.required]],
    preco: [null, [Validators.required, Validators.min(0)]]
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      const id = Number(idParam);
      this.salaService.buscarPorId(id).subscribe({
        next: (sala) => this.formSala.patchValue(sala),
        error: (err) => console.error('Erro ao buscar sala por id:', err)
      });
    }
  }

  save(): void {
    if (this.formSala.valid) {
      this.salaService.salvar(this.formSala.value).subscribe({
        next: () => {
          this.router.navigate(['/salas']);
        },
        error: (err) => console.error('Erro ao salvar sala:', err)
      });
    }
  }
}