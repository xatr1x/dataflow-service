import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRecordDto {
  @ApiProperty({
    example: 123,
    description: 'External identifier of the record',
  })
  @IsNumber()
  externalId: number;

  @ApiProperty({ example: 'John Doe', description: 'Name of the person' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the person',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the person',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: 'MIT',
    description: 'University of the person',
    required: false,
  })
  @IsString()
  @IsOptional()
  university?: string;
}
