      p = PipefyApp.init();
      PipefyApp.resizeTo("#list");
      
      PipefyApp.render(function() {
        var list = document.getElementById('list');
        
        p.card().then(function(card) {
          document.getElementById('card-title').textContent = card.title;
        });

      });

      /* popula shopping*/
      $.ajax({ 
          url: "/services/shoppings.json?"+Math.random()
      }).then(function(data) {
            //var data = JSON.parse(data);  
            for( var i = 0 ; i < data.length ; i++ ){
                $('#shopping').append('<option value=' + data[i].value + '>' + data[i].value + ' - ' +data[i].text + '</option>'); 
            } 
            if(data.length>0)
              populaEmpresa(data[0].value);
      });
      /* popula shopping*/

      function populaEmpresa(value){
        /* popula empresa*/
        $.ajax({ 
            url: "/services/empresas.json?"+Math.random()
        }).then(function(data) {
              //var data = JSON.parse(data);  
              $('#empresa').html('');
              for( var i = 0 ; i < data.length ; i++ ){
                  $('#empresa').append('<option value=' + data[i].value + '>id do shopping:' + value + ' - ' +data[i].text + '</option>'); 
              }     
        });
        /* popula empresa*/
      }

      function close(){
        p.get('card', 'public', 'test').then((test) => {
          console.log(test); // return actual value stored
        }).catch((error) => {
          // Handle error
          console.log(error);
        });
        p.showNotification('Formulario salvo!', 'success');
        
      }