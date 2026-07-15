require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


const cors = require('cors');
app.use(cors());
// connect to postgres
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// route to handle form submission

app.post('/submit', async (req, res) => {
  const { title, start_time, end_time, date } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO tasks
       (title,start_time,end_time,date)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [title, start_time, end_time, date]
    );


    /*app.get('/tasks', async (req, res) => {
      try {
        const result = await pool.query(
          `SELECT *
       FROM tasks
       WHERE date = CURRENT_DATE
       ORDER BY start_time`
        );

        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).json({
          error: 'Failed to fetch tasks'
        });
      }
    });*/





    res.json({
      success: true,
      task: result.rows[0]
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({ success: false });
  }
});
app.get('/tasks/:date', async (req, res) => {
  try {
    const { date } = req.params;

    const result = await pool.query(
      `SELECT *
       FROM tasks
       WHERE date = $1
       ORDER BY start_time`,
      [date]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Failed to fetch tasks'
    });
  }
});


app.listen(3000, () => console.log('Server running on port 3000'));


































































































//app.post('/submit', async (req, res) => {
//  const { title, start_time, end_time, date } = req.body;
//  console.log(req.body);
//  try {
//    await pool.query(
//      'INSERT INTO tasks (title,start_time,end_time,date) VALUES ($1,$2,$3,$4)',
//      [title, start_time, end_time, date]
//    );

//    res.send('Data saved!');
//  } catch (err) {
//    console.error(err);
//    res.send('Error saving data');
//  }
//});

