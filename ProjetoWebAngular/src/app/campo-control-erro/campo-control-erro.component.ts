import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-campo-control-erro',
  imports: [CommonModule],
  templateUrl: './campo-control-erro.component.html',
  styleUrls: ['./campo-control-erro.component.css']
})
export class CampoControlErroComponent implements OnInit {

  @Input() msgErro: string | undefined;
  @Input() mostrarErro: boolean | undefined;

  constructor() { }

  ngOnInit() {
  }

}