"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Index_1 = require("../Controller/Index");
const express = require('express');
const router = express.Router({ mergeParams: true });
router.route('/').get(Index_1.Index);
module.exports = router;
