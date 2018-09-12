$(document).ready(function () {

    var dbref = firebase.database().ref().child("teams");
    var i = 1;
    var j = 1;
    var k = 1;

    dbref.on('value', snap =>{
        $("#table_body tr").remove();
        while((snap.child("team_"+i).val() != null)){
            var numEquipo = snap.child("team_"+i).child("numEquipo").val();
            var nomEquipo = snap.child("team_"+i).child("nomEquipo").val();
            var institucion = snap.child("team_"+i).child("institucion").val();
            var tiempoTotal = snap.child("team_"+i).child("tiempoTotal").val();
            var puntajeDiseño = snap.child("team_"+i).child("puntajeDiseño").val();
            var puntajeConstructor = snap.child("team_"+i).child("puntajeConstructor").val();
            var puntajeTiempo = snap.child("team_"+i).child("puntajeTiempo").val();
            var puntajeDecoracion = snap.child("team_"+i).child("puntajeDecoracion").val();
            var total = snap.child("team_"+i).child("total").val();
            var estado= snap.child("team_"+i).child("estado").val();

            $("#table_body").append("<tr><td>"+numEquipo+"</td><td>"+nomEquipo+"</td><td>"+tiempoTotal+"</td></tr>");
            i++;
            k=i;
        }
        i = 1;
    });

    $('#boton_add').click(function () {
        if(confirm("¿Esta seguro que quiere agregar?")){
            agregarData();
        }
    });

    function agregarData(){

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

        firebase.database().ref('teams/team_' + k ).set({
            numEquipo : numEquipo,
            nomEquipo : nomEquipo,
            institucion: institucion,
            tiempoTotal : tiempoTotal,
            puntajeDiseño : puntajeDiseño,
            puntajeConstructor : puntajeConstructor,
            puntajeTiempo : puntajeTiempo,
            puntajeDecoracion : puntaeDecoracion,
            total : total,
            estado: estado
        });

        alert("Agregado correctamente");
    }

});
