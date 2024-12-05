const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer'); 
const path = require('path');  
const { body, validationResult } = require('express-validator');  
const app = express();


app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use('/schoolImages', express.static(path.join(__dirname, 'schoolImages')));


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kumar@123',
  database: 'schools_data'
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});


const createTableQuery = `
  CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    contact BIGINT NOT NULL,
    image TEXT NOT NULL,
    email_id TEXT NOT NULL
  );
`;


db.query(createTableQuery, (err, result) => {
  if (err) {
    console.error('Error creating table:', err.stack);
    return;
  }
  console.log('Schools table created or already exists');
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'schoolImages');
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${Date.now()}${fileExtension}`; 
    cb(null, fileName);
  }
});

const upload = multer({ storage });


//Post Method
app.post('/api/schools', upload.single('image'), (req, res) => {
  console.log('Request Body:', req.body); 
  console.log('Uploaded File:', req.file); 

  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file ? req.file.path : null;

  
  if (!name || !address || !city || !state || !contact || !email_id || !image) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

 
  const insertQuery = `
    INSERT INTO schools (name, address, city, state, contact, email_id, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [name, address, city, state, contact, email_id, image];

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error('Error inserting school into the database:', err.stack);
      return res.status(500).json({ error: 'Error inserting school into the database' });
    }

 
    res.status(201).json({
      message: 'School added successfully!',
      data: {
        id: result.insertId,  
        name,
        address,
        city,
        state,
        contact,
        email_id,
        image,
      },
    });
  });
});


//Get Method
app.get('/api/schools', (req, res) => {
  const selectQuery = 'SELECT * FROM schools';

  db.query(selectQuery, (err, rows) => {
    if (err) {
      console.error('Error fetching schools:', err.stack);
      return res.status(500).json({ error: 'Error fetching schools' });
    }
    res.status(200).json({ schools: rows });
  });
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
