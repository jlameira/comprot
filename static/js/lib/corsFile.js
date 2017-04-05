// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
  console.log(this.responseXML.title);
}
xhr.open(method, url);
xhr.responseType = "document";
xhr.send();
}

function reqz(type,url ,ok, erro){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            var obj = null;
            try {
                obj = JSON.parse(req.responseText);
                if (ok) {
                    ok(obj.retorno);
                }
            } catch (error) {
                console.log(error)
            }
        } else if (req.readyState === 4 && req.status !== 200) {
            if (erro) {
                console.log(obj.retorno);
            }
            if (req.status === 401) {
                //window.location.href = k.URL_INTRANET   //TODO quando sistema dentro da intranet
            } else {
                console.log(req.response)
            }
        }
    };
    req.open(type, url, true);
    return req
}