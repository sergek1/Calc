package SmartCalc.service;

import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceUtil {

    private static final String FILE_PATH = System.getProperty("user.dir") + "/history.txt";

    public void saveHistory(String expression, double result) {
        try {
            PrintWriter writer = new PrintWriter(new FileWriter(FILE_PATH, true));
            writer.println(expression + "=" + result);
            writer.flush();
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void saveGraphToHistory(String expression) {
        try {
            PrintWriter writer = new PrintWriter(new FileWriter(FILE_PATH, true));
            writer.println(expression);
            writer.flush();
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<String> getAllHistory() {
        List<String> history = new ArrayList<>();
        try {
            BufferedReader reader = new BufferedReader(new FileReader(FILE_PATH));
            String line;
            while ((line = reader.readLine()) != null) {
                history.add(line);
            }
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return history;
    }

    public void deleteHistory() {
        try (FileWriter writer = new FileWriter(FILE_PATH, false)) {
            writer.write("");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
