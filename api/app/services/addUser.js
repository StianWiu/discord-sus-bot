const database = require('simpl.db')
const db = new database({
  path: '../../database.json',
  autoSave: true,
  tabSize: 2
})

module.exports = async function (userid, code) {
  // Add user to database under "users.userid", with the code and the time they joined.
  try {
    await db.set(`users.${userid}`, {
      code: code,
      time: Date.now()
    })
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }

}