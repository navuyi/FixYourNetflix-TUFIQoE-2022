import json
from .utils import headers


def test_event(client):
    data = dict(
        video_id=1,
        type="VIDEO_QUALITY_INCREASE_REQUESTED",
        payload="""{
            "var_01": "foo",
            "fun": "bar",
            "alpha": 123
        }""",
        timestamp="2022-05-30T12:09:54"
    )

    # This works fine, just like the javascript object
    res = client.post("/event/", data=json.dumps(data), headers=headers)
    data = json.loads(res.data)

    assert res.status_code == 201
    
