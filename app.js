const mongoose = require('mongoose');

(async () => {
    console.log("Application Started");

    mongoose.connect('insert_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        const db = await mongoose.connection;
        console.log('DB Connection Successful');

        const studentSchema = new mongoose.Schema({
            _id: Number,
            firstName: String,
            lastName: String,
            age: Number
        }, { timestamps: true });

        studentSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 });

        const Student = mongoose.model('Student', studentSchema);

        const newStudent = new Student({
            _id: 307,
            firstName: 'Temp4',
            lastName: 'Temp4',
            age: 30
        });

        const status = await newStudent.save();

        console.log('Save Successful', status);

        const fetchStudent = await Student.find({ _id: 308 });

        console.log('Read Student', fetchStudent.length > 0 ? fetchStudent[0].firstName : null);

    } catch (error) {
        console.log('Error Occured:', error);
    } finally {
        if (mongoose !== undefined) {
            console.log("Closing DB Connection");
            await mongoose.disconnect();
        }
    }

    console.log("Application Ended");
})();


