package controller;

import model.Hit;
import model.Results;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
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
            Results results = new Results((List<Hit>) req.getSession().getAttribute("shots"));
            Results resultsBean = (Results) req.getSession().getAttribute("shotForBean");
            if (resultsBean == null) resultsBean = new Results();
            if (isValid(x, y, r)) {
                Hit hit = createHit(req, startTime);
                if (results.getHitList() == null) {
                    results = new Results(Stream.of(hit).collect(Collectors.toList()));
                } else {
                    results.getHitList().add(hit);
                }
                resultsBean.getHitList().add(hit);
            } else {
                output.println(results.toJson());
                return;
            }
            req.getSession().setAttribute("shotForBean", resultsBean);
            req.getSession().setAttribute("shots", results.getHitList());
            if (req.getParameter("fromCanvas") == null) {
                req.getRequestDispatcher(("resultPage.jsp")).forward(req, resp);
            } else {
                output.println(results.toJson());
            }
        } catch (NumberFormatException | ServletException e) {
            output.println("Incorrect coordinates type");
        } finally {
            output.close();
        }
    }


    private Hit createHit(HttpServletRequest req, long startTime) {
        double x = Double.parseDouble(req.getParameter("x").replace(",", "."));
        double y = Double.parseDouble(req.getParameter("y").replace(",", "."));
        double r = Double.parseDouble(req.getParameter("r").replace(",", "."));
        BigDecimal pT = BigDecimal.valueOf(Double.parseDouble(String.valueOf(BigDecimal.valueOf((System.nanoTime() - startTime) / 1000000000d)).substring(0, 8)));
        return new Hit(x, y, r, isHit(x, y, r) ? "????" : "??????", new SimpleDateFormat("HH:mm:ss").format(new Date()),
                pT);
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