import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/calendar.css";

export default function Todo({ onNavigate }) {
    const [title, setTitle] = useState('');
    const [start_time, setStartTime] = useState(null);
    const [end_time, setEndTime] = useState(null);
    const [date, setDate] = useState('');



    const formatTime = (date) => {

        if (!date) return '';

        return date.toTimeString().slice(0, 5);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit clicked");

        const formData = {
            title,
            start_time: formatTime(start_time),
            end_time: formatTime(end_time),
            date
        };

        const response = await fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        console.log("Response status:", response.status);

        const result = await response.json();


        if (result.success) {
            onNavigate?.();
        }
    };


    return (
        <div className="min-h-screen bg-pink-50 flex items-center justify-center px-6">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-pink-100 p-8">

                <div className="text-center mb-6">
                    <h1 className="text-5xl mb-2">📝</h1>
                    <h2 className="text-3xl font-bold text-pink-700">
                        New Task
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Plan your day beautifully ✨
                    </p>
                </div>

                <form

                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Plan your day!"
                        required
                        className="w-full p-3 rounded-xl border border-pink-200 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />

                    <label className="block text-sm font-medium text-pink-700">

                        Start Time

                    </label>
                    <DatePicker
                        selected={start_time}
                        onChange={(date) => setStartTime(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        className="w-full p-3 rounded-xl border border-pink-200 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />
                    <label className="block text-sm font-medium text-pink-700">

                        End Time

                    </label>
                    <DatePicker
                        selected={end_time}
                        onChange={(date) => setEndTime(date)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        className="w-full p-3 rounded-xl border border-pink-200 bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />
                    <label className="block text-sm font-medium text-pink-700">

                        Date

                    </label>
                    <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        dateFormat="MMMM d, yyyy"
                        className="w-full p-3 rounded-xl border border-pink-200 bg-pink-50"
                    />

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => onNavigate?.()}
                            className="px-4 py-2 text-pink-600 hover:text-pink-800 transition"
                        >
                            ← Back
                        </button>

                        <button
                            type="submit"
                            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-xl font-semibold shadow-md transition"
                        >
                            Add To Schedule
                        </button>
                    </div>


                </form>

            </div>

        </div>
    );
}





















































































































//export default function Todo() {
// return (
//   <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white p-6">
//
//          <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
//
//              <h1 className="text-4xl font-bold text-center mb-6 text-cyan-400">
//                📝
//          </h1>
//
//              <form
//                action="http://localhost:3000/submit"
//              method="POST"
//            className="space-y-4"
//      >
//
//                  <input
//                    type="text"
//                  name="title"
//                placeholder="Plan your day!"
//              required
//            className="w-full p-3 rounded-lg bg-gray-700 outline-none"
//      />
//
//                  <input
//                    type="time"
//                  name="start_time"
//                required
//              className="w-full p-3 rounded-lg bg-gray-700 outline-none"
//        />
//
//                  <input
//                    type="time"
//                  name="end_time"
//                required
//              className="w-full p-3 rounded-lg bg-gray-700 outline-none"
//        />
//      <input
//        type="date"
//      name="date"
//    required
//  className="w-full p-3 rounded-lg bg-gray-700 outline-none"
///>
//
//                  <button
//                    type="submit"
//                  className="w-full bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg font-bold"
//            >
//              Add Schedule
//        </button>
//
//              </form>
//
//          </div>
//
//      </div>
//  );
//}