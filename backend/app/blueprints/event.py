from xml.dom.expatbuilder import parseString
from flask import Blueprint, request, jsonify
from app.db import cursor
import json

from app.db import lastrowid

bp = Blueprint("event", __name__, url_prefix="/event")


@bp.route('/', methods=["POST"])
def create_event():
    data = request.json

    insert = dict(
       video_id=data["video_id"],
       type=data["type"],
       payload=data["payload"],
       timestamp=data["timestamp"]
    )

    # Create event
    cursor().execute(f"""INSERT INTO event (video_id, type, payload, timestamp) 
    VALUES (:video_id, :type, :payload, :timestamp)""", insert)

    return jsonify(dict(msg="OK")), 201