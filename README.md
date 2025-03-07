# Image Background Remover - Backend

A FastAPI backend service that removes backgrounds from images using the `rembg` library.

## Features

- Upload images (PNG, JPG, JPEG)
- Remove background using AI (U2NET model)
- Return base64 encoded processed image
- CORS support for frontend integration
- Real-time progress logging
- Error handling and validation

## Tech Stack

- FastAPI
- Python 3.x
- rembg for background removal
- Pillow for image processing
- uvicorn for ASGI server

## Prerequisites

- Python 3.x
- pip (Python package manager)

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:igorbrandao18/backend-image-background-remove.git
   cd backend-image-background-remove
   ```

2. Set up Python virtual environment and install dependencies:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use: .\venv\Scripts\activate
   pip install rembg pillow fastapi python-multipart uvicorn
   ```

## Running the Application

1. Start the FastAPI server:
   ```bash
   cd src
   python -m api.server
   ```

   The server will start at http://localhost:8000

2. API endpoints:
   - POST /api/remove-background - Upload and process image
   - OPTIONS /api/remove-background - CORS preflight

## API Usage

### Remove Background

```bash
curl -X POST "http://localhost:8000/api/remove-background" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@image.jpg"
```

Response:
```json
{
  "processedImage": "data:image/png;base64,...",
  "message": "Background removed successfully"
}
```

## Development

The project structure:
```
src/
└── api/
    ├── __init__.py
    └── server.py
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
