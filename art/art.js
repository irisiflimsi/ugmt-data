function message(p, e) {
    if (e["id"] == "") return;
    if (e["select"]) {
        var el = document.getElementById(e["id"] + "_select");
        el.src = (e["select"].indexOf("true") > -1 ? "/" : "/un") + "select.png";
    }
}
