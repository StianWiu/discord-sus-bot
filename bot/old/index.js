const { Client, GatewayIntentBits } = require('discord.js');
// Get intent for guilds and members
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

restartTimer();

require('dotenv').config();

client.on('ready', async () => {
  await console.log(`Logged in as ${client.user.tag}!`);
  startLoop();
});

client.on('guildMemberAdd', member => {
})

client.login(process.env.DISCORD_TOKEN);

app.listen(port, async function () {
  console.log(`Server listening on port ${port} | ${new Date()}`);
});