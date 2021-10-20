<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="model.Hit" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<jsp:useBean id="shotForBean" class="model.Results" scope="session"/>
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
    <p id="wrong_field" class="wrong"></p>
    </p>
    <%--    <p><img id="imageArea" src="images/areas.jpg" alt="areas"></p>--%>
    <form id="form" method="get" action="<%= request.getContextPath() %>/servlet">
        <div id="input_field_X" class="validate">
            <p class="variable">X=
                <label for="X"></label><input id="X" type="text" name="x" placeholder="Enter X:">
            </p>
            <p id="wrong_field_X" class="wrong"></p>
        </div>
        <div id="input_field_Y" class="validate">
            <p class="variable">Y=
                <label>
                    <input type="radio" value="1" name="y">1
                    <input type="radio" value="2" name="y">2
                    <input type="radio" value="3" name="y">3
                    <input type="radio" value="4" name="y">4
                    <input type="radio" value="5" name="y">5
                </label>
            </p>
            <p id="wrong_field_Y" class="wrong"></p>
        </div>
        <div id="input_field_R" class="validate">
            <p class="variable">R=
                <label for='R'></label><select id='R' class="select-css" name="r">
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
    </form>
    <button id="clear-button" class="sliding-button" type="submit">Очистить историю запросов</button>
</div>
<div class="footer">
    <table id="result_table" class="result_table">
        <thead>
        <th class="variable">X</th>
        <th class="variable">Y</th>
        <th class="variable">R</th>
        <th>Result</th>
        <th>Sending time</th>
        <th>Total processing time</th>
        </thead>
        <c:forEach var="hit" items="${shotForBean.hitList}">
            <tr>
                <td>${hit.x}</td>
                <td>${hit.y}</td>
                <td>${hit.r}</td>
                <c:if test="${hit.result == 'Да'}">
                    <td>
                        <div style="color:#279327">${(hit.result)}</div>
                    </td>
                </c:if>
                <c:if test="${hit.result == 'Нет'}">
                    <td>
                        <div style="color:#e11a1a">${(hit.result)}</div>
                    </td>
                </c:if>
                <td>${hit.localTime}</td>
                <td>${hit.processingTime} sec</td>
            </tr>
        </c:forEach>
    </table>
</div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="index.js"></script>
<script src="canvas.js"></script>
</body>
</html>