Util = {
    converteDataMainframe: function(data) {
        if (data) {
            var dataStr = data.toString().length < 8 ? data.toString() + "0" : data.toString();
            var pattern = /(\d{4})(\d{2})(\d{2})/;
            return dataStr.replace(pattern, "$3/$2/$1")
        }
    },
    converteDataParaString: function(data) {
        if (data) {
            var dataStr = data.toString().length < 8 ? "0" + data.toString() : data.toString();
            var pattern = /(\d{2})(\d{2})(\d{4})/;
            return dataStr.replace(pattern, "$1/$2/$3")
        }
    },
    inverteData: function(data) {
        if (data) {
            var dataStr = data.toString().length < 8 ? data.toString() + "0" : data.toString();
            var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
            return dataStr.replace(pattern, "$3/$2/$1")
        }
    },
    Paginador: function(quantidadeTotal, tamanhoPagina) {
        this.totalPaginas = Math.ceil(quantidadeTotal / tamanhoPagina);
        this.pagina = 1;
        $("#link-anterior").hide();
        if (this.totalPaginas > 1) {
            $("#link-proximo").show()
        } else {
            $("#link-proximo").hide()
        }
        this.proximaPagina = function() {
            if (this.pagina + 1 <= this.totalPaginas) {
                this.pagina++
            }
            this.verificarProximo();
            this.verificarAnterior()
        }
        ;
        this.paginaAnterior = function() {
            if (this.pagina - 1 >= 1) {
                this.pagina--
            }
            this.verificarAnterior();
            this.verificarProximo()
        }
        ;
        this.verificarProximo = function() {
            if (this.pagina < this.totalPaginas) {
                $("#link-proximo").show()
            } else {
                $("#link-proximo").hide()
            }
        }
        ;
        this.verificarAnterior = function() {
            if (this.pagina > 1) {
                $("#link-anterior").show()
            } else {
                $("#link-anterior").hide()
            }
        }
        ;
        return this
    },
    formataCpf: function(cpf) {
        if (cpf === "undefined" || cpf === null) {
            return ""
        }
        var cpfStr = cpf.toString();
        if (cpfStr.length > 11)
            throw new Error("Não foi possível formatar o CPF.");
        cpfStr = "00000000000".substr(cpfStr.length, 11) + cpfStr;
        return cpfStr.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    },
    formataCnpj: function(cnpj) {
        if (cnpj === "undefined" || cnpj === null) {
            return ""
        }
        var cnpjStr = cnpj.toString();
        if (cnpjStr.length > 14)
            throw new Error("Não foi possível formatar o CNPJ.");
        cnpjStr = "00000000000000".substr(cnpjStr.length, 14) + cnpjStr;
        return cnpjStr.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
    },
    formataOrgao: function(orgao) {
        if (orgao === "undefined" || orgao === null) {
            return ""
        }
        orgao = orgao.toString();
        if (orgao.length > 8)
            throw new Error("Não foi possível formatar o órgão.");
        orgao = "00000000".substr(orgao.length, 8) + orgao;
        orgao = orgao.replace(/(\d{2})(\d{5})(\d{1})$/, "$1.$2-$3");
        return orgao
    },
    formataDespacho: function(v) {
        if (v === "undefined" || v === null) {
            return ""
        }
        v = v.toString();
        if (v.length > 6)
            throw new Error("Não foi possível formatar o despacho.");
        v = "000000".substr(v.length, 6) + v;
        v = v.replace(/(\d{2})(\d{3})(\d{1})$/, "$1.$2-$3");
        return v
    }
};
