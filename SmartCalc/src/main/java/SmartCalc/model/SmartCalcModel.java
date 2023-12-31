package SmartCalc.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class SmartCalcModel {

  SmartCalcModelJNI smartCalcModelJNI = new SmartCalcModelJNI();

  public double getCalcResult(String expression) {
    String transformString = transformString(expression);
    return smartCalcModelJNI.GetCalcResult(transformString);
  }

  public Map<String, List<Double>> getGraphData(String expression, double xMin,
                                                double xMax) {
    List<Double> xValues = new ArrayList<>();
    List<Double> yValues = new ArrayList<>();
    for (double x = xMin; x <= xMax; x += 0.25) {
      String replacedString = expression.replace("x", String.valueOf(x));
      String transformedString = transformString(replacedString);
      double result = smartCalcModelJNI.GetCalcResult(transformedString);
      yValues.add(result);
      xValues.add(x);
    }
    Map<String, List<Double>> data = new HashMap<>();
    data.put("x", xValues);
    data.put("y", yValues);
    return data;
  }

  private String transformString(String input) {
    String os = System.getProperty("os.name").toLowerCase();
    StringBuilder result = new StringBuilder();
    int i = 0;
    while (i < input.length()) {
      if (input.startsWith("acos", i)) {
        result.append("d");
        i += 4;
      } else if (input.startsWith("asin", i)) {
        result.append("f");
        i += 4;
      } else if (input.startsWith("atan", i)) {
        result.append("g");
        i += 4;
      } else if (input.startsWith("cos", i)) {
        result.append("a");
        i += 3;
      } else if (input.startsWith("sin", i)) {
        result.append("b");
        i += 3;
      } else if (input.startsWith("tan", i)) {
        result.append("c");
        i += 3;
      } else if (input.startsWith("sqrt", i)) {
        result.append("h");
        i += 4;
      } else if (input.startsWith("ln", i)) {
        result.append("j");
        i += 2;
      } else if (input.startsWith("log", i)) {
        result.append("k");
        i += 3;
      } else if (input.startsWith("mod", i)) {
        result.append("m");
        i += 3;
      } else if (input.charAt(i) == 'x') {
        result.append("(").append("x").append(")");
        i++;
      } else if (input.charAt(i) == '.') {
        if (!os.contains("mac")) {
          result.append(",");
        } else {
          result.append(input.charAt(i));
        }
        i++;
      } else {
        result.append(input.charAt(i));
        i++;
      }
    }
    return result.toString();
  }
}
