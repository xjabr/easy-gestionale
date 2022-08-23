PWD=`pwd`

# create enviroment folder and activate it
python3 -m venv env
source $PWD/env/bin/activate

# install deps from requirements.txt
pip install -r ./requirements.txt

# ...