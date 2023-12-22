function rollHM3Skill() {
    var zz = roll(1,100);
    var list = getElementsByPrefixId("SkillV");
    document.getElementById("SkillRoll").childNodes[0].nodeValue = zz;
    for (var i = 0; i < list.length; i++) {
        if (list[i].childNodes != null && list[i].childNodes.length != 0) {
            var value = list[i].childNodes[0].nodeValue;
            if ((zz <= value || zz <= 5) && zz <= 95)
                if (zz == 5*parseInt(zz/5))
                    document.getElementById("SkillR" + i).childNodes[0].nodeValue = "CS";
                else
                    document.getElementById("SkillR" + i).childNodes[0].nodeValue = "MS";
            else
                if (zz == 5*parseInt(zz/5))
                    document.getElementById("SkillR" + i).childNodes[0].nodeValue = "CF";
                else
                    document.getElementById("SkillR" + i).childNodes[0].nodeValue = "MF";
        }
    }
}

function rollHM3Attr(n,d) {
    var zz = roll(n,d);
    document.getElementById("AttrRoll").childNodes[0].nodeValue = zz;
    var list = getElementsByPrefixId("AttrV");
    for (var i = 0; i < list.length; i++) {
        var value = list[i].childNodes[0].nodeValue;
        if (zz <= value)
            document.getElementById("AttrR" + i).childNodes[0].nodeValue = "S";
        else
            document.getElementById("AttrR" + i).childNodes[0].nodeValue = "F";
    }
}

function rollHM3Attr100(n) {
    var zz = roll(1,100);
    document.getElementById("AttrRoll").childNodes[0].nodeValue = zz;
    var list = getElementsByPrefixId("AttrV");
    for (var i = 0; i < list.length; i++) {
        var value = list[i].childNodes[0].nodeValue;
        if (zz <= n * value)
            document.getElementById("AttrR" + i).childNodes[0].nodeValue = "S";
        else
            document.getElementById("AttrR" + i).childNodes[0].nodeValue = "F";
    }
}
