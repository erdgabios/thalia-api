import mongoose from 'mongoose';
import { Router } from 'express';
import Thalia from '../model/thalia';

import { authenticate } from '../middleware/authMiddleware';

export default({ config, db }) => {
  let api = Router();

  // CRUD = Create Read Update Delete

  // '/v1/thalia/add'
  api.post('/add', authenticate, (req, res) => {
    let newThalia = new Thalia();
    newThalia.nev = req.body.nev;

    newThalia.save(err => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Thalia saved successfully' });
    });
  });

  // '/v1/thalia' - Read
  api.get('/', (req, res) => {
    Thalia.find({}, (err, thalias) => {
      if (err) {
        res.send(err);
      }
      res.json(thalias);
    });
  });

  // '/v1/thalia/:id' - Read 1
  api.get('/:id', (req, res) => {
    Thalia.findById(req.params.id, (err, thalia) => {
      if (err) {
        res.send(err);
      }
      res.json(thalia);
    });
  });

  // '/v1/thalia/:id' - Update
  api.put('/:id', authenticate, (req, res) => {
    Thalia.findById(req.params.id, (err, thalia) => {
      if (err) {
        res.send(err);
      }
      thalia.nev = req.body.nev;
      thalia.save(err => {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Thalia info updated" });
      });
    });
  });

  // '/v1/thalia/:id' - Delete
  api.delete('/:id', authenticate, (req, res) => {
    Thalia.remove({
      _id: req.params.id
    }, (err, thalia) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Thalia successfully REMOVED!" });
    });
  });

  return api;
}
