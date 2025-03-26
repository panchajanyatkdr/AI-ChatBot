import logo from './logo.svg';
import './App.css';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <>

      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <ChatBot />
      </div>
    </>
  );
}

export default App;
