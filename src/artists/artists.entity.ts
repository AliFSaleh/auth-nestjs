import { Song } from "src/songs/songs.entity";
import { User } from "src/users/users.entity";
import { Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('artists')
export class Artist {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User, (user) => user.artist)
    @JoinColumn()
    user: User

    @ManyToMany(() => Song, (songs) => songs.artists)
    songs: Song[]
}