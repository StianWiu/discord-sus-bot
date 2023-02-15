const { Events } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: Events.MessageCreate,
  async execute(interaction) {
    // If someone sends a message to the bot it will redirect it to a channel for moderators.
    if (interaction.author.bot) return;
    if (interaction.channel.type === 1) {
      const guild = interaction.client.guilds.cache.get('764228270118928394');
      // Find channel by id 841212768321273876
      const channel = guild.channels.cache.get('841212768321273876');
      // Create an embed
      const embed = new EmbedBuilder()
        .setTitle('Message from ' + interaction.author.tag)
        .setDescription(interaction.content)
        .setColor('#ed4245')
      // Send the embed to the channel
      await channel.send({ embeds: [embed] });
    }
  },
};