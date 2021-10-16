let dash = 5;
let step = 50;
let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d");
canvas.width = 510;
canvas.height = 510;
let width = canvas.width;
let height = canvas.height;
canvas.addEventListener('mousedown', event => clickOnChart(canvas, event));

function drawCanvas() {
    let valR = $('#R').val() * step;
    drawAXIS(valR)
    drawRectangle(valR)
    drawTriangle(valR)
    drawCircle(valR)
}

function drawTriangle(valR) {
    context.fillStyle = 'blue';
    context.globalAlpha = 0.6;
    context.beginPath();
    context.moveTo((width / 2) - valR, height / 2);
    context.lineTo(width / 2, (height - valR) / 2);
    context.lineTo(width / 2, height / 2);
    context.fill();
}

function drawCircle(valR) {
    context.beginPath();
    context.fillStyle = 'blue';
    context.strokeStyle = 'blue';
    context.globalAlpha = 0.6;
    context.arc(width / 2, height / 2, valR, Math.PI / 2, Math.PI);
    context.lineTo(width / 2, height / 2)
    context.fill();
    context.stroke();
}

function drawRectangle(valR) {
    context.fillStyle = 'blue';
    context.strokeStyle = 'blue';
    context.globalAlpha = 0.6;
    context.beginPath();
    context.fillRect(width / 2, height / 2, valR / 2, valR);

}

function drawAXIS(valR) {
    context.strokeStyle = 'black';
    context.fillStyle = 'black';
    context.globalAlpha = 1.0;
    context.beginPath();
    context.moveTo(width / 2, 0);
    context.lineTo(width / 2, height);
    context.stroke();
    context.beginPath();
    context.moveTo(0, height / 2);
    context.lineTo(width, height / 2);
    context.stroke();
    // context.strokeText("R/2", (valR * step) / 2 + width / 2, center - 2);
    // context.strokeText("R", width / 2 + valR * step, center - 2);
    // context.strokeText("R/2", center + 2, center - (valR * step) / 2);
    // context.strokeText("R", center + 2, center - (valR * step - 10));
    // context.strokeText("-R/2", center - (valR * step) / 2, center - 2);
    // context.strokeText("-R", center - valR * step, center - 2);
    // context.strokeText("-R/2", center + 2, center + (valR * step) / 2);
    // context.strokeText("-R", center + 2, center + valR * step);
    context.strokeText("Y", 240, 10);
    context.strokeText("X", 500, height / 2 - 10);
    context.stroke();
    //draw x-dash
    for (let i = -5; i <= 5; i++) {
        context.beginPath();
        let x = width / 2 + step * i;
        context.moveTo(x, height / 2 + dash);
        context.lineTo(x, height / 2 - dash);
        if (i !== 0) {
            context.fillText(i.toString(), x - dash / 2, height / 2 + 3 * dash);
        }
        context.stroke();
    }

    //draw y-dash
    for (let i = -5; i <= 5; i++) {
        context.beginPath();
        let y = height / 2 + step * i;
        context.moveTo(width / 2 + dash, y);
        context.lineTo(width / 2 - dash, y);
        if (i !== 0) {
            context.fillText((-i).toString(), width / 2 + dash, y + dash);
        }
        context.stroke();
    }
}

function clearCanvas() {
    // Сохраняем текущую матрицу трансформации
    context.save();
// Используем идентичную матрицу трансформации на время очистки
    context.clearRect(0, 0, canvas.width, canvas.height);
// Возобновляем матрицу трансформации
    context.restore();
}