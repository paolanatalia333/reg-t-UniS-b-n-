$(document).ready(function () {


    var data = firebase.database().ref("/teams");
    //Detecta un registro nuevo en la base de datos y recarga la tabla
    data.on('child_added', function (snapshot) {
        buildTabla(snapshot.val().name, snapshot.val().tiempo);
    });

    function buildTabla(nombre, tiempo) {
        //Mismos tr que en la tabla: #tablaPosiciones
        $("#tablaPosiciones").append("<tr><td>" + "1" + "</td><td>" + nombre + "</td> <td>" + "--" + "</td><td>" + tiempo + "</td><td> 0 </td><td>" + "0" + "</td><td>" + "0" + "</td><td>" + "0" + "</td></tr>");
    }

});
