var m_id;
var m_mod = "";
var m_template;

function message(p, e) {
    if (e["id"] == "") return;
    if (p == 'chars') {
        if (e["permit"]) {
            var el = document.getElementById(e["id"] + "_permit");
            if (e["permit"].indexOf("true") > -1) {
                if (window.location.toString().indexOf("8080") > -1) {
                    var par = document.getElementById("charlist");
                    var ch = myChar(e["id"], e["name"]);
                    par.appendChild(ch);
                    el = document.getElementById(e["id"] + "_permit"); // just created
                }
                if (el) el.src = "/permit.png";
            }
            else {
                if (el) el.src = "/unpermit.png";
                if (window.location.toString().indexOf("8080") > -1) {
                    var ch = el.parentNode.parentNode;
                    ch.parentNode.removeChild(ch);
                }
            }
        }
        if (e["select"]) {
            var el = document.getElementById(e["id"] + "_select");
            el.src = (e["select"].indexOf("true") > -1 ? "/" : "/un") + "select.png";
        }
    }
    else { // 'art'
        if (e["select"]) {
            var el = document.getElementById(e["id"] + "_select");
            if (e["select"].indexOf("true") > -1) {
                if (!el) {
                    var par = document.getElementById("artlist");
                    var ch = myArt(e["id"], e["name"]);
                    par.appendChild(ch);
                }
            }
            else {
                if (el) {
                    el.parentNode.removeChild(el);
                }
            }
        }
    }
}

function load() {
    radioclick("synopsis.html", null);
    socket('chars');
    socket('art');
}

function printmain() {
    var ref = window.open
        ("/ugmt.chars?id=" + m_id
         + "&out=pdf");
    ref.document.title = "Character Sheet";
}

function use(id) {
    m_id = id;
    send("/ugmt.chars?id=" + m_id +
         "&template=" + m_template.id);
}

function usemod(id, mod) {
    m_id = id;
    m_mod = mod;
    send("/ugmt.chars?id=" + m_id +
         "&template=" + m_template.id + "&mod=" + mod);
}

function radioclick(s, e) {
    var o = document.getElementById(s);
    m_template = o;
    if (m_id != null) send("/chars/ugmt.chars?id=" + m_id +
         "&template=" + m_template.id);
}

function roll(n,d) {
    var zz = 1 + parseInt(d * Math.random());
    for (var i = 1; i < n; i++)
        zz = zz + 1 + parseInt(d * Math.random());
    return zz;
}

function getElementsByPrefixId(prefix) {
    var ret = new Array();
    var i = 1;
    var el = document.getElementById(prefix + i);
    while (el != null) {
        ret.push(el);
        i = i + 1;
        el = document.getElementById(prefix + i);
    }
    return ret;
}

function myArt(id, name) {
    var el = document.createElementNS("http://www.w3.org/1999/xhtml", "span");
    el.setAttribute("class", "listing smallentity");
    el.setAttribute("onmouseover", "high(this)");
    el.setAttribute("onmouseout", "low(this)");
    el.setAttribute("id", id + "_select");
    el.innerHTML = name;
    return el;
}

function myChar(id, name) {
    var el = document.createElementNS("http://www.w3.org/1999/xhtml", "span");
    el.setAttribute("class", "listing smallentity");
    el.setAttribute("onmouseout", "low(this)");
    el.setAttribute("onmouseover", "high(this)");

    var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    a.setAttribute("href", "");
    a.setAttribute("onclick", "return permit(this,'chars')");
    a.setAttribute("title", id);
    el.appendChild(a);

    var img = new Image();
    img.setAttribute("class", "lefticon");
    img.setAttribute("id", id + "_permit");
    img.src = "/unpermit.png";
    a.appendChild(img);

    a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    a.setAttribute("href", "");
    a.setAttribute("onclick", "return select(this,'chars')");
    a.setAttribute("title", id);
    el.appendChild(a);

    img = new Image();
    img.setAttribute("class", "lefticon");
    img.setAttribute("id", id + "_select");
    img.src = "/unselect.png";
    a.appendChild(img);

    a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    a.setAttribute("href", "javascript:use(\"" + id + "\")");
    a.innerHTML = name;
    el.appendChild(a);

    return el;
}

function rollWH() {
    var zz = roll(1,100);
    document.getElementById("Roll").innerHTML = zz;
    iterate("Skill", zz);
    iterate("Attr", zz);
}

function iterate(pre, zz) {
    var list = getElementsByPrefixId(pre + "V");
    for (var i = 0; i < list.length; i++) {
        var value = list[i].innerHTML;
        if (zz <= value) {
            for (var j = 0; j < 10; j++) {
                if (zz - value <= -10*j) {
                    if (document.getElementById(pre + "V" + (i+1)).innerHTML != "") {
                        document.getElementById(pre + "R" + (i+1)).innerHTML = j;
                    }
                }
            }
        }
        else {
            for (var j = 0; j < 10; j++) {
                if (value - zz <= -10*j) {
                    if (document.getElementById(pre + "V" + (i+1)).innerHTML != "") {
                        document.getElementById(pre + "R" + (i+1)).innerHTML =
                            String.fromCharCode(0x2212) + j;
                    }
                }
            }
        }
    }
}
