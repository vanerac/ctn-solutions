import { PartialType } from '@nestjs/swagger';
import { CreateEstimateDto } from './create-estimate.dto';

export class UpdateEstimateDto extends PartialType(CreateEstimateDto) {}
