import connection from "../dbStrategy/postgres.js";
import {nanoid} from "nanoid";

export async function postURL(req, res) {

    const { url } = req.body;
    const { id } = res.locals;
  
    const shortUrl = nanoid(8);
  
    try {
      await connection.query(
        `INSERT INTO links ("userId", "url", "shortUrl", "viewCount") VALUES ($1, $2, $3, $4);`, [id, url, shortUrl, 0]
      );
  
      return res.status(201).send({ shortUrl });
    } 
    catch (error) {
      return res.status(500).send(error);
    }
}

export async function getURLById(req, res){

  const id  = req.params.id;
  console.log("search for: "+ id )
  try {
    const queryResponse = await connection.query(
      `SELECT id, "shortUrl", "url" FROM links WHERE id = $1;`, [id]
    );
    console.log(queryResponse)
    console.log(queryResponse.rows)

    const response = {
      id: id,
      shortUrl: queryResponse.rows[0].shortUrl,
      url: queryResponse.rows[0].url
    };  

    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send(error);
  }

}