const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const bcryptSalt = bcrypt.genSaltSync(10);
const router = express.Router();
const User = require("../models/user");
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";
router.post("/add", async (req, res) => {
  const { name, password, field } = req.body;
  const userDoc = await User.findOne({ name });
  if (userDoc) {
    res.json("an acount with this email already exists, try logging in ");
  } else {
    try {
      await User.create({
        name,
        password: bcrypt.hashSync(password, bcryptSalt),
        field,
      });
      res.json("Great");
    } catch (error) {
      res.status(422).json(error);
    }
  }
});
router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  const userDoc = await User.findOne({ name });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
      const token = jwt.sign(
        { id: userDoc.id, name: userDoc.name, field: userDoc.field },
        jwtSecret,
        { expiresIn: '24h' }
      );
      res.json({ token: token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } else {
    res.status(404).json('User not found');
  }
});

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = { ...decoded };
    res.json({ user: req.user });
    next();
  });
}
router.get('/', verifyToken, (req, res) => {
});
router.post('/notification', async (req, res) => {
  const {id} = req.body
  // console.log(id)
  const user = await User.findById(id)
  // console.log(user)
  if (user){
    res.json({user:user})
  }

});
router.get("/all", async (req, res) => {
   
      try {
        res.json(await User.find());
      } catch (error) {
        res.status(404).json("User not found");
      }
  
});
router.get('/:id', async (req,res)=>{
  const {id} = req.params
  const user = await User.findById(id)
    if(user){
      console.log(user)
        return res.json(user)
    }
    else{
      res.json("worker not found")
    }
})
router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { name, password, field } = req.body;
  try {
    const user = await User.findById(
      id,
    );

    if (user) {
        user.name =name,
        user.password = bcrypt.hashSync(password, bcryptSalt),
        user.field = field
        await user.save()
        res.json(user);
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(422).json(error);
  }
});
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (deletedUser) {
      res.json(deletedUser);
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(422).json(error);
  }
});
module.exports = router;