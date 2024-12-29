const courseModel = require("../models/Course");
const mongoose = require('mongoose');

// Get all courses
exports.getAllcourses = async (req, res) => {
    try {
        // return all courses sorted by createdAt in descending order
        const courses = await courseModel.find().sort({ createdAt: -1 });
        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Create a new course
exports.createCourse = async (req, res) => {
    try {
        const { title, price, image } = req.body;

        // Validate required fields
        if (!title || price === undefined) {
            return res.status(400).json({ message: "Title and price" });
        }
        if (title.length > 80) {
            return res.status(400).json({ message: "Title is too long" });
        }
        if (price < 0) {
            return res.status(400).json({ message: "Price must be a positive value" });
        }
        const newCourse = new courseModel({
            title,
            price,
            image,
        });
        await newCourse.save();
        res.status(201).json({ message: "Course created successfully", course: newCourse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update course
exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!Object.keys(updates).length) {
            return res.status(400).json({ message: "No update fields provided" });
        }
        if (updates.title && updates.title.length > 100) {
            return res.status(400).json({ message: "Title is too long" });
        }
        if (updates.price !== undefined && updates.price < 0) {
            return res.status(400).json({ message: "Price must be a positive value" });
        }
        // find the course by ID and update
        const updatedCourse = await courseModel.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// delete a course by ID
exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCourse = await courseModel.findByIdAndDelete(id);

        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({ message: "Course deleted successfully", course: deletedCourse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
