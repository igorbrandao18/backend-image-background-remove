# 🎨 Qik Background - AI Image Processing

> Professional background removal powered by advanced AI technology, created with ❤️ by Igor Brandão.

<div align="center">
  <img src="public/grid.svg" alt="Grid Pattern" width="100" />
</div>

## ✨ Features

- 🖼️ **Instant Background Removal** - Remove backgrounds from images in seconds
- 🤖 **AI-Powered** - Utilizes advanced U2NET model for precise results
- 🎯 **High Precision** - Professional-grade output quality
- 🚀 **Real-time Processing** - Watch the magic happen instantly
- 📱 **Responsive Design** - Works beautifully on all devices
- 🌓 **Dark Mode Support** - Easy on the eyes, day or night

## 🛠️ Tech Stack

### Frontend
- ⚛️ Next.js 14 with App Router
- 💅 Styled Components
- 🎭 TypeScript
- 📡 Axios for API communication

### Backend
- 🐍 FastAPI
- 🤖 rembg for AI processing
- 🖼️ Pillow for image handling
- 🚀 uvicorn for ASGI server

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.x and pip
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/igorbrandao18/image-background-remove.git
   cd image-background-remove
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Set up Python environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements.txt
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd src
   python -m api.server
   ```

2. In a new terminal, start the frontend:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

## 🎯 Project Structure

```
.
├── src/
│   ├── app/                    # Next.js pages and layouts
│   ├── components/             # React components
│   ├── styles/                 # Theme and global styles
│   ├── types/                  # TypeScript definitions
│   └── api/                    # FastAPI backend
├── public/                     # Static assets
└── package.json               # Project configuration
```

## 🎨 Design Features

- Modern, clean interface
- Smooth animations and transitions
- Intuitive drag-and-drop upload
- Real-time processing feedback
- Before/After image comparison
- Responsive grid layouts

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Created with passion by [Igor Brandão](https://github.com/igorbrandao18). Special thanks to everyone who made this project possible and for the opportunity to create something amazing! Your support and trust mean the world to me.

---

<div align="center">
  Made with ❤️ by Igor Brandão
  
  [GitHub](https://github.com/igorbrandao18) • [LinkedIn](https://www.linkedin.com/in/igorbrandaodeveloper/)
</div>
