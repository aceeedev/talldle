from flask import Flask, render_template, request
import pandas as pd

# --- CONFIG ---
import os
CSV_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "final_data.csv")
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
app = Flask(__name__, template_folder=os.path.join(os.path.dirname(__file__), "templates"))

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

@app.route('/grid')
def grid():
    page = int(request.args.get('page', 0))
    per_page = 50  # Number of images per page
    start_idx = page * per_page
    end_idx = min(start_idx + per_page, total)
    
    images_data = []
    for idx in range(start_idx, end_idx):
        images_data.append({
            'index': idx,
            'image_url': image_urls[idx],
            'name': names[idx],
            'height': f"{round(heights[idx] * 0.393701 // 12)}\'{round(heights[idx] * 0.393701 % 12)}\""""
        })
    
    return render_template('grid.html',
                           images_data=images_data,
                           current_page=page,
                           total_pages=(total + per_page - 1) // per_page,
                           total=total)

if __name__ == '__main__':
    app.run(debug=True)
