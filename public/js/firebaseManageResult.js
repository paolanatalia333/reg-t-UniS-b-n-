$(document).ready(function () {
    var dbref = firebase.database().ref().child("teams");
    var i = 1;
    var j = 1;
    var k = 1;
    var uni = 0;
    var col = 0;
    var time = 0;
    var x = null;
    var equiposUsab;
    var equiposCol;
    var mejorTiempoUsab;
    var peorTiempoUsab;
    var mejorTiempoCol;
    var peorTiempoCol;
    dbref.on('value', snap => {
        equiposUsab = [];
        equiposCol = [];
        while ((snap.child("team_" + i).val() != null)) {
            var numEquipo = snap.child("team_" + i).child("numEquipo").val();
            var nomEquipo = snap.child("team_" + i).child("nomEquipo").val();
            var institucion = snap.child("team_" + i).child("institucion").val();
            var tiempoTotal = snap.child("team_" + i).child("tiempoTotal").val();
            var puntajeDiseño = snap.child("team_" + i).child("puntajeDiseño").val();
            var puntajeConstructor = snap.child("team_" + i).child("puntajeConstructor").val();
            var puntajeTiempo = snap.child("team_" + i).child("puntajeTiempo").val();
            var puntajeDecoracion = snap.child("team_" + i).child("puntajeDecoracion").val();
            var total = snap.child("team_" + i).child("total").val();
            var estado = snap.child("team_" + i).child("estado").val();

            if (institucion == "usabana") {
                uni++;
                equiposUsab.push({
                    team: "team_" + i,
                    numEquipo: numEquipo,
                    nomEquipo: nomEquipo,
                    institucion: institucion,
                    tiempoTotal: tiempoTotal,
                    puntajeDiseño: puntajeDiseño,
                    puntajeConstructor: puntajeConstructor,
                    puntajeTiempo: puntajeTiempo,
                    puntajeDecoracion: puntajeDecoracion,
                    total: total,
                    estado: estado
                });

            } else {
                col++;
                equiposCol.push({
                    team: "team_" + i,
                    numEquipo: numEquipo,
                    nomEquipo: nomEquipo,
                    institucion: institucion,
                    tiempoTotal: tiempoTotal,
                    puntajeDiseño: puntajeDiseño,
                    puntajeConstructor: puntajeConstructor,
                    puntajeTiempo: puntajeTiempo,
                    puntajeDecoracion: puntajeDecoracion,
                    total: total,
                    estado: estado
                });
            }
            i++;
            k = i;
        }

        equiposCol.sort(function (a, b) {

            if (a.tiempoTotal > b.tiempoTotal) {
                return 1;
            }
            if (a.tiempoTotal < b.tiempoTotal) {
                return -1;
            }
            return 0;
        });
        equiposUsab.sort(function (a, b) {
            if (a.tiempoTotal > b.tiempoTotal) {
                return 1;
            }
            if (a.tiempoTotal < b.tiempoTotal) {
                return -1;
            }
            return 0;
        });

        i = 1;
        var n1 = 0;
        var n2 = 0;
        var m1 = 0;
        var m2 = 0;
        var cerosColegios = [];
        var otrosColegios = [];
        var cerosUni = [];
        var otrosUni = [];
        equiposCol.forEach(function (eq1) {
            if (eq1.tiempoTotal > "0" && eq1.tiempoTotal != "0:00:0" && eq1.tiempoTotal != "00:00:0" && eq1.tiempoTotal != "0:00:00" && eq1.tiempoTotal != "0:0:0" && eq1.tiempoTotal != "00:00:00") {
                otrosColegios[n1] = eq1;
                n1++;
            } else {
                cerosColegios[n2] = eq1;
                n2++;
            }

        });
        equiposUsab.forEach(function (eq2) {
            if (eq2.tiempoTotal > "0" && eq2.tiempoTotal != "0:00:0" && eq2.tiempoTotal != "00:00:0" && eq2.tiempoTotal != "0:00:00" && eq2.tiempoTotal != "0:0:0" && eq2.tiempoTotal != "00:00:00") {
                otrosUni[m1] = eq2;
                m1++;
            } else {
                cerosUni[m2] = eq2;
                m2++;
            }

        });

        var brechaCol = 0;
        brechaCol = 40 / (otrosColegios.length);
        var suma = 40;
        var total
        otrosColegios.forEach(function (eq3) {

            firebase.database().ref("/teams/" + eq3.team).on('value', function (snap) {
                var snapi = snap.val();
                total = parseInt(snapi.puntajeConstructor) + parseInt(snapi.puntajeDecoracion) + parseInt(snapi.puntajeTiempo) + parseInt(snapi.puntajeDiseño) - parseInt(snapi.penalizaciones);
            });
            firebase.database().ref("/teams/" + eq3.team).update({
                total: total
            });
            suma = suma - brechaCol;
        });
        cerosColegios.forEach(function (eq4) {

            firebase.database().ref("/teams/" + eq4.team).on('value', function (snap) {
                var snapi = snap.val();
                total = parseInt(snapi.puntajeConstructor) + parseInt(snapi.puntajeDecoracion) + parseInt(snapi.puntajeDiseño) - parseInt(snapi.penalizaciones);
            });
            firebase.database().ref("/teams/" + eq4.team).update({
                puntajeTiempo: 0,
                total: total
            });
        });
        var brechaUni = 0;
        brechaUni = 40 / (otrosUni.length);
        var sumaUni = 40;

        console.log(brechaUni + "  " + brechaCol);
        otrosUni.forEach(function (eq3) {
            firebase.database().ref("/teams/" + eq3.team).on('value', function (snap) {
                var snapi = snap.val();
                total = parseInt(snapi.puntajeConstructor) + parseInt(snapi.puntajeDecoracion) + parseInt(snapi.puntajeTiempo) + parseInt(snapi.puntajeDiseño) - parseInt(snapi.penalizaciones);
            });
            firebase.database().ref("/teams/" + eq3.team).update({
                total: total
            });
            sumaUni = sumaUni - brechaUni;

        });
        cerosUni.forEach(function (eq4) {
            firebase.database().ref("/teams/" + eq4.team).on('value', function (snap) {
                var snapi = snap.val();
                total = parseInt(snapi.puntajeConstructor) + parseInt(snapi.puntajeDecoracion) + parseInt(snapi.puntajeDiseño) - parseInt(snapi.penalizaciones);
            });
            firebase.database().ref("/teams/" + eq4.team).update({
                puntajeTiempo: 0,
                total: total
            });
        });



        equiposCol.sort(function (a, b) {

            if (a.total < b.total) {
                return 1;
            }
            if (a.total > b.total) {
                return -1;
            }
            return 0;
        });
        equiposUsab.sort(function (a, b) {
            if (a.total < b.total) {
                return 1;
            }
            if (a.total > b.total) {
                return -1;
            }
            return 0;
        });

    });


    x = setInterval(function () {
        time++;

        if (time < 2) {

            $('#' + 4 + '-2g').text(equiposCol[0].nomEquipo);
            $('#' + 4 + '-3g').text(equiposCol[0].total);
            $('#' + 5 + '-2g').text(equiposCol[1].nomEquipo);
            $('#' + 5 + '-3g').text(equiposCol[1].total);
            $('#' + 6 + '-2g').text(equiposCol[2].nomEquipo);
            $('#' + 6 + '-3g').text(equiposCol[2].total);

            $('#' + 1 + '-2g').text(equiposUsab[0].nomEquipo);
            $('#' + 1 + '-3g').text(equiposUsab[0].total);
            $('#' + 2 + '-2g').text(equiposUsab[1].nomEquipo);
            $('#' + 2 + '-3g').text(equiposUsab[1].total);
            $('#' + 3 + '-2g').text(equiposUsab[2].nomEquipo);
            $('#' + 3 + '-3g').text(equiposUsab[2].total);

        } else if (time < 12) {
            var i = 0;
            var j = 12;
            var o = 1;
            while (i <= 10) {
                if (equiposCol[i] != undefined) {
                    $('#' + j + '-1').text(i + 1);
                    $('#' + j + '-2').text(equiposCol[i].nomEquipo);
                    $('#' + j + '-3').text(equiposCol[i].puntajeDiseño);
                    $('#' + j + '-4').text(equiposCol[i].puntajeConstructor);
                    $('#' + j + '-5').text(equiposCol[i].puntajeTiempo);
                    $('#' + j + '-6').text(equiposCol[i].puntajeDecoracion);
                    $('#' + j + '-7').text(equiposCol[i].total);
                } else {
                    $('#' + j + '-1').text("-");
                    $('#' + j + '-2').text("-");
                    $('#' + j + '-3').text("-");
                    $('#' + j + '-4').text("-");
                    $('#' + j + '-5').text("-");
                    $('#' + j + '-6').text("-");
                    $('#' + j + '-7').text("-");
                }
                if (equiposUsab[i] != undefined) {
                    $('#' + o + '-1').text(i + 1);
                    $('#' + o + '-2').text(equiposUsab[i].nomEquipo);
                    $('#' + o + '-3').text(equiposUsab[i].puntajeDiseño);
                    $('#' + o + '-4').text(equiposUsab[i].puntajeConstructor);
                    $('#' + o + '-5').text(equiposUsab[i].puntajeTiempo);
                    $('#' + o + '-6').text(equiposUsab[i].puntajeDecoracion);
                    $('#' + o + '-7').text(equiposUsab[i].total);

                } else {
                    $('#' + o + '-2').text("-");
                    $('#' + o + '-1').text("-");
                    $('#' + o + '-3').text("-");
                    $('#' + o + '-4').text("-");
                    $('#' + o + '-5').text("-");
                    $('#' + o + '-6').text("-");
                    $('#' + o + '-7').text("-");
                }
                j++;
                o++;
                i++;
            }
        } else if (time < 22) {
            var h = 11;
            j = 12;
            o = 1;
            while (h < 22) {
                if (equiposCol[h] != undefined) {
                    $('#' + j + '-1').text(h + 1);
                    $('#' + j + '-2').text(equiposCol[h].nomEquipo);
                    $('#' + j + '-3').text(equiposCol[h].puntajeDiseño);
                    $('#' + j + '-4').text(equiposCol[h].puntajeConstructor);
                    $('#' + j + '-5').text(equiposCol[h].puntajeTiempo);
                    $('#' + j + '-6').text(equiposCol[h].puntajeDecoracion);
                    $('#' + j + '-7').text(equiposCol[h].total);

                } else {
                    $('#' + j + '-2').text("-");
                    $('#' + j + '-1').text("-");
                    $('#' + j + '-3').text("-");
                    $('#' + j + '-4').text("-");
                    $('#' + j + '-5').text("-");
                    $('#' + j + '-6').text("-");
                    $('#' + j + '-7').text("-");
                }
                if (equiposUsab[h] != undefined) {
                    $('#' + o + '-1').text(h + 1);
                    $('#' + o + '-2').text(equiposUsab[h].nomEquipo);
                    $('#' + o + '-3').text(equiposUsab[h].puntajeDiseño);
                    $('#' + o + '-4').text(equiposUsab[h].puntajeConstructor);
                    $('#' + o + '-5').text(equiposUsab[h].puntajeTiempo);
                    $('#' + o + '-6').text(equiposUsab[h].puntajeDecoracion);
                    $('#' + o + '-7').text(equiposUsab[h].total);

                } else {
                    $('#' + o + '-2').text("-");
                    $('#' + o + '-1').text("-");
                    $('#' + o + '-3').text("-");
                    $('#' + o + '-4').text("-");
                    $('#' + o + '-5').text("-");
                    $('#' + o + '-6').text("-");
                    $('#' + o + '-7').text("-");
                }
                j++;
                h++;
                o++;
            }
        } else if (time < 32) {
            var l = 22;
            j = 12;
            o = 1;
            while (l < 33) {
                if (equiposCol[l] != undefined) {
                    $('#' + j + '-1').text(l + 1);
                    $('#' + j + '-2').text(equiposCol[l].nomEquipo);
                    $('#' + j + '-3').text(equiposCol[l].puntajeDiseño);
                    $('#' + j + '-4').text(equiposCol[l].puntajeConstructor);
                    $('#' + j + '-5').text(equiposCol[l].puntajeTiempo);
                    $('#' + j + '-6').text(equiposCol[l].puntajeDecoracion);
                    $('#' + j + '-7').text(equiposCol[l].total);
                } else {
                    $('#' + j + '-2').text("-");
                    $('#' + j + '-1').text("-");
                    $('#' + j + '-3').text("-");
                    $('#' + j + '-4').text("-");
                    $('#' + j + '-5').text("-");
                    $('#' + j + '-6').text("-");
                    $('#' + j + '-7').text("-");
                }
                if (equiposUsab[l] != undefined) {
                    $('#' + o + '-1').text(l + 1);
                    $('#' + o + '-2').text(equiposUsab[l].nomEquipo);
                    $('#' + o + '-3').text(equiposUsab[l].puntajeDiseño);
                    $('#' + o + '-4').text(equiposUsab[l].puntajeConstructor);
                    $('#' + o + '-5').text(equiposUsab[l].puntajeTiempo);
                    $('#' + o + '-6').text(equiposUsab[l].puntajeDecoracion);
                    $('#' + o + '-7').text(equiposUsab[l].total);
                } else {
                    $('#' + o + '-2').text("-");
                    $('#' + o + '-1').text("-");
                    $('#' + o + '-3').text("-");
                    $('#' + o + '-4').text("-");
                    $('#' + o + '-5').text("-");
                    $('#' + o + '-6').text("-");
                    $('#' + o + '-7').text("-");
                }
                l++;
                j++;
                o++;
            }
        } else if (time < 38) {
            time = 0;
        }

    }, 1000);

});
