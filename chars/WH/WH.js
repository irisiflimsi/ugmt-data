function rollWHSkill() {
    var zz = roll(1,100);
    var list = getElementsByPrefixId("SkillV");
    document.getElementById("SkillRoll").childNodes[0].nodeValue = zz;
    for (var i = 0; i < list.length; i++) {
        if (list[i].childNodes != null && list[i].childNodes.length != 0) {
            var value = list[i].childNodes[0].nodeValue;
            if (zz <= value) {
                for (var j = 1; j < 10; j++) {
                    if (value - zz < 10*j) {
                        document.getElementById("SkillR" + i).childNodes[0].nodeValue = "Lvl " + (j-1);
                    }
                }
            }
            else {
                for (var j = 1; j < 10; j++) {
                    if (zz - value < 10*j) {
                        document.getElementById("SkillR" + i).childNodes[0].nodeValue = "Lvl -" + (j-1);
                    }
                }
            }
        }
    }
}

function rollWHAttr100(n) {
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
