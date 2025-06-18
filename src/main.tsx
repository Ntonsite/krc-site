
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Prevent automatic logout during development hot reload
if (import.meta.hot) {
  import.meta.hot.accept();
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
