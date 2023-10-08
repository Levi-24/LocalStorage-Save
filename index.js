/*Alap tomb inicializalasa (ha nincs localstorageban akkor az alap verziot tolti be)*/
let allapot = JSON.parse(localStorage.getItem("ListaAllapot")) || {
    lista: [
        {
            string: "asd",
            int: 123,
            bool: true,
        },
        {
            string: "asd",
            int: 123,
            bool: false,
        },
        {
            string: "asd",
            int: 123,
            bool: true,
        }
    ]
};

/*Tomb adatainak mentese lcoalstorageba*/
function mentes(){
    localStorage.setItem("ListaAllapot",JSON.stringify(allapot));
};

/*Tomb elemeinek kiirasa*/
function render(){
    let lista = "";
    allapot.lista.forEach(elem => {
        lista += `
        <div class="col">
            <div class="box">
                <div class="${elem.bool ? "bg-success" : "bg-danger"} m-4 p-4 text-center text-white">
                    <p>${elem.string}</p>
                    <p>${elem.int}</p>
                    <button class="btn btn-danger" onclick = "torles()">Törlés</button>
                </div>
            </div>
        </div>
        `;
    });

    document.getElementById('lista').innerHTML = lista;
};

/*Torles funkcio*/
function torles(){
    allapot.lista.splice(index, 1);
    mentes();
    render();
}

/*Uj elem felvetele*/
let btn = document.getElementById('uj');
btn.onclick = () => {
    let ujForm = `
    <h4>Uj elem</h4>
    <form id="formSubmit">
        <label for="String">String:</label>
        <input type="text" name="String">

        <label for="Int">Int:</label>
        <input type="number" name="Int">
    
        <label for="Bool">Bool:</label>
        <input type="checkbox" name="Bool">

        <button type="submit">Kesz</button>
    </form>
    `;
    document.getElementById('ujForm').innerHTML = ujForm;
    document.getElementById('formSubmit').onsubmit = function(event){
        event.preventDefault;
        let string = event.target.elements.String.value;
        let int = event.target.elements.Int.value;
        let bool = event.target.elements.Bool.value;

        allapot.lista.push({
            string: string,
            int: int,
            bool: bool
        })
        document.getElementById("ujForm").innerHTML = "";
        mentes();
        render();
    }
}

/*Elemek kiirasa az oldal betoltesekor*/
window.onload = render();
