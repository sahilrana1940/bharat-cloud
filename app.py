@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # ... tera password check wala code ...
        if password == 'rani@420':
            session.permanent = True  # <-- YE LINE SABSE IMPORTANT HAI
            session['logged_in'] = True
            return redirect('/dashboard')
