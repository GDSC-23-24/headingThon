import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class PythonExecutorService {
       public static void main(String[] args){
        executePythonScript();
    }
    public static String executePythonScript() {
        try {
            List<String> command = new ArrayList<>();
            command.add("python");
            command.add("C:/Test/recomand.py"); // 스크립트의 경로를 지정합니다.

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
                // 스크립트 실행이 성공했을 때 로그를 처리합니다.
                System.out.println(output);
                return output.toString();
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
