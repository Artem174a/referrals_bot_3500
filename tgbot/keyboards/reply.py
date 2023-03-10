from aiogram import types, bot
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton

from tgbot.database.DB import Database as Db


class ReplyMarkup:
    def __init__(self):
        self.markup = ReplyKeyboardMarkup(resize_keyboard=True, row_width=4)
        self.button = KeyboardButton

    def menu(self):
        buttons = [
            self.button('Приз'),
            self.button('Баллы'),
            self.button('Топ 10'),
            self.button('Ссылка')
        ]
        self.markup.add(*buttons)
        return self.markup
