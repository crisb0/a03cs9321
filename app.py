from flask import Flask, Blueprint, render_template, send_from_directory
from flask_restplus import Resource, Api

from api import blueprint

app = Flask(__name__, static_folder='templates/static')


@app.route('/')
def index():
    return render_template("index.html")
    #return send_from_directory('./build','index.html');

#set url prefix to test
app.register_blueprint(blueprint, url_prefix='/test')

if __name__ == '__main__':
    app.run(debug=True)
