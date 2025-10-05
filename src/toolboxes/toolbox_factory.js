import { inputBlocksGensci } from './input_gensci.js';
import { inputBlocksEnviro } from './input_enviro.js';
import { inputBlocksPhysio } from './input_physio.js';
import { inputBlocksBioChem } from './input_biochem.js';
import { commonCategories } from './common.js';
import { inputBlocksCommon } from './input_common.js';

function mergeInputCategories(commonCat, modelCat) {
  if (!modelCat) return commonCat;
  return {
    kind: 'category',
    name: commonCat.name || 'Input',
    colour: commonCat.colour || '#649FEF',
    contents: [
      ...(commonCat.contents || []),
      ...(modelCat.contents || []),
    ],
  };
}

export function getToolboxForModel(model) {
 const m = (model || '').toLowerCase();
  const modelInput =
    m === 'enviro' ? inputBlocksEnviro :
    m === 'physio' ? inputBlocksPhysio :
    m === 'biochem' ? inputBlocksBioChem :
    m === 'gensci' ? inputBlocksGensci : null;

  const inputCategory = mergeInputCategories(inputBlocksCommon, modelInput);

  return {
    kind: 'categoryToolbox',
    contents: [
      inputCategory,
      ...commonCategories
    ]
  };
}
