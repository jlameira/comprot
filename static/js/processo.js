var Proxy = Proxy || {};
Proxy.processo = {};
(function(exports) {
    var url ='https://comprot.fazenda.gov.br/comprotegov/api/processo';
    exports.find = function(pesquisa, captcha) {
        return $.ajax({
            type: "GET",
            url: url + "?" + $.param(pesquisa),
            dataType: "jsonp",
      rejectUnauthorized:false,
      requestCert: true,
      agent: false,
            headers: {
                Captcha: JSON.stringify(captcha)
            }
        })
    }
    ;
    exports.load = function(id, captcha) {
        return $.ajax({
            type: "GET",
            url: url + "/" + id,
            headers: {
                Captcha: JSON.stringify(captcha)
            }
        })
    }
})(Proxy.processo);
