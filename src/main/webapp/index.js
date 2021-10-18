document.getElementById("send-button").addEventListener("click", submit);
// document.getElementById("clear-button").addEventListener("click", clear);
let wrongFieldX = document.getElementById("wrong_field_X");
let wrongFieldY = document.getElementById("wrong_field_Y");
let wrongFieldR = document.getElementById("wrong_field_R");

function submit() {
    // let valY = $('input[name="y_value"]:checked').val();
    // alert("y=" + valY);
    // let valR = $('#R').val();
    // alert("R=" + valR)
    // let valX = "x=" + parseFloat(document.getElementById("X").value.substring(0, 10).replace(',', '.'));
    // alert(valX)
    let valX = parseFloat(document.getElementById("X").value.substring(0, 10).replace(',', '.'));
    let valY = $('input[name="y_value"]:checked').val();
    let valR = $('#R').val();

    return new Promise(function (resolve) {
            $.get('/servlet', {
                'x': valX,
                'y': valY,
                'r': valR
            }).done(function (data) {
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
    let r = $("#R").val();
    alert("x=" + x)
    alert("y=" + y)
    alert("r=" + r)
}
