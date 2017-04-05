var movimentacao;
function tableCreate(data){
     for(var i = 0 ; i < data.length ; i++){
         var t = buscaMovimentacao(data[i].numeroProcessoEditado)
     }
    var body = document.body,
        tbl  =document.getElementById('tabelaProcessos');

        for(var i = 0 ; i < data.length ; i++){
             var linha = document.createElement("tr");
                var numeroProcesso = document.createElement("td");
                var nomeInteressado = document.createElement("td");
                var dataProtocolo = document.createElement("td");
                 var ultima = document.createElement("td");
                  var penultima = document.createElement("td");
                $(dataProtocolo).html(converteDataParaString(data[i].dataProtocolo));
                $(nomeInteressado).html(data[i].nomeInteressado);
                $(numeroProcesso).html("<a href='#' class='link-processo'>" + data[i].numeroProcessoEditado + "</a>");
                if(data[i].Movimentos && data[i].Movimentos.length > 0){
                $(ultima).html(data[i].Movimentos[0].dataMovimentoEditada);
                $(penultima).html(data[i].Movimentos[1].dataMovimentoEditada);

                }else{
                     $(ultima).html("Sem Movimentação");
                $(penultima).html("Sem Movimentação");
                }
  
                // buscaMovimentacao(data[i].numeroProcessoEditado)
                
                $(linha).append(dataProtocolo);
                $(linha).append(nomeInteressado);
                 $(linha).append(ultima);
                  $(linha).append(penultima);
                    $(linha).append(numeroProcesso);
                $("#tabelaProcessos").append(linha)



        }
}

function buscaMovimentacao(numeroProcesso){
    movimentacao = null;
    $.ajax({
            type: "GET",
            url: 'https://comprot.fazenda.gov.br/comprotegov/api/processo/' + numeroProcesso.replace(/[\D]/g, ""),
             dataType: "jsonp"
        }).success(function (data, status) {
           return movimentacao = data;
          });

}