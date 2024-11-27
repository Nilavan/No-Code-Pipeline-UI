# No Code Pipeline UI  

## Overview  
The **No Code Pipeline UI** is a highly customizable and reusable drag-and-drop interface designed to simplify workflows. It provides an intuitive way to create, connect, and configure nodes for various applications, with seamless backend integration for validating and processing pipelines.

## File Structure  

```bash
├── backend/
│ └── main.py 
├── frontend/ 
│ ├── package.json 
│ ├── public/
│ ├── src/ 
│ │ ├── App.js 
│ │ ├── index.css 
│ │ ├── index.js 
│ │ ├── nodes/ 
│ │ │ ├── baseNode.js 
│ │ │ ├── conditionNode.js 
│ │ │ ├── dataCollectorNode.js 
│ │ │ ├── fileNode.js 
│ │ │ ├── inputNode.js 
│ │ │ ├── knowledgeBaseNode.js 
│ │ │ ├── llmNode.js 
│ │ │ ├── outputNode.js 
│ │ │ ├── sampleNode.js 
│ │ │ ├── sttNode.js 
│ │ │ └── textNode.js 
│ │ ├── components/ 
│ │ │ ├── notification.js 
│ │ │ └── draggableNode.js 
│ │ ├── store.js 
│ │ ├── submit.js 
│ │ ├── toolbar.js 
│ │ └── ui.js 
│ └── tailwind.config.js 
├── README.md
├── LICENSE
└── .gitignore
```

## Installation  

### **1. Backend Setup**  
1. Navigate to the backend folder:  
   ```bash
   cd backend
   ```
2. Create a virtual environment:  
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:  
   - For Windows:  
     ```bash
     .\venv\Scripts\activate
     ```  
   - For macOS/Linux:  
     ```bash
     source venv/bin/activate
     ```
4. Start the backend server:  
   ```bash
   uvicorn main:app --reload
   ```

### **2. Frontend Setup**  
1. Navigate to the frontend folder:  
   ```bash
   cd frontend
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Start the development server:  
   ```bash
   npm start
   ```

## Usage  
1. Open the application in your browser (default: `http://localhost:3000`).  
2. Drag and drop nodes to design your workflow.  
3. Use the submit button to validate the pipeline and get feedback.  

## Sample
![sample](/sample.png)

## Key Technologies  

- **React**: Core framework for building the UI.  
- **React Flow**: Drag-and-drop functionality for nodes and edges.  
- **Tailwind CSS**: Modern, utility-first styling.  
- **FastAPI**: Simple backend API with python.

## License  
This project is licensed under the MIT License.  - see the [LICENSE.md](LICENSE) file for details

> [nilavan.github.io](https://www.nilavan.github.io) &nbsp;&middot;&nbsp;
> GitHub [@Nilavan](https://github.com/Nilavan) &nbsp;&middot;&nbsp;
