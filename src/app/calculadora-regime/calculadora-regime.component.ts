import { Component } from '@angular/core';
import { Pena } from '../models/Pena';
import * as moment from 'moment';


@Component({
  selector: 'app-calculadora-regime',
  templateUrl: './calculadora-regime.component.html',
  styleUrls: ['./calculadora-regime.component.css']
})
export class CalculadoraRegimeComponent {

  dataInicio: Date | null = null;
  anos: number = 0;
  meses: number = 0;
  dias: number = 0;
  dataFinal: string | null = null;
  valorSelecionado: number = 0;
  dataRegime: string | null = null;

  penas: Pena[] = [];



  descricaoPena: string = '';
  valorDiasPena: number | null = null;

  diasRemidos: number = 0;

  PossuiDataPrisaoDataInicioDiferente: Boolean = false;
  PossuiDataRemidos: boolean = false;

  justifyOptions: any = [
    { label: '16%', value: '16' },
    { label: '25%', value: '25' },
    { label: '35%', value: '35' },
    { label: '40%', value: '40' }
  ];

  valueRegime: any = { label: '', value: '' };


  togglePossuiDataRemidos(): void {
    if (this.PossuiDataRemidos)
      this.PossuiDataRemidos = false;
    else
      this.PossuiDataRemidos = true;
  }

  togglePossuiDataPrisaoDataInicioDiferente() {
    if (this.PossuiDataRemidos)
      this.PossuiDataPrisaoDataInicioDiferente = false;
    else
      this.PossuiDataPrisaoDataInicioDiferente = true;
  }

  addPena(): void {
    this.penas.push({
      anos: 0,
      meses: 0,
      dias: 0,
      valorSelecionado: 0,
      descricaoPena: '',
      valorDiasPena: 0,
      dataFinal: '',
      dataRegime: '',
      valueRegime: { label: '', value: '' }
    });
  }

  updateDescricaoPena(pena: Pena): void {
    let partes = [];

    if (pena.anos > 0) {
      partes.push(`${pena.anos} Anos`);
    }
    if (pena.meses > 0) {
      partes.push(`${pena.meses} Meses`);
    }
    if (pena.dias > 0) {
      partes.push(`${pena.dias} Dias`);
    }

    pena.descricaoPena = partes.join(', ');

    this.calcularDataFinal()
  }

  calcularDataFinal(): void {
    if (this.dataInicio) {
      let data = new Date(this.dataInicio);
      this.penas.forEach(pena => {
        if (this.dataInicio) {
          // Convertendo anos e meses para dias
          let diasTotais = (pena.anos * 365) + (pena.meses * 30) + pena.dias;

          // Adicionando a quantidade total de dias à data
          data = new Date(data.getTime() + diasTotais * 24 * 60 * 60 * 1000);
        }
      });

      if (this.PossuiDataRemidos)
        data.setDate(data.getDate() - this.diasRemidos);

      this.dataFinal = data.toISOString().substring(0, 10);
    }
  }


  calcularValorDiasPena(pena: Pena): void {
    let inicio = moment();

    // Convertendo anos e meses para dias
    let diasTotais = (pena.anos * 365) + (pena.meses * 30) + pena.dias;

    // Adicionando a quantidade total de dias ao momento inicial
    let fim = moment(inicio).add(diasTotais, 'days');

    // Calculando a diferença em dias
    let totalDias = fim.diff(inicio, 'days');

    pena.valorSelecionado = Number(pena.valueRegime.value);
    pena.valorDiasPena = totalDias * (pena.valorSelecionado / 100);
  }


  calcularValorDiasPena1(pena: Pena): void {
    debugger
    let dataAtual = new Date();

    let dataFinal = new Date(dataAtual);

    // Convertendo anos e meses para dias
    let diasTotais = (pena.anos * 365) + (pena.meses * 30) + pena.dias;

    // Adicionando a quantidade total de dias à data atual
    dataFinal = new Date(dataFinal.getTime() + diasTotais * 24 * 60 * 60 * 1000);


    let totalDias = this.diferencaEmDias(dataAtual, dataFinal);

    pena.valorSelecionado = Number(pena.valueRegime.value);
    pena.valorDiasPena = totalDias * (pena.valorSelecionado / 100);
  }

  diferencaEmDias(data1: Date, data2: Date): number {
    // Configurar ambas as datas para o início do dia (meia-noite)
    let inicio = new Date(data1.getFullYear(), data1.getMonth(), data1.getDate());
    inicio.setHours(0, 0, 0, 0);

    let fim = new Date(data2.getFullYear(), data2.getMonth(), data2.getDate());
    fim.setHours(0, 0, 0, 0);

    const umDia = 24 * 60 * 60 * 1000; // milissegundos em um dia
    // Usar Math.ceil para garantir que o último dia seja contado integralmente
    return Math.ceil((fim.getTime() - inicio.getTime()) / umDia);
  }




  calcularDataRegime(pena: Pena): void {
    this.calcularValorDiasPena(pena);

    if (this.dataInicio && this.dataFinal) {
      let dataInicio = new Date(this.dataInicio);
      let dataFinalDate = new Date(this.dataFinal);
      let diferencaTempoTotal = dataFinalDate.getTime() - dataInicio.getTime();
      let diferencaDiasTotal = diferencaTempoTotal / (1000 * 3600 * 24);

      let porcentagemDias = 0
      let totalDiasPena = 0
      debugger
      this.penas.forEach(p => {
        if (p.valorSelecionado) {
          totalDiasPena += p.valorDiasPena
          // porcentagemDias += Math.round(diferencaDiasTotal * (p.valorSelecionado / 100));
        } else {
          alert('Certifique-se de que todas as datas e valores estão definidos corretamente.');
        }
      });

      let dataRegime = new Date(dataInicio);
      dataRegime.setDate(dataRegime.getDate() + totalDiasPena);

      if (this.PossuiDataRemidos)
        dataRegime.setDate(dataRegime.getDate() - this.diasRemidos);

      pena.dataRegime = dataRegime.toISOString().substring(0, 10);

      this.dataRegime = pena.dataRegime
    }
  }









  onSubmit(): void {
    // Aqui você pode adicionar a lógica para quando o formulário é enviado
    console.log('Formulário enviado!');
  }
}
