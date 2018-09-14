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
        //buildDataCol2();
        i = 1;
    });


    x = setInterval(function () {
        time++;

        if (time < 2) {

            $('#' + 4 + '-2g').text(equiposCol[0].numEquipo);
            $('#' + 4 + '-3g').text(equiposCol[0].nomEquipo);
            $('#' + 5 + '-2g').text(equiposCol[1].numEquipo);
            $('#' + 5 + '-3g').text(equiposCol[1].nomEquipo);
            $('#' + 6 + '-2g').text(equiposCol[2].numEquipo);
            $('#' + 6 + '-3g').text(equiposCol[2].nomEquipo);

            $('#' + 1 + '-2g').text(equiposUsab[0].numEquipo);
            $('#' + 1 + '-3g').text(equiposUsab[0].nomEquipo);
            $('#' + 2 + '-2g').text(equiposUsab[1].numEquipo);
            $('#' + 2 + '-3g').text(equiposUsab[1].nomEquipo);
            $('#' + 3 + '-2g').text(equiposUsab[2].numEquipo);
            $('#' + 3 + '-3g').text(equiposUsab[2].nomEquipo);
        } else if (time < 12) {
            var i = 3;
            var j = 12;
            while (i <= 13) {
                $('#' + j + '-5').text(equiposCol[i].numEquipo);
                $('#' + j + '-6').text(equiposCol[i].nomEquipo);
                j++;
                i++;
            }
        } else if (time < 22) {
            var h = 14;
            j = 12;
            while (h < 25) {
                $('#' + j + '-5').text(equiposCol[h].numEquipo);
                $('#' + j + '-6').text(equiposCol[h].nomEquipo);
                j++;
                h++;
            }
        } else if (time < 32) {
            var k = 25;
            j = 12;
            while (k < 36) {
                if (equiposCol[k].numEquipo == null) {
                    $('#' + j + '-5').text(equiposCol[k].numEquipo);
                    $('#' + j + '-6').text(equiposCol[k].nomEquipo);
                } else {

                    $('#' + j + '-5').text("-");
                    $('#' + j + '-6').text("-");
                }
                j++;
                k++;
            }
        } else if (time < 38) {
            time = 0;
        }

    }, 1000);



    /* function buildDataCol() {
         var x = 0;
         // while (x < 1000) {
         var i = 12;
         equiposCol.forEach(function (x) {
             $('#' + i + '-5').text(x.nomEquipo);
             $('#' + i + '-6').text(x.tiempoTotal);
             if (i == 22) {
                 console.log("tow minitesuyuyuyuyuy");
                 sleep(2000).then(function () {
                     console.log("dos minutos despueees" + i);

                     i = 14;
                 });

             }
             i++;
         });
         var j = 1;
         equiposUsab.forEach(async function (x) {
             $('#' + j + '-2').text(x.nomEquipo);
             $('#' + j + '-3').text(x.tiempoTotal);

             if (j == 11) {

                 console.log("tow minites-----");
                 await sleep(2000);
                 console.log("2 minuts despues" + j);
                 j = 3;
             }
             j++;
         });

         x++;
         console.log(x);
         // }

     }

     function show() {

     }

     function sleep(ms) {
         return new Promise(resolve => setTimeout(resolve, ms));
     }


     dbref.limitToLast(1).on('child_added', snap => {

         var numEquipo = snap.child("numEquipo").val();
         var nomEquipo = snap.child("nomEquipo").val();
         var institucion = snap.child("institucion").val();
         var tiempoTotal = snap.child("tiempoTotal").val();
         var puntajeDiseño = snap.child("puntajeDiseño").val();
         var puntajeConstructor = snap.child("puntajeConstructor").val();
         var puntajeTiempo = snap.child("puntajeTiempo").val();
         var puntajeDecoracion = snap.child("puntajeDecoracion").val();
         var total = snap.child("total").val();
         var estado = snap.child("estado").val();

         if (institucion == "usabana") {
             $('#ul1').text(nomEquipo);
             $('#ul2').text(tiempoTotal);
             $('#ul3').text(tiempoTotal - mejorTiempoUsab);
             $('#ul4').text(tiempoTotal - peorTiempoUsab);
         } else {
             $('#ul5').text(nomEquipo);
             $('#ul6').text(tiempoTotal);
             $('#ul7').text(tiempoTotal - mejorTiempoCol);
             $('#ul8').text(peorTiempoCol - tiempoTotal);
         }



     });
     dbref.on('child_changed', snap => {

         var numEquipo = snap.child("numEquipo").val();
         var nomEquipo = snap.child("nomEquipo").val();
         var institucion = snap.child("institucion").val();
         var tiempoTotal = snap.child("tiempoTotal").val();
         var puntajeDiseño = snap.child("puntajeDiseño").val();
         var puntajeConstructor = snap.child("puntajeConstructor").val();
         var puntajeTiempo = snap.child("puntajeTiempo").val();
         var puntajeDecoracion = snap.child("puntajeDecoracion").val();
         var total = snap.child("total").val();
         var estado = snap.child("estado").val();

         if (institucion == "usabana") {
             $('#ul1').text(nomEquipo);
             $('#ul2').text(tiempoTotal);
             $('#ul3').text("-" + mejorTiempoUsab - tiempoTotal);
             $('#ul4').text("+" + tiempoTotal - peorTiempoUsab);
         } else {
             $('#ul5').text(nomEquipo);
             $('#ul6').text(tiempoTotal);
             $('#ul7').text("-" + mejorTiempoCol - tiempoTotal);
             $('#ul8').text("+" + peorTiempoCol - tiempoTotal);
         }



     });
     $('#boton_add').click(function () {
         if (confirm("¿Esta seguro que quiere agregar?")) {
             agregarData();
         }
     });
     $('#boton_mod').click(function () {
         var numEquipo = document.getElementById("numequipo").value;
         if (confirm("¿Esta seguro que quiere modificar al equipo " + numEquipo + "?")) {
             modificaData();
         }
     });

     function modificaData() {
         var numEquipo = document.getElementById("numequipo").value;
         var id = 0;

         dbref.on('value', snap => {
             while ((snap.child("team_" + i).val() != null)) {
                 if (snap.child("team_" + i).child("numEquipo").val() == numEquipo) {
                     id = i;
                 }
                 i++;
             }
             i = 1;
         });
         if (id > 0) {
             var nomEquipo = document.getElementById("nomequipo").value;
             var institucion = document.getElementById("institucion").value;
             var tiempoTotal = document.getElementById("tiempoTotal").value;
             var puntajeDiseño = document.getElementById("punDiseño").value;
             var puntajeConstructor = document.getElementById("punCons").value;
             var puntajeTiempo = document.getElementById("punTiempo").value;
             var puntaeDecoracion = document.getElementById("punDec").value;
             var total = document.getElementById("total").value;
             var estado = document.getElementById("estado").value;
             firebase.database().ref('teams/team_' + id).set({
                 numEquipo: numEquipo,
                 nomEquipo: nomEquipo,
                 institucion: institucion,
                 tiempoTotal: tiempoTotal,
                 puntajeDiseño: puntajeDiseño,
                 puntajeConstructor: puntajeConstructor,
                 puntajeTiempo: puntajeTiempo,
                 puntajeDecoracion: puntaeDecoracion,
                 total: total,
                 estado: estado
             });
         }
     }

     function agregarData() {
         var numEquipo = document.getElementById("numequipo").value;
         var nomEquipo = document.getElementById("nomequipo").value;
         var institucion = document.getElementById("institucion").value;
         var tiempoTotal = document.getElementById("tiempoTotal").value;
         var puntajeDiseño = document.getElementById("punDiseño").value;
         var puntajeConstructor = document.getElementById("punCons").value;
         var puntajeTiempo = document.getElementById("punTiempo").value;
         var puntaeDecoracion = document.getElementById("punDec").value;
         var total = document.getElementById("total").value;
         var estado = document.getElementById("estado").value;

         firebase.database().ref('teams/team_' + k).set({
             numEquipo: numEquipo,
             nomEquipo: nomEquipo,
             institucion: institucion,
             tiempoTotal: tiempoTotal,
             puntajeDiseño: puntajeDiseño,
             puntajeConstructor: puntajeConstructor,
             puntajeTiempo: puntajeTiempo,
             puntajeDecoracion: puntaeDecoracion,
             total: total,
             estado: estado
         });
         alert("Agregado correctamente");
     }*/
});
