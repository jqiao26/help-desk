from asyncio import constants
from datetime import datetime
import sqlite3
import uuid
import pandas as pd
from sqlite3 import Error
from models.models import Comment
from models.models import Ticket

DB_FILE = "help-desk.db"


class Database:
    def __init__(self) -> None:
        self.conn = self.create_connection()
        self.init_tables()

    def save_comment(self, comment: Comment):
        sql = f"""
          INSERT INTO comments(id, user, timestamp, comment, ticketId)
          VALUES(?,?,?,?,?)
        """
        comment_tup = (
            str(uuid.uuid4()),
            "Support",
            str(datetime.today()),
            comment.comment,
            comment.ticketId,
        )
        cur = self.conn.cursor()
        cur.execute(sql, comment_tup)
        print(f"Inserting {comment_tup}")
        self.conn.commit()

    def save_ticket(self, ticket: Ticket):
        sql = f"""
          INSERT INTO tickets(id, name, email, summary, status)
          VALUES(?,?,?,?,?)
        """
        ticket_tup = (
            str(uuid.uuid4()),
            ticket.name,
            ticket.email,
            ticket.summary,
            "new",
        )
        cur = self.conn.cursor()
        cur.execute(sql, ticket_tup)
        print(f"Inserting {ticket_tup}")
        self.conn.commit()

    def get_ticket_by_id(self, i_d):
        sql = f"""SELECT * FROM tickets WHERE id = '{i_d}'"""
        cur = self.conn.cursor()
        res = cur.execute(sql)
        rows = res.fetchone()
        return rows

    def get_all_tickets(self):
        sql = f"""SELECT * FROM tickets"""
        cur = self.conn.cursor()
        res = cur.execute(sql)
        rows = res.fetchall()
        return rows

    def get_all_comments(self, ticketId):
        sql = f"""
          SELECT comments.id,user,timestamp,comment,ticketId FROM comments 
          LEFT JOIN tickets 
          ON comments.ticketId = tickets.id
          WHERE tickets.id = '{ticketId}'
        """
        cur = self.conn.cursor()
        res = cur.execute(sql)
        rows = res.fetchall()
        return rows

    def update_ticket_status_by_id(self, i_d, new_status):
        sql = f"""UPDATE tickets SET status = '{new_status}' WHERE id = '{i_d}'"""
        cur = self.conn.cursor()
        cur.execute(sql)
        return

    def create_connection(self):
        conn = None
        try:
            conn = sqlite3.connect(DB_FILE)
            return conn
        except Error as e:
            print(e)

    def init_tables(self):
        tickets_sql_command = """
          CREATE TABLE IF NOT EXISTS tickets (
            id text PRIMARY KEY,
            name text,
            email text,
            summary text,
            status text
          );
        """
        comments_sql_command = """
          CREATE TABLE IF NOT EXISTS comments (
            id text PRIMARY KEY,
            user text,
            timestamp int,
            comment text,
            ticketId text,
            FOREIGN KEY (ticketId) REFERENCES tickets (id)
          );
        """
        self._create_table(tickets_sql_command)
        self._create_table(comments_sql_command)

    def _create_table(self, sql_command):
        try:
            c = self.conn.cursor()
            c.execute(sql_command)
        except Error as e:
            print(e)

    def _print_tickets(self):
        print(pd.read_sql_query("SELECT * FROM tickets", self.conn))

    def _print_comments(self):
        print(pd.read_sql_query("SELECT * FROM comments", self.conn))
