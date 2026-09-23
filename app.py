from flask import Flask, render_template, request, redirect

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # ID admin420 hi rakha hai
        if request.form.get('id_no') == 'admin420':
            return redirect('/dashboard')
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

# Vercel ke liye
if __name__ == '__main__':
    app.run()
