window.addEventListener('load', function() {

    var fileInput = document.getElementById('file');
    button = document.getElementById('inputBut');
    buttonP = document.getElementById('butPasso');

    fileInput.addEventListener('change', checkfile);
    button.addEventListener("click", () => {
        document.getElementById('passo').removeAttribute("disabled");
        document.getElementById('butPasso').removeAttribute("disabled");
    });
    buttonP.addEventListener("click", handleText);

});

function checkfile(event){

    var file = this.files[0];

    var fileType = file.name.split('.');

    fileType = fileType[fileType.length - 1];
    
    if (fileType != "csv") {
      alert("Tipo de arquivo inválido, por favor faça upload de um arquivo .csv");
      fileInput.value = "";
      
    } else {
        
        var reader = new FileReader();      
    
        reader.onload = function(e) {
            text = reader.result;
            button.removeAttribute("disabled");
        }
    
        reader.onerror = function(err) {
            console.log(err, err.loaded
                        , err.loaded === 0
                        , file);
            button.removeAttribute("disabled");
        }
    
        reader.readAsText(event.target.files[0]);

    } 
}

function handleText() {

    var i = parseInt(document.getElementById('passo').value) + 1;
    var passo = parseInt(document.getElementById('passo').value);
    
    console.log(i);
    console.log("i + passo = "+ (i+passo));

    console.log("text: "+text);

    let saida = document.getElementById("saida");
    text = text.split(',');

    console.log("Text: \n"+text);

    for(let f = 0; f<= text.length; f++){
        console.log(text[f])
    }

    var tabela = document.createElement("table");
    var cabecalho = document.createElement("thead");
    var corpo = document.createElement("tbody");

    let headR = document.createElement('tr');

    //Inserindo cabeçalho
    for(var h = 0; h < passo; h++){
       
        let head1 = document.createElement('th');
        head1.innerHTML = text[h];

        headR.appendChild(head1);
        
    }

    cabecalho.appendChild(headR);
    
    //Inserindo corpo
    for(i ; i < text.length; i += passo){
        var tr = document.createElement('tr'); 

        for(var j = i; j < (i + passo); j++){
            
            let td = tr.insertCell();
            td.innerHTML = text[j];
            
        }
        corpo.appendChild(tr);
    }

    tabela.appendChild(cabecalho);
    tabela.appendChild(corpo);

    saida.appendChild(tabela);

    button.setAttribute("disabled", "disabled");
    buttonP.setAttribute("disabled", "disabled");
    document.getElementById('passo').setAttribute("disabled", "disabled");
    // set `text` to `null` if not needed or referenced again
    text = null; 
}