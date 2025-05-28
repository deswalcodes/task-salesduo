# 🧠 AI-Powered Meeting Minutes Extractor

This is a Node.js backend service that extracts **summaries**, **key decisions**, and **action items** from meeting notes using the **Claude API** by Anthropic. It supports both raw text and `.txt` file uploads, returning a clean structured JSON output.

---

## 📂 GitHub Repository / Zip File

You can either:

- Clone from GitHub:
  ```bash
  git clone https://github.com/deswalcodes/task-salesduo.git
  cd assignment_sales-duo
  
  ```

- Or unzip the provided `.zip` file and navigate to the folder.

---

## 🛠️ Setup Instructions

### 1. Clone / Unzip the Project

```bash
git clone https://github.com/deswalcodes/task-salesduo.git
cd assignment_sales-duo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Create a `.env` file in the root directory with the following contents:

```env
ANTHROPIC_API_KEY=your_claude_api_key_here
PORT=3000
```

Replace `your_claude_api_key_here` with your actual Anthropic Claude API key.

---

## 🚀 Run the Server

```bash
node index.js
```

The server will start on `http://localhost:3000`

---

## 📥 API Endpoint

### POST `/process-meeting`

Accepts either:

- `rawText` in JSON body, or  
- `.txt` file via form-data

---

## 🧾 JSON Request (Raw Text via curl)

```bash
curl -X POST http://localhost:3000/process-meeting \
  -H "Content-Type: application/json" \
  -d '{
    "rawText": "Team Sync – May 26\n\n- We’ll launch the new product on June 10.\n- Ravi to prepare onboarding docs by June 5.\n- Priya will follow up with logistics team on packaging delay.\n- Beta users requested a mobile-first dashboard."
  }'
```

---

## 📁 File Upload Request (via curl)

```bash
curl -X POST http://localhost:3000/process-meeting \
  -F "file=@./sample/sample1.txt"
```

---

## 🧪 Postman Instructions

1. **Method**: `POST`  
2. **URL**: `http://localhost:3000/process-meeting`  
3. **Headers** (for raw text):
   ```
   Content-Type: application/json
   ```
4. **Body** (raw → JSON):
   ```json
   {
     "rawText": "Team Sync – May 26\n\n- We’ll launch the new product on June 10.\n- Ravi to prepare onboarding docs by June 5.\n- Priya will follow up with logistics team on packaging delay.\n- Beta users requested a mobile-first dashboard."
   }
   ```

For file upload, switch body type to **form-data** and add a key named `file` with `.txt` file attached.

---

## ✅ Sample API Output

```json
{
  "summary": "The team finalized the product launch date and discussed onboarding and logistics tasks. Feedback on a mobile-first dashboard was also shared.",
  "decisions": [
    "Launch scheduled for June 10",
    "Mobile-first dashboard feedback considered"
  ],
  "actionItems": [
    {
      "task": "Prepare onboarding docs",
      "owner": "Ravi",
      "due": "June 5"
    },
    {
      "task": "Follow up with logistics team",
      "owner": "Priya"
    }
  ]
}
```

---

## 📂 Project Structure

```
assignment_sales-duo/
├── index.js               # Express server logic
├── api_call/
│   ├── claude_client.js       # Claude API request logic
│         
├── uploads/                # Directory for temporary file uploads
├── sample/
│   ├── meeting1.txt         # Sample meeting note 1
│   └── meeting2.txt         # Sample meeting note 2
├── .env                    # Environment config (not committed)
├── package.json
└── README.md
```

---

## 📄 Sample `.txt` Files

You’ll find these in the `/sample` directory.

### ✅ sample1.txt

```
Marketing Team Meeting – May 20

- Social campaign launches June 1.
- Ankit to prepare ad creatives by May 28.
- Feedback from the last campaign was positive.
- Need better engagement tracking.
```

---

### ✅ sample2.txt

```
Sprint Review – May 25

- Project Beta will be released July 15.
- Swati to fix remaining bugs by July 5.
- Frontend team praised for the new UI.
- Raj to lead the next demo with stakeholders.
```

---

## ⚠️ Error Handling

- `400 Bad Request`: Missing input (no file or rawText)
- `500 Internal Server Error`: API failure or unexpected issues
- Proper logging is implemented in the server console

---

## 🤝 Acknowledgements

- [Anthropic Claude API](https://www.anthropic.com/)
- [Express.js](https://expressjs.com/)
- [Multer](https://github.com/expressjs/multer)

---

