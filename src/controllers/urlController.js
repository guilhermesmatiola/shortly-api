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

export async function openURLshorten(req, res){

  const { shortUrl } = req.params;

  try{ 
    const { rows: url } = await connection.query(
      `SELECT * FROM links WHERE "shortUrl" = $1`, [shortUrl]
    );

    if(!shortUrl){
      res.status(404).send("nao existe a url...")
    }

    const increment = url[0].viewCount + 1;
    await connection.query(
      `UPDATE links SET "viewCount"=$1`, [increment]
    );

    //return res.status(200).send("funcionou");
    return res.redirect(url[0].url);
    
  }
  catch (error){
    return res.status(400).send(error);
  }
}