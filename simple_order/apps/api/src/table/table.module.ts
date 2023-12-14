import { Module } from '@nestjs/common';
import { TableService } from './service/table.service';

@Module({
  providers: [TableService]
})
export class TableModule {}
