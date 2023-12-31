package SmartCalc.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import SmartCalc.model.SmartCalcModel;
import SmartCalc.service.ServiceUtil;

import java.util.*;

@RestController
@CrossOrigin
public class MainController {
    @Autowired
    SmartCalcModel model;
    @Autowired
    ServiceUtil serviceUtil;

    @GetMapping("/calculate")
    @ResponseBody
    public String calculate(@RequestParam String expression) {
        try {
            double result = model.getCalcResult(expression);
            serviceUtil.saveHistory(expression, result);
            return String.valueOf(result);
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @GetMapping("/graph")
    @ResponseBody
    public ResponseEntity<String> graph(
            @RequestParam String expression,
            @RequestParam String xMinStr,
            @RequestParam String xMaxStr
    ) {
        try {
            double xMin = Double.parseDouble(xMinStr);
            double xMax = Double.parseDouble(xMaxStr);
            Map<String, List<Double>> data = model.getGraphData(expression, xMin, xMax);
            serviceUtil.saveGraphToHistory(expression);
            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(data);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/history")
    @ResponseBody
    public ResponseEntity<List<String>> getAllHistory() {
        try {
            List<String> history = serviceUtil.getAllHistory();
            return ResponseEntity.ok(history);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Collections.emptyList());
        }
    }

    @DeleteMapping("/deleteHistory")
    @ResponseBody
    public ResponseEntity<String> deleteHistory() {
        try {
            serviceUtil.deleteHistory();
            return ResponseEntity.ok("History deleted");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}

