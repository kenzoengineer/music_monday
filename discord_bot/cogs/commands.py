import discord
import io
from discord.ext import commands
from discord import app_commands
from util.state import StateBot
from util.embeds import Embeds
from util.views import JudgeView
from util.gifs import perform_gif_overlay
from random import shuffle
from datetime import date, timedelta


class Commands(commands.Cog):
    def __init__(self, bot):
        self.bot: StateBot = bot
        self.TOTAL_SUBMISSIONS = 4

    def get_judge(self) -> list[str, str]:
        """Returns the judge for the week

        Returns:
            list[str, str]: the name of the judge, then their id
        """
        NAMES = ["Souren", "Kevin", "Ken", "Artom", "Andrew"]
        IDS = [
            "290550631591182336",
            "183383346569543681",
            "290630197458501633",
            "161921661346643968",
            "196069761082327041",
        ]
        start_monday: date = date(2025, 6, 9)
        nearest_monday = date.today() + timedelta((7 - date.today().weekday()) % 7)
        day_delta = nearest_monday - start_monday
        week_delta = day_delta.days // 7
        return [NAMES[week_delta % len(NAMES)], IDS[week_delta % len(IDS)]]

    @app_commands.command(name="submit", description="submit a song to music monday")
    @app_commands.describe(song="The spotify link for the song")
    async def submit_song(self, interaction: discord.Interaction, song: str):
        if song.find("spotify") == -1:
            return await interaction.response.send_message(
                embed=Embeds.error(
                    "Link did not contain the word 'spotify', are you sure you submitted a spotify link?"
                ),
                ephemeral=True,
            )

        self.bot.state.add_submission(interaction.user.id, song)

        if self.TOTAL_SUBMISSIONS == len(self.bot.state.get_all_submissions()):
            await interaction.channel.send(
                content=f"<@{self.get_judge()[1]}>, all songs have been submitted, you can now judge with `/submissions`"
            )

        return await interaction.response.send_message(
            embed=Embeds.emphasis(title="Submission received", body="Thank you!")
        )

    @app_commands.command(
        name="submissions",
        description="lists submissions blind if 4 have been given, otherwise errors",
    )
    async def list_submissions(self, interaction: discord.Interaction):
        subs = self.bot.state.get_all_submissions()
        if len(subs) < self.TOTAL_SUBMISSIONS:
            return await interaction.response.send_message(
                embed=Embeds.error(
                    f"We aren't at {self.TOTAL_SUBMISSIONS} submissions yet! So far we have {len(subs)}"
                ),
                ephemeral=True,
            )

        word_map = ["one", "two", "three", "four"]

        # randomize the order of the songs
        userIds = list(subs.keys())
        shuffle(userIds)

        for [idx, userId] in enumerate(userIds):
            await interaction.channel.send(content=f":{word_map[idx]}: {subs[userId]}")
        return await interaction.response.send_message(
            content="Judge, please vote for your favourite this song this week!",
            view=JudgeView(subs, userIds),
        )

    @app_commands.command(name="reveal", description="Reveals who submitted what song")
    async def reveal_submissions(self, interaction: discord.Interaction):
        subs = self.bot.state.get_all_submissions()
        for userId in subs:
            await interaction.channel.send(f"<@{userId}> {subs[userId]}")
        await interaction.channel.send(
            embed=Embeds.info(
                title="Here is who sent each song",
                body="Congrats on another successful music monday",
            )
        )

    ## debug commands

    @app_commands.command(
        name="clearall", description="clears ALL submissions (debug command)"
    )
    async def clearall_debug(self, interaction: discord.Interaction):
        return await interaction.response.send_message(
            embed=Embeds.info(title="Removed all submissions", body=":wave:")
        )

    @app_commands.command(
        name="whojudge", description="Who is the judge this week (debugcommand)"
    )
    async def whojudge_debug(self, interaction: discord.Interaction):
        return await interaction.response.send_message(
            embed=Embeds.info(
                title="The next judge is", body=f"# {self.get_judge()[0]}!"
            )
        )

    @app_commands.command(name="screen", description="ragebait")
    @app_commands.describe(gif="GIF URL")
    async def screen(self, interaction: discord.Interaction, gif: str):
        await interaction.response.send_message(
            content="Generating..."
        )
        res = perform_gif_overlay(gif)
        return await interaction.channel.send(file=discord.File(io.BytesIO(res), filename="output.gif"))


async def setup(bot):
    await bot.add_cog(Commands(bot))
