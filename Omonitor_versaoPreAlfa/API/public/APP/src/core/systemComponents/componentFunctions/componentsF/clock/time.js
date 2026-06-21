 function time(){
        
        let datatoday= new Date()
        let hr  = datatoday.getHours()
        let min = datatoday.getMinutes()
        let seg = datatoday.getSeconds()

        let data_minutos_com_zero=(datatoday.getMinutes()>=10? datatoday.getMinutes(): "0"+datatoday.getMinutes())       //na anotação    
        let data_horas_com_zero=(datatoday.getHours()>=10? datatoday.getHours(): "0"+datatoday.getHours())
        let data_segundo_com_zero=(datatoday.getSeconds()>=10?datatoday.getSeconds(): "0"+datatoday.getSeconds())

        this._hora.text = data_horas_com_zero + ":";
        this._minuto.text = data_minutos_com_zero + ":";
        this._segundo.text = data_segundo_com_zero;
    }