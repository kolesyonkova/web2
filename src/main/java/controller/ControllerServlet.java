package controller;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//@WebServlet("/servlet")
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            if (req.getParameter("x") != null &&
                    req.getParameter("y") != null &&
                    req.getParameter("r") != null) {
                getServletContext().getRequestDispatcher("/areaCheckServlet").forward(req, resp);
            } else if (req.getParameter("clean").equals("true")) {
                getServletContext().getRequestDispatcher("/clear").forward(req, resp);
            } else getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
        } catch (NullPointerException | NumberFormatException e) {
            System.out.println(e.getClass());
            getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
        }
    }
}
