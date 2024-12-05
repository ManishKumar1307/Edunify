import { Routes, Route } from 'react-router-dom';
import AddSchool from './components/AddSchool';
import ShowSchools from './components/ShowSchools';
import Navbar from './components/navbar/Navbar';

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<ShowSchools />} />
        <Route path="/add-school" element={<AddSchool />} />
      </Routes>
    </div>
  );
}
