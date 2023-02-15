require('dotenv').config()

const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, REST, Routes, Partials } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [
    Partials.Channel,
    Partials.Message
  ]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const commands = [];

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

// Register all slash commands so they appear on Discord with proper descriptions.
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

// Create a express server
const express = require('express');
const app = express();
const port = 3004;
// bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Create a route for the express server
app.get('/api/bot/unlock:userid', (req, res) => {
  // Get the code from the URL
  let userid = req.params.userid;
  // Remove the first character from the code
  userid = userid.substring(1);
  try {
    // Remember to change these when finished testing
    const role = client.guilds.cache.get('803701994221076511').roles.cache.get('950127008644493313');
    client.guilds.cache.get('803701994221076511').members.fetch(userid).then(member => {
      member.roles.remove(role);
      res.status(200).send("Role removed");
      // Message the user
      const embed = new EmbedBuilder()
        .setTitle('Verification successful')
        .setDescription('You have been verified and can now access the server.')
        .setColor('#3ba55d')
        .addFields({ name: 'Keep in mind', value: 'If you leave the server and come back with a account under 5 months old you will need to verify again.' })
      member.send({ embeds: [embed] });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error removing role");
  }
});

// Start the express server
app.listen(port, () => {
  console.log(`Bot listening at http://localhost:${port}`)
});

// Log in to Discord with your client's token
client.login(process.env.BOT_TOKEN)