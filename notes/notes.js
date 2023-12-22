function load() {
    socket('notes');
}

function message(p, e) {
    if (e["id"] == "") return;
    if (e["permit"]) {
        var el = document.getElementById(e["id"] + "_permit");
        if (e["permit"].indexOf("true") > -1) {
            if (window.location.toString().indexOf("8080") > -1) {
                var par = document.getElementById("notelist");
                var note = myNote(e["id"], e["name"]);
                par.appendChild(note);
                el = document.getElementById(e["id"] + "_permit"); // newly created
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

function myNote(id, name) {
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

    a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    a.setAttribute("href", "javascript:use(\"" + id + "\")");
    a.innerHTML = name;
    el.appendChild(a);

    return el;
}
