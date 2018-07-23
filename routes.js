const moment = require('moment');
const path = require('path');

module.exports = function (app, database) {
    app.get('/', function (req, res) {
        console.log('headers >>>>>>>>> ',req.headers.origin);
        res.sendFile(path.join(__dirname, 'views', 'index.html'))
      })

    app.get('/get-todos', function (req, res) {
        database.query(
            `SELECT * FROM todos`,
            function (error, results, fields) {
                if (error) throw error;
                console.log('results', results);
                res.send(results);
            });

    });



    app.get('/get-todos', function (req, res) {
        let id = req.body.id;
        database.query(
            `SELECT * FROM todos WHERE id=${id}`,
            function (error, results, fields) {
                if (error) throw error;
                console.log('results', results);
                res.send(results);
            });

    });

    app.post('/update-todo', function (req, res) {
        console.log('|');
        let id = req.body.id;
        let complete = req.body.complete;
        let completed_date = complete ? moment().format('YYYY-MM-DD') : null;
     
        database.query(
            `UPDATE todos SET complete = ${complete}, completed_date = '${completed_date}' WHERE id = ${id}`,//use the text instead the complete
            function (error, results, fields){
                if(error) throw error;
                console.log('results: ', results);
                res.send({
                    ...results,
                    completed_date: completed_date

                });
            });
      });

//////////////////////////////////

      app.post('/edit-todo', function (req, res) {
        let id = req.body.id;
        let text = req.body.text;
        database.query(
            `UPDATE todos SET text='${text}' WHERE id = ${id};`,
            function (error, results, fields) {
 
                if (error) throw error;
 
                console.log('results: ', results);
 
                res.send(results)
            });
    });

//////////////////////////////


    app.delete('/delete', function (req, res) {//*****************************************************cambie get por delete
        let id = req.body.id;
        database.query(
            `DELETE FROM todos WHERE id=${id};`,
            function (error, results, fields) {
                if (error) throw error;
                console.log('results', results);
                res.send(results);
            });

    });

    app.put('/insert-todo', function (req, res) {
        let text = req.body.text;
        let created = moment().format('YYYY-MM-DD HH:mm Z');
     
        database.query(
            `INSERT INTO todos (text, created) VALUES('${text}', '${created}');`,
            function (error, results, fields){
                if(error) throw error;
                console.log('results: ', results);
                res.send(results);
            });
      });;

//////////////////fecha///////////////////////////////////////////////////////////////
      app.get('/get-created', function (req, res) {
        let id = req.body.id;
        database.query(
            `SELECT created FROM todos WHERE id=${id}`,
            function (error, results, fields) {
                if (error) throw error;
                console.log('results', results);
                res.send(results);
            });

    });
}