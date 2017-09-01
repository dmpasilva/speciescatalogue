// settings
var site_title = "Coleção Biológica do Jardim Botânico da Universidade do Porto";
var description = `Esta coleção foi criada durante o estágio de David Sousa, 
    \"A importância das coleções biológicas: um caso de estudo com insetos\", 
orientado pela Profª Doutora Sara Cristina Ferreira Marques Antunes,
na Faculdade de Ciências da Universidade do Porto. 
Este trabalho teve como objetivo recolher, identificar e começar uma coleção biológica
da comunidade edáfica para obter informações acerca da biodiversidade desta área específica.` ;

var species_array = {};

// start here
$.ready = function() {
    // set site title and author
    $("#sitetitle").text(site_title);
    $("#description").text(description);

    // connect to firebase
    var database = firebase.database(); 
    var ref = database.ref('/especies');

    ref.on("child_added", function(snap) {
        var current = $("#insertPos").html();

        $("#insertPos").html(current + getNewSpecieHtml(snap.key, snap.val()));

        var key = snap.key;
        species_array[key] = snap.val();
    });
}

function getNewSpecieHtml(key, specie) {
    return `
        <div class="col-sm-6 col-md-4">
        <div class="thumbnail"> `+
        '<img src="'+specie.imagem+'">' +
        '<div class="caption">' +
            '<h3>'+specie.nomecomum +'</h3>' +
            '<p>'+specie.classe +'</p>' +
            '<p>'+specie.ordem +'</p>' +
            '<p align="center"><a href="javascript:updateInfo(\''+key+'\');" class="btn btn-primary" role="button">Mais info</a></p>'+
        `</div>
        </div>
    </div>`;
}

function closeInfo() {
    $("#selectedspecie").css("display", "none");
}

function updateInfo(specieName) {

    var specie = species_array[specieName];
    $("#selectedspecie").css("display", "block");

    $("#imagem").html('<img style="max-width: 100%" src="'+specie.imagem+'">');
    $("#nomecomum").html(specie.nomecomum);
    $("#identificacao").html(specie.identificacao);
    $("#especie").html(specie.especie);
    $("#familia").html(specie.familia);
    $("#ordem").html(specie.ordem);
    $("#especie").html(specie.especie);
    $("#classe").html(specie.classe);
    $("#descricao").html(specie.descricao);
    $("#morfologia").html(specie.morfologia);
    $("#alimentacao").html(specie.alimentacao);
    $("#ciclodevida").html(specie.ciclodevida);
    $("#habitat").html(specie.habitat);

    window.scrollTo(0,0);
}