const express = require('express');
const router = express.Router();

// Route: Get all patients 
router.get('/patients', async (req, res) => {
  try {

    const queryResult = await req.pool.query('SELECT * FROM public."Patient"');


    res.status(200).json(queryResult.rows);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});
// Route: Create a patient
router.post('/patients', async (req, res) => {
  const {
    id,
    section_id,
    fname,
    lname,
    dob,
    religion,
    height,
    weight,
    primary_diagnosis,
    pert_history,
    prev_medhistory,
    social_history,
    temperature,
    heart_rate,
    bps,
    bpd,
    blood_oxygen,
    resting_respiratory,
    pain
  } = req.body;

  try {
    const newPatientQuery = `
  INSERT INTO public."Patient" (
    id,
    section_id,
    fname,
    lname,
    dob,
    religion,
    height,
    weight,
    primary_diagnosis,
    pert_history,
    prev_medhistory,
    social_history,
    temperature,
    heart_rate,
    bps,
    bpd,
    blood_oxygen,
    resting_respiratory,
    pain
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
  RETURNING id;
`;


    const result = await req.pool.query(newPatientQuery, [
      id,
      section_id,
      fname,
      lname,
      dob,
      religion,
      height,
      weight,
      primary_diagnosis,
      pert_history,
      prev_medhistory,
      social_history,
      temperature,
      heart_rate,
      bps,
      bpd,
      blood_oxygen,
      resting_respiratory,
      pain
    ]);

    res.status(201).json({ message: 'Patient record created successfully', patientId: result.rows[0].id });
  } catch (error) {
    console.error('Error creating a new patient record:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route: Update patient by id
router.put('/patients/:id', async (req, res) => {
  const { id } = req.params;
  const {
    section_id, fname, lname, dob, religion, height, weight,
    primary_diagnosis, pert_history, prev_medhistory, social_history,
    temperature, heart_rate, bps, bpd, blood_oxygen, resting_respiratory, pain
  } = req.body;

  try {

    const updatePatientQuery = `
      UPDATE public."Patient" SET
        section_id = $1,
        fname = $2,
        lname = $3,
        dob = $4,
        religion = $5,
        height = $6,
        weight = $7,
        primary_diagnosis = $8,
        pert_history = $9,
        prev_medhistory = $10,
        social_history = $11,
        temperature = $12,
        heart_rate = $13,
        bps = $14,
        bpd = $15,
        blood_oxygen = $16,
        resting_respiratory = $17,
        pain = $18
      WHERE id = $19
      RETURNING *; 
    `;


    const result = await req.pool.query(updatePatientQuery, [
      section_id, fname, lname, dob, religion, height, weight,
      primary_diagnosis, pert_history, prev_medhistory, social_history,
      temperature, heart_rate, bps, bpd, blood_oxygen, resting_respiratory, pain, id
    ]);


    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient updated successfully', patient: result.rows[0] });
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Route: Create an instructor 
router.post('/add-instructor', async (req, res) => {
  const { instructor_id, username, password, role } = req.body;

  try {
    const result = await req.pool.query(
      'INSERT INTO public."Instructor" (instructor_id, username, password, "role") VALUES ($1, $2, $3, $4) RETURNING instructor_id;',
      [instructor_id, username, password, role]
    );

    res.status(201).json({ message: 'Instructor added successfully', instructorId: result.rows[0].instructor_id });
  } catch (error) {
    console.error('Error adding new instructor:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


// Route: Create a section 
router.post('/add-section', async (req, res) => {

  const { instructor_id, section_id } = req.body;

  try {

    const result = await req.pool.query(
      `INSERT INTO public."Sections" (instructor_id, section_id) 
       VALUES ($1, $2) 
       RETURNING section_id;`,
      [instructor_id, section_id]
    );


    res.status(201).json({ message: 'Section added successfully', sectionId: result.rows[0].section_id });
  } catch (error) {
    console.error('Error adding new section:', error);

    if (error.code === '23505') {
      res.status(400).json({ error: 'A section with the given section_id already exists.' });
    } else if (error.code === '23503') {
      res.status(400).json({ error: 'The provided instructor_id does not exist.' });
    } else {

      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  }
});

// Route: Delete a patient by id
router.delete('/patients/:id', async (req, res) => {
  const { id } = req.params;

  try {

    const result = await req.pool.query(
      'DELETE FROM public."Patient" WHERE id = $1 RETURNING *;',
      [id]
    );


    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }


    res.status(200).json({ message: 'Patient deleted successfully', deletedPatient: result.rows[0] });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


// Route: Get patient demographics 
router.get('/patients/:id/demographics', async (req, res) => {
  const { id } = req.params;

  try {

    const queryResult = await req.pool.query(
      'SELECT fname, lname, dob, religion FROM public."Patient" WHERE id = $1',
      [id]
    );

    if (queryResult.rows.length > 0) {
      res.status(200).json(queryResult.rows[0]);
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    console.error('Error fetching patient demographics:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Route: Create a patient Medication Reconciliation entry 
router.post('/medicine-patient', async (req, res) => {
  const { patient_id, med_id, dosage, route, frequency, taken_last, administered_at } = req.body;

  try {

    if (!administered_at) {
      return res.status(400).json({ error: 'administered_at is required' });
    }

    const queryResult = await req.pool.query(
      `INSERT INTO public.medicine_patient (patient_id, med_id, dosage, route, frequency, taken_last, administered_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *;`,
      [patient_id, med_id, dosage, route, frequency, taken_last, administered_at]
    );

    res.status(201).json(queryResult.rows[0]);
  } catch (error) {
    if (error.code === '23505' && error.constraint === 'medicine_patient_pkey') {

      return res.status(400).json({ error: 'Duplicate medication entry for patient' });
    }

    console.error('Error adding medication for patient:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Route: Delete all patients Medication Reconciliation entry 
router.delete('/medicine-patient/all', async (req, res) => {
  try {
    await req.pool.query('DELETE FROM public.medicine_patient');
    res.status(200).json({ message: 'All medication entries deleted successfully' });
  } catch (error) {
    console.error('Error deleting medication entries:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});



// Route: get a patients Medication Reconciliation history
router.get('/patients/:id/medications', async (req, res) => {
  const { id } = req.params;

  try {

    const queryResult = await req.pool.query(
      `SELECT mp.med_id, m.name, mp.dosage, mp.route, mp.frequency, mp.taken_last, mp.administered_at
       FROM public.medicine_patient mp
       JOIN public."Medicine" m ON mp.med_id = m.id
       WHERE mp.patient_id = $1;`,
      [id]
    );

    if (queryResult.rows.length > 0) {
      res.status(200).json(queryResult.rows);
    } else {
      res.status(404).json({ message: 'No medication records found for the specified patient' });
    }
  } catch (error) {
    console.error('Error fetching medications for patient:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


// Route: Input a new medication into the DB
router.post('/medicine', async (req, res) => {
  const { id, name } = req.body;

  try {
    const result = await req.pool.query(
      'INSERT INTO public."Medicine" (id, name) VALUES ($1, $2) RETURNING *',
      [id, name]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ message: "A medicine with this ID already exists." });
    }
    res.status(500).json({ message: error.message });
  }
});

// Route: Input a new patient allergy 
router.post('/patient-allergies', async (req, res) => {
  const { patient_id, allergy_id } = req.body;

  try {
    const result = await req.pool.query(
      `INSERT INTO public."PatientAllergies" (patient_id, allergy_id) VALUES ($1, $2) RETURNING *;`,
      [patient_id, allergy_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error assigning allergy to patient:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Route: Get all allergies in the DB
router.get('/allergies', async (req, res) => {
  try {
    const result = await req.pool.query('SELECT * FROM public."Allergies";');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching allergies:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

router.post('/patient-allergies', async (req, res) => {
  const { patient_id, allergy_id } = req.body;

  try {
    const result = await req.pool.query(
      `INSERT INTO public."PatientAllergies" (patient_id, allergy_id) VALUES ($1, $2) RETURNING *;`,
      [patient_id, allergy_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error assigning allergy to patient:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Route: Get all allergies for one patient 
router.get('/patients/:patient_id/allergies', async (req, res) => {
  const { patient_id } = req.params;

  try {
    const result = await req.pool.query(
      `SELECT a.allergy_id, a.name 
       FROM public."Allergies" a
       JOIN public."PatientAllergies" pa ON a.allergy_id = pa.allergy_id
       WHERE pa.patient_id = $1;`,
      [patient_id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching patient allergies:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


module.exports = router;

