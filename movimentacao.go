package main

type Movimentacao struct {
	MensagemErroMovimento      interface{} `json:"mensagemErroMovimento"`
	MensagemErroPosicionamento interface{} `json:"mensagemErroPosicionamento"`
	Movimentos                 []struct {
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
	} `json:"movimentos"`
	Posicionamentos []interface{} `json:"posicionamentos"`
	Processo        struct {
		CodigoTipoMovimentoProcesso string `json:"codigoTipoMovimentoProcesso"`
		DataDisjuntada              int    `json:"dataDisjuntada"`
		DataMovimento               int    `json:"dataMovimento"`
		DataProtocolo               int    `json:"dataProtocolo"`
		IndicadorCpfCnpj            int    `json:"indicadorCpfCnpj"`
		IndicadorEProcesso          int    `json:"indicadorEProcesso"`
		IndicadorProfisc            string `json:"indicadorProfisc"`
		IndicadorSief               int    `json:"indicadorSief"`
		IndicadorVirtual            string `json:"indicadorVirtual"`
		NomeAssunto                 string `json:"nomeAssunto"`
		NomeInteressado             string `json:"nomeInteressado"`
		NomeOrgaoDestino            string `json:"nomeOrgaoDestino"`
		NomeOrgaoDisjuntada         string `json:"nomeOrgaoDisjuntada"`
		NomeOrgaoOrigem             string `json:"nomeOrgaoOrigem"`
		NomeOutroOrgao              string `json:"nomeOutroOrgao"`
		NomeProcedencia             string `json:"nomeProcedencia"`
		NumeroAviso                 int    `json:"numeroAviso"`
		NumeroCpfCnpj               int    `json:"numeroCpfCnpj"`
		NumeroDocumentoOrigem       string `json:"numeroDocumentoOrigem"`
		NumeroProcessoEditado       string `json:"numeroProcessoEditado"`
		NumeroProcessoPrincipal     string `json:"numeroProcessoPrincipal"`
		NumeroRelacao               string `json:"numeroRelacao"`
		NumeroSequencia             string `json:"numeroSequencia"`
		NumeroSequenciaDisjuntada   string `json:"numeroSequenciaDisjuntada"`
		SiglaUfMovimento            string `json:"siglaUfMovimento"`
		Situacao                    string `json:"situacao"`
	} `json:"processo"`
}
