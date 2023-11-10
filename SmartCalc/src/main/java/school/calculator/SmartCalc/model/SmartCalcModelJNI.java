package school.calculator.SmartCalc.model;

import org.springframework.stereotype.Component;

import java.io.File;

//@Component
public class SmartCalcModelJNI {
    static {
        String parentDir = "school/calculator/SmartCalc/model/";
        System.load(new File(parentDir, "model.so").getAbsolutePath());
    }

    public native double GetCalcResult(String input);
}
