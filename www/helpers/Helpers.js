class Helpers {
     
    constructor(){
        console.log("CLASSE ESTÁTICA: DateHelper");
    }
    
    //AAAA-MM-DD > DD/MM/AAAA
    static converterData(tempData) {

        return `${tempData.getDate()}/${tempData.getMonth() + 1}/${tempData.getFullYear()}`;
        
    }
    
    // DEVOLVER A HORA ATUAL
    horaAtual(){
       
       var hora = new Date().getHours();
       var minutos = new Date().getMinutes();

       return hora+":"+minutos;

    }
    
  }