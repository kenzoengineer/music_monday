import discord
import os
from dotenv import load_dotenv
from discord.ext import commands
from util.state import State

load_dotenv()

# placeholder command prefix; We only use slash commands
client = commands.Bot(command_prefix="<>", intents=discord.Intents.all())

# load state

client.state = State()


# load all cogs
async def load():
    for f in os.listdir("./cogs"):
        if f.endswith(".py"):
            await client.load_extension(f"cogs.{f[:-3]}")


@client.event
async def on_ready():
    print("Bot is ready")
    try:
        synched_commands = await client.tree.sync()
        print(f"Synched {len(synched_commands)} commands")
    except Exception as e:
        print("Error synching")


async def setup_bot():
    await load()


if __name__ == "__main__":
    client.setup_hook = setup_bot
    client.run(os.getenv("TOKEN"))
