const db = require('../db')

exports.addLink = async (req, res) => {
    try {
        console.log(req)
        const { link, userid } = req.body

        if (!link) {
            return res.status(400).json({ error: 'Please provide an original URL.' });
        }

        const addResult = await db.query("INSERT INTO urls (user_id, url) VALUES ($1, $2);" , [userid, link])
        res.json(addResult)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

exports.deleteLink = async (req, res) => {
    try {
        const deleteResult = await db.query("DELETE FROM urls WHERE id=$1;" , [req.params.linkid])
        res.json(deleteResult)
    } catch (err) {
        res.status(400).json(err)
    }
}

exports.shortenURL = async (req, res) => {
    try {
        const queryResult = await db.query("SELECT url FROM urls WHERE id=$1;" , [req.params.shortCode]);
        
        if (queryResult.rows) {
            let longUrl = queryResult.rows[0].url
            const httpPattern = /^((http|https|ftp):\/\/)/;
            if(!httpPattern.test(longUrl)) {
                longUrl = "http://" + longUrl;
            }
            res.redirect(301, longUrl);
        } else {
            res.status(404).send('Shortened URL not found');
        }
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }       
}

exports.getLinks = async (req, res) => {
    try {
        const userid = req.params.userid
        const queryResult = await db.query("SELECT id, url FROM urls WHERE user_id=$1;" , [userid]);
        res.json(queryResult.rows)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }   
}