const express = require('express');
const router = express.Router();
const { models } = require('./database.js'); 
const { Patient, Notes } = models;
// GET all notes for a specific patient
router.get('/:patient_id/notes', async (req, res) => {
  const { patient_id } = req.params;
  try {
    const patient = await Patient.findByPk(patient_id);
    if (!patient) {
      return res.status(404).send({ message: 'Patient not found' });
    }

    const notes = await Notes.findAll({
      where: { patient_id }
    });
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).send('Server error');
  }
});

router.post('/:patient_id/notes', async (req, res) => {
    const { patient_id } = req.params;
    const { notes, consult } = req.body;
  
    try {
      const patient = await Patient.findByPk(patient_id);
      if (!patient) {
        return res.status(404).send({ message: 'Patient not found' });
      }
  
      // Find the lowest available note_id
      const usedIds = await Notes.findAll({
        attributes: ['note_id'],
        order: ['note_id']
      });
  
      let minId = 1;
      for (let i = 0; i < usedIds.length; i++) {
        if (usedIds[i].note_id > minId) break;
        minId++;
      }
  
      // Create the new note with the lowest available ID
      const newNote = await Notes.create({
        note_id: minId,  // Use the found minimum ID
        patient_id,
        notes,
        consult
      });
  
      res.status(201).json(newNote);
    } catch (error) {
      console.error('Error creating note:', error);
      res.status(500).send('Server error');
    }
  });
  

// PUT update an existing note for a specific patient
// Assumes note_id is unique across the system, otherwise, we need to check patient_id in the condition as well
router.put('/:patient_id/notes/:note_id', async (req, res) => {
  const { patient_id, note_id } = req.params;
  const { notes, consult } = req.body;

  try {
    const patient = await Patient.findByPk(patient_id);
    if (!patient) {
      return res.status(404).send({ message: 'Patient not found' });
    }

    const updatedNote = await Notes.update(
      { notes, consult },
      {
        where: { note_id, patient_id }
      }
    );

    if (updatedNote[0] === 1) { // Checking if the update was successful
      res.send({ message: 'Note updated successfully' });
    } else {
      res.status(404).send({ message: 'Note not found' });
    }
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).send('Server error');
  }
});

// DELETE a note for a specific patient
router.delete('/:patient_id/notes/:note_id', async (req, res) => {
  const { patient_id, note_id } = req.params;

  try {
    const patient = await Patient.findByPk(patient_id);
    if (!patient) {
      return res.status(404).send({ message: 'Patient not found' });
    }

    const result = await Notes.destroy({
      where: { note_id, patient_id }
    });

    if (result === 1) { // Checking if the deletion was successful
      res.send({ message: 'Note deleted successfully' });
    } else {
      res.status(404).send({ message: 'Note not found' });
    }
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
