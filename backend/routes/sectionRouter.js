//Christopher Rocco
//Senior Capstone - SER492
//5-08-24

const express = require('express');
const router = express.Router();
const { sequelize } = require('./database.js');
const { models } = require('./database.js');
const { Sections, Instructor, Student, Patient } = models;
const { QueryTypes } = require('sequelize');

router.post('/add-section', async (req, res) => {
    const { instructor_id, section_id } = req.body;

    try {
        const section = await Sections.create({ instructor_id, section_id });
        res.status(201).json({ message: 'Section added successfully', sectionId: section.section_id });
    } catch (error) {
        console.error('Error adding new section:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

router.get('/section-list', async (req, res) => {
    const query = `
        SELECT 
            "Sections"."section_id",
            "Sections"."instructor_id",
            "Instructor"."first_name" AS "instructor.first_name",
            "Instructor"."last_name" AS "instructor.last_name",
            "Instructor"."role" AS "instructor.role",
            "Students"."user_id" AS "Students.user_id",
            "Students"."username" AS "Students.username",
            "Students"."fname" AS "Students.fname",
            "Students"."lname" AS "Students.lname"
        FROM 
            "Sections"
        LEFT JOIN "Instructor" ON "Sections"."instructor_id" = "Instructor"."instructor_id"
        LEFT JOIN "Student" AS "Students" ON "Sections"."section_id" = "Students"."section_id";
    `;

    try {
        const sections = await sequelize.query(query, {
            type: QueryTypes.SELECT,
            nest: true, // This will nest the JSON as required
            raw: true // This will ensure you get raw data
        });
        res.status(200).json(sections);
    } catch (error) {
        console.error('Error fetching sections:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

  router.post('/assign-patient', async (req, res) => {
    const { sectionId, patientId } = req.body;

    console.log(`Attempting to assign patient ${patientId} to section ${sectionId}`);
    try {
        // Step 1: Clear any existing patient assignments from this section
        await Patient.update(
            { section_id: null },
            { where: { section_id: sectionId } }
        );

        // Step 2: Assign the new patient to the section
        const result = await Patient.update(
            { section_id: sectionId },
            { where: { id: patientId } }
        );

        console.log(`Update result: ${result}`);
        if (result[0] > 0) {
            console.log(`Patient ${patientId} assigned to section ${sectionId} successfully.`);
            res.status(200).json({ message: 'Patient assigned successfully' });
        } else {
            console.log(`No record found to update for patient ${patientId}.`);
            res.status(404).json({ message: 'Patient not found or no update needed' });
        }
    } catch (error) {
        console.error('Error assigning patient:', error);
        res.status(500).json({ message: "Error assigning patient", error: error.message });
    }
});

router.get('/section/:sectionId/patients', async (req, res) => {
    const { sectionId } = req.params;
    try {
        const patients = await Patient.findAll({
            where: { section_id: sectionId }
        });
        res.json(patients);
    } catch (error) {
        res.status(500).send("Failed to fetch patients for section");
    }
});



  

  


module.exports = router;