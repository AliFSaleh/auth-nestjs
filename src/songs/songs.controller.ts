import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto, UpdateSongDto } from './dto/song-dto';

@Controller('api/songs')

export class SongsController {
    constructor (private songsService: SongsService) {}

    @Get()
    index() {
        return this.songsService.index()
    }

    @Post()
    create (@Body() songDto: CreateSongDto){
        return this.songsService.create(songDto)
    }

    @Get(':id')
    show (@Param('id', ParseIntPipe) id: number) {        
        return this.songsService.show(id)
    }

    @Patch(':id')
    update (
        @Param('id', ParseIntPipe)id : number,
        @Body() songDto: UpdateSongDto
    ) {
        return this.songsService.update(id, songDto)
    }

    @Delete(':id')
    delete (@Param('id', ParseIntPipe) id: number) {
        return this.songsService.destroy(id)
    }
}
