package school.calculator.SmartCalc.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import school.calculator.SmartCalc.model.SmartCalcModelJNI;

import java.lang.Math;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
@Controller
public class MainController{

    MainController() {

    }

    @GetMapping("/")
    public String index(@NotNull Model model) {
        model.addAttribute("expression", "0");
        model.addAttribute("result", "0");
//        model.addAttribute("title", "SmartCalc_4.0");
//        List<String> allHistory = serviceUtil.getAllHistory();
//        allHistory.removeIf(Objects::isNull);
//        allHistory.removeIf(String::isEmpty);
//        model.addAttribute("allHistory", allHistory);
        return "calculator";
    }

    @GetMapping("/calculate")
    public String calculate(@RequestParam String expression, @NotNull Model model) {
        model.addAttribute("expression", expression+ " = ");
        model.addAttribute("result", expression);
        return "calculator";
    }

    @GetMapping("/graph")
    public String graph(@RequestParam String expression, @NotNull Model model) {
//        model.addAttribute("expression", expression);
//        int[] x = {1, 2, 3};
//        int[] y = {4, 5, 6};
//        Pair<Integer, Integer>[] pairs = new Pair[x.length];
//        for (int i = 0; i < x.length; i++) {
//            pairs[i] = new Pair<>(x[i], y[i]);
//        }

//        model.addAttribute("data", data);
        return "graph";
    }

}*/

@RestController
@CrossOrigin
public class MainController {
//    @Autowired
//    SmartCalcModelJNI model;

    @GetMapping("/calculate")
    @ResponseBody
    public String calculate(@RequestParam String expression) {
        try {
            SmartCalcModelJNI model = new SmartCalcModelJNI();

            System.out.println("{" + expression + "}");
            double result = model.GetCalcResult(transformString(expression));
            System.out.println(result);
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
            SmartCalcModelJNI model = new SmartCalcModelJNI();
            double xMin = Double.parseDouble(xMinStr);
            double xMax = Double.parseDouble(xMaxStr);
            System.out.println("graph for: " + expression);
            System.out.println("xMini: " + xMin);
            System.out.println("xMax: " + xMax);
            List<Double> xValues = new ArrayList<>(); // Пример значений x
            List<Double> yValues = new ArrayList<>();
            String transformedString = transformString(expression);
            for (double x = xMin; x <= xMax; x += 0.25) {
                double result = model.GetCalcResult(transformedString.replace("x", String.valueOf(x)));
                yValues.add(result);
                xValues.add(x);
            }

            Map<String, List<Double>> data = new HashMap<>();
            data.put("x", xValues);
            data.put("y", yValues);
            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(data);
            return ResponseEntity.ok(json);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    private String transformString(String input) {
        StringBuilder result = new StringBuilder();
        int i = 0;
        while (i < input.length()) {
            if (input.startsWith("acos", i)) {
                result.append("d(");
                i += 4;
            } else if (input.startsWith("asin", i)) {
                result.append("f(");
                i += 4;
            } else if (input.startsWith("atan", i)) {
                result.append("g(");
                i += 4;
            } else if (input.startsWith("cos", i)) {
                result.append("a(");
                i += 3;
            } else if (input.startsWith("sin", i)) {
                result.append("b(");
                i += 3;
            } else if (input.startsWith("tan", i)) {
                result.append("c(");
                i += 3;
            } else if (input.startsWith("sqrt", i)) {
                result.append("h(");
                i += 4;
            } else if (input.startsWith("ln", i)) {
                result.append("j(");
                i += 2;
            } else if (input.startsWith("log", i)) {
                result.append("k(");
                i += 3;
            } else if (input.startsWith("mod", i)) {
                result.append("m");
                i += 3;
            } else if (input.charAt(i) == 'x') {
                result.append("(").append("x").append(")");
                i++;
            } else {
                result.append(input.charAt(i));
                i++;
            }
        }
        return result.toString();
    }

}

