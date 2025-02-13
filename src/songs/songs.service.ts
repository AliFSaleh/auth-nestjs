import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Song } from './songs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateSongDto } from './dto';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artists.entity';

@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Song)
        private songsRepository: Repository<Song>,
        
        @InjectRepository(Artist)
        private artistsRepository: Repository<Artist>
    ) {}

    async index () {
        return await this.songsRepository.find()
    }

    async create (songDto) {
        const song = new Song()
        song.title = songDto.title
        song.artists = songDto.artists
        song.releasedDate = songDto.releasedDate
        song.duration = songDto.duration
        song.lyrics = songDto.lyrics
        
        const artists = await this.artistsRepository.findByIds(songDto.artists_ids)
        song.artists = artists

        return await this.songsRepository.save(this.songsRepository.create(song))
    }

    async show (id: number) {
        return await this.songsRepository.findOneBy({id})
    }

    async update (id: number, updatedSong: UpdateSongDto) {
        return await this.songsRepository.update(id, updatedSong)
    }

    async destroy (id) {
        return await this.songsRepository.delete(id)
    }

    async paginate (options: IPaginationOptions) {
        return await paginate<Song>(this.songsRepository, options)
    }
}
