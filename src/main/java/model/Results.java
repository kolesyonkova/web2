package model;

import java.util.ArrayList;
import java.util.List;

public class Results {
    private List<Hit> hitList;

    public Results() {
        this.hitList = new ArrayList<>();
    }

    public List<Hit> getHitList() {
        return hitList;
    }

    public Results(List<Hit> hitList) {
        this.hitList = hitList;
    }

    public String toJson() {
        List<Hit> hits = hitList;
        String res = "{" + "\"response\":[";
        for (Hit h : hits) {
            res=res.concat(h.toJson()+",");
        }
        res = res.substring(0, res.length() - 1);
        return res + "]}";
    }
}
