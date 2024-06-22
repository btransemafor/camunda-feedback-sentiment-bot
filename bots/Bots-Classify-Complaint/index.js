
import { Client, logger, Variables } from "camunda-external-task-client-js";
import { HfInference } from "@huggingface/inference";
     
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger };
const client = new Client(config);

// api key cua tui 
const hf = new HfInference('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');

client.subscribe('classify-feedback', async ({ task, taskService }) => {
  try {
    const textInput = task.variables.get('CustomerFeedback');
    
    // API textClassification của Hugging Face
    const result = await hf.textClassification({
      model: 'distilbert-base-uncased-finetuned-sst-2-english',
      inputs: textInput
    });
    // Lấy kết quả phân loại
    const classificationResult = result[0].label;

    // Tạo một process variable mới để lưu trữ kết quả
    const sentiment = new Variables();
    sentiment.set('sentiment', classificationResult);

    await taskService.complete(task, sentiment);

    console.log("Text Classification Result:", classificationResult);
  } catch (error) {
    console.error("Error during text classification:", error);
  }
});
