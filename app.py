@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        id_no = request.form.get('id_no') or request.form.get('username') or request.form.get('id')
        password = request.form.get('password')

        # teeno ID chalegi
        valid_ids = ["admin420", "admin", "1940"]
        valid_pass = "rani@420"

        if id_no in valid_ids and password == valid_pass:
            session.permanent = True
            session['logged_in'] = True
            return redirect('/dashboard')
        else:
            return "ID/Password galat hai - admin420 / rani@420 try karo"
    
    return render_template('index.html')
