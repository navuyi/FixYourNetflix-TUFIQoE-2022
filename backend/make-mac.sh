python -m venv "./venv"
source "./venv/bin/activate"
pip install -r "./requirements.txt"

# Modify database
cd database
python init.py
