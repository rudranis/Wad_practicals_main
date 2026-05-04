const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Student = require('./models/Student');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
mongoose.connect('mongodb://127.0.0.1:27017/student');

// Helper function
function calculate(s) {
    const total = s.WAD_Marks + s.CC_Marks + s.DSBDA_Marks + s.CNS_Marks + s.AI_marks;
    const percentage = total / 5;
    return { total, percentage };
}

// HOME
app.get('/', async (req, res) => {
    const students = await Student.find();
    const count = await Student.countDocuments();
    res.render('index', { students, count });
});

// INSERT SAMPLE DATA
app.get('/insert', async (req, res) => {
    await Student.deleteMany({});

    let data = [
        { Name: "ABC", Roll_No: 111, WAD_Marks: 30, CC_Marks: 30, DSBDA_Marks: 30, CNS_Marks: 30, AI_marks: 30 },
        { Name: "XYZ", Roll_No: 112, WAD_Marks: 35, CC_Marks: 28, DSBDA_Marks: 22, CNS_Marks: 27, AI_marks: 29 },
        { Name: "PQR", Roll_No: 113, WAD_Marks: 10, CC_Marks: 15, DSBDA_Marks: 18, CNS_Marks: 20, AI_marks: 12 }
    ];

    data = data.map(s => {
        const calc = calculate(s);
        return { ...s, Total: calc.total, Percentage: calc.percentage };
    });

    await Student.insertMany(data);
    res.redirect('/');
});

// DSBDA > 20
app.get('/dsbda', async (req, res) => {
    const students = await Student.find({ DSBDA_Marks: { $gt: 20 } });
    res.render('result', { students, title: "DSBDA > 20" });
});

// >25 IN ALL SUBJECTS
app.get('/above25', async (req, res) => {
    const students = await Student.find({
        WAD_Marks: { $gt: 25 },
        CC_Marks: { $gt: 25 },
        DSBDA_Marks: { $gt: 25 },
        CNS_Marks: { $gt: 25 },
        AI_marks: { $gt: 25 }
    });
    res.render('result', { students, title: ">25 in ALL Subjects" });
});

// <40 IN WAD AND CC
app.get('/less40', async (req, res) => {
    const students = await Student.find({
        WAD_Marks: { $lt: 40 },
        CC_Marks: { $lt: 40 }
    });
    res.render('result', { students, title: "<40 in WAD & CC" });
});

// UPDATE SPECIFIC STUDENT (+10)
app.post('/update', async (req, res) => {
    const roll = req.body.roll;

    await Student.updateOne(
        { Roll_No: roll },
        {
            $inc: {
                WAD_Marks: 10,
                CC_Marks: 10,
                DSBDA_Marks: 10,
                CNS_Marks: 10,
                AI_marks: 10
            }
        }
    );

    const s = await Student.findOne({ Roll_No: roll });

    if (s) {
        const calc = calculate(s);
        s.Total = calc.total;
        s.Percentage = calc.percentage;
        await s.save();
    }

    res.redirect('/');
});

// DELETE BY ROLL
app.post('/delete', async (req, res) => {
    const roll = req.body.roll;
    await Student.deleteOne({ Roll_No: roll });
    res.redirect('/');
});

app.listen(3000, () => console.log("Server running on port 3000"));