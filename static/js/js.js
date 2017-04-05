//$("[name='cpf-cnpj']").change(selecionarMascara);
var captcha = { token: "343812290128308113162148321019314638139134232127193", texto: "thfn8x" }
var contador = 0;
var numeroProcessos = []
var totalDeProcessos;
var porta = '';
 var pilha;
function consultaCNPJ(p) {
  if( window.location.hostname === 'localhost'){
    porta = ':8080'
  }
  var selecao = $("[name='cpf-cnpj']:checked").val();
  if (selecao === 'cnpj' || p ) {
    if (p && p != '') {
      var processo = {
        cpfCnpj: p.numeroCpfCgc,
        cpfCnpjComMascara: formataCnpj(p.numeroCpfCgc),
        dataFinal: new Date(Util.inverteData($("#campo-inicio").val())).getTime(), dataInicial: new Date(Util.inverteData($("#campo-fim").val())).getTime(),
        nomeInteressado: "", numeroUltimoProcesso:p.numeroProcessoPrincipal, tipoPesquisa: 'cnpj'
      }

    } else {
   /*   selecionarMascara();
      inicializarDatas();*/
      if(localStorage.getItem('pilha')){
        localStorage.removeItem('pilha');

      }
      if(localStorage.getItem('ultimoProcesso')){
       localStorage.removeItem('ultimoProcesso');

      }
      contador = 0;
      totalDeProcessos = 0;
      var cpfCnpjComMascara = $("#campo-cpf-cnpj").val();
      var cnpj = $("#campo-cpf-cnpj").val().replace(/[\D]/g, "");
      processo = {
        cpfCnpj: cnpj,
        cpfCnpjComMascara: cpfCnpjComMascara,
          dataFinal: new Date(Util.inverteData($("#campo-inicio").val())).getTime(), dataInicial: new Date(Util.inverteData($("#campo-fim").val())).getTime(),
        nomeInteressado: "", numeroUltimoProcesso: null, tipoPesquisa: selecao
      }
    }

     Proxy.processo.find(processo, captcha).done(findOk).fail(findFail)
    // $.ajax({
    //   type: "GET",
    //   url: 'https://comprot.fazenda.gov.br/comprotegov/api/processo' + "?" + $.param(processo),
    //   dataType: "jsonp",
    //   rejectUnauthorized:false,
    //   requestCert: true,
    //   agent: false,
    //   headers: {
    //     Captcha: JSON.stringify(captcha)
    //   }

    // }).success(function (data, status) {

    //   if (contador === 0) {
    //     totalDeProcessos = data.totalDeProcessosEncontrados
    //   }
    //   if (contador < 30) {
    //     for (var i = 0; i < data.processos.length; i++) {
    //       numeroProcessos.push(data.processos[i])

    //       // numeroProcessos[data.processos[i].numeroProcessoPrincipal] =  data.processos[i] + '\n'
    //       contador++;
    //     }
    //    /* if (data.processos[29] && data.processos[29].numeroProcessoPrincipal) {
    //       consultaCNPJ(data.processos[29].numeroProcessoPrincipal)

    //     } else {*/
         
    //       //  alert('Total de Processos: ' + totalDeProcessos + '\n' + 'Processos paginados: ' + Object.keys(numeroProcessos).length + '\n' + 'Os trinta primeiros Processos ' + JSON.stringify(numeroProcessos));
    //        enviaDados(numeroProcessos,'enviaParaNovaPagina');
    //     // }


    //   } else {
    //     alert('Total de Processos : ' + totalDeProcessos + '\n' + 'Processos paginados: ' + Object.keys(numeroProcessos).length + '\n' + 'Os trinta primeiros Processos ' + JSON.stringify(numeroProcessos));
    //   }

    // }).error(function (xhr) {
    //    waitingDialog.hide();
    //    var responseJSON = JSON.parse(xhr.responseText);
    // $scope.d.errors = responseJSON;
    // alert($scope.d.errors);
      
     
    //  // alert(xhr.responseText);
    // })

  } else {
   // waitingDialog.hide();
    modalCpfNaoFUnfa('CPF funcionará em breve ')
    //alert('Com CPF em breve funcionará');
  }

  //04.894.085/0001-50
  //20994810000118
}

function enviaDados(numeroProcessos,cb){
  var processos =  JSON.stringify(numeroProcessos)
  
   $.ajax({
            type: "POST",
            contentType: "application/json",
            url: window.location.protocol + '//' + window.location.hostname +porta +'/pesquisaCPNJ',
            data: processos
          }).success(function (data, status) {
            localStorage.setItem('funcao', cb);
            localStorage.setItem('dados', JSON.stringify(data.response));
            $(location).attr('href', window.location.protocol + '//' + window.location.hostname + porta +'/pesquisaCPNJ');
            waitingDialog.hide();
          }).error(function(erro){
             waitingDialog.hide();
            // localStorage.setItem('dados', JSON.stringify(data.response));
            // $(location).attr('href', window.location.protocol + '//' + window.location.hostname+':8080' +'/pesquisaCPNJ');
          });
}

function enviaParaNovaPagina(dados) {
  var dados = JSON.parse(dados)
     tableCreate(dados);
     if(dados && dados[dados.length -1] ){
     localStorage.setItem('ultimoProcesso', JSON.stringify(dados[dados.length -1]));
     }
   
     localStorage.removeItem('dados');

}
function modalCpfNaoFUnfa(msg){
   waitingDialog.show(msg);
    setTimeout(function () {
      waitingDialog.hide();
    }, 3000)

}

  $("#link-proximo").click(function(event) {
        proximaPagina() 
    });
  $("#link-anterior").click(function(event) {
         paginaAnterior()
    });

  function proximaPagina() {
    pilha = []
    if(localStorage.getItem('pilha')){
      pilha = JSON.parse(localStorage.getItem('pilha'))
        localStorage.removeItem('pilha');
    }
      var processo = JSON.parse(localStorage.getItem('ultimoProcesso'));
    
       if(processo){
         if(pilha[pilha.length - 1] === processo.numeroProcessoPrincipal){
             pilha.pop();
          }
        pilha.push(processo.numeroProcessoPrincipal);
          
         localStorage.setItem('pilha', JSON.stringify(pilha));
        consultaCNPJ(processo)
       }
       

    
    }
      function paginaAnterior() {
        if(localStorage.getItem('pilha')){
          pilha = JSON.parse(localStorage.getItem('pilha'))
            localStorage.removeItem('pilha');
        }
        pilha.pop();
        var processo = JSON.parse(localStorage.getItem('ultimoProcesso'));
        processo.numeroProcessoPrincipal = pilha[pilha.length - 1];
          localStorage.setItem('pilha', JSON.stringify(pilha));
       consultaCNPJ(processo)
    }

      var campoIdProcessoConsulta = {
        cpfCnpj: "campo-cpf-cnpj",
        nomeInteressado: "campo-nome",
        dataInicial: "campo-inicio",
        dataFinal: "campo-fim",
        captcha: "captcha"
      };

        function findOk(resultado) {
        if (!resultado) {
            $("#global-message").addClass("alert-info").text("Nenhum processo encontrado para o período.").show();
            return
        }
           enviaDados(resultado.processos,'enviaParaNovaPagina');

/*        processoConsulta.listaProcessos = resultado.processos;
        processoConsulta.totalProcessos = resultado.totalDeProcessosEncontrados;
        var url = "ajax/processo-consulta-lista.html";
        window.location.hash = url;
        processoConsulta.paginador = Util.Paginador(processoConsulta.totalProcessos, 30);
        processoConsulta.pilha = [];
        LoadAjaxContent(url)*/
    }
    function findFail(response) {
        waitingDialog.hide();
        tratarFalhaRequisicao(response)
    }
    function tratarFalhaRequisicao(response) {
             
        switch (response.status) {
        case 400:
            $("#global-message").addClass("alert-danger").text(response.responseText).show();
            break;
        case 422:
            $(response.responseJSON).each(function(index, value) {
                var msg = document.createElement("div");
                $(msg).addClass("label label-danger");
                $(msg).html(value.message);
                $("#" + campoIdProcessoConsulta[value.property]).after(msg)
            });
            break;
        case 404:
            $("#global-message").addClass("alert-danger").text("Nenhum processo selecionado para sua pesquisa.").show();
            break;
        default:
            $("#global-message").addClass("alert-danger").text("Erro ao processar a requisição.").show();
            break
        }
    }