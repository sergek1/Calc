package school.calculator.SmartCalc.controller;

import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Objects;

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
        // model.addAttribute("expression", expression+ " = ");
        // model.addAttribute("result", expression);
        return "graph";
    }

}