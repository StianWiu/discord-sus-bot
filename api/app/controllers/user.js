const axios = require('axios');
module.exports = {
  join: async function (req, res) {
    const userid = req.body.userid;

    // Generate a random code with numbers and letters 5 characters long
    const code = Math.random().toString(36).substring(2, 7);

    // Create a new user in the database
    const addUser = require('../services/addUser.js');

    // Add the user to the database
    const result = await addUser(userid, code);

    if (result === false) {
      res.status(500).send("Error adding user to database");
      return;
    }
    // Send the code to the user
    res.send(code);
  },
  check: async function (req, res) {

    // Get the code from the URL
    let code = req.params.code;
    // Remove the first character from the code
    code = code.substring(1);

    const validateCode = require('../services/validateCode.js');

    // Check if the code is valid
    const result = await validateCode(code);
    if (result.correct === false) {
      res.status(500).send("Error validating code");
      return;
    } else {
      res.status(200).send("Correct");

      const id = result.id;
      // Remove the user from the database
      const removeUser = require('../services/removeUser.js');
      await removeUser(id);

      // More logic for removing the role from the user
      axios({
        method: 'get',
        url: 'https://captcha.fridgedoorfamous.tech/api/bot/unlock:' + id,
      })
    }
  },
  // We need to create a endpoint that will return all the users that need to be kicked
  // They need to be kicked if their time is over 90 minutes.

  kick: async function (req, res) {
    const getOverdueUsers = require('../services/getOverdueUsers.js');
    const result = await getOverdueUsers();
    res.send(result);
  },
  gone: async function (req, res) {
    // User has been removed so we need to remove them from the database
    let id = req.params.userid;
    id = id.substring(1);
    const removeUser = require('../services/removeUser.js');
    await removeUser(id);
    res.send("User removed");
    console.log("User removed");
  }
};
