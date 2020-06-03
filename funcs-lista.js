window.addEventListener('load', function() {
    
    let butLista = document.getElementById("lista-add");
    let input = document.getElementById("lista-inp");
    var saida = document.getElementById("saida"); 
    var counts = document.getElementById("counts");
    var count = 0;

    input.addEventListener("keypress" , (e) => {
        if(e.keyCode == 13){
            add();
        }
    });

    butLista.addEventListener("click", add);

    function add(){
        let val = document.getElementById("lista-inp").value;
        document.getElementById("lista-inp").value = "";
        
        let counts = document.getElementById("counts");
    
        if(val){
            
            //Criando a checkbox
            let box = document.createElement("input");
            box.type = "checkbox";
            box.id = `item-${count}`;
            box.className = "checkbox";
            console.log(box.id);
            
            box.addEventListener("click", changePos);
            
            //Criando a label
            let label = document.createElement("label");
            label.id = `label-item-${count}`;
            label.htmlFor = `item-${count}`;
            label.appendChild(document.createTextNode(val));
            
            //Criando o counter
            let counterIt = document.createElement("p");
            let span = document.createElement("span");
            counterIt.id = `count-${count}`;
            span.id = `span-${count}`;
            counterIt.appendChild(document.createTextNode(val + ": "));
            counterIt.appendChild(span);
            counts.appendChild(counterIt);

            //Criando a div
            let div = document.createElement("div");
            div.id = `div-item-${count}`;

            div.appendChild(box);
            div.appendChild(label);

            saida.appendChild(div);
            
            //Desabilita as box que não forem a primeira
            if(count > 0){
                box.disabled = true;
            }

            count++;
        }
    }

    function changePos(e){
        
        let id = e.target.id;
        let idN = id.split("-")[1];

        let actual = document.getElementById(`span-${idN}`);
        
        if (!actual.textContent){
            actual.textContent = 1;
        } else {
            actual.textContent = Number(actual.textContent) + 1;
        }
        
        let box = document.getElementById(id);
        let label = document.getElementById(`label-${id}`);
        let div = document.getElementById(`div-${id}`);

        //Risca a label
        label.style = "text-decoration: line-through";

        let horas = new Date();
        document.getElementById("nome").innerText = label.textContent;
        document.getElementById("hora").innerText = horas.getHours() + ":" + horas.getMinutes();

        document.getElementById("ann").style.display = "block";

        setTimeout( () => {
            
            //Exclui a div da parent
            saida.removeChild(saida.firstChild);
            
            //Bota a div novamente em último lugar da página, tira o check e tira o risco da label
            saida.appendChild(div);
            box.checked = false;
            label.style = "text-decoration: none";

            //Desabilita a checkbox e habilita o primeiro filho do parent
            saida.lastChild.firstChild.disabled = true;
            saida.firstChild.firstChild.disabled = false;

        }, 1000);
    }

});