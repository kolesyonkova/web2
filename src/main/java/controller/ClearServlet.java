package controller;

import model.Hit;
import model.Results;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/clear")
public class ClearServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp){
        PrintWriter output = null;
        try {
            output = resp.getWriter();
            req.getSession().setAttribute("shots", null);
            output.println("remove");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
