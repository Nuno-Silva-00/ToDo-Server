import express from "express";

const router = express.Router();

router.route('/createToDo').post()
router.route('/').get((req, res) => {
    return res.send('teste2')

})
export default router;