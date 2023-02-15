const database = require('simpl.db')
const db = new database({
  path: '../../database.json',
  autoSave: true,
  tabSize: 2
})

module.exports = async function (id) {
  // Remove user from database
  try {
    await db.delete(`users.${id}`)
    await db.save()
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}