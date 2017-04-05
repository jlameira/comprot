var Controller = Controller || {};
Controller.processoConsulta = {};
(function(exports) {
    exports.iniciarProcessoConsulta = function() {
        limpar();
        selecionarMascara();
        $("[name='cpf-cnpj']").change(selecionarMascara);
        $("#campo-inicio").mask("99/99/9999");
        $("#campo-fim").mask("99/99/9999");
        $("#btn-limpar").click(function() {
            limpar();
            validator.resetForm()
        });
        inicializarDatas();
        var validator = $("#consulta-processo").submit(function(event) {
            event.preventDefault()
        }).validate({
            rules: {
                txtTexto_captcha_serpro_gov_br: {
                    maxlength: 6,
                    required: true
                }
            },
            invalidHandler: function(event, validator) {
                $("#btnRecarregar_captcha_serpro_gov_br").click()
            },
            submitHandler: function(form) {
                captcha = {
                    token: $("#txtToken_captcha_serpro_gov_br").val(),
                    texto: $("#txtTexto_captcha_serpro_gov_br").val()
                };
                if ($("#campo-processo").val()) {
                    var proc = $("#campo-processo").val();
                    proc = proc.replace(/\D/g, "");
                    Proxy.processo.load(proc, captcha).done(loadOk).fail(loadFail);
                    processoConsulta.pesquisa.tipoPesquisa = "processo"
                } else if ($("#campo-cpf-cnpj").val()) {
                    processoConsulta.pesquisa = {
                        cpfCnpjComMascara: $("#campo-cpf-cnpj").val(),
                        cpfCnpj: $("#campo-cpf-cnpj").val().replace(/[\D]/g, ""),
                        nomeInteressado: $("#campo-nome").val(),
                        tipoPesquisa: $("input[name='cpf-cnpj']:checked").val(),
                        dataInicial: new Date(Util.inverteData($("#campo-inicio").val())).getTime(),
                        dataFinal: new Date(Util.inverteData($("#campo-fim").val())).getTime(),
                        numeroUltimoProcesso: null
                    };
                    var captcha = {
                        token: $("#txtToken_captcha_serpro_gov_br").val(),
                        texto: $("#txtTexto_captcha_serpro_gov_br").val()
                    };
                    Proxy.processo.find(processoConsulta.pesquisa, captcha).done(findOk).fail(findFail)
                }
            }
        })
    }
    ;
    var processoConsulta = {};
    processoConsulta.pesquisa = {};
    exports.consulta = processoConsulta;
    function limpar() {
        Util.gerarCaptcha("captcha");
        $("#global-message").removeClass("alert-danger alert-success");
        $("#global-message").hide();
        $("div.label.label-danger").each(function(index, value) {
            $(value).remove()
        });
        $("#campo-email").focus()
    }
    function selecionarMascara() {
        var selecao = $("[name='cpf-cnpj']:checked").val();
        if (selecao === "cpf") {
            $("#campo-cpf-cnpj").mask("999.999.999-99")
        } else if (selecao === "cnpj") {
            $("#campo-cpf-cnpj").mask("99.999.999/9999-99")
        }
    }
    var campoIdProcessoConsulta = {
        cpfCnpj: "campo-cpf-cnpj",
        nomeInteressado: "campo-nome",
        dataInicial: "campo-inicio",
        dataFinal: "campo-fim",
        captcha: "captcha"
    };
    loadOk = function(data) {
        processoConsulta.processo = data.processo;
        processoConsulta.movimentos = data.movimentos;
        processoConsulta.posicionamentos = data.posicionamentos;
        var url = "ajax/processo-consulta-dados.html";
        window.location.hash = url;
        LoadAjaxContent(url)
    }
    ;
    exports.loadOk = loadOk;
    loadFail = function(response) {
        tratarFalhaRequisicao(response)
    }
    ;
    exports.loadFail = loadFail;
    function findOk(resultado) {
        if (!resultado) {
            $("#global-message").addClass("alert-info").text("Nenhum processo encontrado para o período.").show();
            return
        }
        processoConsulta.listaProcessos = resultado.processos;
        processoConsulta.totalProcessos = resultado.totalDeProcessosEncontrados;
        var url = "ajax/processo-consulta-lista.html";
        window.location.hash = url;
        processoConsulta.paginador = Util.Paginador(processoConsulta.totalProcessos, 30);
        processoConsulta.pilha = [];
        LoadAjaxContent(url)
    }
    function findFail(response) {
        tratarFalhaRequisicao(response)
    }
    exports.findFail = findFail;
    function tratarFalhaRequisicao(response) {
        $("#btnRecarregar_captcha_serpro_gov_br").click();
        $(".label.label-danger").remove();
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
})(Controller.processoConsulta);
