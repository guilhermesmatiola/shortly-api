import connection from "../dbStrategy/postgres.js";
import {nanoid} from "nanoid";

export async function postURL(req, res) {

    const { url } = req.body;
    const { id } = res.locals;
    //console.log(id);
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
      return res.status(404).send("nao existe a url...")
    }

    await connection.query(
      `UPDATE links SET "viewCount" = "viewCount" + 1 WHERE "shortUrl" = $1`, [shortUrl]
    );

    //return res.status(200).send("funcionou");
    return res.redirect(url[0].url);
    
  }
  catch (error){
    return res.status(400).send(error);
  }
}

export async function deleteURLid(req, res){

  const id  = req.params.id;

  try {
    console.log("url_id "+id)
    //verificar se url é do usuario
    const user_id = res.locals.id;

    console.log("user_id "+user_id);

    const selectResponse = await connection.query(
      `SELECT * FROM links WHERE links.id=$1;` , [id]
    );

    console.log("selectresponse.rows "+ selectResponse.rows[0])

    if(selectResponse.rows.length<1){
      return res.sendStatus(404);
    }
    
    let deleteResponse;

    if(selectResponse.rows[0].userId==user_id){
      console.log("if delete passou")
      
      deleteResponse = await connection.query(
        `DELETE FROM links WHERE links.id=$1;` , [id]
      );

    }else{
      return res.sendStatus(401);
    }

   console.log("deleteresponse:"+ deleteResponse)

    if(deleteResponse.rowCount<1){
      return res.sendStatus(404);
    }

    return res.sendStatus(200);

  } catch (error) {
    return res.status(500).send(error);
  }

}

export async function getUser(req, res) {

  try {
    
    const user_id = res.locals.id;
    
    const shortenedUrls = await connection.query(
      `SELECT id, "shortUrl", url, "viewCount" as "visitCount" FROM links WHERE links."userId"=$1;` , [user_id]
    );

    if(shortenedUrls.rows.length<1){
      return res.sendStatus(404);
    }
    
    let visitCount=0;

    for(let i=0;i<shortenedUrls.rows.length;i++){
      visitCount += shortenedUrls.rows[i].visitCount;
    }

    const selectedUser = await connection.query(
      `SELECT * FROM users WHERE users.id=$1;` , [user_id]
    );

    if(selectedUser.rows.length<1){
      return res.sendStatus(404);
    }
    
    const rows=shortenedUrls.rows;

    const responseObject={
      "id": selectedUser.rows[0].id,
	    "name": selectedUser.rows[0].name,
	    "visitCount": visitCount,
	    "shortenedUrls": rows
    }

    return res.status(200).send(responseObject);

  } catch (error) {
    return res.status(500).send(error);
  }
} 

export async function getRanking(req, res) {
  try {
    const usersRank = await connection.query(
      `
      SELECT usr.id, usr.name, COUNT(u.id) as "linksCount", SUM(u."viewCount") as "visitCount" FROM links u
      LEFT JOIN users usr ON u."userId" = usr.id GROUP BY usr.id ORDER BY "visitCount" DESC LIMIT 10;
      `
    );

    return res.status(200).send(usersRank.rows);

  } catch (error) {
    return res.status(500).send(error);
  }
} 