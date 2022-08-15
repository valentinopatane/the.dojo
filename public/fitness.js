/*CUENTA CALORIAS*/

const form = document.querySelector(".calorieForm");
form.addEventListener("submit", noRefresh);

function noRefresh(event) {
    event.preventDefault();

    function selectImput(id) {
        const select = document.getElementById(id);
        return select.options[select.selectedIndex].value;
    }

    function parseToNumber(id) {
        return Number(document.getElementById(id).value);
    }

    const gender = selectImput("gender");
    const age = parseToNumber("age");
    const weight = parseToNumber("weight");
    const height = parseToNumber("height");

    let tmbResult;

    if (gender === "" || age === 0 || weight === 0 || height === 0) {
        alert("Error: Missing Data");
    } else {
        activity = selectImput("activityLevel");
    }
    if (gender === "female") {
        tmbResult = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
    } else if (gender === "male") {
        tmbResult = 66 + 13.7 * weight + 5 * weight - 6.8 * age;
    }
    const tmb = Math.round(tmbResult);

    const mantenerPeso = Math.round(tmb * Number(activity));
    const perderPeso = mantenerPeso - 450;
    const ganarPeso = mantenerPeso + 450;

    const modificacionDOM = `<h4 class="resultTitle">El resultado es el siguiente:<h4>
    <div class="resultContenido">
        <ul>
            <li>
                Su metabolismo basal es de <strong>${tmb} calorías </strong>
            </li>
            <li>
                Para mantener su peso deberá consumir <strong>${mantenerPeso} calorías </strong>
            </li>
            <li>
                Para bajar de peso deberá consumir <strong>${perderPeso} calorías </strong>
            </li>
            <li>
                Para subir de peso deberá consumir <strong>${ganarPeso} calorías </strong>
            </li>
        </ul>
    </div>
    `;
    const result = document.getElementById("result");
    result.innerHTML = modificacionDOM;
}
