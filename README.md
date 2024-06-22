# camunda-feedback-sentiment-bot

## Mô tả
Bot phân loại cảm xúc cho quy trình giải quyết feedback trên Camunda sử dụng Node.js. Bot này giúp tự động phân loại cảm xúc từ các phản hồi của người dùng, giúp quy trình xử lý phản hồi trở nên hiệu quả hơn.
Bot sử dụng mô hình trên hugging face
## Cài đặt
1. Cài đặt các phụ thuộc:
    ```bash
    cd camunda-feedback-sentiment-bot
    npm install
    ```
2. Cấu hình môi trường (tạo tệp `.env` và điền các biến cần thiết):
    ```plaintext
    CAMUNDA_URL=http://localhost:8080/engine-rest
    BOT_API_KEY=your_api_key
    ```
## Sử dụng
Chạy bot:
```bash
npm start
