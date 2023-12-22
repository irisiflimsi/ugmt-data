var chosen;

function show(elem) {
    if (chosen)
    chosen.className = chosen.className.replace(/ selected/g, '');
    chosen = elem;
    chosen.className += " selected";
}

function sign(str) {
    var val = integer(str);
    return (val >= 0 ? "+" + val : val);
}

function integer(str) {
    return (str && str.length > 0 ? parseInt(str) : 0);
}

function getField(elem, name) {
    return document.evaluate(".//*[@data-title='" + name + "']", elem, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function addOption(value, text) {
    var option = document.createElementNS("http://www.w3.org/1999/xhtml", "option");
    option.value = value;
    option.innerHTML = text;
    return option;
}

function create(id) {
    var req = new XMLHttpRequest(); 
    req.open("GET", "ugmt.combat?id=" + id, true);
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            var ret = req.responseXML.documentElement;
            var newChild = document.importNode(ret, true);
            var root = document.getElementById("field");
            root.appendChild(newChild);
            prepare(newChild);
        }
    }
    req.send(null);
}

function prepare() {
    var field = document.getElementById("field");
    var trs = field.getElementsByTagName("tr");

    var opponents = [];
    for (var i = 0; i < trs.length; i++) {
        if (trs[i].id.indexOf("Combat-") == 0) {
            opponents.push(trs[i].id);
        }
    }

    for (var i = 0; i < trs.length; i++) {
        if (trs[i].id.indexOf("Combat-") == 0) {
            var sel = getField(trs[i], "oppo");
            // Clear old
            while (sel.options.length > 0)
                sel.remove(sel.options[0]);
            // add new
            for (var j = 0; j < opponents.length; j++)
                sel.appendChild(addOption(opponents[j], opponents[j].substring(7)));
        }
    }
}

function angriff() {
    var zz = new Array(4);
    zz[0] = 1 + parseInt(10 * Math.random());
    zz[1] = 1 + parseInt(10 * Math.random());
    zz[2] = 1 + parseInt(10 * Math.random());
    zz[3] = 1 + parseInt(10 * Math.random());
    var oppo = getField(chosen, "oppo");
    var atyp = getField(chosen, "atyp");
    var rtyp = document.getElementById("rtyp");
    var misc = getField(chosen, "misc");
    var ares = getField(chosen, "ares");
    var vres = getField(chosen, "vres");
    var gres = getField(chosen, "gres");
    var ovtd = getField(document.getElementById(oppo.value), "vtd");

    // distinguish roll type
    var sum = 0;
    var rres;
    if (rtyp.value == "Sicherheit") {
        sum = Math.max(zz[0], zz[1]);
        rres = "(" + zz[0] + "," + zz[1] + ") " + sum;
    }
    if (rtyp.value == "Normal") {
        sum = zz[0] + zz[1];
        rres = "(" + zz[0] + "," + zz[1] + ") " + sum;
    }
    if (rtyp.value == "Risiko") {
        rres = "(" + zz[0] + "," + zz[1] + "," + zz[2] + "," + zz[3] + ") "
        zz = zz.sort(function(a, b) { return a - b; });
        if (zz[1] == 1 || zz[1] == 2 && zz[0] == 1)
            sum = zz[0] + zz[1];
        else
            sum = zz[2] + zz[3];
        rres += sum;
    }

    // continue calculation
    var calc = sum + integer(atyp.value) + integer(misc.value);
    rres += sign(atyp.value) + sign(misc.value) + "=" + calc;

    var oppvtd = integer(ovtd.innerHTML);
    ares.value = Math.floor((calc - oppvtd) / 3);
    ares.title = rres + "/" + oppvtd + "=" + Math.floor((calc - oppvtd) / 3);

    var avtd = Math.max(Math.floor((calc - 12) / 3), 0);
    vres.value = avtd;
    vres.title = rres + "/15=" + avtd;

    // adjust opponents "Aktive VTD"
    var trs = document.getElementById("field").getElementsByTagName("tr");
    for (var i = 0; i < trs.length; i++) {
        if (trs[i].id.indexOf("Combat-") == 0) {
            var sel = getField(trs[i], "oppo");
            if (sel.options[sel.selectedIndex].value == chosen.id) {
                getField(trs[i], "aktiv").value = avtd;
            }
        }
    }

    // GSW
    var gsw = atyp.options[atyp.selectedIndex].getAttribute("data-gsw");
    gres.value = "+" + gsw;
}

function verteidigung() {
    var oppo = getField(chosen, "oppo");
    var ares = getField(chosen, "ares");
    var vres = getField(chosen, "vres");
    var aktiv = getField(chosen, "aktiv");
    var ovtd = getField(document.getElementById(oppo.value), "vtd");

    var oppvtd = integer(ovtd.innerHTML);

    ares.title = ares.title.substring(0, ares.title.lastIndexOf("/") + 1);
    var nres = Math.floor((integer(ares.title.substring(ares.title.lastIndexOf("=") + 1)) - oppvtd - integer(aktiv.value)) / 3);
    ares.title += oppvtd + "+" + integer(aktiv.value) + "=" + nres;
    ares.value = nres;
}

function schaden() {
    var dres = getField(chosen, "dres");
    var atyp = getField(chosen, "atyp");
    var dam = atyp.options[atyp.selectedIndex].getAttribute("data-dam");
    var ares = getField(chosen, "ares");

    var dd = dam.indexOf('d');
    var dp = dam.indexOf('+');
    var dm = dam.indexOf('-');
    var n = parseInt(dam.substring(0, dd));
    var d = parseInt(dam.substring(dd + 1, (dp != -1 ? dp : dam.length)));
    var a = 0;
    if (dp != -1)
        a = parseInt(dam.substring(dp + 1));
    if (dm != -1)
        a = -parseInt(dam.substring(dm + 1));
    var zz = 0;
    dres.title = "(";
    for (var i = 0; i < n; i++) {
        var dd = 1 + parseInt(d * Math.random());
        dres.title += dd;
        if (i + 1 < n)
            dres.title += ",";
        zz += dd;
    }
    dres.title += ")+" + a + "=";
    zz += a;
    dres.title += zz;
    var sum = integer(ares.value.substring(ares.value.lastIndexOf("=") + 1));
    dres.title += "+" + sum + "=" + (sum + zz);
    dres.value = sum + zz;
}
