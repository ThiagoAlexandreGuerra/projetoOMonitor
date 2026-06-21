export default function enableDragging(element){

   

    if (this._isAbleToMove) {
           this.element.addEventListener("mousedown", (e) => mouseDownEvent(e));
            document.addEventListener("mousemove", (e) => mouseMoveEvent(e));
            document.addEventListener("mouseup", (e) => mouseUpEvent(e));
    }
    

    function mouseDownEvent(element){
        this.isDragging = true;

        this.offsetX = element.clientX - this._element.offsetLeft;
        this.offsetY = element.clientY - this._element.offsetTop;

        this._element.style.transform = "none";
    }

    function mouseMoveEvent(element){
        if (!this.isDragging) return;

        this._element.style.left = `${element.clientX - this.offsetX}px`;
        this._element.style.top = `${element.clientY - this.offsetY}px`;
    }

    function mouseUpEvent(element){
         this.isDragging = false;
    }

    function mouseMoveEventParaWindow(element){
        position_x=evento.clientX
        position_y=evento.clientY

        let rotate= Math.atan2(position_y,position_x)*180/Math.PI

    }

    
   
}