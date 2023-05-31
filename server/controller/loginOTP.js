

const handleLoginRequest = (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    handleLogin(phoneNumber, (err, response) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({ message: 'Login code sent.' });
      }
    });
  };

