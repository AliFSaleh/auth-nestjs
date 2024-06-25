import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSongDto {
    @IsNotEmpty()
    @IsString()
    readonly title

    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, {each: true})
    readonly artists_ids

    @IsNotEmpty()
    @IsDateString()
    readonly releasedDate: Date

    @IsNotEmpty()
    @IsMilitaryTime()
    readonly duration: Date

    // @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly lyrics: string
}

export class UpdateSongDto {
    @IsOptional()
    @IsString()
    readonly title

    @IsOptional()
    @IsArray()
    @IsNumber({}, {each: true})
    readonly artists

    @IsOptional()
    @IsDateString()
    readonly releasedDate: Date

    @IsOptional()
    @IsMilitaryTime()
    readonly duration: Date

    @IsOptional()
    @IsString()
    readonly lyrics: string
}