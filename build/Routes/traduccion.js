"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const traduccion_1 = require("../Controller/traduccion");
const express = require('express');
const router = express.Router({ mergeParams: true });
router.route('/').post(traduccion_1.Traducir);
module.exports = router;
