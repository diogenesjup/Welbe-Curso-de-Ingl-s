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
    
    // BUSCAR CONTEUDO API
    buscaConteudo(sessaoConteudo){

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

                    // APPEND A NOVA MENSAGEM
                    $("#caixaDasMensagensInternas").append(`

                        <div class="msgs recebida">
                           <b>Welbe</b><br clear="both">
                           ${dados.conteudo[0].pergunta}
                           <small>${app.horaAtual()}</small>
                        </div>

                    `);
                    

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


                    var objDiv = document.getElementById("caixaDasMensagensInternas");
                    objDiv.scrollTop = objDiv.scrollHeight;

                  }else{
                     
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

    }



}