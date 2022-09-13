import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HostingsService } from './hostings.service';
import { CreateHostingDto } from './dto/create-hosting.dto';
import { UpdateHostingDto } from './dto/update-hosting.dto';

@Controller('hostings')
export class HostingsController {
  constructor(private readonly hostingsService: HostingsService) {}

  @Post()
  create(@Body() createHostingDto: CreateHostingDto) {
    return this.hostingsService.create(createHostingDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.hostingsService.findAll(query.page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hostingsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHostingDto: UpdateHostingDto) {
    return this.hostingsService.update(id, updateHostingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hostingsService.remove(id);
  }
}
