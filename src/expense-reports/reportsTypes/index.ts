import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const reportTypeEnumSchemaOptional = z.enum(['income', 'expense']).optional();

const reportTypeEnumSchemaRequired = z.enum(['income', 'expense']);

const reportTypeDtoEnumSchemaOptional = z.object({
  reportType: reportTypeEnumSchemaOptional,
});
const reportTypeDtoEnumSchemaRequired = z.object({
  reportType: reportTypeEnumSchemaRequired,
});

const reportsSchema = z.object({
  userId: z.string(),
  source: z.string(),
  amount: z.number(),
  type: reportTypeEnumSchemaRequired,
});

type report = z.infer<typeof reportsSchema>;
class reportsDto extends createZodDto(reportsSchema) {}
/////////////////////////////////////////////////////////////////////
type reportTypeOptional = z.infer<typeof reportTypeEnumSchemaOptional>;
class reportTypeDtoOptional extends createZodDto(
  reportTypeDtoEnumSchemaOptional,
) {}
////////////////////////////////////////////////////////////////////
type reportTypeRequired = z.infer<typeof reportTypeEnumSchemaRequired>;
class reportTypeDtoRequired extends createZodDto(
  reportTypeDtoEnumSchemaRequired,
) {}

export {
  reportTypeDtoOptional,
  reportTypeDtoRequired,
  reportTypeOptional,
  reportTypeRequired,
  report,
  reportsDto,
};
