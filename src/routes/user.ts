import {Router} from 'express';
import db from '../db';
import {RowDataPacket} from 'mysql2';

const router = Router();

router.post('/login', (req, res) => {
  const {mobile, password} = req.body;

  db.query(
    "SELECT * FROM `user` WHERE `user`.`mobile` = '" +
      mobile +
      "' AND `user`.`password` = '" +
      password +
      "' ",
    (err, result: RowDataPacket[]) => {
      if (!err) {
        if (result.length == 1) {
          res.status(200).send({user: result[0]});
        } else {
          res.status(401).send({msg: 'Invalid Credentials'});
        }
      } else {
        console.error(err.message);
        res.status(500).send(err.message);
      }
    },
  );
});

router.post('/signup', (req, res) => {
  const {fname, lname, mobile, password} = req.body;

  db.query(
    "SELECT * FROM `user` WHERE `user`.`mobile` = '" + mobile + "' ",
    (err, result: RowDataPacket[]) => {
      if (!err) {
        if (result.length == 0) {
          db.query(
            "INSERT INTO `user` (`fname`, `lname`, `mobile`, `password`) VALUES ('" +
              fname +
              "', '" +
              lname +
              "', '" +
              mobile +
              "', '" +
              password +
              "')",
            (err, result) => {
              if (!err) {
                res.status(201).send({msg: 'User created successfully'});
              } else {
                res
                  .status(500)
                  .send({msg: 'Error Occurred while creating user'});
                console.error(err.message);
              }
            },
          );
        } else {
          res.status(400).send({msg: 'User already exists'});
        }
      } else {
        res.status(500).send({msg: 'Something went wrong'});
        console.error(err.message);
      }
    },
  );
});

export default router;
