import { CommonModule, formatCurrency } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormDebugComponent } from "../form-debug/form-debug.component";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa';
import { CampoControlErroComponent } from "../campo-control-erro/campo-control-erro.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-pessoa',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-pessoa.component.html',
  styleUrl: './edit-pessoa.component.scss'
})
export class EditPessoaComponet implements OnInit {

  formulario: FormGroup;
  idPessoa: number | undefined;
  nacionalidade: string | undefined;
  urlApi = 'https://localhost:7185';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      inativo: [false],
      nacionalidade: ['', Validators.required],
      rg: [''],
      passaporte: ['']
    });
  }

  ngOnInit(): void {
    this.idPessoa = Number(this.route.snapshot.paramMap.get('id')); // Supondo que o id esteja na URL
    this.carregarPessoa();
  }

  carregarPessoa(): void {
    this.http.get<Pessoa>(`${this.urlApi}/pessoas/pesquisa/${this.idPessoa}`).subscribe(
      pessoa => {
        this.formulario.patchValue({
          nome: pessoa.nome,
          dataNascimento: pessoa.dataNascimento,
          inativo: pessoa.inativo,
          nacionalidade: pessoa.nacionalidade,
          rg: pessoa.rg || '',
          passaporte: pessoa.passaporte || ''
        });
        this.nacionalidade = String(pessoa.nacionalidade);
      },
      error => {
        console.error('Erro ao carregar pessoa', error);
      }
    );
  }

  verificaValidTouched(campo:string){
    let control = this.formulario.get(campo);
    return !control?.valid && control?.touched;
  }

  aplicaCssErro(campo:string){
    let result: any;
    result = this.verificaValidTouched(campo);
    return {
      'is-invalid': result,
      'has-feedback': result
    };
  }

  

  onSubmit() {
    if (this.formulario.valid) {
      const confirmacao = confirm("Tem certeza que deseja editar esta pessoa?");
      
      if (confirmacao) {
        const pessoaAtualizada = this.formulario.value;
  
        this.http.put<void>(`${this.urlApi}/pessoas/${this.idPessoa}`, pessoaAtualizada).subscribe(
          () => {
            alert("Pessoa editada com sucesso!");
            this.router.navigate(['/list-pessoa']);
          },
          (error) => {
            console.error("Erro ao editar pessoa", error);
            alert("Erro ao editar pessoa");
          }
        );
      }
    } else {
      alert("Campos obrigatórios não preenchidos");
    }
  }

  onNacionalidadeChange() {
    if (this.nacionalidade === '1') {  
      this.formulario.addControl('rg', this.fb.control('', Validators.required));  
      if (this.formulario.contains('passaporte')) {
        this.formulario.removeControl('passaporte');  
      }
    } else if (this.nacionalidade === '2') { 
      this.formulario.addControl('passaporte', this.fb.control('', Validators.required));  
      if (this.formulario.contains('rg')) {
        this.formulario.removeControl('rg');  
      }
    }
  }

  cancelar(): void {
    this.router.navigate(['/list-pessoa']); // Redireciona para a listagem
  }

}
