import express, { Request, Response }  from "express";
import { getRepository, getConnection } from "typeorm";
import { UserRepository } from "../repository/userRepository";
import { Post } from "../entity/post";
import { User } from "../entity/user";
import { Like } from "../entity/like";
import * as messages from "../messages";

const router = express.Router();


router.get("/post", async (req: Request, res: Response) => {
    const postRepository = getRepository(Post);
    const results = await postRepository.find();
    res.send({
        post: results
    });
});

router.get("/post/:postId", async (req: Request, res: Response) => {
    const post = await getConnection()
        .getRepository(Post)
        .createQueryBuilder("post")
        .leftJoinAndSelect("post.userId", "user")
        .where("posts.id = :postId")
        .getOne();
    
    console.log(post);
    // const postRepository = getRepository(Post);
    // const result = await postRepository.findOne(req.params.postId);
    res.send(post);
});

router.post("/post", async (req: Request, res: Response) => {
    const { email, nickname, password, profile_img_url } = req.body;
    const userRepository = getConnection().getCustomRepository(UserRepository);

    try {
        if (!email || !nickname || !password || !profile_img_url)
            throw messages.isEmptyError;

        await userRepository.registUser(email, nickname, password, profile_img_url);
        res.send();     
    } catch (errorMessage) {
        res.send({ success: "false", messages: errorMessage });
    }
});

router.put("/post/:postId", async (req: Request, res: Response) => {
    res.send({ messages: "put post postId ok"});
});

router.delete("/post/:postId", async (req: Request, res: Response) => {
    res.send({ messages: "delete post postId ok"});
});

router.post("/post/:postId/like", async (req: Request, res: Response) => {
    res.send({ messages: "post post like ok" });
});

router.delete("/post/:postId/like", async (req: Request, res: Response) => {
    res.send({ messages: "delete post like ok"});
});


export default router;