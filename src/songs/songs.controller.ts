import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto, UpdateSongDto } from './dto/song-dto';

@Controller('api/songs')

export class SongsController {
    constructor (private songsService: SongsService) {}

    @Get()
    index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Query('per_page', new DefaultValuePipe(10), ParseIntPipe) per_page: number
    ) {
        return this.songsService.paginate({page, limit: per_page})
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
