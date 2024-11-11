$(document).ready(function () {
    var animating = false;
    var techoAlcanzado = false;

    $('#replantarBtn').hide(); // Ocultar el botón "Replantar" inicialmente
    
    $('#numeroPlantas').change(function () {
        var numeroPlantas = parseInt($(this).val());
        $('#resultado').text('Has seleccionado cultivar ' + numeroPlantas + ' planta(s).');

        // Para limpiar el contenido de plantas antes de añadir las nuevas imágenes
        $('#plantas').empty();

        for (var i = 1; i <= numeroPlantas; i++) {            
            var imgSrc = 'img/planta_' + i + '.jpg';
            var imgElement = $('<img>').attr('src', imgSrc).attr('alt', 'Planta ' + i); // Mostrar las imágenes de las plantas


            imgElement.css('position', 'relative');
            imgElement.css('top', '0');
            
            $('#plantas').append(imgElement);
        }
    });

    $('#iniciarBtn').click(function () {
        if (!animating && !techoAlcanzado) {
            animarPlantas();
            $('#iniciarBtn').hide(); // Ocultar el botón "Iniciar"
            $('#replantarBtn').show(); // Mostrar el botón "Replantar" 
        }
    });

    $('#replantarBtn').click(function () {
        if (!animating) {
            // Reiniciar la posición de las plantas
            reiniciarPlantas();
            techoAlcanzado = false;
            $('#replantarBtn').hide(); // Ocultar el botón "Replantar"
            $('#iniciarBtn').show(); // Mostrar el botón "Iniciar"
        }
    });

    function animarPlantas() {
        animating = true;
        var alturaTecho = $('#techo').position().top;

        $('#plantas img').each(function () {
            var crecimiento = Math.floor(Math.random() * 10) + 1;
            $(this).animate ({top: '-=' + crecimiento * 22 + 'px'}, 1250, function () { // Para que las plantas crezcan hacia arriba, 
            animating = false;                                                          // a cierta velocidad y recorrido
            verificarFavorita($(this));
            });
        });
    }

    function verificarFavorita (planta, alturaTecho) {
        if (planta.position().top <= alturaTecho && !techoAlcanzado) {
            techoAlcanzado = true;
            alert('¡Tenemos planta favorita!');
        }
    }


    function reiniciarPlantas() {
        $('#plantas img').css('top', '0');
    }

});
