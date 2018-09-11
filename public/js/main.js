$(document).ready(function () {

    var ref = firebase.database().ref("Teams");

    var usuario={};



    function mostrarLogout() {
        console.log("sesion activa");
        $('#inicioSesionb').css("display","none");
        $('#cerrarSesion').css("display", "block");
    }

    function mostrarLogin() {
        console.log('sin sesion');
        $('#inicioSesionb').css("display", "block");
        $('#cerrarSesion').css("display", "none");
    }

    $('#tablaPosiciones').mouseenter(function () {
        $('#navegacion').fadeTo("slow", 0.0, function () {
        $('#banner').fadeTo('slow', 1);

        });
    });
    $('#navegacion').mouseover(function () {
        $(this).fadeTo('fast', 1);


    });
    $('#banner').mouseout(function () {
        $('#banner').hide();
        $('#navegacion').fadeTo('fast', 1);
     }  );

     //login

     firebase.auth().onAuthStateChanged(function (user) {
         if (user) {
             mostrarLogout();
         }else{
             mostrarLogin();
         }
      });


    $('#inicioSesion').click(function () {
        event.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth().signInWithPopup(provider)
        .then(function (datosUsuario) {
            console.log(datosUsuario);
            usuario={
                nombre: datosUsuario.user.displayName,
                email:datosUsuario.user.email
            }
            agregarUsuario(usuario);
         }).catch(function (err) {
             console.log(err);
          });
     });

    $('#cerrarSesion').click(function () {
        event.preventDefault();
        firebase.auth().signOut().then(function () {
            alert('se ha cerrado sesion');
         });
    });

    function agregarUsuario() { usuario }
    ref.push(usuario);


});

