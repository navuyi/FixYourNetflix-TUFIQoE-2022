from . video import bp as bp_video
from . experiment import bp as bp_experiment
from . playback_data import bp as bp_playback_data
from . bitrate import bp as bp_bitrate
from . event import bp as bp_event
from flask import Blueprint

from . result import bp as bp_result


bp = Blueprint('bp', __name__)


bp.register_blueprint(bp_experiment)
bp.register_blueprint(bp_video)
bp.register_blueprint(bp_playback_data)
bp.register_blueprint(bp_event)

bp.register_blueprint(bp_result)
bp.register_blueprint(bp_bitrate)

