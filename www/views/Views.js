class Views{
    
	constructor(){
	      
	     this._content = $("section#content"); 

	     this._allMenus = $("footer * a");
	     this._menu1 = $("footer .menu-1 a");
	     this._menu2 = $("footer .menu-2 a");
	     this._menu3 = $("footer .menu-3 a");

       this.header = $("header");
       this.footer = $("footer");

	}

	animarTransicao(){
		new WOW().init();
	}
  
    viewPrincipal(){

            $("header .apoio").show();
            $("header .logo a").attr("onclick","app.inicio()");

            this._content.html(`
            
               <div class="row view-principal" view-name="view-principal">
                  <div class="col-12 wow fadeInUp">
                     
                     <nav>
                        <ul>
                          <li onclick="app.initIA(1);">
                             <img src="assets/images/profile.png" alt="Grammar" />
                             <h3>Grammar <small>Click for conversation</small></h3>
                          </li>
                          <li onclick="app.initIA(2);">
                             <img src="assets/images/profile.png" alt="Listening" />
                             <h3>Listening <small>Click for conversation</small></h3>
                          </li>
                          <li onclick="app.initIA(3);">
                             <img src="assets/images/profile.png" alt="Reading" />
                             <h3>Reading <small>Click for conversation</small></h3>
                          </li>
                          <li onclick="app.initIA(4);">
                             <img src="assets/images/profile.png" alt="Writing" />
                             <h3>Writing <small>Click for conversation</small></h3>
                          </li>
                          <li onclick="app.initIA(5);">
                             <img src="assets/images/profile.png" alt="Speaking" />
                             <h3>Speaking <small>Click for conversation</small></h3>
                          </li>
                          <li onclick="app.initIA(6);">
                             <img src="assets/images/profile.png" alt="Pratctice" />
                             <h3>Pratctice <small>Click for conversation</small></h3>
                          </li>
                        </ul>
                      </nav>


                  </div>
               </div>
            
            `);

            this.animarTransicao();

            $("footer").fadeIn();
        
    }

    conversation(nomeMetodo){

         $("header .logo a").attr("onclick","app.inicio()");

         this._content.html(`
            
               <div class="row view-conversation" view-name="view-2">
                  <div class="col-12 wow fadeInLeft" data-wow-delay="0.0s" data-wow-duration="0.3s">
                     
                     <!-- CAIXA DAS MENSAGENS -->     
                     <div class="caixa-das-mensagens" id="caixaDasMensagensInternas">
                         
                         <div class="msgs recebida">
                            <b>Você entrou no método ${nomeMetodo}</b><br clear="both">
                            Digite o ID da pergunta exibida no admin para ver a simulação
                            <small>${app.horaAtual()}</small>
                         </div>

                     </div>
                     <!-- CAIXA DAS MENSAGENS -->


                    <!-- DEIXAR FLUTUANDO A CAIXA DE MENSAGENS -->
                    <div class="caixa-de-mensagem-flutuante">
                       <form method="post" action="javascript:void(0)" onsubmit="app.enviarMensagem();">
                         <div class="form-group has-feedback">
                            <input type="text" class="form-control" placeholder="Digite aqui..." id="enviarmensagemInterna">
                            <img src="assets/images/enviar-mensagem.png" alt="Enviar mensagens" id="btnEnviarMensagemInterna" onclick="app.enviarMensagem();">
                         </div>
                        </form>
                    </div>
                    <!-- DEIXAR FLUTUANDO A CAIXA DE MENSAGENS -->

                  </div>
               </div>
            
            `);

            this.animarTransicao();
    }

    view2(){

            this._content.html(`
            
               <div class="row view-2" view-name="view-2">
                  <div class="col-12 wow fadeInLeft" data-wow-delay="0.0s" data-wow-duration="0.3s">
                     <h2>View 2</h2>
                     <p>Essa é a segunda view</p>
                  </div>
               </div>
            
            `);

            this.animarTransicao();
        
    }

    view3(){

            this._content.html(`
            
               <div class="row view-3" view-name="view-3">
                  <div class="col-12 wow fadeInRight" data-wow-delay="0.0s" data-wow-duration="0.3s">
                     <h2>View 3</h2>
                     <p>Esse é a terceira view</p>
                  </div>
               </div>
            
            `);

            this.animarTransicao();
        
    }


    viewLogin(){

            $("header .apoio").hide();


            this._content.html(`
            
               <div class="row view-login" view-name="view-login">
                  <div class="col-12 wow fadeInRight" data-wow-delay="0.0s" data-wow-duration="0.3s">
                     <h2>Login</h2>
                     
                     
                     <form method="post" action="javascript:void(0)" onsubmit="app.procLogin(event)">
                        <div class="form-group">
                           <label>Seu login</label>
                           <input type="text" class="form-control" onclick="ativarFormularioFlutuante('#loginUsuario','Seu Login')" id="loginUsuario" placeholder="Seu e-mail ou usuário" required />
                        </div>
                        <div class="form-group">
                           <label>Sua senha</label>
                           <input type="password" class="form-control" id="loginSenha" placeholder="Sua senha de acesso" required />
                        </div>
                        <div class="form-group">
                           <button class="btn btn-primary">
                              Login
                           </button>
                        </div>
                        
                     </form>

                     <div class="form-group link-apoio text-center">
                          <a href="javascript:void(0)" onclick="app.esqueciMinhaSenha()" title="Esqueci minha senha">
                              Esqueci minha senha
                          </a>
                        </div>

                     <div class="form-group link-apoio text-center">
                          <a href="javascript:void(0)" onclick="app.cadastro()" title="Criar uma conta">
                              Criar uma conta
                          </a>
                        </div>

                  </div>
               </div>
            
            `);

            $("footer").hide();

            this.animarTransicao();
        
    }


    viewCadastro(){

         $("header .apoio").hide();

         this._content.html(`
            
               <div class="row view-login" view-name="view-login">
                  <div class="col-12 wow fadeInRight" data-wow-delay="0.0s" data-wow-duration="0.3s">
                     <h2>Cadastro</h2>
                     
                     
                     <form method="post" action="javascript:void(0)" onsubmit="app.procCadastro(event)">
                        <div class="form-group">
                           <label>Seu Nome</label>
                           <input type="text" id="cadastroNome" onclick="ativarFormularioFlutuante('#cadastroNome','Seu nome completo')" class="form-control" placeholder="Seu nome completo" required />
                        </div>
                        <div class="form-group">
                           <label>Seu login</label>
                           <input type="email" id="cadastroEmail" onclick="ativarFormularioFlutuante('#cadastroEmail','Seu e-mail (será o login)')" class="form-control" placeholder="Seu e-mail ou usuário" required />
                        </div>
                        <div class="form-group">
                           <label>Sua senha</label>
                           <input type="password" id="cadastroSenha" class="form-control" placeholder="Sua senha de acesso" required />
                        </div>
                        <div class="form-group">
                           <button class="btn btn-primary">
                              Cadastrar
                           </button>
                        </div>
                     </form>

                     <div class="form-group link-apoio text-center">
                          <a href="javascript:void(0)" onclick="app.viewLogin()" title="Já tenho uma conta">
                              Já tenho uma conta
                          </a>
                        </div>

                  </div>
               </div>
            
            `);

            $("footer").hide();

            this.animarTransicao();

    }
    
    viewEsqueciMinhaSenha(){

          $("header .apoio").hide();

          this._content.html(`
            
               <div class="row view-login" view-name="view-login">
                  <div class="col-12 wow fadeInRight" data-wow-delay="0.0s" data-wow-duration="0.3s">
                     <h2>Esqueci minha senha</h2>
                     
                     
                     <form method="post" action="javascript:void(0)" onsubmit="app.procResetSenha(event)">
                        
                        <div class="form-group">
                           <label>Seu e-mail ou usuário cadastrado</label>
                           <input type="email" class="form-control" id="resetEmail" onclick="ativarFormularioFlutuante('#resetEmail','Seu e-mail cadastrado')" placeholder="Seu e-mail ou usuário" required />
                        </div>
                       
                        <div class="form-group">
                           <button class="btn btn-primary">
                              Resetar senha
                           </button>
                        </div>
                     </form>

                     <div class="form-group link-apoio text-center">
                          <a href="javascript:void(0)" onclick="app.viewLogin()" title="Cancelar reset de senha">
                              Cancelar
                          </a>
                        </div>

                  </div>
               </div>
            
            `);

            $("footer").hide();

            this.animarTransicao();

    }
    

    // VIEW UPLOAD DE FOTO
    viewUploadFoto(){
        
        this._content.html(`
            
               <div class="row view-login" view-name="view-login">
                  <div class="col-12 wow fadeInRight" data-wow-delay="0.0s" data-wow-duration="0.3s">
                     <h2>Upload de foto</h2>
                     <p>Fazer upload de imagens via input ou camêra</p>
                     
                     <form class="fileForm" method="post" enctype="multipart/form-data" action="${app.urlApi}v1-imagens-upload.php">
                        
                        <input type="hidden" name="token" value="${app.token}" />
                        <input type="hidden" name="id_usuario" value="${localStorage.getItem("idUsuario")}" />

                         <div class="form-group">
                           <label for="fileArquivo" class="btn btn-default" style="width:100%;">Selecionar arquivo</label>
                           <input style="opacity:0;display:block;height:auto;width:100%;" type="file" id="fileArquivo" class="upload-imagem" name="arquivo" />
                         </div>



                     </form>

                     <div class="form-group">
                         <a href="javascript:void(0)" class="btn btn-primary" onclick="uploadLocal();">
                            Enviar o arquivo
                         </a>
                     </div>

                     <div class="retorno-upload"></div>

                     <div class="form-group link-apoio text-center">
                          <a href="javascript:void(0)" onclick="app.inicio()" title="Cancelar upload de imagens">
                              Cancelar
                          </a>
                     </div>

                  </div>
               </div>
            
            `);
        
        this.animarTransicao();

    }


    desativarTodosMenus(){
    	this._allMenus.css("font-weight","normal");
    }

    ativarMenuUm(){
    	this.desativarTodosMenus();
       	this._menu1.css("font-weight","bold"); 
    }
    ativarMenuDois(){
    	this.desativarTodosMenus();
       	this._menu2.css("font-weight","bold"); 
    }
    ativarMenuTres(){
    	this.desativarTodosMenus();
       	this._menu3.css("font-weight","bold"); 
    }



}

