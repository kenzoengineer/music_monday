import discord
from discord.ext import commands

from util.embeds import Embeds


class JudgeView(discord.ui.View):
    def __init__(self, songs: dict[str, str], userIds: list[str]):
        super().__init__(timeout=None)
        self.songs = songs
        for idx, userId in enumerate(userIds):
            self.add_item(SongButton(str(idx + 1), userId, songs))


class SongButton(discord.ui.Button):
    def __init__(self, label: str, key: str, songs: dict[str, str]):
        super().__init__(label=label, style=discord.ButtonStyle.primary)
        self.index = key
        self.songs = songs

    async def callback(self, interaction: discord.Interaction):
        await interaction.response.send_message(
            embed=Embeds.emphasis(
                title="Congratulations to the winner!", body=f"<@{self.index}>"
            )
        )
        await interaction.channel.send(content=f"{self.songs[self.index]}")
        self.view.stop()
