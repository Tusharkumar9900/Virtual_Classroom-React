const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:3000/virtual-classroom', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Define a User schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher'], required: true },
});

// Create a User model
const User = mongoose.model('User', userSchema);

// Implement authentication and authorization middleware
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
};

const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    res.status(403).send('Forbidden');
  } else {
    next();
  }
};

// Define routes for user registration, login, and profile
app.post('/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.send({ user, token });
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || user.password !== req.body.password) {
    res.status(401).send('Invalid email or password');
  } else {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.send({ user, token });
  }
});

app.get('/profile', authenticateUser, (req, res) => {
  res.send(req.user);
});

// Define routes for creating and joining virtual classrooms
app.post('/classrooms', authenticateUser, authorizeRole('teacher'), async (req, res) => {
  // Create a new virtual classroom
  const { name, description } = req.body;
  const teacher = req.user;

  const classroom = new Classroom({ name, description, teacher });
  await classroom.save();

  teacher.classrooms.push(classroom);
  await teacher.save();

  res.send(classroom);
});

app.post('/classrooms/:id/join', authenticateUser, authorizeRole('student'), async (req, res) => {
  // Join a virtual classroom
  const { id } = req.params;
  const student = req.user;

  const classroom = await Classroom.findById(id);
  if (!classroom) {
    res.status(404).send('Classroom not found');
  }

  classroom.students.push(student);
  await classroom.save();

  student.classrooms.push(classroom);
  await student.save();

  res.send(classroom);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));