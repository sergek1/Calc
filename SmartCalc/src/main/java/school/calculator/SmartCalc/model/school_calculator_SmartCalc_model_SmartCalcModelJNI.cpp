#include "school_calculator_SmartCalc_model_SmartCalcModelJNI.h"

#include <jni.h>

#include <iostream>

#include "smart_calc_model.h"

JNIEXPORT jdouble JNICALL
Java_school_calculator_SmartCalc_model_SmartCalcModelJNI_GetCalcResult(
    JNIEnv* env, jobject object, jstring inputString) {
        SmartCalcModel model;
  const char* input = env->GetStringUTFChars(inputString, nullptr);
  std::string expression(input);
  env->ReleaseStringUTFChars(inputString, input);
  double result = model.GetCalcResult(expression);
  return static_cast<jdouble>(result);
}