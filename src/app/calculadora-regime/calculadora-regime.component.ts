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
        if (this.dataInicio) { // Verificação adicional para garantir que não é null
          data.setFullYear(data.getFullYear() + pena.anos);
          data.setMonth(data.getMonth() + pena.meses);
          data.setDate(data.getDate() + pena.dias);
        }
      });

      this.dataFinal = data.toISOString().substring(0, 10);
    }
  }




  private formatDate(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
  }

  calcularValorDiasPena(pena: Pena): void {
    let inicio = moment();
    let fim = moment(inicio).add(pena.anos, 'years').add(pena.meses, 'months').add(pena.dias, 'days');
    let totalDias = fim.diff(inicio, 'days');

    pena.valorSelecionado = Number(pena.valueRegime.value);
    pena.valorDiasPena = totalDias * (pena.valorSelecionado / 100);
  }


  calcularDataRegime(pena: Pena): void {
    this.calcularValorDiasPena(pena);

    if (this.dataInicio && this.dataFinal) {
      let dataInicio = new Date(this.dataInicio);
      let dataFinalDate = new Date(this.dataFinal);
      let diferencaTempoTotal = dataFinalDate.getTime() - dataInicio.getTime();
      let diferencaDiasTotal = diferencaTempoTotal / (1000 * 3600 * 24);

      let porcentagemDias = 0
      this.penas.forEach(p => {
        if (p.valorSelecionado) {
          porcentagemDias += Math.round(diferencaDiasTotal * (p.valorSelecionado / 100));
        } else {
          alert('Certifique-se de que todas as datas e valores estão definidos corretamente.');
        }
      });

      let dataRegime = new Date(dataInicio);
      dataRegime.setDate(dataRegime.getDate() + porcentagemDias);
      pena.dataRegime = dataRegime.toISOString().substring(0, 10);

      this.dataRegime = pena.dataRegime
    }
  }









  onSubmit(): void {
    // Aqui você pode adicionar a lógica para quando o formulário é enviado
    console.log('Formulário enviado!');
  }
}
