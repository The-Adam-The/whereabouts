const express = require('express');
const {
    ReturnDocument
} = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const createRouter = (collection) => {

    const router = express.Router();

    //index
    router.get('/', (req, res) => {
        collection
            .find()
            .toArray()
            .then((docs) => res.json(docs))
            .catch((error) => {
                console.error(error)
                res.status(500)
                res.json({
                    status: 500,
                    error: error
                })
            })
    })

    //show random
    router.get('/random/question', (req, res) => {
        collection
            .find()
            .toArray()
            .then((docs) => {
                question = docs[Math.round(Math.random() * docs.length)]
                res.json(question)
            })
            .catch((error) => {
                console.error(error)
                res.status(500)
                res.json({
                    status: 500,
                    error: error
                })
            })
    })

      //show three random questions
      router.get('/random/3questions', (req, res) => {
        collection
            .find()
            .toArray()
            .then((docs) => {
                const questions = []
            
                for (let i = 0; i < 3; i++){
                    var docLength = docs.length
                    var randomNumber = Math.round(Math.random() * (docLength -1))
                    var question = docs.splice(randomNumber, 1)
                    questions.push(question[0])
                }
                res.json(questions)
            })
            .catch((error) => {
                console.error(error)
                res.status(500)
                res.json({
                    status: 500,
                    error: error
                })
            })
    })


    //show 
    router.get('/:id', (req, res) => {
        const id = req.params.id;
        collection
            .findOne({
                _id: ObjectId(id)
            })
            .then((doc) => res.json(doc))
            .catch((error) => {
                console.error(error)
                res.status(500)
                res.json({
                    status: 500,
                    error: error
                })
            })
    })

    //create
    router.post('/', (req, res) => {
        const newData = req.body;
        collection
            .insertOne(newData)
            .then((result) => res.json(result))
            .catch((error) => {
                console.error(error)
                res.status(500)
                res.json({
                    status: 500,
                    error: error
                })
            })
    })

    return router

};

module.exports = createRouter;