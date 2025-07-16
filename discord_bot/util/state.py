from datetime import datetime
from zoneinfo import ZoneInfo
from discord.ext import commands

submissions_map = dict[str, str]


class State:
    """Main state holder for the bot

    No safeguards, assumes the following things:
        - All submissions take place over the course of one day
        - Music monday takes place from 00:00 - 23:59 in EST
    """

    def __init__(self):
        self.submission_date = None
        self.submissions: submissions_map = dict()

    def get_date_today(self):
        return datetime.now(ZoneInfo("America/New_York")).date()

    def set_date_today(self):
        self.submission_date = self.get_date_today()

    def add_submission(self, user_id: str, song_link: str):
        if self.submission_date == None:
            self.set_date_today()

        # reset submissions upon a new day
        if self.submission_date != self.get_date_today():
            self.set_date_today()
            self.submissions = dict()

        self.submissions[user_id] = song_link

    def get_all_submissions(self):
        return self.submissions

    def clear_all_submissions(self):
        self.submissions = dict()


class StateBot(commands.Bot):
    state: State
