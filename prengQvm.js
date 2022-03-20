/* Hraek自用拼音方案
 *
 * https://zhuanlan.zhihu.com/p/483984744
 *
 * @author Hraek
 * 
 * 代碼參考：
 * unt切韻擬音J https://phesoca.com/aws/309/
 */

const is = (x) => 音韻地位.屬於(x);

// 選項
if (!音韻地位) return [
  ['支宵侵韻重紐爲AC類對立' , true ],
];

if (音韻地位.描述 === '云開三眞平') return 'ghin'; // 礥小韻
if (音韻地位.描述 === '匣合一灰上' && '倄侑'.includes(字頭)) return 'uoiq'; // 倄小韻
if (音韻地位.描述 === '並三陽上') return 'biangq'; // 𩦠小韻

// 音韻地位設置
const is脣化 = is('東韻 三等 或 合口 或 虞鍾韻');
const is三B = (is('重紐B類 或 庚臻韻')                  ||
              is('溪母 幽韻 平聲')                      || // “𠁫”小韻歸三 B
              is('云母 脂支祭眞臻仙宵麻庚清蒸幽侵鹽韻') || // 云母前元音韻歸三 B
              '抑𡊁烋'.includes(字頭)                   || // 蒸韻“抑𡊁”二字、幽韻“烋”字歸三 B
              (字頭 == '揭' && is('見母 仙韻'))         || // “孑”小韻的“揭”字歸三 B
              (is('蒸幽韻') && is('幫組 或 合口'))) &&
              !(選項.支宵侵韻重紐爲AC類對立 && is('支宵侵韻 重紐B類 或 云母 支宵侵韻'));
const is銳前 = is('端精組 或 來母 一二四等');
const is銳後 = is('知莊章組 或 日以母'); 
const is銳 = is銳前 || is銳後 || is('來母');  

function get聲母() {
  switch (音韻地位.母) {
    case '幫': return 'p';
    case '滂': return 'ph';
    case '並': return 'b';
    case '明': return 'm';
    case '端': return 't';
    case '透': return 'th';
    case '定': return 'd';
    case '泥': return 'n';
    case '知': return 'tr';
    case '徹': return 'thr';
    case '澄': return 'dr';
    case '孃': return 'nr';
    case '精': return 'ts';
    case '清': return 'tsh';
    case '從': return 'dz';
    case '心': return 's';
    case '邪': return 'z';
    case '莊': return 'tsr';
    case '初': return 'tshr';
    case '崇': return 'dzr';
    case '生': return 'sr';
    case '俟': return 'zr';
    case '章': return is脣化 ? 'ty'  : 'tj';
    case '昌': return is脣化 ? 'thy' : 'thj';
    case '常': return is脣化 ? 'dy'  : 'dj';
    case '書': return is脣化 ? 'hy'  : 'hj';
    case '船': return is脣化 ? 'ghy' : 'ghj';
    case '日': return is脣化 ? 'ny'  : 'nj';
    case '見': return 'k';
    case '溪': return 'kh';
    case '羣': return 'g';
    case '疑': return 'ng';
    case '影': return 'q';
    case '曉': return 'h';
    case '匣': return 'gh';
    case '云': return '';
    case '以': return is脣化 ? 'y' : 'i';
    case '來': return 'l';
    default: throw new Error('無聲母規則');
  }
}

function get介音() {
  if (is('云母 灰韻'))               return 'v';
  if (is('侯韻') || is('東韻 一等')) return 'o';
  if (is('一四等'))                  return is('合口') ? 'w' : '';
  if (is('二等') || is('庚韻 莊組')) return is('合口') ? 'rw' : 'r';
  if (is三B)                         return is('合口') ? 'ry' : 'ri';
  if (is('重紐A類 或 麻清幽韻'))     return is脣化 ? 'y' : 'i';
  return is脣化 || (is('幫組') && !is('支宵侵韻')) ? 'u' : 'v';
}

function get韻核() {
  if (is('之蒸侵欣微韻'))           return is脣化 && !is('蒸韻') ? 'u' : 'v';
  if (is('脂眞臻幽韻'))             return 'i';
  if (is('尤侯東文韻'))             return 'u';
  if (is('冬韻'))                   return 'ow'; 
  if (is('模登覃痕魂灰咍韻') ||
      is('魚虞鍾江嚴凡元廢韻'))     return 'o';
  if (is('青添先蕭齊韻') ||
      is('佳支耕鹽咸山仙宵皆祭韻')) return 'e';
  if (is('麻庚清銜刪肴夬韻'))       return 'ae';
  if (is('歌唐陽談寒豪泰韻'))       return 'a'; 
  throw new Error('無韻核規則');
}

function get韻尾() {
  if (is('梗曾攝'))       return is('入聲') ? 'k' : 'ng';
  if (is('通江宕攝'))     return is('入聲') ? 'k' : 'ng';
  if (is('深咸攝'))       return is('入聲') ? 'p' : 'm';
  if (is('臻山攝'))       return is('入聲') ? 't' : 'n';
  if (is('佳韻'))         return ''; // 從蟹攝中排除無韻尾的佳韻
  if (is('微韻 或 蟹攝')) return 'i';
  if (is('幽韻 或 效攝')) return 'w';
  return '';
}

const 前元音 = ['i', 'e', 'ae'];

function get聲調() {
  if (is('平聲')) return '';
  if (is('上聲')) return 'q';
  if (is('去聲')) return 'h';
  if (is('入聲')) return '';
  throw new Error('無聲調規則');
}

let 聲母 = get聲母();
let 隔音符號 = is('曉母 三等 重紐A類 合口') ? '\'' : '';
let 介音 = get介音();
let 韻核 = get韻核();
let 韻尾 = get韻尾();
let 聲調 = get聲調();

/**
 * 音韻調整
 */

if ((介音 == 'i' || 聲母.endsWith('j') || is銳) && 韻核 == 'v' && (韻尾 == 'm' || 韻尾 == 'n' || 韻尾 == 'p' || 韻尾 == 't'))
  韻核 = 'i';

if (is銳 && 前元音.includes(韻核)) {
  if (介音 == 'v') 介音 = 'i';
  if (介音 == 'u') 介音 = 'y';
}

if (介音 == 'v' && 'ui'.includes(韻核)) 介音 = '';

if (介音 == 'u' && 韻核 == 'i') 介音 = 'y';

if (介音 == 'u' && 韻核 == 'v' && !is('蒸韻')) 韻核 = 'u';

if (聲母.endsWith('r')) {
  if (介音 == 'v') 介音 = 'i';
  if (介音 == 'u') 介音 = 'y';
}

/**
 * 拼式簡化
 */

if (介音 == 韻核) 介音 = '';

if (聲母 == 介音) 介音 = '';

if (聲母.endsWith('r') && 介音.startsWith('r'))
  介音 = 介音.replace('r', '');

if (聲母.endsWith('i') || 聲母.endsWith('j') && 'vi'.includes(介音))
  介音 = '';

if (聲母.endsWith('y') && 'uy'.includes(介音))
  介音 = '';

if (韻核 == 'u' && 韻尾.startsWith('w'))
  韻尾 = 韻尾.replace('w', '');

if (介音.endsWith('i') && 韻核 == 'i')
  介音 = 介音.replace('i', '');

if (聲母 == 'i' && 韻核 == 'u') 聲母 = 'y';

if ('uv'.includes(韻核)) {
  if (介音.includes('i')) 介音 = 介音.replace('i', '');
  if (介音.includes('y') && 韻核 == 'u') 介音 = 介音.replace('y', '');
}

/**
 * 處理特例
 */

if (字頭 == '打' && is('庚韻')) {
  聲母 = 't';
  介音 = '';
}

if (音韻地位.描述 == '來開二庚上') 介音 = '';

let result = 聲母 + 隔音符號 + 介音 + 韻核 + 韻尾 + 聲調;

return result.replace('ii', 'i');