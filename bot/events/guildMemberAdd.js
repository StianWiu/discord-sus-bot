const { Events } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
module.exports = {
  name: Events.GuildMemberAdd,
  async execute(interaction) {
    const now = new Date();
    const user = interaction.user;
    const userCreationDate = user.createdAt;
    const timeDifference = now - userCreationDate;
    const timeDifferenceInMonths = timeDifference / (1000 * 60 * 60 * 24 * 30);
    if (timeDifferenceInMonths < 5) {
      const roles = interaction.guild.roles.cache;
      for (const [key, value] of roles) {
        if (key === '1014253594142322738') {
          interaction.guild.members.fetch(user.id).then(async (member) => {
            member.roles.add(value);
            await axios({
              method: 'post',
              url: 'https://captcha.fridgedoorfamous.tech/api/user/join',
              data: {
                userid: user.id,
              },
            }).then((response) => {
              // Send a message to the user
              user.send('<:halt:1075494780345258074> You may not enter yet.');
              const code = response.data
              // Create embed
              const embed = new EmbedBuilder()
                .setColor('#77e7ff')
                .setTitle('Verification Required')
                .setURL('https://captcha.fridgedoorfamous.tech')
                .setDescription('Because of a increase in bots, we have added a verification system. Please complete the captcha at https://captcha.fridgedoorfamous.tech to gain access to the server.')
                .setThumbnail('https://cdn.discordapp.com/avatars/967346237365956638/8d03e0693acc7686f89004381aa1a21c.webp')
                .addFields(
                  { name: 'Why did I get stopped?', value: 'You were stopped because your discord account age is below 5 months old.' },
                  { name: 'Have any questions or need help?', value: 'Either message a Mod on the server or send a message here to the bot here and you will be contacted as soon as possible.' },
                  { name: `What if I don't verify?`, value: 'You have 90 minutes to verify before you are kicked from the server.', },
                  { name: `What do I do?`, value: 'Below this message there is a code which you need to copy and paste into the input field on https://captcha.fridgedoorfamous.tech.', },
                  { name: '\u200B', value: '\u200B' },
                  { name: `Verification code`, value: 'Your code is **' + code + '**', }
                )
                .setFooter({ text: 'If any issues with verification dm Pignuuu#3333 or send a message here.', iconURL: 'https://cdn.discordapp.com/avatars/967346237365956638/8d03e0693acc7686f89004381aa1a21c.webp' });
              user.send({ embeds: [embed] })

              const guild = interaction.client.guilds.cache.get('803701994221076511');
              const channel = guild.channels.cache.get('948566535738388500');
              // Create an embed
              const embed2 = new EmbedBuilder()
                .setTitle(user.tag + ' joined the server and has been locked out due to their account age being below 5 months old.')
                .setColor('#ed4245')
              // Send the embed to the channel
              channel.send({ embeds: [embed2] });
            }).catch((error) => {
              console.log(error);
              // As to avoid a user getting stuck, remove the role because of an error
              member.roles.remove(value);
            });
          });
        }
      }
    } else {
      const roles = interaction.guild.roles.cache;
      for (const [key, value] of roles) {
        if (key === '824975105347944478') {
          interaction.guild.members.fetch(user.id).then(async (member) => {
            member.roles.add(value);
          }).catch((error) => {
            console.log(error);
          });
        }
      }
    }
  },
};