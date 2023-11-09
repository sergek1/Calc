/* smart_calc_model_jni.cpp */
#include "smart_calc_model.h"
#include <jni.h>

extern "C" {

JNIEXPORT jint JNICALL Java_SmartCalcModelJNI_add(JNIEnv *env, jobject obj, jint a, jint b) {
    SmartCalcModel model;
    return model.add(a, b);
}

JNIEXPORT jint JNICALL Java_SmartCalcModelJNI_subtract(JNIEnv *env, jobject obj, jint a, jint b) {
    SmartCalcModel model;
    return model.subtract(a, b);
}

}
