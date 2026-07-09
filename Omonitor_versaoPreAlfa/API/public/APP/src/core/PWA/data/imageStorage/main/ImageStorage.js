export default class ImageStorage{

    constructor(){
       
    }

    getImage(){
        return async function(){ 
            
            const image = await getImage();
            const blob  = await image.arrayBuffer();
            const url   = URL.createObjectURL(image);
        }
    }

    async saveImage(blob , imageName){

         await saveImage(blob , image.name)

    }

    initDirectoryClientSide(){
        return async function(){
            await initDirectoryClientSide();
        }
    }
}

async function getImage() {

    const [handle] = await window.showOpenFilePicker({
        types: [{
            description: "Imagens",
            accept: {
                "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"]
            }
        }]
    });

    const file = await handle.getFile();

    return file;
}

async function saveImage(blob, filename) {

    const handle = await window.showSaveFilePicker({

        suggestedName: filename,

        types: [{
            description: "Imagem PNG",
            accept: {
                "image/png": [".png"]
            }
        }]
    });

    const writable = await handle.createWritable();

    await writable.write(blob);

    await writable.close();
}

async function initDirectoryClientSide(){

    const root = await window.showDirectoryPicker();

    const lotusDir = await root.getDirectoryHandle("Lotus", {
        create: true
    });

    const images = await lotusDir.getDirectoryHandle("images", {
        create: true
    });

    const files = await lotusDir.getDirectoryHandle("files", {
        create: true
    });

    const jsDirectory = await files.getDirectoryHandle("la")

}