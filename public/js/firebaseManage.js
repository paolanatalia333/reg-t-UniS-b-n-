$(document).ready(function () {


    var data = firebase.database().ref("/Teams");
    var ref = firebase.database().ref().child("Teams");
    var db = ref.orderByChild("Tiempo");
    var dataPosition;
    var dataPodium;

    function renderPosition(){
        data.on("value", snap =>{
            var equipo = snap.child("Name").val();
            var partida = snap.child("StartTime").val();
            var llegada = snap.child("FinishTime").val();
            var puntajeTematico = snap.child("PuntajeTematico").val();
            var puntajeTiempo = snap.child("PuntajeTematico").val();
            var penalizaciones = snap.child("Penalizaciones").val();
            var total = snap.child("Total").val();

            $("#table_body").append("<tr><td>"+equipo+"</td><td>"+partida+"</td><td>"+llegada+"</td><td>"+puntajeTematico+"</td><td>"+puntajeTiempo+"</td><td>"+penalizaciones+"</td><td>"+total+"</td></tr>");
        });
    }
    function renderPodium(snap){
        var equipo = snap.child("Name").val();
        var partida = snap.child("StartTime").val();
        var llegada = snap.child("FinishTime").val();
        var puntajeTematico = snap.child("PuntajeTematico").val();
        var puntajeTiempo = snap.child("PuntajeTematico").val();
        var penalizaciones = snap.child("Penalizaciones").val();
        var total = snap.child("Total").val();

        $("#table_pod").append("<tr><td>"+equipo+"</td><td>"+partida+"</td><td>"+llegada+"</td><td>"+puntajeTematico+"</td><td>"+puntajeTiempo+"</td><td>"+penalizaciones+"</td><td>"+total+"</td></tr>");
    }


    ref.on("child_added", snap => {
        renderPosition(snap);
    });

    ref.on("child_changed", snap => {
        $('#table_body tr').remove();
        renderPosition(snap);
    });
    db.on("child_added", snap => {
        renderPodium(snap);
    });
    db.on("child_changed", snap =>{
       $('#table_pod tr').remove();
        renderPodium(snap);
    });




});
