import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateTodoDto {
  @ApiProperty({ required: false, example: 'New Task Name', minLength: 4, maxLength: 30 })
  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(30)
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
