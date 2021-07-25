var LISTA = document.getElementById('lista');
var BTNADD = document.getElementById('addtarefa');
var INPUTADD = document.getElementById('input-tarefa');
var FORM = document.getElementById('formulario-tarefa');
INPUTADD.focus();

FORM.addEventListener('submit',adicionar);

function adicionar(event){
    event.preventDefault();
    if(INPUTADD.value){
        var new_li = document.createElement("li");
        var conteudo = '<input onclick="completar(this)" type="checkbox" class="tarefa-check" />'+
        '<p>'+INPUTADD.value+'</p>'+
        '<button onclick="remover(this)" class="remover-tarefa"><img src="imagens/icon-lixo.png" alt="Remover tarefa" title="Remover tarefa" /></button>';
        new_li.innerHTML = conteudo;
        LISTA.appendChild(new_li);
        INPUTADD.value = "";
        salvarLocal();
    }
    INPUTADD.focus();
}

function completar(elemento){
    if(elemento.checked){
        elemento.parentElement.classList.add("ok");
    }else{
        elemento.parentElement.classList.remove("ok");
    }
    salvarLocal();
}

function remover(elemento){
    if (window.confirm("Você realmente quer apagar esta tarefa?")) {
        elemento.parentElement.remove();
        salvarLocal();
    }else{
        return false;
    }
}

function salvarLocal(){
    var LISTACOMPLETA = [];
    if(LISTA.querySelectorAll("li").length > 0){
        for(var i=0;i<LISTA.querySelectorAll("li").length; i++){
            LISTACOMPLETA.push({'tarefa_content': LISTA.querySelectorAll("li")[i].getElementsByTagName("p")[0].innerHTML, 'tarefa_ok': LISTA.querySelectorAll("li")[i].getElementsByTagName("input")[0].checked });
        }
        localStorage.setItem("LISTACOMPLETADETAREFAS", JSON.stringify(LISTACOMPLETA));
    }
}

function carregarLocal(){
    var LISTACOMPLETA = JSON.parse(localStorage.getItem("LISTACOMPLETADETAREFAS"));
    for(var i=0;i<LISTACOMPLETA.length; i++){
        var new_li = document.createElement("li");
        var checked = "";
        if(LISTACOMPLETA[i].tarefa_ok){
            checked = "checked";
            new_li.className = "ok";
        }
        var conteudo = '<input onclick="completar(this)" '+checked+' type="checkbox" class="tarefa-check" />'+
        '<p>'+LISTACOMPLETA[i].tarefa_content+'</p>'+
        '<button onclick="remover(this)" class="remover-tarefa"><img src="imagens/icon-lixo.png" alt="Remover tarefa" title="Remover tarefa" /></button>';
        new_li.innerHTML = conteudo;
        LISTA.appendChild(new_li);
    }
}

carregarLocal();