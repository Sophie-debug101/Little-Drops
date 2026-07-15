import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "../styles/calendar.css";


const formatDate = (date) =>
    date.toISOString().split('T')[0];

export default function Home({ onNavigate }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [state, setState] = useState(false);
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        setSelectedDate(new Date());
    }, []);
    useEffect(() => {
        const formattedDate = formatDate(selectedDate);
        fetch(`http://localhost:3000/tasks/${formattedDate}`)
            .then(res => res.json())
            .then(data => {
                //console.log("API response:", data);

                if (Array.isArray(data)) {
                    setTasks(data);
                } else {
                    setTasks([]);
                }
            })
            .catch(err => {
                console.error(err);
                setTasks([]);
            });

    }, [selectedDate]);

    const safeTasks = Array.isArray(tasks) ? tasks : [];

    return (
        <div className="min-h-screen bg-pink-50 p-6 relative">
            <div
                className="absolute top-6 left-6 text-pink-400 text-5xl tracking-wide italic"



                style={{ fontFamily: "'Great Vibes', cursive" }}
            >
                Little Drops
            </div>

            <div className="max-w-6xl mx-auto py-12">

                {/*<h1 className="text-4xl font-light tracking-wide text-pink-700 flex justify-center">
                    Welcome Back ✨
                </h1> */}
                <h1
                    className="text-4xl text-pink-700 tracking-wide flex justify-center"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    Welcome Back ✨
                </h1>
            </div>
            {/*<div className="grid md:grid-cols-2 gap-6">*/}
            {/*<div className="grid md:grid-cols-2 gap-6 items-start">*/}
            <div className="grid md:grid-cols-2 gap-6 items-start w-full">
                <div className="flex flex-col gap-6 w-full">
                    {/*<div className="calendar-wrapper bg-white rounded-3xl p-6 shadow-xl border border-pink-100">*/}
                    <div className="w-full bg-white rounded-3xl p-6 shadow-xl border border-pink-100">
                        <Calendar
                            onChange={setSelectedDate}
                            value={selectedDate}
                        />
                    </div>
                    {/*</div>*/}
                    <div className="flex justify-center gap-6">

                        <button
                            onClick={() => onNavigate?.('water')}
                            className="w-14 h-14 rounded-full bg-slate-300 hover:bg-slate-400 text-white text-xl shadow-md flex items-center justify-center"
                        >
                            💧
                        </button>

                        <button
                            onClick={() => onNavigate?.('finance')}
                            className="w-14 h-14 rounded-full bg-emerald-200 hover:bg-emerald-300 text-white text-xl shadow-md flex items-center justify-center"
                        >
                            💰
                        </button>

                        <button
                            onClick={() => onNavigate?.('journal')}
                            className="w-14 h-14 rounded-full bg-violet-200 hover:bg-violet-300 text-white text-xl shadow-md flex items-center justify-center"
                        >
                            📖
                        </button>

                    </div>
                </div>

                {/*<div className="bg-white rounded-3xl p-6 shadow-xl border border-pink-100">*/}
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-pink-100 max-h-[500px] overflow-y-auto">

                    {/*<h2 className="text-2xl font-bold text-pink-700 mb-4">
                        Tasks
                    </h2>*/}
                    <h2
                        className="text-2xl font-bold text-pink-700 tracking-wide"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Tasks
                    </h2>

                    <p className="text-gray-500 mb-4">
                        {selectedDate.toDateString()}
                    </p>

                    {safeTasks.length === 0 ? (
                        <div className="text-center text-gray-400 py-10">
                            <p className="text-3xl">📭</p>

                            <p>No tasks for this day</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {safeTasks.map(task => (
                                <div
                                    key={task.id}
                                    className="bg-pink-50 p-4 rounded-xl border border-pink-100"
                                >
                                    <h3 className="font-semibold">
                                        {task.title}
                                    </h3>

                                    <p className="text-sm text-gray-500">🕒
                                        {task.start_time.slice(0, 5)}
                                        {' - '}
                                        {task.end_time.slice(0, 5)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                </div>

            </div>

            <button
                onClick={() => onNavigate?.()}
                className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-pink-500 text-white text-3xl shadow-lg hover:bg-pink-600"
            >
                +
            </button>

        </div>


    );

}
/* 



*/