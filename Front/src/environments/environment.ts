import * as config from '../../auth_config.json';

export const environment = {
  production: false,
  auth_client_id: config.clientId,
  auth_domain: config.domain,
  auth_audience: config.audience
};
