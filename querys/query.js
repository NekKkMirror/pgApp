const getStudents = `SELECT * FROM public.students;`
const getStudentById = `SELECT * FROM public.students WHERE id = $1;`
const addStudent = `INSERT INTO students(name, email, age, dob) VALUES($1, $2, $3, $4);`
const verifyStudentEmail = `SELECT * FROM students WHERE email = $1;`
const deleteStudent = `DELETE FROM students WHERE id = $1;`
const updateUser = `UPDATE students SET name = $1, email = $2, age = $3 WHERE id = $4;`

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  verifyStudentEmail,
  deleteStudent,
  updateUser
}