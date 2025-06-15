import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateExampleDto, SearchExampleDto, ExampleDto } from '../dto/example.dto';

@Injectable()
export class ExampleService implements OnModuleInit {
    private examples: ExampleDto[] = [];

    async onModuleInit() {
        console.log('Initializing ExampleService...');
        // Initialize your service here
        // Load data, connect to external services, etc.
        this.examples = [
            {
                id: '1',
                name: 'Example 1',
                description: 'This is an example',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '2',
                name: 'Example 2',
                description: 'This is another example',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        console.log(`Loaded ${this.examples.length} examples`);
    }

    async findAll(): Promise<ExampleDto[]> {
        return this.examples;
    }

    async findOne(id: string): Promise<ExampleDto | null> {
        const example = this.examples.find(e => e.id === id);
        return example || null;
    }

    async search(searchDto: SearchExampleDto): Promise<{
        results: ExampleDto[];
        total: number;
        page: number;
        limit: number;
    }> {
        const { searchTerm, page = 1, limit = 10 } = searchDto;

        let filteredResults = this.examples;

        if (searchTerm) {
            const termLower = searchTerm.toLowerCase();
            filteredResults = filteredResults.filter(example =>
                example.name.toLowerCase().includes(termLower) ||
                example.description.toLowerCase().includes(termLower)
            );
        }

        const total = filteredResults.length;
        const paginatedResults = filteredResults.slice((page - 1) * limit, page * limit);

        return {
            results: paginatedResults,
            total,
            page,
            limit
        };
    }

    async create(createDto: CreateExampleDto): Promise<ExampleDto> {
        const newExample: ExampleDto = {
            id: (this.examples.length + 1).toString(),
            ...createDto,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        this.examples.push(newExample);
        return newExample;
    }

    async update(id: string, updateDto: Partial<CreateExampleDto>): Promise<ExampleDto | null> {
        const index = this.examples.findIndex(e => e.id === id);
        if (index === -1) return null;

        this.examples[index] = {
            ...this.examples[index],
            ...updateDto,
            updatedAt: new Date(),
        };

        return this.examples[index];
    }

    async delete(id: string): Promise<boolean> {
        const index = this.examples.findIndex(e => e.id === id);
        if (index === -1) return false;

        this.examples.splice(index, 1);
        return true;
    }
}