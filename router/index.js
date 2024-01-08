import express from "express";
import { io } from "../app.js";

import { Login, submitLogin } from "../controllers/login.js";
import { Register, submitRegister } from "../controllers/register.js";
import { Dashboard, searchDashboard } from "../controllers/dashboard.js";
import { Apps } from "../controllers/apps.js";
import { Users } from "../controllers/users.js";
import { Images } from "../controllers/images.js";
import { Account } from "../controllers/account.js";
import { Settings } from "../controllers/settings.js";
import { Networks } from "../controllers/networks.js";
import { Volumes } from "../controllers/volumes.js";
import { Syslogs } from "../controllers/syslogs.js"; 

export const router = express.Router();

const auth = (req, res, next) => {
    if (req.session.role == "admin") {
        next();
    } else {
        res.redirect("/login");
    }
};


router.get("/login", Login);
router.post("/login", submitLogin);

router.get("/register", Register);
router.post("/register", submitRegister);  

router.get("/", auth, Dashboard);
router.post("/", auth, searchDashboard);
router.post("/:search", auth, searchDashboard);

router.get("/apps", auth, Apps);
router.get("/apps/:page", auth, Apps);

router.get("/users", auth, Users);

router.get("/images", auth, Images);

router.get("/networks", auth, Networks);

router.get("/volumes", auth, Volumes);

router.get("/syslogs", auth, Syslogs);

router.get("/account", Account);

router.get("/settings", auth, Settings);
  
router.get("/logout", (req, res) => {
    const sessionId = req.session.id;
    req.session.destroy(() => {
        io.to(sessionId).disconnectSockets();
        res.redirect("/login");
    });
});