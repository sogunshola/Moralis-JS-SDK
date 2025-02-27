// npx openapi-typescript https://deep-index.moralis.io/api-docs/v2/swagger.json --output types/generated/web3Api2.d.ts

// const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const fs = require('fs');
const https = require('https');
const openapiTS = require('openapi-typescript').default;

const DEEP_INDEX_API_HOST = 'deep-index.moralis.io';
const DEEP_INDEX_SWAGGER_PATH = '/api-docs/v2/swagger.json';

const OUTPUT_DIRECTORY = '../types/generated/';
const OUTPUT_FILENAME = 'web3Api.d.ts';

const fetchSwaggerJson = () => {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: DEEP_INDEX_API_HOST,
        path: DEEP_INDEX_SWAGGER_PATH,
        method: 'GET',
      },
      res => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error('statusCode=' + res.statusCode));
        }

        let body = '';

        res.on('data', chunk => {
          body += chunk;
        });

        res.on('end', function () {
          try {
            const result = JSON.parse(body);
            resolve(result);
          } catch (e) {
            reject(e);
          }
        });
      }
    );

    req.on('error', function (err) {
      reject(err);
    });

    req.end();
  });
};

const getPathByTag = swaggerJSON => {
  const pathByTag = {};
  const pathDetails = {};

  Object.entries(swaggerJSON.paths).map(([pathName, requestData]) => {
    return Object.entries(requestData).map(([method, data]) => {
      const { tags } = data;

      if (tags.length > 0) {
        if (!pathByTag[tags[0]]) {
          pathByTag[tags[0]] = [];
        }
        pathByTag[tags[0]].push(data.operationId);
        pathDetails[data.operationId] = { method, pathName, data };
      }
    });
  });

  return { pathByTag, pathDetails };
};

const filterUnique = (value, index, self) => self.indexOf(value) === index;

const makeMethod = (pathDetails, path) => {
  const optionKeys = pathDetails[path].data.parameters.map(param => param.in).filter(filterUnique);
  const hasPath = optionKeys.includes('path');

  const operations = `operations["${path}"]`;

  const options = `${operations}["parameters"]["query"] ${
    hasPath ? `& ${operations}["parameters"]["path"]` : ''
  }`;
  const result = `${operations}["responses"]["200"]["content"]["application/json"]`;

  return `    ${path}: (options: ${options}) => Promise<${result}>;
`;
};

const makeTagObject = (tag, pathByTag, pathDetails) => {
  return `  static ${tag}: {
${pathByTag[tag].map(path => makeMethod(pathDetails, path)).join('')}  }

`;
};

const makeGeneratedWeb3ApiType = (tags, pathByTag, pathDetails) => {
  return `
export class GeneratedWeb3API {
${tags.map(tag => makeTagObject(tag, pathByTag, pathDetails)).join('')}}
`;
};

const generateWeb3ApiTypes = async () => {
  console.log('Start generating automatic Web3API Types...');
  // Fetch the swagger JSON
  const swaggerJSON = await fetchSwaggerJson();

  // normalize data for our use
  const { pathByTag, pathDetails } = await getPathByTag(swaggerJSON);
  const tags = Object.keys(pathByTag);

  // Generate automatic types from swagger via openapi-typescript
  let content = await openapiTS(swaggerJSON);

  // Add our custom types
  content += makeGeneratedWeb3ApiType(tags, pathByTag, pathDetails);

  // Save the file
  const outputDirectory = path.join(__dirname, OUTPUT_DIRECTORY);
  const outputFile = path.join(outputDirectory, OUTPUT_FILENAME);

  await fs.promises.mkdir(outputDirectory, { recursive: true });
  await fs.promises.writeFile(outputFile, content, { encoding: 'utf8' });

  console.log('Done generatinging automatic Web3API Types!');
};

generateWeb3ApiTypes();
