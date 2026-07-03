export default function PWA(){

    window.addEventListener("load",()=>{
        registerSW();
    })
    
    async function registerSW() {
        if('serviceWorker' in navigator){
            
            try{
                await navigator.serviceWorker.register('APP/serviceWorker.js');
            }catch(e){
                throw new Error("serviceWorker resgistration failed") ;
            }
        }
    }

    
}