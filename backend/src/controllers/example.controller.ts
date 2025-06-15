import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ExampleService } from '../services/example.service';
import { CreateExampleDto, SearchExampleDto } from '../dto/example.dto';

@ApiTags('examples')
@Controller('examples')
export class ExampleController {
    constructor(private readonly exampleService: ExampleService) {}

    @ApiOperation({ summary: 'Get all examples' })
    @ApiResponse({
        status: 200,
        description: 'Returns all examples',
    })
    @Get()
    async findAll(): Promise<any> {
        try {
            return await this.exampleService.findAll();
        } catch (error) {
            console.error('Error in findAll endpoint:', error);
            throw new Error(`Failed to get examples: ${error.message}`);
        }
    }

    @ApiOperation({ summary: 'Get example by ID' })
    @ApiParam({ name: 'id', description: 'Example ID' })
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<any> {
        try {
            return await this.exampleService.findOne(id);
        } catch (error) {
            console.error(`Error getting example ${id}:`, error);
            throw new Error(`Failed to get example: ${error.message}`);
        }
    }

    @ApiOperation({ summary: 'Search examples' })
    @ApiResponse({
        status: 200,
        description: 'Returns search results',
    })
    @Post('search')
    async search(@Body() searchDto: SearchExampleDto): Promise<any> {
        try {
            console.log('Received search query:', JSON.stringify(searchDto));
            const results = await this.exampleService.search(searchDto);
            console.log(`Search returned ${results.total} results`);
            return results;
        } catch (error) {
            console.error('Error in search endpoint:', error);
            throw new Error(`Failed to search examples: ${error.message}`);
        }
    }

    @ApiOperation({ summary: 'Create example' })
    @Post()
    async create(@Body() createDto: CreateExampleDto): Promise<any> {
        try {
            return await this.exampleService.create(createDto);
        } catch (error) {
            console.error('Error creating example:', error);
            throw new Error(`Failed to create example: ${error.message}`);
        }
    }

    @ApiOperation({ summary: 'Health check endpoint' })
    @Get('health')
    healthCheck(): { status: string; timestamp: string; memoryUsage: any } {
        const memStats = process.memoryUsage();

        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            memoryUsage: {
                rss: `${(memStats.rss / 1024 / 1024).toFixed(2)} MB`,
                heapTotal: `${(memStats.heapTotal / 1024 / 1024).toFixed(2)} MB`,
                heapUsed: `${(memStats.heapUsed / 1024 / 1024).toFixed(2)} MB`,
                external: `${(memStats.external / 1024 / 1024).toFixed(2)} MB`,
            }
        };
    }
}