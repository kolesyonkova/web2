document.getElementById("send-button").addEventListener("click", submit);
// document.getElementById("clear-button").addEventListener("click", clear);
let wrongFieldX = document.getElementById("wrong_field_X");
let wrongFieldY = document.getElementById("wrong_field_Y");
let wrongFieldR = document.getElementById("wrong_field_R");


function submit() {
    let value = $('input[name="y_value"]:checked').val();
    alert("y=" + value);
    let valR = $('#R').val();
    alert("R=" + valR)
    let x = "?x=" + parseFloat(document.getElementById("X").value.substring(0, 10).replace(',', '.'));
    alert(x)
}

$("#R").change(function () {
    clearCanvas()
    drawCanvas()
});
