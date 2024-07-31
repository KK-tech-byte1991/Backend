const express = require('express');
const { addtypebot, gettypebotByUserId, gettypebotByFolderId, gettypebotById, deleteFolder, updateById, deleteTypeBot, deleteByElementId } = require('../controllers/typebotController');
const { addResponse,addElementToArray } = require("../controllers/responseController")
const router = express.Router();

router.get("/getById/:id", gettypebotById)
router.post("/createResponse", addResponse)
router.put("/updateResponse/:id",addElementToArray)
module.exports = router; 