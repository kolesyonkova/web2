// document.getElementById("send-button").addEventListener("click", dataFromButtons);
document.getElementById("clear-button").addEventListener("click", clear);
let wrongFieldX = document.getElementById("wrong_field_X");
let wrongFieldY = document.getElementById("wrong_field_Y");
let wrongFieldR = document.getElementById("wrong_field_R");
let wrongField = document.getElementById("wrong_field");

function readyForm(e) {
    wrongFieldX.textContent = ""
    wrongFieldY.textContent = ""
    wrongFieldR.textContent = ""
    wrongField.textContent = ""
    if (!(checkX() & checkY())) {
        e.preventDefault();
    }
}

function clear() {
    clearCanvas()
    drawCanvas()
    return new Promise(function (resolve) {
            $.get('servlet', {
                'clean': true
            }).done(function (data) {
                    $("#result_table tr:gt(0)").remove();
                }
            ).fail(function (err) {
                alert(err);
            });
        }
    );
}

function checkX() {
    let x = document.getElementById("X");
    if (x.value === "") {
        wrongFieldX.textContent = "Поле X должно быть заполнено";
        return false;
    }
    x.value = x.value.substring(0, 10).replace(',', '.');
    if (!(x.value && !isNaN(x.value))) {
        wrongFieldX.textContent = "X должен быть числом!";
        return false;
    }
    if (!((x.value >= -3) && (x.value <= 5))) {
        wrongFieldX.textContent = "X должен принадлежать промежутку: (-3; 5)!";
        return false;
    }
    return true;
}

function checkY() {
    let valY = $('input[name="y"]:checked').val();
    if (valY === undefined) {
        wrongFieldY.textContent = "Выберите одно значение Y";
        return false;
    }
    return true;
}

function submit(valX, valY, valR) {
    wrongFieldX.textContent = ""
    wrongFieldY.textContent = ""
    wrongFieldR.textContent = ""
    wrongField.textContent = ""
    return new Promise(function (resolve) {
            $.get('servlet', {
                'x': valX,
                'y': valY,
                'r': valR,
                'fromCanvas': "true"
            }).done(function (data) {
                    // clearCanvas()
                    // drawCanvas()
                    $("#result_table tr:gt(0)").remove();
                    console.log(data)
                    let par = data;
                    if (par !== "remove") {
                        let result = JSON.parse(par);
                        for (let i in result.response) {
                            let newRow = '<tr>';
                            newRow += '<td>' + result.response[i].xval + '</td>';
                            newRow += '<td>' + result.response[i].yval + '</td>';
                            newRow += '<td>' + result.response[i].rval + '</td>';
                            if (result.response[i].out === "Да") {
                                newRow += '<td><div style="color:#279327">' + result.response[i].out + '</div></td>';
                            } else {

                                newRow += '<td><div style="color:#e11a1a">' + result.response[i].out + '</div></td>';
                            }
                            newRow += '<td>' + result.response[i].sendingTime + '</td>';
                            newRow += '<td>' + result.response[i].totalProcessingTime + '</td>';
                            newRow += '</tr>';
                            $('#result_table').append(newRow);
                            drawShoot(result.response[i].xval, result.response[i].yval, result.response[i].rval)
                        }
                    }
                }
            ).fail(function (err) {
                alert(err);
            });
        }
    );
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
    // let x = (event.clientX - rect.x- width / 2) / step;
    // let y = (height / 2 - event.clientY + rect.y) / step;
    let r = $("#R").val();
    x = x.toFixed(2).replace(".00", "");
    y = y.toFixed(2).replace(".00", "");
    if (isValid(x, y, r)) {
        submit(x, y, r)
    }
    drawShoot(x, y, r)
}

function isValid(x, y, r) {
    return (x >= -3 && x <= 5) && (y >= -3 && y <= 5) && (r >= 1 && r <= 5);
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("send-button").addEventListener("click", readyForm);
    // const canvas = document.querySelector('canvas')
    // canvas.addEventListener('click', function (e) {
    //     clickOnChart(canvas, e)
    // })
});