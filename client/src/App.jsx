import { useState } from 'react'
import Todo from './components/todo.jsx'
import Home from './components/home.jsx'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState('home');
  const [tasks, setTasks] = useState([]);


  return (
    <div>
      {currentPage === 'home' && <Home onNavigate={() => setCurrentPage('todo')} />}
      {currentPage === 'todo' && <Todo onNavigate={() => setCurrentPage('home')} />}
    </div>
  );


}

export default App;











































//  import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'

// import { useState } from 'react'
// export default function App() {
//   return (
//     <div>
//       <h2>Plan Your Day</h2>

//       <form action="/submit" method="POST">
//         <input
//           type="text"
//           name="name"
//           placeholder="Plan your day!"
//           required
//         />
//         <br /><br />

//         <label>Start Time:</label>
//         <input type="time" name="start_time" required />
//         <br /><br />

//         <label>End Time:</label>
//         <input type="time" name="end_time" required />
//         <br /><br />

//         <button type="submit">Add</button>
//       </form>
//     </div>
//   );
// }
