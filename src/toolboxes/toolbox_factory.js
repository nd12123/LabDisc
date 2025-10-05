import { inputBlocksGensci } from './input_gensci.js';
import { inputBlocksEnviro } from './input_enviro.js';
import { inputBlocksPhysio } from './input_physio.js';
import { inputBlocksBioChem } from './input_biochem.js';
import { commonCategories } from './common.js';
import { inputBlocksCommon } from './input_common.js';

export function getToolboxForModel(model) {
  
  const m = (model || '').toLowerCase();
  let inputCategory = inputBlocksCommon; // ← дефолт: только общий набор

  if (m === 'enviro')  inputCategory = inputBlocksEnviro;
  else if (m === 'physio')  inputCategory = inputBlocksPhysio;
  else if (m === 'biochem') inputCategory = inputBlocksBioChem;
  else if (m === 'gensci')  inputCategory = inputBlocksGensci;
  // иначе остаётся inputBlocksCommon

  return {
    kind: 'categoryToolbox',
    contents: [
      inputCategory,
      ...commonCategories
    ]
  };
}
