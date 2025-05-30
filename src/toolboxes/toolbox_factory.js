import { inputBlocksGensci } from './input_gensci.js';
import { inputBlocksEnviro } from './input_enviro.js';
import { inputBlocksPhysio } from './input_physio.js';
import { inputBlocksBioChem } from './input_biochem.js';
import { commonCategories } from './common.js';

export function getToolboxForModel(model) {
  let inputCategory;

  switch (model.toLowerCase()) {
    case 'enviro':
      inputCategory = inputBlocksEnviro;
      break;
    case 'physio':
      inputCategory = inputBlocksPhysio;
      break;
    case 'biochem':
      inputCategory = inputBlocksBioChem;
      break;
    case 'gensci':
    default:
      inputCategory = inputBlocksGensci;
      break;
  }

  return {
    kind: 'categoryToolbox',
    contents: [
      inputCategory,
      ...commonCategories
    ]
  };
}
