const database = require('simpl.db')
const db = new database({
  path: '../../database.json',
  autoSave: true,
  tabSize: 2
})

module.exports = async function (code) {
  // Get all users from the database
  const users = await db.fetch('users');

  // If object is empty, return that the code is incorrect
  if (Object.keys(users).length === 0) {
    return {
      correct: false
    };
  }

  // Loop through all users
  for (const user in users) {
    // Check if the code is correct
    if (users[user].code === code) {
      // Return the id of the user
      return {
        correct: true,
        id: user
      };
    }
    // If we are on the last loop and the code is not correct
    if (user === Object.keys(users)[Object.keys(users).length - 1]) {
      // Return that the code is incorrect
      return {
        correct: false
      };
    }
  }
}