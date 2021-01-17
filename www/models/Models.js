class Models{
    
    // TESTAR A DISPONIBILIDADE DA API
    testeApi(){

    	      // INICIO CHAMADA AJAX
              var request = $.ajax({

                  method: "POST",
                  url: app.urlApi+"teste-api.php",
                  data:{token:app.token}
              
              })
              request.done(function (dados) {            

                  console.log("%c VERIFICAÇÃO DE DISPONIBILIDADE DE API","background:#ff0000;color:#fff;");
                  console.log(dados);

                  localStorage.setItem("dadosApi",JSON.stringify(dados));

              });
              request.fail(function (dados) {
                     
                   console.log("API NÃO DISPONÍVEL (apiAtiva)");
                   console.log(dados);
                   aviso("Oops! Algo deu errado","Nossos servidores estão passando por dificuldades técnicas, tente novamente em alguns minutos");

              });
              // FINAL CHAMADA AJAX

    }

    // PROC LOGIN
    procLogin(){
       
       event.preventDefault();

       var loginUsuario = $("#loginUsuario").val();
	     var loginSenha   = $("#loginSenha").val();

	          // INICIO CHAMADA AJAX
              var request = $.ajax({

                  method: "POST",
                  url: app.urlApi+"login.php",
                  data:{token:app.token,loginUsuario:loginUsuario,loginSenha:loginSenha}
              
              })
              request.done(function (dados) {            

                  console.log("%c RETORNO DO LOGIN","background:#ff0000;color:#fff;");
                  console.log(dados);

                  var dadosUsuario = JSON.stringify(dados);
                  
                  if(dados.sucesso=="200"){
                  	 
                  	 localStorage.setItem("dadosUsuario",dadosUsuario);
                  	 app.login(dados.id,dados.email,dadosUsuario);
                  
                  }else{
                     
                     $(".form-control").val("");
                     aviso("Oops! Login ou senha não encontrados","Verifique os dados inseridos e tente novamente!");
                  
                  }
                  
              });
              request.fail(function (dados) {
                     
                   console.log("API NÃO DISPONÍVEL (procLogin)");
                   console.log(dados);
                   aviso("Oops! Algo deu errado","Nossos servidores estão passando por dificuldades técnicas, tente novamente em alguns minutos");

              });
              // FINAL CHAMADA AJAX

    }


    // PROC CADASTRO
    procCadastro(){

      event.preventDefault();
       
      var cadastroNome = $("#cadastroNome").val();
      var cadastroEmail = $("#cadastroEmail").val();
      var cadastroSenha = $("#cadastroSenha").val();

              // INICIO CHAMADA AJAX
              var request = $.ajax({

                  method: "POST",
                  url: app.urlApi+"cadastro.php",
                  data:{token:app.token,cadastroNome:cadastroNome,cadastroEmail:cadastroEmail,cadastroSenha:cadastroSenha}
              
              })
              request.done(function (dados) {            

                  console.log("%c RETORNO DO CADASTRO","background:#ff0000;color:#fff;");
                  console.log(dados);

                  var dadosUsuario = JSON.stringify(dados);
                  
                  if(dados.sucesso=="200"){
                     
                     localStorage.setItem("dadosUsuario",dadosUsuario);

                     // SE DEU TUDO CERTO, VAMOS LOGAR O USUÁRIO
                     app.login(dados.id,dados.email,dadosUsuario);
                  
                  }else{
                     
                     aviso("Oops! Esse e-mail já está cadastrado na nossa plataforma","Verifique os dados inseridos e tente novamente! Caso tenha esquecido sua senha, clique no link \"Esqueci Senha\" na tela de login.");
                  
                  }
                  
              });
              request.fail(function (dados) {
                     
                   console.log("API NÃO DISPONÍVEL (procCadastro)");
                   console.log(dados);
                   aviso("Oops! Algo deu errado","Nossos servidores estão passando por dificuldades técnicas, tente novamente em alguns minutos");

              });
              // FINAL CHAMADA AJAX

    }


    procResetSenha(){

              event.preventDefault();
               
              var resetEmail = $("#resetEmail").val();

              // INICIO CHAMADA AJAX
              var request = $.ajax({

                  method: "POST",
                  url: app.urlApi+"reset-senha.php",
                  data:{token:app.token,resetEmail:resetEmail}
              
              })
              request.done(function (dados) {            

                  console.log("%c RETORNO DO RESET","background:#ff0000;color:#fff;");
                  console.log(dados);

                  var dadosUsuario = JSON.stringify(dados);
                  
                  if(dados.sucesso=="200"){
                     
                     app.viewLogin();
                     aviso("Deu certo! Senha resetada","Enviamos para o seu e-mails instruções sobre o reset de senha.");
                     
                  }else{
                     
                     aviso("Oops! E-mail não encontrado","Seu e-mail não foi localizado na plataforma. Verique as informações inseridas e tente novamente.");
                  
                  }
                  
              });
              request.fail(function (dados) {
                     
                   console.log("API NÃO DISPONÍVEL (ResetDeSenha)");
                   console.log(dados);
                   aviso("Oops! Algo deu errado","Nossos servidores estão passando por dificuldades técnicas, tente novamente em alguns minutos");

              });
              // FINAL CHAMADA AJAX


    }

    // BUSCAR ATIVIDADES DISPONÍVEIS
    selectAtividade(nivel,habilidade){

              // INICIO CHAMADA AJAX
              var request = $.ajax({

                  method: "POST",
                  url: app.urlApi+"buscar-atividades.php",
                  data:{token:app.token,nivel:nivel,habilidade:habilidade}
              
              })
              request.done(function (dados) {            

                  console.log("%c RETORNO DOS DADOS BUSCA ATIVIDADES","background:#ff0000;color:#fff;");
                  console.log(dados);

                  var dadosUsuario = JSON.stringify(dados);
                  
                  if(dados.sucesso=="200"){

                       $("#appendAtividadesDisponiveis").html("");

                       var j = 1;

                       for(var i = 0;i<dados.conteudo.length;i++){
                           
                           $("#appendAtividadesDisponiveis").append(`
                                 
                                 <div class="col-3">
                                   <a href="javascript:void(0)" title="Ver essa atividade" onclick="app.conversas(${dados.conteudo[i].id});"> 
                                     <img src="assets/images/folder.svg" /><br>
                                     ${j}
                                   </a>
                                </div>


                           `);

                           j++;

                       }
                     
                       

                     
                  }else{
                     
                     app.inicio();
                     aviso("Oops! Nenhuma atividade nos critérios selecionados","Em breve teremos atividades para esse nível e habilidade selecionados.");
                  
                  }
                  
              });
              request.fail(function (dados) {
                    
                   app.inicio();
                   console.log("API NÃO DISPONÍVEL (selectAtividade)");
                   console.log(dados);
                   aviso("Oops! Algo deu errado","Nossos servidores estão passando por dificuldades técnicas, tente novamente em alguns minutos");

              });
              // FINAL CHAMADA AJAX

    }
    
    // BUSCAR CONTEUDO API
    buscaConteudo(sessaoConteudo){

               $("#caixaDasMensagensInternas").append(`
                   
                   <div class="msgs recebida indicador-de-digitacao">
                    <div class="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                   </div>

                `);

               var objDiv = document.getElementById("caixaDasMensagensInternas");
               objDiv.scrollTop = objDiv.scrollHeight;
      
      // DELAY DE ALGUNS SEGUNDOS ATÉ RESPONDER
      setTimeout(function(){ 

                console.log("ESSA É SESSAO QUE VAMOS BUSCAR: "+sessaoConteudo);

                // INICIO CHAMADA AJAX
                var request = $.ajax({

                    method: "POST",
                    url: app.urlApi+"conteudo.php",
                    data:{token:app.token,sessaoConteudo:sessaoConteudo}
                
                })
                request.done(function (dados) {            

                    console.log("%c RETORNO DA API SOBRE O CONTEÚDO","background:#ff0000;color:#fff;");
                    console.log(dados);

                    if(dados.sucesso=="200"){

                      $(".indicador-de-digitacao").fadeOut(20);
                       
                      // CASO TENHAMOS DICAS
                      if(dados.conteudo[0].dica!=""){

                          // APPEND A NOVA MENSAGEM
                            $("#caixaDasMensagensInternas").append(`

                            <div class="msgs recebida">
                                <b>Welbe</b><br clear="both">
                                ${dados.conteudo[0].pergunta} <a href="javascript:void(0)" class="dica" onclick="app.playDica(\`${dados.conteudo[0].dica}\`)" title="Ouvir dica"><i class="fa fa-volume-up"></i></a>
                                <small>${app.horaAtual()}</small>
                            </div>

                        `);
                      
                      // CASO NÃO TENHAMOS
                      }else{

                        // APPEND A NOVA MENSAGEM
                            $("#caixaDasMensagensInternas").append(`

                            <div class="msgs recebida">
                                <b>Welbe</b><br clear="both">
                                ${dados.conteudo[0].pergunta}
                                <small>${app.horaAtual()}</small>
                            </div>

                        `);

                      }

                      
                  
                     

                      if(dados.midia[0].tipo_content=="Imagem"){

                            $("#caixaDasMensagensInternas").append(`
                               
                               <div class="msgs recebida">
                                   <b>Welbe</b><br clear="both">
                                   <p>
                                      <img src="${app.urlCdn}${dados.midia[0].link}" style="width:100%;height:auto;" />
                                   </p>
                                   <small>${app.horaAtual()}</small>
                                </div>
                               
                            `);

                       }


                       if(dados.midia[0].tipo_content=="Vídeo"){

                            $("#caixaDasMensagensInternas").append(`
                               
                               <div class="msgs recebida">
                                   <b>Welbe</b><br clear="both">
                                   <p>
                                      ${dados.midia[0].link}
                                   </p>
                                   <small>${app.horaAtual()}</small>
                                </div>
                               
                            `);

                       }
                       
                       // SETAR OS PARAMETROS DAS ALTERNATIVAS
                       localStorage.setItem("totAlternativas",dados.alternativas.length);
                       localStorage.setItem("alternativas",JSON.stringify(dados.alternativas));
                       localStorage.setItem("alternativaAtual",0);
                       localStorage.setItem("perguntaAcertos",0);

                       $("#caixaDasMensagensInternas").append(`
                           
                                   <div class="msgs recebida indicador-de-digitacao">
                                    <div class="typing-indicator">
                                      <span></span>
                                      <span></span>
                                      <span></span>
                                    </div>
                                   </div>

                                `);

                       // APPEND DA PRIMEIRA ALTERNATIVA
                       setTimeout(function(){ 

                                    $(".indicador-de-digitacao").fadeOut(20);
                                    
                                    $("#caixaDasMensagensInternas").append(`

                                        <div class="msgs recebida">
                                            <b>Welbe</b><br clear="both">
                                            ${dados.alternativas[0].texto}
                                            <small>${app.horaAtual()}</small>
                                        </div>

                                    `);

                      }, 1000);

                       /*
                       for(var i = 0;i<dados.alternativas.length;i++){
                            
                            setTimeout(function(){ 
                            }, 100);
                                
                                    // APPEND A NOVA MENSAGEM
                                    $("#caixaDasMensagensInternas").append(`

                                        <div class="msgs recebida">
                                            <b>Welbe</b><br clear="both">
                                            ${dados.alternativas[i].texto}
                                            <small>${app.horaAtual()}</small>
                                        </div>

                                    `);

                           

                        }*/

                      var objDiv = document.getElementById("caixaDasMensagensInternas");
                      objDiv.scrollTop = objDiv.scrollHeight;

                    }else{

                        $(".indicador-de-digitacao").fadeOut(20);
                       
                        // APPEND A NOVA MENSAGEM
                        $("#caixaDasMensagensInternas").append(`

                            <div class="msgs recebida">
                               <b>Welbe</b><br clear="both">
                               Não encontrei nenhuma pergunta com esse ID :(
                               <small>${app.horaAtual()}</small>
                            </div>

                        `);

                        var objDiv = document.getElementById("caixaDasMensagensInternas");
                        objDiv.scrollTop = objDiv.scrollHeight;

                    }

                    
                });
                request.fail(function (dados) {
                       
                     console.log("API NÃO DISPONÍVEL (buscaConteudo)");
                     console.log(dados);
                     aviso("Oops! Algo deu errado","Nossos servidores estão passando por dificuldades técnicas, tente novamente em alguns minutos");

                });
                // FINAL CHAMADA AJAX

                

      }, 2500);

      

    }



}