// settings
var site_title = "Catálogo de espécies";
var description = "David Gabriel";

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
            '<p>'+specie.familia +'</p>' +
            '<p align="center"><a href="javascript:updateInfo(\''+key+'\');" class="btn btn-primary" role="button">Mais info</a></p>'+
        `</div>
        </div>
    </div>`;
}

function updateInfo(specieName) {

    var specie = species_array[specieName];
    $("#selectedspecie").css("display", "block");

    $("#imagem").html('<img style="max-width: 100%" src="'+specie.imagem+'">');
    $("#nomecomum").text(specie.nomecomum);
    $("#especie").text(specie.especie);
    $("#familia").text(specie.familia);
    $("#ordem").text(specie.ordem);
    $("#especie").text(specie.especie);
    $("#classe").text(specie.classe);
    $("#descricao").text(specie.descricao);
    $("#morfologia").text(specie.morfologia);
    $("#alimentacao").text(specie.alimentacao);
    $("#ciclodevida").text(specie.ciclodevida);
}