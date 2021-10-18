package model;

import java.math.BigDecimal;

public class Hit {
    private double x;
    private double y;
    private double r;
    private String result;
    private String localTime;
    private double processingTime;

    public Hit(double x, double y, double r, String result, String localTime, double processingTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
        this.localTime = localTime;
        this.processingTime = processingTime;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getLocalTime() {
        return localTime;
    }

    public void setLocalTime(String localTime) {
        this.localTime = localTime;
    }

    public double getProcessingTime() {
        return processingTime;
    }

    public void setProcessingTime(double processingTime) {
        this.processingTime = processingTime;
    }

    public String toJson() {
        return '{' +
                "\"xval\":" + "\"" + this.getX() + "\"" + "," +
                "\"yval\":" + "\"" + this.getY() + "\"" + "," +
                "\"rval\":" + "\"" + this.getR() + "\"" + "," +
                "\"out\":" + "\"" + this.getResult() + "\"" + "," +
                "\"sendingTime\":" + "\"" + this.getLocalTime() + "\"" + "," +
                "\"totalProcessingTime\":" + "\"" + String.valueOf(BigDecimal.valueOf(this.getProcessingTime())).substring(0,8) +" sec"+ "\"" +
                "}";
    }
}
