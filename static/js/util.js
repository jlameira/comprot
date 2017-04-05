function formataCnpj(cnpj) {
  if (cnpj === "undefined" || cnpj === null) {
    return ""
  }
  var cnpjStr = cnpj.toString();
  if (cnpjStr.length > 14)
    throw new Error("Não foi possível formatar o CNPJ.");
  cnpjStr = "00000000000000".substr(cnpjStr.length, 14) + cnpjStr;
  return cnpjStr.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
}
function selecionarMascara() {
  var selecao = $("[name='cpf-cnpj']:checked").val();
  if (selecao === "cpf") {
    $("#campo-cpf-cnpj").mask("999.999.999-99")
  } else if (selecao === "cnpj") {
    $("#campo-cpf-cnpj").mask("99.999.999/9999-99")
  }
    $("#campo-inicio").mask("99/99/9999");
        $("#campo-fim").mask("99/99/9999");
}

function converteDataParaString(data){
  if (data) {
            var dataStr = data.toString().length < 8 ? "0" + data.toString() : data.toString();
            var pattern = /(\d{2})(\d{2})(\d{4})/;
            return dataStr.replace(pattern, "$1/$2/$3")
        }
}

 function inicializarDatas() {
        var hoje = new Date;
        var dia = hoje.getDate();
        var mes = hoje.getMonth();
        var ano = hoje.getFullYear();
        var anoAnterior = hoje.getFullYear() - 1;
        var dataFim = $.format.date(hoje, "dd/MM/yyyy");
        var dataInicio = $.format.date(new Date(ano - 1,mes,dia), "dd/MM/yyyy");
        $("#campo-inicio").val(dataInicio);
        $("#campo-fim").val(dataFim)
    }