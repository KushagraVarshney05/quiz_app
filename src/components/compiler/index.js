import React, { useState } from "react";
import axios from "axios";
import { languages, output_api_url } from "./constant";

const SubmitForm = () => {
  const [codeLanguage, setCodeLanguage] = useState("");
  const [sourceCode, setSourceCode] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Editable: Define your question & test cases
  const question = "Implement Two Sum: return indices of two numbers that add up to target.";
  
  const testCases = [
    {
      stdin: "5\n2 7 11 15 3\n9\n4\n1 2 3 4\n8\n6\n3 2 4 1 5 6\n11", // size, array, target
      expectedOutput: "0 1\nNo two sum solution\n4 5"
    }
  ];

  const handleSubmit = async () => {
    if (!sourceCode || !codeLanguage) return;

    setLoading(true);
    const testResults = [];

    for (const testCase of testCases) {
      const options = {
        method: "POST",
        url: output_api_url,
        params: {
          base64_encoded: "true",
          fields: "*",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": process.env.React_App_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        data: {
          language_id: codeLanguage,
          source_code: btoa(sourceCode),
          stdin: btoa(testCase.stdin),
        },
      };

      try {
        const response = await axios.request(options);

        const output =
          response.data.stdout
            ? atob(response.data.stdout)
            : response.data.stderr
            ? atob(response.data.stderr)
            : atob(response.data.compile_output || "");

        const passed = output.trim() === testCase.expectedOutput.trim();

        testResults.push({
          input: testCase.stdin,
          expected: testCase.expectedOutput,
          output: output,
          passed: passed,
        });
      } catch (error) {
        console.error(error);
        testResults.push({
          input: testCase.stdin,
          expected: testCase.expectedOutput,
          output: "Error occurred",
          passed: false,
        });
      }
    }

    setResults(testResults);
    setLoading(false);
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-9 h-screen">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="p-6.5">
              <div className="mb-4 text-black dark:text-white">
                <h2 className="font-bold text-lg">Question:</h2>
                <p>{question}</p>
              </div>

              <div className="mb-4">
                <label className="block text-black dark:text-white">
                  Preferred Code Language: <span className="text-meta-1">*</span>
                </label>
                <select
                  onChange={(e) => setCodeLanguage(e.target.value)}
                  className="w-full rounded border border-primary py-3 px-5"
                >
                  {languages.map((language) => (
                    <option key={language.id} value={language.id}>
                      {language.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-black dark:text-white">Source Code:</label>
                <textarea
                  value={sourceCode}
                  onChange={(e) => setSourceCode(e.target.value)}
                  rows={15}
                  placeholder="Write your code here"
                  className="w-full rounded border border-stroke py-3 px-5"
                ></textarea>
              </div>

              <button
                type="button"
                className="w-full mt-4 rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Running Tests..." : "Submit"}
              </button>

              <div className="mt-6 text-black dark:text-white">
                <h3 className="font-bold text-lg">Results:</h3>
                {results.map((result, index) => (
                  <div key={index} className="mb-3">
                    <div>
                      <strong>Test Case {index + 1}:</strong>{" "}
                      <span className={result.passed ? "text-green-600" : "text-red-600"}>
                        {result.passed ? "Passed ✅" : "Failed ❌"}
                      </span>
                    </div>
                    {!result.passed && (
                      <div className="text-sm mt-1">
                        <div><strong>Expected:</strong> {result.expected.trim()}</div>
                        <div><strong>Got:</strong> {result.output.trim()}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitForm;
