import { Router } from "express";

const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.AUTH_USERNAME &&
    password === process.env.AUTH_PASSWORD
  ) {
    req.session.username = username;
    return res.json({ success: true, username });
  }

  res.status(401).json({ error: "Username atau password salah" });
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Gagal logout" });
    }
    res.clearCookie("connect.sid");
    res.json({ success: true });
  });
});

router.get("/me", (req, res) => {
  if (req.session?.username) {
    return res.json({ username: req.session.username });
  }
  res.status(401).json({ error: "Unauthorized" });
});

export default router;
