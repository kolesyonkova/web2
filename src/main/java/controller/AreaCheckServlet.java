package controller;

import model.Hit;
import model.Results;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

//@WebServlet("/areaCheckServlet")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        long startTime = System.nanoTime();
        resp.setContentType("text/html;charset=UTF-8");
        PrintWriter output = resp.getWriter();
        try {
            double x = Double.parseDouble(req.getParameter("x"));
            double y = Double.parseDouble(req.getParameter("y"));
            double r = Double.parseDouble(req.getParameter("r"));
            if (!isValid(x, y, r)) {
                throw new NumberFormatException();
            }
            Hit hit = createHit(req, startTime);
            Results results = new Results((List<Hit>) req.getSession().getAttribute("shots"));
            if (results.getHitList() == null) {
                results = new Results(Stream.of(hit).collect(Collectors.toList()));
            } else {
                results.getHitList().add(hit);
            }
            req.getSession().setAttribute("shots", results.getHitList());
            output.println(results.toJson());
        } catch (NumberFormatException e) {
            e.printStackTrace();
            output.println("Incorrect coordinates type");
        } finally {
            output.close();
        }
    }

    private Hit createHit(HttpServletRequest req, long startTime) {
        double x = Double.parseDouble(req.getParameter("x"));
        double y = Double.parseDouble(req.getParameter("y"));
        double r = Double.parseDouble(req.getParameter("r"));
        return new Hit(x, y, r, isHit(x, y, r) ? "Да" : "Нет", new SimpleDateFormat("HH:mm:ss").format(new Date()),
                (System.nanoTime() - startTime) / 1000000000d);
    }

    private boolean isValid(double x, double y, double r) {
        return (x >= -3 && x <= 5) && (y >= -3 && y <= 5) && (r >= 1 && r <= 5);
    }

    private boolean isHit(double x, double y, double r) {
        return checkRectangle(x, y, r) || checkTriangle(x, y, r) || checkCircle(x, y, r);
    }

    private boolean checkRectangle(double x, double y, double r) {
        return x >= 0 && y <= 0 && y >= -r && x <= r / 2;
    }

    private boolean checkTriangle(double x, double y, double r) {
        return y <= (r / 2 + 0.5 * x) && x <= 0 && y >= 0;
    }

    private boolean checkCircle(double x, double y, double r) {
        return (x * x + y * y) <= r * r && x <= 0 && y <= 0;
    }

}
