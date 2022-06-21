const navbar = document.querySelector(".navbar");
const openNavbar = document.querySelector(".open-navbar");
const closeNavbar = document.querySelector(".close-navbar");
const navbarLinks = navbar.querySelectorAll(".list");
const home = document.querySelector(".home");

const btnPrev = document.querySelectorAll(".btn-left");
const btnNext = document.querySelectorAll(".btn-right");

const form = document.querySelector("form");

const inputEntrada = document.querySelector("#input-entrada");
const inputSaida = document.querySelector("#input-saida");
const btnCriptografar = document.querySelector("#btn-criptografar");
const btnDescriptografar = document.querySelector("#btn-descriptografar");
const btnCopiar = document.querySelector("#copiar");

btnCriptografar.addEventListener("click", criptografar);
btnDescriptografar.addEventListener("click", descriptografar);
btnCopiar.addEventListener("click", copiar);

const printsCodificador = [
    "./img/enc1.png",
    "./img/enc2.png",
    "./img/enc3.png",
];
const printsForca = ["./img/for2.png", "./img/for1.png", "./img/for3.png"];

//navbar
document.body.onresize = function () {
    if (document.body.clientWidth > 838) {
        navbar.classList.remove("show-navbar");
    }
};
openNavbar.addEventListener("click", function () {
    if (document.body.clientWidth <= 838) {
        navbar.classList.add("show-navbar");
    }
});
closeNavbar.addEventListener("click", function () {
    navbar.classList.remove("show-navbar");
});

navbarLinks.forEach(function (item) {
    item.addEventListener("click", function () {
        navbar.classList.remove("show-navbar");
    });
});

window.addEventListener("scroll", function () {
    if (window.scrollY >= 483) {
        home.classList.add("show-home");
    } else {
        home.classList.remove("show-home");
    }
});

home.addEventListener("click", function () {
    window.scrollTo({ left: 0, top: 0 });
});

//change img projects
let indexCodificador = 0;
let indexForca = 0;

btnPrev.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        let parent = e.currentTarget.parentElement;
        if (parent.id == "expImg1") {
            indexCodificador--;

            if (indexCodificador < 0) {
                indexCodificador = printsCodificador.length - 1;
            }

            parent.querySelector("img").src =
                printsCodificador[indexCodificador];
        } else {
            indexForca--;

            if (indexForca < 0) {
                indexForca = printsForca.length - 1;
            }

            parent.querySelector("img").src = printsForca[indexForca];
        }
    });
});

btnNext.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        let parent = e.currentTarget.parentElement;
        if (parent.id == "expImg1") {
            indexCodificador++;

            if (indexCodificador > printsCodificador.length - 1) {
                indexCodificador = 0;
            }

            parent.querySelector("img").src =
                printsCodificador[indexCodificador];
        } else {
            indexForca++;

            if (indexForca > printsForca.length - 1) {
                indexForca = 0;
            }

            parent.querySelector("img").src = printsForca[indexForca];
        }
    });
});

//input
form.addEventListener("submit", function (e) {
    e.preventDefault();

    this.reset();
});

//codificador Demo
let backup = [];
let mensagemAtual = "";

const criptografia = [
    ["a", "ai"],
    ["e", "enter"],
    ["i", "imes"],
    ["o", "ober"],
    ["u", "ufat"],
];

inputEntrada.addEventListener("input", function (e) {
    if (e.data !== null) {
        let word = e.data.toLowerCase();

        if (validar(word)) {
            backup.push(word);
            backup = inputEntrada.value.split("");
        } else {
            inputEntrada.value = backup.join("");
        }

        console.log(backup);
    }
});

function validar(letra) {
    const pattern = /[a-z]/;

    if (letra.match(pattern)) {
        return true;
    } else {
        return false;
    }
}

function criptografar() {
    let texto = inputEntrada.value.toLowerCase();
    let resultado = "";

    if (texto !== "") {
        resultado = texto.replaceAll(/a|e|i|o|u/g, function (x) {
            if (x == criptografia[0][0]) {
                return criptografia[0][1];
            } else if (x == criptografia[1][0]) {
                return criptografia[1][1];
            } else if (x == criptografia[2][0]) {
                return criptografia[2][1];
            } else if (x == criptografia[3][0]) {
                return criptografia[3][1];
            } else if (x == criptografia[4][0]) {
                return criptografia[4][1];
            }
        });

        inputSaida.value = resultado;
        mudarCorBotaoCopiar();
    }
}
function descriptografar() {
    let texto = inputEntrada.value;
    let resultado = "";

    if (texto !== "") {
        resultado = texto.replaceAll(/ai|enter|imes|ober|ufat/g, function (x) {
            if (x == criptografia[0][1]) {
                return criptografia[0][0];
            } else if (x == criptografia[1][1]) {
                return criptografia[1][0];
            } else if (x == criptografia[2][1]) {
                return criptografia[2][0];
            } else if (x == criptografia[3][1]) {
                return criptografia[3][0];
            } else if (x == criptografia[4][1]) {
                return criptografia[4][0];
            }
        });

        inputSaida.value = resultado;
        mudarCorBotaoCopiar();
    }
}

async function copiar() {
    let mensagem = document.querySelector("#input-saida").value;

    if (mensagem !== "") {
        await navigator.clipboard.writeText(mensagem);

        btnCopiar.classList.add("copiado");

        mensagemAtual = mensagem;

        limparInput();
    }
}

function mudarCorBotaoCopiar() {
    let mensagem = inputSaida.value;

    if (mensagem !== mensagemAtual) {
        btnCopiar.classList.remove("copiado");
    }
}

function limparInput() {
    inputEntrada.value = "";
    inputSaida.value = "";
}

window.onload = limparInput();
