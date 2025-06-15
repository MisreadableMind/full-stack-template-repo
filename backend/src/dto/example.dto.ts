import { IsString, IsOptional, IsNumber, IsDateString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ExampleDto {
    @ApiProperty({ description: 'Unique identifier' })
    id: string;

    @ApiProperty({ description: 'Name of the example' })
    name: string;

    @ApiProperty({ description: 'Description of the example' })
    description: string;

    @ApiProperty({ description: 'Creation date' })
    createdAt: Date;

    @ApiProperty({ description: 'Last update date' })
    updatedAt: Date;
}

export class CreateExampleDto {
    @ApiProperty({ description: 'Name of the example' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'Description of the example' })
    @IsString()
    description: string;
}

export class SearchExampleDto {
    @ApiPropertyOptional({ description: 'Search term to filter results' })
    @IsOptional()
    @IsString()
    searchTerm?: string;

    @ApiPropertyOptional({ description: 'Page number for pagination', default: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number;

    @ApiPropertyOptional({ description: 'Number of items per page', default: 10 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number;
}

export class UpdateExampleDto {
    @ApiPropertyOptional({ description: 'Name of the example' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ description: 'Description of the example' })
    @IsOptional()
    @IsString()
    description?: string;
}