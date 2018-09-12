$(document).ready(function () {

    var dbref = firebase.database().ref().child("Teams");
    var i = 1;

    dbref.on('value', snap =>{
        $("#table_body tr").remove();
        while((snap.child("team_"+i).val() != null)){

            var equipo = snap.child("team_"+i).child("Name").val();
            var partida = snap.child("team_"+i).child("StartTime").val();
            var llegada = snap.child("team_"+i).child("FinishTime").val();
            var puntajeTematico = snap.child("team_"+i).child("PuntajeTematico").val();
            var puntajeTiempo = snap.child("team_"+i).child("PuntajeTematico").val();
            var penalizaciones = snap.child("team_"+i).child("Penalizaciones").val();
            var total = snap.child("team_"+i).child("Total").val();

            $("#table_body").append("<tr><td>"+equipo+"</td><td>"+partida+"</td><td>"+llegada+"</td><td>"+puntajeTematico+"</td><td>"+puntajeTiempo+"</td><td>"+penalizaciones+"</td><td>"+total+"</td></tr>");
            i++;

        }
        i = 1;
    });

    $('#boton_add').click(function () {
        if(confirm("¿Esta seguro que quiere agregar?")){
            agregarData();
        }
    });

    function agregarData(){
        var j = 1;
        var k = 1;

        var numEquipo = document.getElementById("numequipo").value;
        var nomEquipo = document.getElementById("nomequipo").value;
        var institucion = document.getElementById("institucion").value;
        var tiempoTotal = document.getElementById("tiempoTotal").value;
        var puntajeDiseño = document.getElementById("punDiseño").value;
        var puntajeConstructor = document.getElementById("punCons").value;
        var puntajeTiempo = document.getElementById("punTiempo").value;
        var puntaeDecoracion = document.getElementById("punDec").value;
        var total = document.getElementById("total").value;
        var estado= document.getElementById("estado").value;

        dbref.on('value', snap =>{
            while((snap.child("team_"+i).val() != null)){
                j++;
            }
            console.log(k+"..."+j);
            k = j;
            j = 1;
        });
        firebase.database().ref('teams/team_' + k ).set({
            numEquipo : numEquipo,
            nomEquipo : nomEquipo,
            institucion: institucion,
            tiempoTotal : tiempoTotal,
            puntajeDiseño : puntajeTiempo,
            puntajeConstructor : puntajeConstructor,
            puntajeTiempo : puntajeTiempo,
            puntajeDecoracion : puntaeDecoracion,
            total : total,
            estado: estado
        });
    }


});
