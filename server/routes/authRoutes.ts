import { Pool } from "pg";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const conString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: conString,
});

async function handleLogin(req: Request, res: Response) {
  const { email, password } = req.body;
  console.log("authRoutes", email, password);

  try {
    const client = await pool.connect();

    const query =
      "SELECT id, nickname, email, password FROM users WHERE email = $1";
    const result = await client.query(query, [email]);

    if (result.rows.length === 0) {
      client.release();
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      client.release();
      return res.status(401).json({ error: "Invalid email or password" });
    }

    client.release();

    return res.status(200).json({
      user_id: user.id,
      nickname: user.nickname,
      email: user.email,
    });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export { handleLogin };
