package com.yaedora.Recommend.Service;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class PythonExecutorService {

    public List<Long> executePythonScript() {
        try {
            List<String> command = new ArrayList<>();
            command.add("python");
            command.add("D:\\gdsc\\헤딩톤\\headingthon\\headingThon\\back-end\\yaedora\\src\\main\\java\\com\\yaedora\\Recommend\\Service\\recomand.py"); // 스크립트의 경로를 지정합니다.

            ProcessBuilder processBuilder = new ProcessBuilder(command);
            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));

            String line;
            StringBuilder output = new StringBuilder();
            while ((line = reader.readLine()) != null) {
                output.append(line + "\n");
            }

            int exitCode = process.waitFor();
            if (exitCode == 0) {
                String result = output.toString();
                String[] numberStrings = result.replaceAll("[\\[\\]]", "").split(",\\s*");
                List<Long> numbers = new ArrayList<>();
                for (String numberString : numberStrings) {
                    numbers.add(Long.parseLong(numberString.trim()));
                }
                System.out.println("추천 가게 : "+numbers);

                return numbers;
            } else {
                // 스크립트 실행에 실패했을 때 로그를 처리합니다.
                System.out.println("Python script execution failed");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
