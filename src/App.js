import './App.css';
import Enter from './components/Enter';
import { Route, Routes } from "react-router-dom";
import Chat from './components/Chat';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Enter /> } />
        <Route path='/chats/:roomId' element={ <Chat /> }/>
      </Routes>
    </div>
  );
}

export default App;
