import discord
from discord.ext import commands

from util.embeds import Embeds

# ya this is duplicated in commands but whatever
NAMES = ["Souren", "Kevin", "Ken", "Artom", "Andrew"]
IDS = [
    "290550631591182336",
    "183383346569543681",
    "290630197458501633",
    "161921661346643968",
    "196069761082327041",
]
ID_NAMES_MAP = {IDS[i]: NAMES[i] for i in range(len(NAMES))}


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
        # generate 4 lines of csv as a string to be added to the winners.csv file
        # csv should have the format submitter_name, song_link, date YYYY-MM-DD, winner (0 or 1)
        csv_string = ""
        from datetime import datetime

        today = datetime.now().date()
        for key in self.songs:
            name = ID_NAMES_MAP[str(key)] if str(key) in ID_NAMES_MAP else "Unknown"
            if key == self.index:
                csv_string += f"{name},{self.songs[key]},{today},1\n"
            else:
                csv_string += f"{name},{self.songs[key]},{today},0\n"
        await interaction.channel.send(content=f"```csv\n{csv_string}```")
        self.view.stop()
