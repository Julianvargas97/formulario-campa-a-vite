import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";
import FormularioCiudadano from "./components/FormularioCiudadano";

const firebaseConfig = {
  apiKey: "AIzaSyAj95PSPPx8qz9ReYrFyLiKu9E2knszShs",
  authDomain: "formulario-vinculacion-4f870.firebaseapp.com",
  projectId: "formulario-vinculacion-4f870",
  storageBucket: "formulario-vinculacion-4f870.appspot.com",
  messagingSenderId: "772408250491",
  appId: "1:772408250491:web:0ab86aa13997952550d2de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Functions
const functions = getFunctions(app);

export { app, functions };

function App() {
  return <FormularioCiudadano />;
}

export default App;
