import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Todo extends BaseEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Task Name' })
  @Column({ type: 'varchar' })
  title: string;

  @ApiProperty({ example: false })
  @Column({ type: 'boolean', default: false })
  done: boolean;
}
