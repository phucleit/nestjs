import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';

@Controller('website')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Post()
  create(@Body() createWebsiteDto: CreateWebsiteDto) {
    return this.websiteService.create(createWebsiteDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.websiteService.findAll(query.page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.websiteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebsiteDto: UpdateWebsiteDto) {
    return this.websiteService.update(id, updateWebsiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.websiteService.remove(id);
  }
}
