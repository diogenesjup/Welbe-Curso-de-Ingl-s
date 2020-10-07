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

        // 1 = Grammar 
        // 2 = Listening
        // 3 = Reading
        // 4 = Writing
        // 5 = Speaking
        // 6 = Pratctice

        if(metodo==1){ var nomeMetodo = "Grammar"; }
        if(metodo==2){ var nomeMetodo = "Listening"; }
        if(metodo==3){ var nomeMetodo = "Reading"; }
        if(metodo==4){ var nomeMetodo = "Writing"; }
        if(metodo==5){ var nomeMetodo = "Speaking"; }
        if(metodo==6){ var nomeMetodo = "Pratctice"; }
        
        // DIRECIONAR O USUÁRIO PARA A TELA DE CONVERSAÇÃO
        this.views.conversation(nomeMetodo);

        localStorage.setItem("metodo",metodo);
        
    }

    enviarMensagem(){
        
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

                <div class="msgs enviada">
                   <b style="color:#1E88E5;">${dadosUsuario.nome}</b><br clear="both">
                   ${msg}
                   <small>${app.horaAtual()}</small>
                </div>

            `);

            // BUSCAR O CONTEUDO NA API
            this.models.buscaConteudo(msg);

        }else{
            
            // APPEND A NOVA MENSAGEM
            $("#caixaDasMensagensInternas").append(`

                <div class="msgs recebida">
                   <b>Welbe</b><br clear="both">
                   Você enviou uma mensagem em branco!
                   <small>${app.horaAtual()}</small>
                </div>

            `);

            var objDiv = document.getElementById("caixaDasMensagensInternas");
            objDiv.scrollTop = objDiv.scrollHeight;

        }

        

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