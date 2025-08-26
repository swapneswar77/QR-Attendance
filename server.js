const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const QRCode = require('qrcode');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/attendanceSystem', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// User schema
const userSchema = new mongoose.Schema({
    userId: String,
    name: String,
    qrCode: String
});
const User = mongoose.model('User', userSchema);

// Attendance schema
const attendanceSchema = new mongoose.Schema({
    userId: String,
    timestamp: { type: Date, default: Date.now }
});
const Attendance = mongoose.model('Attendance', attendanceSchema);

// Route to generate QR code for a new user
app.post('/generate-qr', async (req, res) => {
    const { userId, name } = req.body;

    try {
        const qrCodeData = `${userId}:${name}`;
        const qrCodeImage = await QRCode.toDataURL(qrCodeData);

        const newUser = new User({ userId, name, qrCode: qrCodeImage });
        await newUser.save();

        res.json({ message: 'QR code generated', qrCodeImage });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate QR code' });
    }
});

// Route to mark attendance
app.post('/scan-qr', async (req, res) => {
    const { qrCodeData } = req.body;  
    const [userId, name] = qrCodeData.split(':');

    const user = await User.findOne({ userId });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const attendance = new Attendance({ userId });
    await attendance.save();

    res.json({ message: 'Attendance recorded', user });
});

// Fetch attendance records
app.get('/attendance', async (req, res) => {
    const records = await Attendance.find();
    res.json(records);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
