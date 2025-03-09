import { CommonModule, formatCurrency } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormDebugComponent } from "../form-debug/form-debug.component";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa';
import { CampoControlErroComponent } from "../campo-control-erro/campo-control-erro.component";

@Component({
  selector: 'app-add-pessoa',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-pessoa.component.html',
  styleUrl: './add-pessoa.component.scss'
})
export class AddPessoaComponent implements OnInit {

  formulario!: FormGroup;
  http = inject(HttpClient);
  urlApi = 'https://localhost:7185';

  nomeAdicionar = "";
  nacionalidade: string ='';

  constructor(private formBuilder: FormBuilder){ }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      dataNascimento: [null, Validators.required],
      nacionalidade: ['', Validators.required],
      inativo: [false]
    });
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

  adicionarPessoa() {
    
    let inativo = this.formulario.get('inativo')?.value

    if(inativo == null){
      inativo = false;
    }

    const pessoaAdd: Pessoa = {
      nome: this.formulario.get('nome')?.value,
      dataNascimento: this.formulario.get('dataNascimento')?.value,
      inativo: inativo,
      nacionalidade: Number(this.nacionalidade),
      rg: this.formulario.get('rg')?.value,
      passaporte: this.formulario.get('passaporte')?.value
    };
  
    
    this.http.post<void>(this.urlApi + '/pessoas', pessoaAdd).subscribe(
      _ => {
        
        this.formulario.reset();
        alert('Pessoa adicionada com sucesso!');
      },
      (error: HttpErrorResponse) => {
        
        if (error.status === 400) {
          alert('Erro: Dados inválidos. Verifique os campos e tente novamente.');
        } else if (error.status === 500) {
          alert('Erro interno no servidor. Tente novamente mais tarde.');
        } else {
          alert('Erro desconhecido: ' + error.message);
        }
      }
    );
  }

  onSubmit(){
    if (this.formulario.valid){
      this.adicionarPessoa();
    }
    else{
      alert("Campos Obrigatórios não Preenchidos")
    }
  }

  onNacionalidadeChange() {
    if (this.nacionalidade === '1') {  
      this.formulario.addControl('rg', this.formBuilder.control('', Validators.required));  
      if (this.formulario.contains('passaporte')) {
        this.formulario.removeControl('passaporte');  
      }
    } else if (this.nacionalidade === '2') {  
      this.formulario.addControl('passaporte', this.formBuilder.control('', Validators.required));  
      if (this.formulario.contains('rg')) {
        this.formulario.removeControl('rg');  
      }
    }
  }

}
