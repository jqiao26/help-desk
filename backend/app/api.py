from typing import Tuple
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.data import Database
from app.api_helper import Response

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
    try:
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
    except:
        raise HTTPException(status_code=500, detail="Failed to get tickets")


@app.get("/get-comments-by-ticket")
async def get_comments_by_ticket(ticketId) -> list[CommentResponse]:
    try:
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
    except:
        raise HTTPException(status_code=500, detail="Failed to get comments")


@app.get("/get-ticket-by-id")
async def get_ticket_by_id(i_d) -> TicketById:
    try:
        ticket: Tuple[str, str, str, str] = db.get_ticket_by_id(i_d)
        i_d, name, email, summary, status = ticket
        return {
            "id": i_d,
            "name": name,
            "email": email,
            "summary": summary,
            "status": status,
        }
    except:
        raise HTTPException(status_code=500, detail="Ticket not found")


@app.patch("/update-ticket-by-id")
async def update_ticket_status_by_id(new_ticket: TicketById):
    try:
        id, new_status = new_ticket.id, new_ticket.status
        db.update_ticket_status_by_id(id, new_status)
        r = Response(message="Successfully updated ticket", status="success", data="")
        return r.get_response_obj()
    except:
        raise HTTPException(status_code=500, detail="Failed to update ticket")


@app.post("/create-comment")
async def create_comment(comment: Comment):
    try:
        db.save_comment(comment)
        r = Response(message="Successfully create comment", status="success", data="")
        return r.get_response_obj()
    except:
        raise HTTPException(status_code=500, detail="Unable to create comment")


@app.post("/create-ticket")
async def create_ticket(ticket: Ticket):
    try:
        print(f"Sending email to {ticket.email}")
        db.save_ticket(ticket)
        r = Response(message="Successfully created ticket", status="success", data="")
        return r
    except:
        raise HTTPException(status_code=500, detail="Failed to create ticket")
