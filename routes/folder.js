const express = require('express');
const { addFolder, getFoldersByUserId, deleteFolder } = require('../controllers/folderController');
const router = express.Router();

router.post('/create', addFolder);
router.get('/getByUserId/:id', getFoldersByUserId);
router.delete("/:id", deleteFolder)
module.exports = router;