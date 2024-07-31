const express = require('express');
const { addtypebot, gettypebotByUserId, gettypebotByFolderId, gettypebotById, deleteFolder, updateById } = require('../controllers/typebotController');
const router = express.Router();

router.post('/create', addtypebot);
router.get('/getByUserId/:id', gettypebotByUserId);
router.get("/getByFolderId/:id", gettypebotByFolderId)
router.get("/getById/:id", gettypebotById)
router.put("/update", updateById)
// router.delete("/:id", deleteFolder)
module.exports = router; 