const userRouter = require("express").Router();
const userController = require("../controllers/userController");

userRouter.post('/register', async (req, res, next) => {
    try {
        const user = req.body;
        const savedUser = await userController.registerUser(user);
        res.status(201).json(savedUser);
    } catch (e) {
        next(e);
    }
})




module.exports = userRouter;