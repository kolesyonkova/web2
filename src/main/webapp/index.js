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

function clickOnChart(canvas, event) {
    let rect = canvas.getBoundingClientRect()
    let width = canvas.width;
    let height = canvas.height;
    let x = (event.clientX - rect.left - width / 2) / step;
    let y = (height / 2 - event.clientY + rect.top) / step;
    let r = $("#R").val();
    alert("x=" + x)
    alert("y=" + y)
    alert("r=" + r)

}