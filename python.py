from flask import Flask, request
from flask_cors import CORS
import pyautogui 
import time
app = Flask(__name__)
CORS(app)
@app.route('/get_data', methods=['POST'])

def get_data():
    print("you are gay")
    if request.is_json:
        data = request.get_json()
        print(data["text"])
        print(data["delay"]*(len(data["text"])-1))
        time.sleep(2)
        pyautogui.write(data["text"],data["delay"]-0.005)
        return {"status": "success", "message": "Data processed"}, 200
    
    return {"status": "error", "message": "Expected JSON"}, 400 
if __name__ == '__main__':
    app.run(debug=True, port=5000)
