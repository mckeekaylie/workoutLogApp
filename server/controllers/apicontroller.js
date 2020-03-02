const express = require('express');
const router = express.Router();
const Log = require('../db').import('../models/log')

//get all logs for an individual user
router.get('/log', (req, res) => {
    Log.findAll()
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({
            error: err
        }))
});

//create a log
router.post('/log', (req, res) => {
    const logFromRequest = {
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
        owner: req.user.id
    }

    Log.create(logFromRequest)
        .then(log => res.status(200).json(log))
        .catch(err => res.json({
            error: err
        }))
})

//get individual log by id 
router.get('/log/:id', (req, res) => {
    Log.findOne({ where: { id: req.params.id }})
      .then(log => res.status(200).json(log))
      .catch(err => res.status(500).json({ 
          error: err
       }))
})

//Allows individual logs to be updated by a user.
router.put('/log/:id', (req, res) => {
    Log.update(req.body, { 
        where: {
            id: req.params.id 
        }
    })
        .then(log => res.status(200).json(log))
        .catch(err => res.json(err))
  })

//allows individual logs to be deleted by a user
router.delete('/log/:id', (req, res) => {
    Log.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(log => res.status(200).json(log))
        .catch(err => res.json({
            error: err
        }))
});

module.exports = router;