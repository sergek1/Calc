package SmartCalc.model;

import java.io.File;

public class SmartCalcModelJNI {
    static {
        String parentDir = "src/main/java/SmartCalc/model/";
        System.load(new File(parentDir, "model.so").getAbsolutePath());
    }

    public native double GetCalcResult(String input);
}
