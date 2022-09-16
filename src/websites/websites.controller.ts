import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WebsitesService } from './websites.service';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { UpdateWebsiteDto } from './dto/update-website.dto';

@Controller('websites')
export class WebsitesController {
  constructor(private readonly websitesService: WebsitesService) {}

  @Post()
  create(@Body() createWebsiteDto: CreateWebsiteDto) {
    return this.websitesService.create(createWebsiteDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.websitesService.findAll(query.page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.websitesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWebsiteDto: UpdateWebsiteDto) {
    return this.websitesService.update(id, updateWebsiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.websitesService.remove(id);
  }

  @Patch("changeHostName/:id")
  changeHostName(@Param("id") id : string, @Body() updateWebsiteDto: Object){
    return this.websitesService.changeHostName(id, updateWebsiteDto['hosting'])
  }
  // @Get('hosting/:id')
  // findWebsiteByHostingId(@Param('id') id: string) {
  //   return this.websitesService.findWebsiteByHostingId(id);
  // }
}
