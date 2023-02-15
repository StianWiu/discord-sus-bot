const { Events } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
module.exports = {
  name: Events.MessageCreate,
  async execute(interaction) {
    // If someone sends a message to the bot it will redirect it to a channel for moderators.
    if (interaction.author.bot) return;
    if (interaction.channel.type === 1) {
      const guild = interaction.client.guilds.cache.get('803701994221076511');
      const channel = guild.channels.cache.get('948566535738388500');
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