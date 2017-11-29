app.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password)
      return res.send({
        error: 'Please enter your email and password.'
      })
    if (!validateEmail(req.body.email) || ! validatePassword(req.body.password))
      return res.send({
        error: 'Invalid format for email and/or password.'
      })
    login(req.body.email, req.body.password)
  })