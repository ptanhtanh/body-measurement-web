# Body Measurement Inference System Frontend

A premium, modern React application for AI-powered body measurement inference.

## 🚀 Features

- **Modern UI**: Gradient-based design with glassmorphism and smooth animations.
- **3D Reconstruction**: Visualizes the inferred body mesh in 3D using React Three Fiber.
- **Image Upload**: Drag-and-drop image upload with instant preview and validation.
- **Real-time Results**: Displays inferred measurements (height, weight, chest, etc.) in a clean dashboard.
- **Responsive**: Fully optimized for mobile and desktop views.

## 🛠 Tech Stack

- **ReactJS**: Component-based architecture.
- **Three.js / React Three Fiber**: 3D mesh rendering.
- **TailwindCSS**: Modern utility-first styling.
- **Framer Motion**: Smooth transitions and animations.
- **Axios**: API communication.
- **Lucide React**: Premium icon set.

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd body-measurement-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file from the example:
     ```bash
     cp .env.example .env
     ```
   - Set `VITE_API_BASE_URL` to your backend service URL.

### Running Locally

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

## 📂 Project Structure

```text
src/
├── components/     # UI components (Header, Viewer, Uploader, etc.)
├── services/       # API services
├── hooks/          # Custom React hooks
├── utils/          # Helper functions
├── App.jsx         # Main application assembly
├── index.css       # Global styles and Tailwind configuration
└── main.jsx        # Entry point
```
