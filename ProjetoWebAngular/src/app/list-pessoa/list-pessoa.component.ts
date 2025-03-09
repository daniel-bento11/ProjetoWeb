import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Pessoa } from '../models/pessoa';
import { catchError, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PessoaList } from '../models/pessoaList';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-pessoa',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './list-pessoa.component.html',
  styleUrl: './list-pessoa.component.scss'
})
export class ListPessoaComponent implements OnInit {

  http = inject(HttpClient);
  urlApi = 'https://localhost:7185';


  pessoas$?: Observable<PessoaList[]>;

  pessoaEncontrada$?: Observable<Pessoa>;
  pesquisar = "";

  ngOnInit(): void {
    this.obterPessoas();
  }

  obterPessoas() {
    this.pessoas$ = this.http.get<PessoaList[]>(`${this.urlApi}/pessoas`).pipe(
      catchError((error) => {
        console.error('Erro ao obter pessoas:', error);
        alert('Erro ao carregar as pessoas. Tente novamente mais tarde.');
        return of([]);
      })
    );
  }

  pesquisarPessoas() {
    if (this.pesquisar === '') {
      this.obterPessoas();
    } else {
      this.pessoas$ = this.http.get<PessoaList[]>(`${this.urlApi}/pessoas/${this.pesquisar}`).pipe(
        catchError((error) => {
          console.error('Erro ao pesquisar pessoas:', error);
          alert('Erro ao pesquisar pessoas. Tente novamente mais tarde.');
          return of([]);
        })
      );
    }
  }

  confirmarExclusao(pessoaId: number) {
    const confirmacao = window.confirm('Você tem certeza que deseja excluir esta pessoa?');
    if (confirmacao) {
      this.excluirPessoa(pessoaId);
    }
  }

  excluirPessoa(pessoaId: number) {
    this.http.delete(`${this.urlApi}/pessoas/${pessoaId}`).subscribe({
      next: () => {
        alert('Pessoa excluída com sucesso!');
        this.obterPessoas();
      },
      error: (err) => {
        console.error('Erro ao excluir a pessoa:', err);
        alert('Erro ao excluir a pessoa!');
      }
    });
  }


}
