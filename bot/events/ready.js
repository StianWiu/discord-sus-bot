const { Events, ActivityType } = require('discord.js');
const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

const checkUsers = async () => {
  await axios({
    method: 'get',
    url: 'https://captcha.fridgedoorfamous.tech/api/user/kick',
  }).then(async (res) => {
    // Get the users that need to be kicked
    const users = res.data;
    if (users.length === 0) return;
    // Loop through all the users
    for (const userid of users) {
      const guild = client.guilds.cache.get('803701994221076511');
      // We need to get the member from the guild
      const member = await guild.members.fetch(userid);
      // First we need to message the user
      const embed = new EmbedBuilder()
        .setTitle('Verification failed')
        .setDescription('You have been kicked from the server because you did not verify within 90 minutes.')
        .setColor('#ed4245')
        .setFooter({ text: 'If you are having issues verifying please contact Pignuuu#3333 personally to get it sorted.' })
      await member.send({ embeds: [embed] });
      await new Promise(resolve => setTimeout(resolve, 2000));
      member.kick();

      try {
        // Remove the user from the database
        await axios({
          method: 'get',
          url: 'https://captcha.fridgedoorfamous.tech/api/user/gone:' + userid,
        })
      } catch (err) {
        console.log(err);
      }
    }
  }).catch((err) => {
    console.log(err);
  });
}

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    client.user.setPresence({
      status: 'dnd',
      activities: [
        {
          name: 'out for bots',
          type: ActivityType.Watching,
        },
      ],
    });

    await checkUsers();
    setInterval(async () => {
      await checkUsers();
    }, 1000 * 60 * 5);
  },
};