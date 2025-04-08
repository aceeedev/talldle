from flask import Flask, render_template, request
import pandas as pd

# --- CONFIG ---
CSV_PATH = "./data/final_data.csv"
IMAGE_COLUMN = "Image"
NAME_COLUMN = "Name"
HEIGHT_COLUMN = "Height"

# --- LOAD CSV ---
df = pd.read_csv(CSV_PATH)
image_urls = df[IMAGE_COLUMN].tolist()
names = df[NAME_COLUMN].tolist()
heights = df[HEIGHT_COLUMN].tolist()
total = len(image_urls)

# --- FLASK APP ---
app = Flask(__name__)

@app.route('/')
def index():
    i = int(request.args.get('i', 0))
    i = max(0, min(i, total - 1))
    return render_template('viewer.html',
                           image_url=image_urls[i],
                           name=names[i],
                           height=f"{round(heights[i] * 0.393701 // 12)}\'{round(heights[i] * 0.393701 % 12)}\"""",
                           index=i,
                           total=total)

if __name__ == '__main__':
    app.run(debug=True)
