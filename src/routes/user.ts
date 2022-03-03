import express, { Request, Response }  from "express";
import jwt from 'jsonwebtoken';
import { getRepository } from "typeorm";
import { User } from "../entity/user";
import * as messages from "../messages";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(req.body);
    const token = jwt.sign({nickname: user.nickname, profile_img_url: user.profile_img_url}, "XPECTER");
    
    res.send({
        success: "true",
        messages: messages.success,
        token,
    });
});

router.post("/register", async (req: Request, res: Response) => {
    const userRepository = getRepository(User);

    try {
        const user = await userRepository.create(req.body);
        await userRepository.save(user);
        res.send({ success: "true", messages: "" });
    } catch {
        res.send({ success: "false", messages: messages.isRegistedError })
    }
});


export default router;