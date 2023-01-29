import { IsNumber, Min } from "class-validator"

export class PaginationDto {

    @IsNumber()
    @Min(1)
    limit: number

    @IsNumber()
    @Min(0)
    offset: number
}