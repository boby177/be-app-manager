import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const web = {
  title: 'App Manager',
  description: 'App Manager Documentation',
} as const;

export function swaggerConfig(app: INestApplication, apiVersion?: string) {
  const webOptions = new DocumentBuilder()
    .setTitle(web.title)
    .setDescription(web.description)
    .setVersion(apiVersion)
    .build();

  const webDocument = SwaggerModule.createDocument(app, webOptions);

  filterDocument(webDocument, 'web');

  SwaggerModule.setup(`api/docs/v${apiVersion}/web`, app, webDocument);
}

function filterDocument(document: OpenAPIObject, platform: string) {
  Object.entries(document.paths).forEach(([pathKey, path]) => {
    Object.entries(path).forEach(([operationKey, operation]) => {
      const op = operation as OperationObject;
      if (!op.tags.some((tag) => tag.split(' - ')[0] === platform)) {
        delete document.paths[pathKey][operationKey];
      }
    });

    if (Object.keys(document.paths[pathKey]).length === 0) {
      delete document.paths[pathKey];
    }
  });
}
