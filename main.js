function argsMap(str) {
    var ret = new Object();
    if (str.indexOf(":") <= 0) {
        ret["id"] = "";
    }
    else {
        var spl = str.split(":");
        for (var i = 0; i < spl.length; i++) {
            var spl2 = spl[i].split("=");
            ret[spl2[0]] = spl2[1];
        }
    }
    return ret;
}

function socket(plug) {
    var socket = new WebSocket
        ("ws://" + location.hostname + ":" + location.port + "/socket/" + plug);
    socket.onmessage = function (msg) { message(plug, argsMap(msg.data)); }
    return false;
}

function getY(o) {
    var ret = 0;
    while (o != null) {
        ret += o.offsetTop;
        o = o.offsetParent;
    }
    return ret;
}

function getX(o) {
    var ret = 0;
    while (o != null) {
        ret += o.offsetLeft;
        o = o.offsetParent;
    }
    return ret;
}

function high (el) {
    el.className += " hilite";
}

function low (el) {
    el.className = el.className.replace(/ hilite/g,'');
}

function save(ty) {
    var req = new XMLHttpRequest(); 
    req.open("GET", "/ugmt.chars?save=" + ty, true);
    req.send(null);
    return false;
}

function modifyElem(el, ty, post) {
    var mod = document.getElementById(el.title + "_" + post);

    function respTxt(resp) {
        if (resp.length > 3)
            mod.src = (resp.indexOf("true") > -1 ? "/" : "/un") + post + ".png";
    }

    edit(el.title, post,
         (mod.src.substr(-post.length-6) == "un" + post + ".png"), ty, respTxt);
    return false;
}

function permit(el,ty) {
    return modifyElem(el, ty, "permit");
}

function select(el,ty) {
    return modifyElem(el, ty, "select");
}

function edit(id,attr,val,ty,func) {
    var req = new XMLHttpRequest(); 
    req.open
        ("GET", "/ugmt." + ty + "?edit=" + id + "&key=" + attr + "&val=" + val, true);
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            func(req.responseText);
        }
    }
    req.send(null);
    return false;
}

function send(txt) {
    var req = new XMLHttpRequest(); 
    req.open("GET", txt, true);
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            var ret = req.responseXML.documentElement;
            var newChild = document.importNode(ret, true);
            var root = document.getElementById("field");
            if (root.childNodes.length > 0)
                root.removeChild(root.childNodes[0]);
            root.appendChild(newChild);
        }
    }
    req.send(null);
}

function getElementsByClass(clas) {
    var ret = [];
    var elem = document.getElementsByTagName('*');
    for (var i = 0; i < elem.length; i++) {
        if (elem[i].className.indexOf(clas) > -1)
            ret.push(elem[i]);
    }
    return ret;
}

var clientId = null;
function getClientId(clas) {
    if (clientId == null) {
        clientId = new Date().getTime();
    }
    return clientId;
}
