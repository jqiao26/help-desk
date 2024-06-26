from lib2to3.pytree import Base
from pydantic import BaseModel


class Ticket(BaseModel):
    name: str
    email: str
    summary: str


class TicketById(BaseModel):
    id: str
    name: str
    email: str
    summary: str
    status: str


class CommentResponse(BaseModel):
    id: str
    user: str
    timestamp: str
    comment: str


class Comment(BaseModel):
    ticketId: str
    comment: str
