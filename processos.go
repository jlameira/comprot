package main

import "unsafe"

type Processos struct {
	CodigoClientePesquisa        int         `json:"codigoClientePesquisa"`
	CodigoTipoMovimentoMovimento interface{} `json:"codigoTipoMovimentoMovimento"`
	CodigoTipoMovimentoProcesso  interface{} `json:"codigoTipoMovimentoProcesso"`
	DataDisjuntada               int         `json:"dataDisjuntada"`
	DataExclusaoProcesso         int         `json:"dataExclusaoProcesso"`
	DataJuntada                  int         `json:"dataJuntada"`
	DataMovimento                int         `json:"dataMovimento"`
	DataProcessamentoBCI         int         `json:"dataProcessamentoBCI"`
	DataProtocolo                int         `json:"dataProtocolo"`
	IndicadorCpfCgc              int         `json:"indicadorCpfCgc"`
	IndicadorEProcesso           int         `json:"indicadorEProcesso"`
	IndicadorProcessoCancelado   interface{} `json:"indicadorProcessoCancelado"`
	IndicadorProcessoEliminado   interface{} `json:"indicadorProcessoEliminado"`
	IndicadorProcessoExcluido    interface{} `json:"indicadorProcessoExcluido"`
	IndicadorProcessoPrincipal   int         `json:"indicadorProcessoPrincipal"`
	IndicadorProcessoTransito    int         `json:"indicadorProcessoTransito"`
	IndicadorProfisc             interface{} `json:"indicadorProfisc"`
	IndicadorSief                int         `json:"indicadorSief"`
	IndicadorVirtual             interface{} `json:"indicadorVirtual"`
	LeiFormacao                  interface{} `json:"leiFormacao"`
	Moeda                        interface{} `json:"moeda"`
	NomeAssunto                  interface{} `json:"nomeAssunto"`
	NomeAssuntoRaiz              interface{} `json:"nomeAssuntoRaiz"`
	NomeDespacho                 interface{} `json:"nomeDespacho"`
	NomeInteressado              string      `json:"nomeInteressado"`
	NomeInteressadoRaiz          interface{} `json:"nomeInteressadoRaiz"`
	NomeMoeda                    interface{} `json:"nomeMoeda"`
	NomeOrgaoDestino             interface{} `json:"nomeOrgaoDestino"`
	NomeOrgaoDisjuntada          interface{} `json:"nomeOrgaoDisjuntada"`
	NomeOrgaoOrigem              interface{} `json:"nomeOrgaoOrigem"`
	NomeOrgaoProtocolo           interface{} `json:"nomeOrgaoProtocolo"`
	NomeOutroOrgao               interface{} `json:"nomeOutroOrgao"`
	NomeProcedencia              interface{} `json:"nomeProcedencia"`
	NomeTemporalidade            interface{} `json:"nomeTemporalidade"`
	NumeroAntigoProcesso         interface{} `json:"numeroAntigoProcesso"`
	NumeroAviso                  int         `json:"numeroAviso"`
	NumeroCaixaArquivo           int         `json:"numeroCaixaArquivo"`
	NumeroCpfCgc                 int         `json:"numeroCpfCgc"`
	NumeroDocumentoExclusao      interface{} `json:"numeroDocumentoExclusao"`
	NumeroDocumentoOrigem        interface{} `json:"numeroDocumentoOrigem"`
	NumeroMalote                 int         `json:"numeroMalote"`
	NumeroProcessoEditado        string      `json:"numeroProcessoEditado"`
	NumeroProcessoPrincipal      string      `json:"numeroProcessoPrincipal"`
	NumeroProcessoPrincipalAj    interface{} `json:"numeroProcessoPrincipalAj"`
	NumeroProcessoPrincipalRaiz  interface{} `json:"numeroProcessoPrincipalRaiz"`
	NumeroRegiaoPostal           int         `json:"numeroRegiaoPostal"`
	NumeroRelacao                interface{} `json:"numeroRelacao"`
	NumeroSequencia              interface{} `json:"numeroSequencia"`
	NumeroSequenciaDisjuntada    interface{} `json:"numeroSequenciaDisjuntada"`
	SgOtroClienteProc            interface{} `json:"sgOtroClienteProc"`
	SgOutroClienteAssunto        interface{} `json:"sgOutroClienteAssunto"`
	SiglaUfMovimento             interface{} `json:"siglaUfMovimento"`
	Situacao                     interface{} `json:"situacao"`
	TextoObservacao              interface{} `json:"textoObservacao"`
	ValorRecursoFinanceiro       int         `json:"valorRecursoFinanceiro"`
	Movimentos                   []Movimentos
}
type Movimentos struct {
	CodigoDespacho          int    `json:"codigoDespacho"`
	CodigoOrgaoDestino      int    `json:"codigoOrgaoDestino"`
	CodigoOrgaoOrigem       int    `json:"codigoOrgaoOrigem"`
	CodigoTemporalidade     int    `json:"codigoTemporalidade"`
	CodigoTipoMovimento     string `json:"codigoTipoMovimento"`
	DataMovimentoEditada    string `json:"dataMovimentoEditada"`
	NomeDespacho            string `json:"nomeDespacho"`
	NomeOrgaoDestino        string `json:"nomeOrgaoDestino"`
	NomeOrgaoOrigem         string `json:"nomeOrgaoOrigem"`
	NomeTemporalidade       string `json:"nomeTemporalidade"`
	NomeTipoMovimento       string `json:"nomeTipoMovimento"`
	NumeroCaixa             string `json:"numeroCaixa"`
	NumeroProcessoPrincipal string `json:"numeroProcessoPrincipal"`
	NumeroRMRAAJDJ          string `json:"numeroRMRAAJDJ"`
	NumeroSequencia         string `json:"numeroSequencia"`
}

func (s *Movimentos) size() int {
	size := int(unsafe.Sizeof(*s))
	size += len(s.CodigoTipoMovimento)
	return size
}
