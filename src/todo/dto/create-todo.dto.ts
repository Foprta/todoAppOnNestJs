import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ required: true, example: 'Task Name', minLength: 4, maxLength: 30 })
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  title: string;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  done: boolean;
}
