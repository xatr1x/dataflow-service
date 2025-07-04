import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ImportRecordDto {
  @ApiProperty({ description: 'External identifier for the record' })
  externalId: number;

  @ApiProperty({ description: 'Name of the person or entity' })
  name: string;

  @ApiProperty({ description: 'Email address of the person or entity' })
  email: string;

  @ApiPropertyOptional({ description: 'Phone number (optional)' })
  phone?: string;

  @ApiPropertyOptional({ description: 'University name (optional)' })
  university?: string;
}
