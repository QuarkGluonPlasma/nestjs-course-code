import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequireLogin, RequirePermission } from 'src/custom-decorator';
import { BbbService } from './bbb.service';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';

@Controller('bbb')
@RequireLogin()
export class BbbController {
  constructor(private readonly bbbService: BbbService) {}

  @Post()
  create(@Body() createBbbDto: CreateBbbDto) {
    return this.bbbService.create(createBbbDto);
  }

  @Get()
  @RequirePermission('查询 bbb')
  findAll() {
    return this.bbbService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bbbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBbbDto: UpdateBbbDto) {
    return this.bbbService.update(+id, updateBbbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bbbService.remove(+id);
  }
}
