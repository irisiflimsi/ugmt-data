function dsa_reroll(n) {
    var w = document.getElementById("roll").innerHTML.split("/");
    var inner = (n == 0 || n == 1 ? roll(1,20) : w[0]) + "/";
    inner += (n == 0 || n == 2 ? roll(1,20) : w[1]) + "/";
    inner += (n == 0 || n == 3 ? roll(1,20) : w[2]);
    document.getElementById("roll").innerHTML = inner;
    var fr = parseInt(inner.split("/")[0]);
    var a = document.getElementById("Ausweichen");
    var v = parseInt(a.previousElementSibling.innerHTML);
    a.innerHTML = (fr > v ? "+" : "") + (fr - v)
    for (i = 1; i < document.getElementById("skills").children.length; i++) {
        dsa_recalcF(inner, document.getElementById("skills").children[i].children);
    }
    for (i = 1; i < document.getElementById("attrs").children.length; i++) {
        dsa_recalcA(fr, document.getElementById("attrs").children[i].children);
    }
    for (i = 1; i < document.getElementById("kampf").children.length; i++) {
        dsa_recalcK(fr, document.getElementById("kampf").children[i].children);
    }
    for (i = 1; i < document.getElementById("zauber").children.length; i++) {
        dsa_recalcF(inner, document.getElementById("zauber").children[i].children);
    }
}
function dsa_recalcK(r, e) {
    e[4].innerHTML = (r > parseInt(e[2].innerHTML) ? "+" : "") + (r - parseInt(e[2].innerHTML)) + "/";
    var p = (r > parseInt(e[3].innerHTML) ? "+" : "") + (r - parseInt(e[3].innerHTML));
    e[4].innerHTML += isNaN(p) ? "-" : p;
}
function dsa_recalcA(r, e) {
    var v = parseInt(e[1].innerHTML);
    e[2].innerHTML = (r > v ? "+" : "") + (r - v);
}
function dsa_recalcF(r, e) {
    if (e[1].innerHTML.length > 3) {
        var w = r.split("/");
        var a = e[1].innerHTML.split("/");
        for (var i = 0; i < 3; i++) {
            w[i] = parseInt(w[i]);
            a[i] = parseInt(a[i]);
        }
        var d = [ a[0] - w[0], a[1] - w[1], a[2] - w[2] ];
        fw = parseInt(e[2].innerHTML);
        while (fw > 0) {
            fw--;
            if (d[0] == Math.min(d[0], d[1], d[2]))
                d[0]++;
            else if (d[1] == Math.min(d[0], d[1], d[2]))
                d[1]++;
            else
                d[2]++;
        }
        var dmin = -Math.min(d[0], d[1], d[2]);
        e[3].innerHTML = dmin > 0 ? "+" + dmin : dmin;
    }
}
