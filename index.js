import Service from './lib/Service.js';

export function create(options) {
  return new Service(options);
}

export default {
  create,
};
