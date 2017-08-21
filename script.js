// settings
var site_title = "Catálogo de espécies";
var author = "David Gabriel";

var firebase_db = "";

// start here
$.ready = function() {
    // set site title and author
    $("#sitetitle").text(site_title);
    $("#author").text(author);

    // connect to firebase
    var database = firebase.database(); 
    var ref = database.ref('/especies');

    ref.on("child_added", function(snap) {
        var current = $("#insertPos").html();

        $("#insertPos").html(current + getNewSpecieHtml(snap.key, snap.val()));

        // update current specie info
        $("#info-"+snap.key).click(
            function(e) {
                e.preventDefault(); 
                updateInfo(snap.val());
                return false; 
            }
        );
    });

}

function getNewSpecieHtml(key, specie) {
    console.log(specie);
    return `
        <div class="col-sm-6 col-md-4">
        <div class="thumbnail"> `+
        '<img src="'+specie.imagem+'">' +
        '<div class="caption">' +
            '<h3>'+specie.nomecomum +'</h3>' +
            '<p>'+specie.classe +'</p>' +
            '<p>'+specie.familia +'</p>' +
            '<p align="center"><a href="#" class="btn btn-primary" role="button" id="info-'+key+'">Mais info</a></p>'+
        `</div>
        </div>
    </div>`;
}

function updateInfo(specie) {
    $("#selectedspecie").css("display", "block");

    $("#imagem").html('<img src="'+specie.imagem+'">');
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