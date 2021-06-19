import { Expose } from "class-transformer";
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    driver_license: string;

    @Column()
    isAdmin: boolean;

    @Column()
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @Expose({ name: "avatar_url" })
    avatar_url(): string | null {
        if (!this.avatar) {
            return null;
        }

        switch (process.env.STORAGE_PROVIDER) {
            case "local":
                return `${process.env.APP_API_URL}/Avatar/${this.avatar}`;
            case "s3":
                return `${process.env.AWS_BUCKTE_URL}/Avatar/${this.avatar}`;
            default:
                return null;
        }
    }
}
export default User;
