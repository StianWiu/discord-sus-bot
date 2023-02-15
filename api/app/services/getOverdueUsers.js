const database = require('simpl.db')
const db = new database({
  path: '../../database.json',
  autoSave: true,
  tabSize: 2
})

module.exports = async function () {
  // Get all users
  const users = await db.fetch('users')
  // Create an array to store the overdue users
  let overdueUsers = []
  // Check if there are any users
  if (users) {
    // Loop through all the users
    // We need to use Object.entries() because users is an object
    for (const [id, user] of Object.entries(users)) {
      // Get the time the user was added
      const time = user.time
      // Get the current time
      const currentTime = Date.now()
      // Calculate the difference between the two
      const difference = currentTime - time
      // Check if the difference is greater than 90 minutes
      if (difference > 90 * 60 * 1000) {
        // Add the user to the overdue users array
        overdueUsers.push(id)
      }
    }
  }
  // Return the overdue users
  return overdueUsers
}