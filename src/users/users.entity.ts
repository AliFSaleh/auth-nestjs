import { Exclude } from "class-transformer";
import { Artist } from "src/artists/artists.entity";
import { Column, Entity, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column({ unique: true })
    email: string

    @Column()
    @Exclude()
    password: string

    @OneToOne(() => Artist, (artist) => artist.user)
    artist: Artist
}