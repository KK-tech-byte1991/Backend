const express = require('express');
const { addtypebot, gettypebotByUserId, gettypebotByFolderId, gettypebotById, deleteFolder, updateById, deleteTypeBot, deleteByElementId } = require('../controllers/typebotController');
const { getResponsesByFormId } = require("../controllers/responseController")
const router = express.Router();

router.post('/create', addtypebot);
router.get('/getByUserId/:id', gettypebotByUserId);
router.get("/getByFolderId/:id", gettypebotByFolderId)
router.get("/getById/:id", gettypebotById)
router.put("/update", updateById)
router.get("/responses/:id", getResponsesByFormId)
router.delete("/deleteElement/:id", deleteByElementId)
router.delete("/:id", deleteTypeBot)
module.exports = router; 