
import { Client, logger, Variables } from "camunda-external-task-client-js";
import { HfInference } from "@huggingface/inference";
import fs from 'fs';
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger };
const client = new Client(config);
// API key 
const hf = new HfInference('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');

client.subscribe('RemedySolution', async ({ task, taskService }) => {
  try {
    // Lấy input có id CustomerFeedback 
    const textInput = task.variables.get('CustomerFeedback');
    let out = "";
    for await (const chunk of hf.chatCompletionStream({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        messages: [
          { role: "user", content: `Help me come up with some solutions and write a sincere apology email based on this complaint "${textInput}"` },
        ],
        max_tokens: 500,
        temperature: 0.1,
        seed: 0,
      })) {
      if (chunk.choices && chunk.choices.length > 0) {
        out += chunk.choices[0].delta.content;
      }
    }

    const Result = out;
    const solution = new Variables();
    solution.set('solution', Result);


    fs.writeFileSync('solution.txt', Result, 'utf8');
    await taskService.complete(task, solution);
    console.log("Solution:", Result);
  } catch (error) {
    console.error("Error during text classification:", error);
  }
});
