#!/usr/bin/env python

# Steven Buccini, Nikita Kouevda, Eddie Lee
# 2012/10/02

import random
from flask import Flask, render_template, request
from jinja2 import Environment, PackageLoader
from pymongo import Connection
from pymongo.database import Database

# Flask
app = Flask(__name__)

# Mongo
connection = Connection()
db = Database(connection, "Box")

# Questions per page
qpp = 3

@app.route("/")
def root():
    return render_template("render.html", quotes=quotes())

@app.route('/quotes', methods=['GET'])
def quotes():
    category = str(request.args.get("category")) if request.args else "Foreign Policy"

    # Pairs of questions to be displayed
    questions = {}

    # All distinct weights in the database
    weights = db.questions.find({"category": category}).distinct("weight")

    # Data cache and quotes to display
    cache, display = {}, {}

    for i in range(qpp):
        rand_weight = weights[random.randrange(len(weights))]

        if str(rand_weight) not in cache:
            cache[str(rand_weight)] = {"Obama": [x for x in db.questions.find({"category": category, "weight": rand_weight, "person": "Obama"})], "Romney": [x for x in db.questions.find({"category": category, "weight": rand_weight, "person": "Romney"})]}

        options = cache[str(rand_weight)]["Obama"]
        rand_index = random.randrange(len(options))
        one = options.pop(rand_index)

        options = cache[str(rand_weight)]["Romney"]
        rand_index = random.randrange(len(options))
        two = options.pop(rand_index)

        # Randomize order
        display[str(i)] = [one, two] if random.randrange(2) else [two, one]

    return str(display) if category == "Economy" else display

if __name__ == "__main__":
    app.run()
