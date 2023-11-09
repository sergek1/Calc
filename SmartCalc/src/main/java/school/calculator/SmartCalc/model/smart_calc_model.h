#ifndef SMARTCALCMODEL_H
#define SMARTCALCMODEL_H

#include <cmath>
#include <regex>
#include <sstream>
#include <stack>
#include <vector>
#if __APPLE__
#define qpoint '.'
#else
#define qpoint ','
#endif

// namespace s21 {
class SmartCalcModel {
public:
    SmartCalcModel(){};
    SmartCalcModel(double xBegin, double xEnd, const std::string &str);
    SmartCalcModel(double credit_amount, int months, double interest_rate, int credit_type);

    double GetCalcResult(std::string input);
    std::pair<std::vector<double>, std::vector<double>> GetGraphPoints();
    std::string GetMonthPayment();
    double GetTotalPayment() const;
    double GetOverpayment() const;

private:
    std::pair<std::vector<double>, std::vector<double>> graph_points_;
    double step_ = 0.005;
    std::string string_, month_payment_;
    double total_payment_{}, overpayment_{};
    void CalculateCredit(double credit_amount, int months, double interest_rate, int credit_type);
    void CalculateGraphPoints(double xBegin, double xEnd, const std::string &str);

    std::string ConvertToRPN(std::string input_);
    size_t WriteTheNumber(size_t i, std::string input, std::string *output);
    void Brackets(std::stack<char> *stack, std::string *output);
    void OperationsAndFunctions(char sym, std::stack<char> *stack, std::string *output);
    double CalculateOnStack(std::string output);
    void CalcBinaryOperations(char sym, std::stack<double> *stack);
    void CalcUnaryOperations(char sym, std::stack<double> *stack);
};
// }  // namespace s21

#endif  // SMARTCALCMODEL_H
