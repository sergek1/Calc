package school.calculator.SmartCalc.model;

public class SmartCalcModelJNI {
    static {
        System.loadLibrary("smart_calc_model");
    }

    public native double GetCalcResult(String input);
}
