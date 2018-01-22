  

var localVersion = false;

var path = '';
if(localVersion){
 path = 'http://localhost/pipefy/forms/start-form-js/public'
}

document.addEventListener("DOMContentLoaded", function(event) {
      
      try{
        p = PipefyApp.init();
        PipefyApp.resizeTo("#list");
        
        PipefyApp.render(function() {

        });
      }catch(e){console.log(e)}

      /* popula shopping*/
      $.ajax({ 
          url: path+ "/services/shoppings.json?"+Math.random()
      }).then(function(data) {
            //var data = JSON.parse(data);  
            for( var i = 0 ; i < data.length ; i++ ){
                $('#shopping').append('<option value=' + data[i].value + '>' + data[i].value + ' - ' +data[i].text + '</option>'); 
            } 
            if(data.length>0)
              populaEmpresa(data[0].value);
      });
      /* popula shopping*/

      // popula todos los campos
      popular();

});      



function populaEmpresa(value){
  /* popula empresa*/
  $.ajax({ 
      url: path+ "/services/empresas.json?"+Math.random()
  }).then(function(data) {
        //var data = JSON.parse(data);  
        $('#empresa').html('');
        for( var i = 0 ; i < data.length ; i++ ){
            $('#empresa').append('<option value=' + data[i].value + '>id do shopping:' + value + ' - ' +data[i].text + '</option>'); 
        }     

        // set value apos carregar
        p.get('card', 'public', 'empresa' ).then((campo) => {
          $( '#' + $( '#empresa' ).attr('id') ).val(campo);
        }).catch((error) => {
          console.log(error);
        });

  });
  /* popula empresa*/
}

function salvar(){

  $( ".salvar" ).each(function( index ) {
    console.log( index + ": " + $( this ).attr('id') + ' :' + $( this ).val().toString() );
    p.set('card', 'public', $( this ).attr('id'),$( this ).val().toString());
  }); 

}


function popular(){

  p.fields().then((fields) => {
    console.log(fields); 
  });

  $( ".salvar" ).each(function( index ) {
    //console.log( index + ": " + $( this ).attr('id') + ' :' + $( this ).val() );
    p.get('card', 'public', $( this ).attr('id') ).then((campo) => {
      $( '#' + $( this ).attr('id') ).val(campo);
    }).catch((error) => {
      console.log(error);
    });

  });

}

function close(){
  salvar();
  p.showNotification('Formulario salvo!', 'success');
  
}