//------------------------------------------POMODORO TIMER----------------------------------------------

const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

const workMinutes = document.getElementById("w_minutes");
var workSeconds = document.getElementById("w_seconds");

const breakMinutes = document.getElementById("b_minutes");
const breakSeconds = document.getElementById("b_seconds");

//Guarda el tiempo
let startTimer;

//Boton start,reset y stop

start.addEventListener("click", function () {
    if (startTimer === undefined) {
        startTimer = setInterval(timer, 1000);
    } else {
        alert("Timer is already running");
    }
});

reset.addEventListener("click", function () {
    workMinutes.innerText = 50;
    workSeconds.innerText = "00";

    breakMinutes.innerText = 10;
    breakSeconds.innerText = "00";

    document.getElementById("counter").innerText = 0;
    stopInterval();
    startTimer = undefined;
});

stop.addEventListener("click", function () {
    stopInterval();
    startTimer = undefined;
});

//Funcion de inicio del timer
function timer() {
    //Contador del trabajo
    if (workSeconds.innerText != 0) {
        workSeconds.innerText--;
    } else if (workMinutes.innerText != 0 && workSeconds.innerText == 0) {
        workSeconds.innerText = 59;
        workMinutes.innerText--;
    }

    //Contador del break
    if (workMinutes.innerText == 0 && workSeconds.innerText == 0) {
        if (breakSeconds.innerText != 0) {
            breakSeconds.innerText--;
        } else if (breakMinutes.innerText != 0 && breakSeconds.innerText == 0) {
            breakSeconds.innerText = 59;
            breakMinutes.innerText--;
        }
    }

    //Incrementa el contador en uno si el ciclo se completó
    if (
        workMinutes.innerText == 0 &&
        workSeconds.innerText == 0 &&
        breakMinutes.innerText == 0 &&
        breakSeconds.innerText == 0
    ) {
        workMinutes.innerText = 50;
        workSeconds.innerText = "00";

        breakMinutes.innerText = 10;
        breakSeconds.innerText = "00";

        document.getElementById("counter").innerText++;
    }
}

//Funcion de stop del timer
function stopInterval() {
    clearInterval(startTimer);
}

//-----------------------------------------Quotes con AJAX------------------------------------

$(document).ready(function () {
    function getNewQuote() {
        $.ajax({
            url: "https://api.forismatic.com/api/1.0/",
            jsonp: "jsonp",
            dataType: "jsonp",
            data: {
                method: "getQuote",
                lang: "en",
                format: "jsonp",
            },
            success: function (response) {
                const quote = response.quoteText;
                const author = response.quoteAuthor;
                $("#quote").text(quote);
                if (author) {
                    $("#author").text(" by " + author);
                } else {
                    $("#author").text("Unkown author");
                }
            },
        });
    }
    getNewQuote();

    $(".get-quote").on("click", function () {
        getNewQuote();
    });
});
