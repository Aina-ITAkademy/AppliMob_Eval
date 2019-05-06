var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient,
  ObjectId = require('mongodb').ObjectId,// declaration de ObjectId qui appartient a mongodb donc le signaler ainsi a nodejs
  url = "mongodb://localhost:27017/EvalAppli_DB";

// connexion a la db cette fonction requiert 3 parametres: une url, un objet et une function de callback
MongoClient.connect(url,
  { useNewUrlParser: true },
  function (err, client) {
    if (err) throw err;

    var DB = client.db('EvalAppli_DB');
    console.log('je suis connecté a EvalAppli_DB');

    /* GET home page. */
    router.get('/', function (req, res, next) {
      res.render('index', { title: 'Express' })
    })

    /* GET Get All notes */
    router.get('/notes', function (req, res, next) {
      DB.collection('notes').find({}).sort({ "_id": -1 }).toArray(function (err, notes) {
        if (err) throw err
        console.log(notes)
        res.json(notes)
      })
    })
    
    /* GET Get 1 note */
    router.get('/notes/:id', function (req, res, next) {
      DB.collection('notes').findOne({ _id: ObjectId(req.params.id) }, function (err, note) {
        if (err) throw err;
        res.json(note);
      });
    });

    /* POST add 1 note */
    router.post('/notes', function (req, res, next) {
      var requiredProps = ['title', 'description', 'date_create', 'date_update'];
      for (var i in requiredProps[i]) {
        if (typeof req.body[requiredProps[i]] == 'undefined') {
          return res.send(requiredProps[i] + 'empty');
        }
      }
      DB.collection('notes').insertOne(req.body, function (err, result) {
        if (err) throw err;
        res.json({
          result: 'Note ajouté',
          id: result.insertedId.toString()
        });
      })
    })

    /* PUT Update 1 note */
    router.put('/notes/:id', function (req, res, next) {
      DB.collection('notes').updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: req.body },
        function (err, result) {
          if (err) throw err;
          res.json({
            result: 'Note mise à jour'
          })
        }
      )
    })


    /* DELETE Delate 1 note */
    router.delete('/notes/:id', function (req, res, next) {
      DB.collection('notes').deleteOne({ _id: ObjectId(req.params.id) }, function (err, note) {
        if (err) throw err
        res.send("Note supprimée")
      })
    })
    

  }
)

module.exports = router;
