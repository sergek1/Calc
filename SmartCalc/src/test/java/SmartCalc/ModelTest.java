package SmartCalc;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import SmartCalc.model.SmartCalcModel;
import org.springframework.beans.factory.annotation.Autowired;

@SpringBootTest
public class ModelTest {
  @Autowired private SmartCalcModel model;

  @Test
  void testMainCalc() {
    String expression = "3+4-3+(9-7*3)";
    double expectedResult = -8.0;
    double result = model.getCalcResult(expression);
    assertEquals(expectedResult, result,
                 "Calc должен корректно вычислить выражение.");
  }

  @Test
  void testGraphData() {
    String expression = "3+x-2";
    double xMin = -1;
    double xMax = 1;

    List<Number> expectedXValues =
        Arrays.asList(-1.0, -0.75, -0.5, -0.25, 0.0, 0.25, 0.5, 0.75, 1.0);
    List<Number> expectedYValues =
        Arrays.asList(0.0, 0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0);

    Map<String, List<Double>> result =
        model.getGraphData(expression, xMin, xMax);

    assertFalse(result.isEmpty(), "Результат не должен быть пустым");

    List<Double> actualXValues = result.get("x");
    assertArrayEquals(expectedXValues.toArray(), actualXValues.toArray(),
                      "Список значений x не соответствует ожидаемому");

    List<Double> actualYValues = result.get("y");
    assertArrayEquals(expectedYValues.toArray(), actualYValues.toArray(),
                      "Список значений y не соответствует ожидаемому");
  }
}
