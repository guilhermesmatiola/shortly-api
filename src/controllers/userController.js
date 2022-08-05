import connection from "../dbStrategy/postgres.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signUp(req, res){
    const hashparam = 10;
    const passwordEncrypt = bcrypt.hashSync(req.body.password, hashparam);
    const user = { ...req.body, password: passwordEncrypt};
    const { name, email, password } = user;

    try{
        if (req.body.password !== req.body.confirmPassword) {
          return res.status(422).send("As senhas não sao iguais");
        }

        const { rows : userExist } = await connection.query(
            "SELECT * FROM users WHERE email = $1;", [user.email]
        );
        if (userExist.length !== 0){
            return res.sendStatus(409);
        }

        await connection.query(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`, [name, email, password]
        );
        res.sendStatus(201);
    }
    catch (error){
        return res.status(400).send(error);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;
  
    try {
      const { rows: user } = await connection.query(
        `SELECT * FROM users WHERE email = $1;`,
        [email]
      );
  
      if (user.length === 0) {
        return res.sendStatus(401);
      }
  
      const checkPassword = bcrypt.compareSync(password, user[0].password);
  
      if (!checkPassword) {
        return res.sendStatus(401);
      }
  
      const secretKey = process.env.JWT_SECRET;
      const token = jwt.sign({ id: user[0].id }, secretKey);
  
      return res.status(200).send({ token });
    } catch (error) {
      return res.status(400).send(error);
    }
}
