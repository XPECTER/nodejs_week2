import {EntityRepository, Repository} from "typeorm";
import { User } from "../entity/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    registUser(email: string, nickname: string, password: string, profile_img_url: string) {
        const user = new User();
        user.email = email;
        user.nickname = nickname;
        user.password = password;
        user.profile_img_url = profile_img_url;

        return this.manager.save(user);
    }
    
}