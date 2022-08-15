//Ingresa nuevas tareas a partir del evento "click"
$("#newTask").on("click", () => {
    addTask();
});
//Ingresa nuevas tareas a partir del evento "enter"
$(".txtb").on("keyup", (e) => {
    if (e.keyCode == 13 && $(".txtb").val() != "") {
        addTask();
    }
});

function addTask() {
    let task = $("<div class= 'task'></div>").text($(".txtb").val());
    let value = $(".txtb").val();

    pushing(value);
    storaging();

    del = $(
        "<div class='buttonEntry'><img id='delete' src='../multimedia/trash-solid.svg'></img></div>"
    ).click(function () {
        let p = $(this).parent();
        p.fadeOut(() => {
            p.remove();
            deleteEntry();
        });
    });

    task.append(del);
    $(".notcomp").append(task);
    $(".txtb").val("");
}
//Trae del local storage la información guardada
const a = localStorage.getItem("activities");

const activities = JSON.parse(a) || [];

window.onload = showActivities(activities);

//Muestra las tareas almacenadas en el storage
function showActivities(list) {
    list.forEach((item) => {
        const entry = $(`<div class= 'task'></div>`).text(item);

        let del = $(
            "<div class='buttonEntry'><img id='delete' src='../multimedia/trash-solid.svg'></img></div>"
        ).click(function () {
            entry.fadeOut(() => {
                entry.remove();
                deleteEntry(item);
            });
        });
        entry.append(del);
        $(".notcomp").append(entry);
        $(".txtb").val("");
    });
}

function pushing(value) {
    activities.push(value);
}
function storaging() {
    localStorage.setItem("activities", JSON.stringify(activities));
}
function deleteEntry(event) {
    let index = activities.indexOf(event);
    activities.splice(index, 1);
    storaging();
}
