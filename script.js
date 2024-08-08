//

const fecha= document.querySelector('#fecha');
const lista= document.querySelector('#lista');
const elemento= document.querySelector('#elemento');
const input = document.querySelector('#input');
const botonAgregar = document.querySelector('#botonAgregar');
const check = 'bi-check2-circle';
const tachado = 'tachado';
const uncheck = 'bi-circle';
let LIST;
let id;

const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString('es-Mx', {weekday: 'long', day: 'numeric', month: 'long'});

//DOM




// Función para agregar una tarea

function nuevaTarea(tarea,id,hecho,eliminado){
    if(eliminado){
        return;
    
    };

    const realizado = hecho ? check : uncheck;
    const LINE = hecho ? tachado : '' ;
    const elemento= `<li id="elemento">
                    <i id="0" data="hecho" class="bi ${realizado}"></i>
                    <p class="tarea-lista text ${LINE}">${tarea}</p>
                    <i id="0" data="eliminado" class="bi bi-trash3-fill"></i>
                </li> `
                lista.insertAdjacentHTML("beforeend",elemento);
};

// Función 

function tareaRealizada(elemento) {
    elemento.classList.toggle(check);
    elemento.classList.toggle(uncheck);
    elemento.parentNode.querySelector('.text').classList.toggle(tachado);
    LIST[elemento.id].hecho = LIST[elemento.id].hecho ? false : true;

};

function tareaEliminada(elemento) {
    elemento.parentNode.parentNode.removeChild(elemento.parentNode);
    LIST[elemento.id].eliminado = true;

};

botonAgregar.addEventListener('click', () =>{

    const tarea = input.value;
    if (tarea) {
        nuevaTarea(tarea, id, false, false);
        LIST.push({
            nombre: tarea,
            id: id,
            hecho: false,
            eliminado: false
        });
        localStorage.setItem('TODO', JSON.stringify(LIST));
        id++;   
        input.value = '';
    }
});

lista.addEventListener('click', function (event){
    const elemento = event.target;
    const elementoData = elemento.attributes.data.value;

    if (elementoData == 'hecho') {
        tareaRealizada(elemento);
    } else if (elementoData == 'eliminado') {
        tareaEliminada(elemento);
    };
    localStorage.setItem('TODO', JSON.stringify(LIST));

});

let data = localStorage.getItem('TODO');
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
} else {
    LIST = [];
    id = 0;
};

function cargarLista(array){
    array.forEach(
        function (item){
            nuevaTarea(item.nombre, item.id, item.hecho, item.eliminado);
        }
    );
    
}



