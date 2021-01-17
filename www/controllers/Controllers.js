class App {

    constructor(appId, appName, appVersion, appOs, ambiente, token) {

        this.appId = appId;
        this.appName = appName;
        this.appVersion = appVersion;        
        this.appOs = appOs;

        this.views = new Views();
        this.sessao = new Sessao();
        this.models = new Models();
        this.helpers = new Helpers();

        this.controleMsg = 0;

        if(ambiente=="HOMOLOGACAO"){
             
            this.urlDom = "http://127.0.0.1:8080/welbie/welbeChat/app/ambiente/app/www/";
            this.urlApi = "http://127.0.0.1:8080/welbie/welbeChat/app/ambiente/api/";
            this.urlCdn = "http://127.0.0.1:8080/welbie/welbeChat/app/ambiente/cdn/";

        }
        if(ambiente=="PRODUCAO"){

            this.urlDom = "https://welbe-api1.websiteseguro.com/appcursoingles/";
            this.urlApi = "https://welbe-api1.websiteseguro.com/appcursoingles/api/";
            this.urlCdn = "https://welbe-api1.websiteseguro.com/administrativo/arquivos/";

        }

        this.token = token;
        
    }
    
    getVersion() {

        return this.appVersion;
    }

    getOs(){

        return this.appOs;
    }
    
    initApp(elemento){

        this.views.viewPrincipal();

        // VERIFICAR SE A API ESTÁ OK
        this.models.testeApi();
        
        // VERIFICAR SE O USUÁRIO ESTÄ LOGADO
        this.sessao.verificarLogado();

        

    }



    inicio(){

        this.views.viewPrincipal();
        this.views.ativarMenuUm();

    }

    login(idUsuario,emailUusario,dadosUsuario){
        this.sessao.logarUsuario(idUsuario,emailUusario,dadosUsuario);
    }
    
    procLogin(){
        this.models.procLogin();
    }
    
    procLogoff(){

        confirmacao("Tem certeza que deseja sair?","Você será desconectado...","app.logoff();","Sim, sair");
        
    }

    logoff(){
        
        $("header .logo a").attr("onclick",'');
        localStorage.clear();
        app.viewLogin();

    }

    cadastro(){
        this.views.viewCadastro();
        this.views.desativarTodosMenus();
    }

    procCadastro(){
        this.models.procCadastro();
    }


    esqueciMinhaSenha(){
        this.views.viewEsqueciMinhaSenha();
        this.views.desativarTodosMenus();
    }

    procResetSenha(){
        this.models.procResetSenha();
    }

    initIA(metodo){



        var tipoExercicio = localStorage.getItem("tipoExercicio");
        var habilidade = localStorage.getItem("habilidade");
        var idAtividade = localStorage.getItem("idAtividade");


        if(tipoExercicio==1){ var nomeNivel = "Beginner"; }
        if(tipoExercicio==2){ var nomeNivel = "Basic"; }
        if(tipoExercicio==3){ var nomeNivel = "Pre-Intermediate"; }
        if(tipoExercicio==4){ var nomeNivel = "Intermediate"; }
        if(tipoExercicio==5){ var nomeNivel = "Pre-Advanced"; }
        if(tipoExercicio==6){ var nomeNivel = "Advanced"; }

        if(habilidade==1){ var nomeMetodo = "Grammar"; }
        if(habilidade==2){ var nomeMetodo = "Listening"; }
        if(habilidade==3){ var nomeMetodo = "Reading"; }
        if(habilidade==4){ var nomeMetodo = "Writing"; }
        if(habilidade==5){ var nomeMetodo = "Speaking"; }
        if(habilidade==6){ var nomeMetodo = "Pratctice"; }
       
       localStorage.setItem("atividadeHeranca",metodo);

        
        // DIRECIONAR O USUÁRIO PARA A TELA DE CONVERSAÇÃO
        this.views.conversation(nomeNivel, nomeMetodo, idAtividade);
        this.models.buscaConteudo(metodo);

        
        
    }

    tipoExercicio(tipoExercicio){

        localStorage.setItem("tipoExercicio",tipoExercicio);

        this.views.tipoExercicio(tipoExercicio);
    }

    selectAtividade(habilidade){

        localStorage.setItem("habilidade",habilidade);

        var tipoExercicio = localStorage.getItem("tipoExercicio");
       
        
        this.views.selectAtividade(habilidade);
        this.models.selectAtividade(tipoExercicio,habilidade);

    }

    conversas(idAtividade){

        //this.views.conversas();
        app.initIA(idAtividade);
        
    }

    enviarMensagem(){

        app.respostaAudio();
        
        // RESPOSTA DO USUÁRIO
        var msg = $("#enviarmensagemInterna").val();

        
        
        // RECUPERAR DADOS DO USUÁRIO
        var dadosUsuario = JSON.parse(localStorage.getItem("dadosUsuario"));

        // LIMPAR O CAMPO DE MENSAGENS
        $("#enviarmensagemInterna").val("");

        // FORÇA A CAIXA DE MENSAGENS A DAR UM SCROLL PARA BAIXO
        var objDiv = document.getElementById("caixaDasMensagensInternas");
        objDiv.scrollTop = objDiv.scrollHeight;

        if(msg!=""){

            

            // APPEND A NOVA MENSAGEM
            $("#caixaDasMensagensInternas").append(`

                <div class="msgs enviada" id="iddent${this.controleMsg}">
                   <b style="color:#1E88E5;">${dadosUsuario.nome}</b><br clear="both">
                   ${msg}
                   <small>${app.horaAtual()}</small>
                </div>

            `);

            

            // BUSCAR O CONTEUDO NA API
            //this.models.buscaConteudo(msg);

            // CORRIGIR A RESPOSTA
            var totAlternativas = localStorage.getItem("totAlternativas");
            var alternativaAtual = localStorage.getItem("alternativaAtual");
            var arrayAlternativas = JSON.parse(localStorage.getItem("alternativas"));

            if( msg.toLowerCase().indexOf($.trim(arrayAlternativas[alternativaAtual].aceitas.toLowerCase()))>-1 ){
               
               console.log("ACERTOU");
               $("#iddent"+this.controleMsg).addClass("correcao-acerto");
               console.log("RESPOSTA DO USUÁRIO: "+msg.toLowerCase);
               console.log("RESPOSTAS ACEITAS: "+arrayAlternativas[alternativaAtual].aceitas.toLowerCase());
               
               var acertos = localStorage.getItem("perguntaAcertos");
               acertos = parseInt(acertos) + 1;

               localStorage.setItem("perguntaAcertos",acertos);

            }else{
               
               console.log("ERROU");
               $("#iddent"+this.controleMsg).addClass("correcao-erro");
               console.log("RESPOSTA DO USUÁRIO: "+msg.toLowerCase);
               console.log("RESPOSTAS ACEITAS: "+arrayAlternativas[alternativaAtual].aceitas.toLowerCase());

            }

            alternativaAtual++;
            this.controleMsg = this.controleMsg + 1;

            localStorage.setItem("alternativaAtual",alternativaAtual);

            app.alimentarAlternativa();

        }else{
            
            // APPEND A NOVA MENSAGEM
            /*
            $("#caixaDasMensagensInternas").append(`

                <div class="msgs recebida">
                   <b>Welbe</b><br clear="both">
                   Você enviou uma mensagem em branco!
                   <small>${app.horaAtual()}</small>
                </div>

            `);

            var objDiv = document.getElementById("caixaDasMensagensInternas");
            objDiv.scrollTop = objDiv.scrollHeight;
            */

           console.log("COMEÇAR A OUVIR");
           app.ouvirUsuario();

        }

        

    }

    alimentarAlternativa(){
      
                       var totAlternativas = localStorage.getItem("totAlternativas");
                       var alternativas = JSON.parse(localStorage.getItem("alternativas"));
                       var alternativaAtual = localStorage.getItem("alternativaAtual");
                       
                

                       if(alternativaAtual<totAlternativas){

                                $("#caixaDasMensagensInternas").append(`
                           
                                   <div class="msgs recebida indicador-de-digitacao">
                                    <div class="typing-indicator">
                                      <span></span>
                                      <span></span>
                                      <span></span>
                                    </div>
                                   </div>

                                `);


                               setTimeout(function(){ 

                                       $(".indicador-de-digitacao").fadeOut(20);

                                       // APPEND DA PRÓXIMA ALTERNATIVA
                                       $("#caixaDasMensagensInternas").append(`

                                            <div class="msgs recebida">
                                               <b>Welbe</b><br clear="both">
                                               ${alternativas[alternativaAtual].texto}
                                               <small>${app.horaAtual()}</small>
                                            </div>

                                        `);

                                        var objDiv = document.getElementById("caixaDasMensagensInternas");
                                        objDiv.scrollTop = objDiv.scrollHeight;

                                }, 2500);

                       }else{
                          
                          //console.log("ACABARAM AS ALTERNATIVAS");

                          finalizacao(`

                              Das ${totAlternativas} alternativas, você acertou um total de <b>${parseInt(localStorage.getItem("perguntaAcertos"))}</b>. Continue nesse ritmo que você vai longe!
                          `)



                       }

    }

    respostaTexto(){

        this.views.respostaTexto();
        
        var valorCampo = $("#enviarmensagemInterna").val();

        if(valorCampo=="" || valorCampo==null || valorCampo.length == 0){

            $("#btnEnviarMensagemInterna").addClass("ouvir-usuario");
        
        }else{
        
            $("#btnEnviarMensagemInterna").removeClass("ouvir-usuario");
        
        }
        
    }

    respostaAudio(){

        this.views.respostaAudio();

        $("#btnEnviarMensagemInterna").addClass("ouvir-usuario");

    }





    ouvirUsuario(){

             console.log("VAMOS COMEÇAR A OUVIR O USUÁRIO");

            // COMANDO POR VOZ
            var comandosPorVoz = "nao";
            var noteContent;

            try {
              var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
              var recognition = new SpeechRecognition();
               comandosPorVoz = "sim";
            }
            catch(e) {
              console.error(e);
              aviso("Oops! Microfone indisponível","Desculpe, não conseguimos acessar o seu microfone");
            }

            recognition.onstart = function() { 
              //aviso('Estamos te ouvindo.','Fale pausadamente para uma melhor captura do seu áudio');
              $("#enviarmensagemInterna").val("Comece a falar, estou te ouvindo");
            }
            /*
            recognition.onspeechend = function() {
              aviso('Não estou conseguindo te ouvir.','Tente falar pausadamente e mais próximo do seu disposítivo');
            }
            */

            recognition.onerror = function(event) {
              if(event.error == 'no-speech') {
                aviso("Oops! Microfone indisponível","Desculpe, não conseguimos acessar o seu microfone"); 
              };
            }

            recognition.onresult = function(event) {

              var current = event.resultIndex;
              var transcript = event.results[current][0].transcript;
              $("#enviarmensagemInterna").val(transcript);
              
              //app.enviarMensagem();
              app.respostaTexto();

            }


            if(comandosPorVoz=="sim"){ 

                recognition.start();
                // PARANDO DE OUVIR EM 7 SEGUNDOS
                //setTimeout("recognition.stop();", 7000);  

            }
              
                /*
               $('#comendoPorVoz').on('click', function(e) {
                  recognition.start();
                  // PARANDO DE OUVIR EM 7 SEGUNDOS
                  setTimeout("recognition.stop();", 7000);    
                  $("#destino").focus();
              });
              */

        
    }

    playDica(dica){
        
        // ALIMENTAR O IFRAME DE DICA
        $("#dica").attr("src","http://www.youtube.com/embed/"+dica+"?autoplay=1");

    }


    horaAtual(){
        return this.helpers.horaAtual();
    }

    view2(){
        this.views.view2();
        this.views.ativarMenuDois();
    }

    view3(){
        this.views.view3();
        this.views.ativarMenuTres();
    }

    viewLogin(){
        this.views.viewLogin();
        this.views.desativarTodosMenus();
    }

    viewUploadFoto(){
        this.views.viewUploadFoto();
        this.views.desativarTodosMenus();
    }

}


class Sessao{
    
	constructor(){
	      
	     this.logado = "nao-logado";
	     this.bdLogado = localStorage.getItem("bdLogado");
	     this.idUsuario = localStorage.getItem("idUsuario");
	     this.emailUsuario = localStorage.getItem("emailUsuario");
	     this.dadosUsuario = localStorage.getItem("dadosUsuario");

	}
    
    logarUsuario(idUsuario,emailUusario,dadosUsuario){
    	this.logado = "logado";
    	this.idUsuario = idUsuario;
    	this.dadosUsuario = dadosUsuario;
    	localStorage.setItem("bdLogado","logado");
        localStorage.setItem("idUsuario",this.idUsuario);
        
        // DIRECIONAR O USUÁRIO PARA O INÍCIO
    	app.inicio();
    }

    verificarLogado(){
      
	      if(this.bdLogado!="logado"){
	      	app.viewLogin();
	      	
	      }

    }

    deslogarUusario(){
    	this.logado = "nao-logado";
    	localStorage.setItem("bdLogado","nao-logado");
    	localStorage.clear();
    }

}