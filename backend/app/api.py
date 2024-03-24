from typing import Tuple
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.data import Database

from models.models import CommentResponse
from models.models import TicketById
from models.models import Ticket
from models.models import Comment

app = FastAPI()
db = Database()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/get-tickets")
async def get_tickets() -> list:
    tickets = db.get_all_tickets()
    ticket_response = []
    for ticket in tickets:
        i_d, name, email, summary, status = ticket
        ticket_response.append(
            {
                "id": i_d,
                "name": name,
                "email": email,
                "summary": summary,
                "status": status,
            }
        )
    return ticket_response


@app.get("/get-comments-by-ticket")
async def get_comments_by_ticket(ticketId) -> list[CommentResponse]:
    comments = db.get_all_comments(ticketId)
    comment_response = []
    for comment in comments:
        id, user, timestamp, comment, ticketId = comment
        comment_response.append(
            {
                "id": id,
                "user": user,
                "timestamp": timestamp,
                "comment": comment,
                "ticketId": ticketId,
            }
        )
    return comment_response


@app.get("/get-ticket-by-id")
async def get_ticket_by_id(i_d) -> TicketById:
    ticket: Tuple[str, str, str, str] = db.get_ticket_by_id(i_d)
    i_d, name, email, summary, status = ticket
    return {
        "id": i_d,
        "name": name,
        "email": email,
        "summary": summary,
        "status": status,
    }


@app.patch("/update-ticket-by-id")
async def update_ticket_status_by_id(new_ticket: TicketById):
    id, new_status = new_ticket.id, new_ticket.status
    db.update_ticket_status_by_id(id, new_status)
    return


@app.post("/create-comment")
async def create_comment(comment: Comment):
    print("Creating comment")
    db.save_comment(comment)
    db._print_comments()
    return


@app.post("/create-ticket")
async def create_ticket(ticket: Ticket):
    print(f"Sending email to {ticket.email}")
    db.save_ticket(ticket)
    db._print_tickets()
    return
