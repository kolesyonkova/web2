<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Second lab web</title>
    <link rel="stylesheet" href="index.css">
</head>
<body onload="drawCanvas()">
<div class="header">
    <p>Колесенкова Екатерина, P3212, Вариант: 12026</p>
</div>
<div class="container">
    <p>
        <canvas id="canvas"></canvas>
    </p>
    <%--    <p><img id="imageArea" src="images/areas.jpg" alt="areas"></p>--%>
    <div id="input_field_X" class="validate">
        <p class="variable">X=
            <label for="X"></label><input id="X" type="text" placeholder="Enter X:">
        </p>
        <p id="wrong_field_X" class="wrong"></p>
    </div>
    <div id="input_field_Y" class="validate">
        <p class="variable">Y=
            <label>
                <input type="radio" value="1" name="y_value">1
                <input type="radio" value="2" name="y_value">2
                <input type="radio" value="3" name="y_value">3
                <input type="radio" value="4" name="y_value">4
                <input type="radio" value="5" name="y_value">5
            </label>
        </p>
        <p id="wrong_field_Y" class="wrong"></p>
    </div>
    <div id="input_field_R" class="validate">
        <p class="variable">R=
            <label for='R'></label><select id='R' class="select-css">
                <option name="R" value="1">1</option>
                <option name="R" value="2">2</option>
                <option name="R" value="3">3</option>
                <option name="R" value="4">4</option>
                <option name="R" value="5">5</option>
            </select>
        </p>
        <p id="wrong_field_R" class="wrong"></p>
    </div>
    <button id="send-button" class="sliding-button" type="submit">Отправить</button>
    <button id="clear-button" class="sliding-button" type="submit">Очистить историю запросов</button>
</div>
<div class="footer">
    <table id="result_table" class="result_table">
        <tr>
            <th class="variable">X</th>
            <th class="variable">Y</th>
            <th class="variable">R</th>
            <th>Result</th>
            <th>Sending time</th>
            <th>Total processing time</th>
        </tr>
    </table>
</div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="index.js"></script>
<script src="canvas.js"></script>
</body>
</html>