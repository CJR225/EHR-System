
const express = require('express');
const router = express.Router();
const { models } = require('./database.js');
const { Sections } = models;

// Route: Create a section 
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
module.exports = router;