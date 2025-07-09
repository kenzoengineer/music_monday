import discord


class Embeds:

    ### Generic embeds

    @staticmethod
    def error(body: str):
        return discord.Embed(
            colour=discord.Colour.red(), title="Error!", description=body
        )

    @staticmethod
    def info(title: str, body: str, footer: str = ""):
        embed = discord.Embed(
            colour=discord.Colour.blue(), title=title, description=body
        )
        if len(footer):
            embed.set_footer(text=footer)
        return embed

    @staticmethod
    def megainfo(
        title: str,
        body: str,
        fields: list[tuple[str, str, bool]] = [],
        footer: str = "",
        img: str = "",
        thumbnail: str = "",
        author: str = "",
    ):
        embed = discord.Embed(
            colour=discord.Colour.orange(),
            title=title,
            description=body,
        )
        for field in fields:
            embed.add_field(name=field[0], value=field[1], inline=field[2])

        if len(footer):
            embed.set_footer(text=footer)
        if len(img):
            embed.set_image(url=img)
        if len(thumbnail):
            embed.set_thumbnail(url=thumbnail)
        if len(author):
            embed.set_author(name=author)
        return embed

    @staticmethod
    def emphasis(title: str, body: str, footer: str = ""):
        embed = discord.Embed(
            color=discord.Colour.pink(), title=title, description=body
        )
        if len(footer):
            embed.set_footer(text=footer)
        return embed

    ### Specific embeds

    @staticmethod
    def word_not_found(word: str):
        return Embeds.error(
            f"You aren't tracking __'{word}'__. Please choose a different word."
        )
