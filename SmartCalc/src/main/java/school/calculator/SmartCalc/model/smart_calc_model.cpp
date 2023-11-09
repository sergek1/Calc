#include "smart_calc_model.h"
// using s21::SmartCalcModel;

SmartCalcModel::SmartCalcModel(double xBegin, double xEnd, const std::string &str) {
    CalculateGraphPoints(xBegin, xEnd, str);
}

SmartCalcModel::SmartCalcModel(double credit_amount, int months, double interest_rate, int credit_type) {
    CalculateCredit(credit_amount, months, interest_rate, credit_type);
}

double SmartCalcModel::GetCalcResult(std::string input) {
    std::string output = ConvertToRPN(std::move(input));
    double res = CalculateOnStack(output);
    return res;
}

std::string SmartCalcModel::GetMonthPayment() { return month_payment_; }
double SmartCalcModel::GetTotalPayment() const { return total_payment_; }
double SmartCalcModel::GetOverpayment() const { return overpayment_; }
std::pair<std::vector<double>, std::vector<double>> SmartCalcModel::GetGraphPoints() { return graph_points_; }

void SmartCalcModel::CalculateGraphPoints(double xBegin, double xEnd, const std::string &string) {
    if (xEnd - xBegin > 40 && xEnd - xBegin <= 100)
        step_ = 0.01;
    else if (xEnd - xBegin > 100)
        step_ = 0.1;
    for (double x = xBegin; x <= xEnd; x += step_) {
        std::string expression;
        for (char i : string) {
            if (i == 'x') {
                expression += '(';
                expression += std::to_string(x);
                expression += ')';
            } else {
                expression += i;
            }
        }
        for (char &i : expression) {
            if (i == '.') i = qpoint;
        }
        graph_points_.first.push_back(x);
        double y = GetCalcResult(expression);
        graph_points_.second.push_back(y);
    }
}

void SmartCalcModel::CalculateCredit(double credit_amount, int months, double interest_rate,
                                     int credit_type) {
    interest_rate = interest_rate / 100 / 12;
    double month_payment;
    std::stringstream stream;
    stream.precision(2);
    stream << std::fixed;
    if (credit_type == 0) {
        month_payment =
            credit_amount * (interest_rate + (interest_rate / (pow(1 + interest_rate, months) - 1)));
        month_payment = std::round(month_payment * 100.0) / 100.0;
        stream << month_payment;
        month_payment_ = stream.str();
        total_payment_ = month_payment * months;
    } else {
        for (int i = 0; i < months; i++) {
            month_payment =
                credit_amount / months + (credit_amount - (credit_amount / months) * i) * interest_rate;
            month_payment = std::round(month_payment * 100) / 100;
            stream << month_payment;
            if (i == 0) {
                month_payment_ = stream.str();
                month_payment_ += " ... ";
            }
            if (i == months - 1) month_payment_ += stream.str();
            total_payment_ += month_payment;
        }
    }
    overpayment_ = total_payment_ - credit_amount;
    overpayment_ = std::round(overpayment_ * 100) / 100;
}

std::string SmartCalcModel::ConvertToRPN(std::string input) {
    std::stack<char> stack;
    stack.push(' ');
    std::string output;

    for (size_t i = 0; i < input.size(); ++i) {
        char sym = input[i];
        std::string signs = "+-*/m^(";
        if (input[i] == '-' && (signs.find(input[i - 1]) != std::string::npos || i == 0)) {
            stack.push('u');
        } else if (sym >= '0' && sym <= '9') {
            size_t j = WriteTheNumber(i, input, &output);
            i = j;
        } else if (input[i] == ')') {
            Brackets(&stack, &output);
        } else {
            OperationsAndFunctions(sym, &stack, &output);
        }
    }
    while (stack.size() > 1) {
        char a = stack.top();
        stack.pop();
        output += a;
        output += ' ';
    }
    return output;
}

size_t SmartCalcModel::WriteTheNumber(size_t i, std::string input, std::string *output) {
    while (std::regex_match(std::string(1, input[i]), std::regex("([\\d.,e])"))) {
        if (input[i] == 'e' && input[i + 1] == '-') {
            *output += input[i];
            *output += input[i + 1];
            i += 2;
        } else {
            *output += input[i++];
        }
    }
    *output += ' ';
    return --i;
}

void SmartCalcModel::Brackets(std::stack<char> *stack, std::string *output) {
    char b = stack->top();
    int count_brace = 0;
    while ((b) != '(' && !count_brace) {
        stack->pop();
        *output += b;
        *output += ' ';
        b = stack->top();
        if (b == ' ') count_brace++;
    }
    if (b == '(') stack->pop();
}

void SmartCalcModel::OperationsAndFunctions(char sym, std::stack<char> *stack, std::string *output) {
    char b = stack->top();
    std::string signs = "/*m^uabcdfghjk", signs1 = "+-/*m^uabcdfghjk";
    if (sym == '/' || sym == '*' || sym == 'm') {
        while (signs.find(b) != std::string::npos) {
            stack->pop();
            *output += b;
            *output += ' ';
            b = stack->top();
        }
    } else if (sym == '+' || sym == '-') {
        while (signs1.find(b) != std::string::npos) {
            stack->pop();
            *output += b;
            *output += ' ';
            b = stack->top();
        }
    } else if (sym == '^') {
        while (b == '^') {
            stack->pop();
            *output += b;
            *output += ' ';
            b = stack->top();
        }
    }
    stack->push(sym);
}

double SmartCalcModel::CalculateOnStack(std::string output) {
    std::stack<double> stack;
    stack.push(0);
    std::string signs = "+-*/m^";
    for (unsigned int i = 0; i < output.size() - 1; ++i) {
        char sym = output[i];
        if (output[i].isDigit() {
            std::string number;
            while (std::regex_match(std::string(1, output[i]), std::regex("([\\d.,e-])")))
                number += output[i++];
            double numb = std::stod(number);
            stack.push(numb);
        } else if (signs.find(sym) != std::string::npos) {
            CalcBinaryOperations(sym, &stack);
            i++;
        } else {
            CalcUnaryOperations(sym, &stack);
        }
    }
    return stack.top();
}

void SmartCalcModel::CalcBinaryOperations(char sym, std::stack<double> *stack) {
    double a1, b1, c;
    if (stack->size() > 2) {
        a1 = stack->top();
        stack->pop();
        b1 = stack->top();
        stack->pop();
    }
    if (sym == '+') {
        c = b1 + a1;
    } else if (sym == '-') {
        c = b1 - a1;
    } else if (sym == '*') {
        c = b1 * a1;
    } else if (sym == '/') {
        c = b1 / a1;
    } else if (sym == 'm') {
        c = std::fmod(b1, a1);
    } else {
        c = pow(b1, a1);
    }
    stack->push(c);
}

void SmartCalcModel::CalcUnaryOperations(char sym, std::stack<double> *stack) {
    double a = stack->top();
    stack->pop();
    if (sym == 'a') {
        a = cos(a);
    } else if (sym == 'b') {
        a = sin(a);
    } else if (sym == 'c') {
        a = tan(a);
    } else if (sym == 'd') {
        a = acos(a);
    } else if (sym == 'f') {
        a = asin(a);
    } else if (sym == 'g') {
        a = atan(a);
    } else if (sym == 'h') {
        a = sqrt(a);
    } else if (sym == 'j') {
        a = log(a);
    } else if (sym == 'k') {
        a = log10(a);
    } else if (sym == 'u') {
        a = -a;
    }
    stack->push(a);
}
