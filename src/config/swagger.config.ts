import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const web = {
  title: 'Google SSO (Web Version)',
  description: 'Google SSO API Documentation for website',
} as const;

const internal = {
  title: 'Google SSO (Internal Version)',
  description: 'Google SSO API Documentation for internal',
} as const;

export function swaggerConfig(app: INestApplication, apiVersion?: string) {
  const webOptions = new DocumentBuilder()
    .setTitle(web.title)
    .setDescription(web.description)
    .setVersion(apiVersion)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'Bearer',
      in: 'header',
    })
    .build();

  const internalOptions = new DocumentBuilder()
    .setTitle(internal.title)
    .setDescription(internal.description)
    .setVersion(apiVersion)
    .addApiKey({ type: 'apiKey', name: 'api-key', in: 'header' }, 'api-key')
    .build();

  const webDocument = SwaggerModule.createDocument(app, webOptions);
  const internalDocument = SwaggerModule.createDocument(app, internalOptions);

  filterDocument(webDocument, 'web');
  filterDocument(internalDocument, 'internal');

  SwaggerModule.setup(`api/docs/v${apiVersion}/web`, app, webDocument);
  SwaggerModule.setup(
    `api/docs/v${apiVersion}/internal`,
    app,
    internalDocument,
  );
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
