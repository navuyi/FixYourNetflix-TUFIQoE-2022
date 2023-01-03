from xml.dom.expatbuilder import parseString
from flask import Blueprint, request, jsonify
from app.db import cursor
import json

from app.db import lastrowid

bp = Blueprint("experiment", __name__, url_prefix="/experiment")

# Configure test path


@bp.route('/', methods=["POST"])
def set_experiment():
    data = request.json

    insert = dict(
        started=data["started"],
        video_limit=data["video_limit"],
        subject_age=data["subject_age"],
        subject_sex=data["subject_sex"],
        settings=data["settings"],
        urls=data["urls"]
    )
    # Create experiment
    cursor().execute(f"""INSERT INTO experiment (started, video_limit, subject_age, subject_sex, settings, urls) 
    VALUES (:started, :video_limit, :subject_age, :subject_sex, :settings, :urls)""", insert)

    experiment_id = lastrowid()
    return jsonify(dict(experiment_id=experiment_id)), 201


@bp.route("/", methods=["PATCH"])
def update_experiment():
    insert = dict(
        experiment_id=request.json["experiment_id"],
        ended=request.json["ended"]
    )
    cursor().execute(
        f"UPDATE experiment SET ended=:ended WHERE id=:experiment_id", insert)

    return jsonify(dict(msg="experiment end time updated")), 201


@bp.route("/next_id", methods=["GET"])
def get_next_experiment_id():
    cursor().execute(f"SELECT IFNULL(MAX((id)+1), 1) as next_id FROM experiment")
    next_id = cursor().fetchone()

    return jsonify(next_id), 200