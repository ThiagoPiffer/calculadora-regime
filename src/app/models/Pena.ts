export interface Pena {
  anos: number;
  meses: number;
  dias: number;
  valorSelecionado: number;
  descricaoPena: string;
  valorDiasPena: number;
  dataFinal: string;
  dataRegime: string;
  valueRegime: { label: string; value: string };
}
