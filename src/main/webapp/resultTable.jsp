<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: kater
  Date: 21.10.2021
  Time: 0:26
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div class="footer">
    <table align="center" id="result_table" class="result_table">
        <jsp:useBean id="shotForBean" class="model.Results" scope="session"/>
        <thead>
        <tr>
            <th class="variable">X</th>
            <th class="variable">Y</th>
            <th class="variable">R</th>
            <th>Result</th>
            <th>Sending time</th>
            <th>Total processing time</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach var="hit" items="${shotForBean.hitList}">
        <tr>
            <td class='the_X'>${hit.x}</td>
            <td class='the_Y'>${hit.y}</td>
            <td class='the_R'>${hit.r}</td>
            <c:if test="${hit.result == 'Да'}">
                <td class='the_Result'>
                    <div style="color:#279327">${(hit.result)}</div>
                </td>
            </c:if>
            <c:if test="${hit.result == 'Нет'}">
                <td class='the_Result'>
                    <div style="color:#e11a1a">${(hit.result)}</div>
                </td>
            </c:if>
            <td>${hit.localTime}</td>
            <td>${hit.processingTime} sec</td>
        </tr>
        </c:forEach>
    </table>
</div>