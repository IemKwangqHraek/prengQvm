/* hraek自用拼音
 *
 * 參攷：
 *   切韻拼音
 *   https://zhuanlan.zhihu.com/p/478751152
 *   原作者 @unt
 *
 * https://github.com/IemKwangqHraek/prengQvm
 * @author hraek
 */

const is = (x) => 音韻地位.屬於(x);

if (!音韻地位) return [
  ['支B寫作C類',      true ], // 例: 糜(靡爲切) 開啓: mve,    關閉: mrie;
                              //     爲(薳支切) 開啓: ue,     關閉: rye.
  ['侵B寫作C類',      true ], // 例: 琴(巨金切) 開啓: gvm,    關閉: grim.
  ['宵B寫作C類',      true ], // 例: 囂(許嬌切) 開啓: hvew,   關閉: hriew.
  ['莊組庚韻歸二等',  true ], // 例: 生(所庚切) 開啓: sraeng, 關閉: sriaeng.
  ['蒸韻韻核視作i',   true ], // 例: 蒸(煑仍切) 開啓: tjing,  關閉: tjvng.
  ['東韻三A視作合口', false], // 例: 終(職戎切) 開啓: tyung,  關閉: tjung.
  ['尤韻三A視作合口', false], // 例: 猷(以周切) 開啓: yu,     關閉: iu.
];

// 特字特辦，避免麻煩
if (音韻地位.描述 === '云開三眞平') return 'ghen'; // 礥小韻
if (音韻地位.描述 === '匣合一灰上' && '倄侑'.includes(字頭)) return 'uoiq'; // 倄小韻
if (音韻地位.描述 === '並三陽上') return 'biangq'; // 𩦠小韻
if (音韻地位.描述 === '來開二庚上') return 'laengq'; // 冷小韻
if (音韻地位.描述 === '知開二庚上' && 字頭 === '打') return 'taengq'; // 打
if (音韻地位.描述 === '知開三麻平') return 'tiae'; // 爹
if (字頭 === '𠁫') return 'khriw'; // 𠁫

const is圓脣 = is('合口 或 虞鍾韻')                 ||
               (is('東韻') && 選項.東韻三A視作合口) ||
               (is('尤韻') && 選項.尤韻三A視作合口);

const is非三三等 = is('莊組 庚韻 三等') && 選項.莊組庚韻歸二等;

const is強制三A = is('章組 或 日以母');

const is翹舌聲母 = is('知莊組');

function get聲母() {
  let 聲母 = {
    幫: 'p',   滂: 'ph',   並: 'b',   明: 'm',
    端: 't',   透: 'th',   定: 'd',   泥: 'n',  來: 'l',
    知: 'tr',  徹: 'thr',  澄: 'dr',  孃: 'nr',
    見: 'k',   溪: 'kh',   羣: 'g',   疑: 'ng', 云: '',
    影: 'q',   曉: 'h',    匣: 'gh', 
    精: 'ts',  清: 'tsh',  從: 'dz',  心: 's',  邪: 'z',
    莊: 'tsr', 初: 'tshr', 崇: 'dzr', 生: 'sr', 俟: 'zr',
    章: 'tj',  昌: 'thj',  常: 'dj',  書: 'hj', 船: 'ghj', 日: 'nj', 以: 'i',
  }[音韻地位.母];
  // 章組自帶開合口信息
  return (is圓脣) ? 聲母.replace('j', 'y').replace('i', 'y') : 聲母;
}

function get韻() {
  // 爲了方便推導，對韻類稍作調整
  if (音韻地位.描述 === '影開三蒸入' && '抑𡊁𢬃𡊶'.includes(字頭) ||
      音韻地位.描述 === '溪開三蒸平') {
    return '冰'; // 抑、硱小韻歸B類
  }
  return 音韻地位.判斷([
    ['蒸韻 幫組 或 蒸韻 合口', '冰'],
    ['東韻 三等', '終'],
    ['清韻', '庚'],
    ['陽韻', '唐'],
    ['莊組 臻欣韻', '眞'],
    ['嚴凡韻 幫組', '凡'],
    ['嚴凡韻', '嚴'],
    ['', 音韻地位.韻],
  ]);
}

function get韻母() {
  const 韻到韻尾 = [
    ['脂之尤侯 　佳　模　 支魚虞 麻歌', ''],
    ['冰蒸終東 青耕登江冬 　　鍾 庚唐', 'ng', 'k'],
    ['　微微　 齊皆咍灰　 祭廢廢 夬泰', 'i'],
    ['眞欣文　 先山痕魂　 仙元元 刪寒', 'n', 't'],
    ['幽　　　 蕭　　　　 宵　　 肴豪', 'w'],
    ['侵　　　 添咸　覃　 鹽嚴凡 銜談', 'm', 'p'],
  ];
  const 元音列表 = [
    'i',       'v',  'u', 'ou',
    'e', 'e',  'o',  'o', 'ow',
    'e',       'vo', 'uo',
         'ae', 'a',
  ];

  let 韻 = get韻();
  let 元音;
  let 韻尾;
  韻到韻尾.some((item) => {
    if (item[0].includes(韻)) {
      元音 = 元音列表[item[0].replace(/ /g, '')[is('開口') ? 'indexOf' : 'lastIndexOf'](韻)];
      韻尾 = item[1 + is('入聲')];
      return true;
      }
    });

  if (is('三等') && !is非三三等) {
    // 添加三等C介音（僅歌陽韻需要處理）
    if (元音 === 'a') {
      元音 = (is('開口') ? 'v' : 'u') + 元音;
    }

    if (is強制三A && ['vo', 'uo', 'va', 'ua'].includes(元音)) {
      元音 = 元音.replace('v', '').replace('u', '');
    }
    // 添加三等A、B介音
    if (['i', 'e', 'ae'].includes(元音)) {
      if (is('重紐B類 或 云母 或 知莊組 或 庚蒸韻 或 幽韻 幫組') ||
        音韻地位.描述 === '曉三幽平' && '烋休𠇾'.includes(字頭) ||
        音韻地位.描述 === '溪三幽平') { // 烋、𠁫小韻歸 B 類
        if (選項.支B寫作C類 && is('支韻') && !is翹舌聲母) { 元音 = (is('合口') ? 'u' : 'v') + 元音; }
        else if (選項.侵B寫作C類 && is('侵韻') && !is翹舌聲母) { 元音 = 'v'; }
        else if (選項.宵B寫作C類 && is('宵韻') && !is翹舌聲母) { 元音 = 'v' + 元音; }
        else { 元音 = (is('合口') ? 'ry' : 'ri') + 元音; }
      } else if (!is強制三A) {
        // 拼莊組以外的銳音一律視爲A類（同《切韻》清韻、《廣韻》諄韻的獨立條件）
        // 章組和日以母已包含開合口及三等A類語義，故予以排除
        元音 = (is圓脣 ? 'y' : 'i') + 元音;
      }
    }
  }

  // 添加合口介音
  if (is('合口') && !元音.includes('u') && !元音.includes('y') && !is強制三A) 元音 = 'w' + 元音;
  // 添加二等介音
  if (is('二等')) 元音 = 'r' + 元音;
  // 清理連續重複的字母
  元音 = 元音.replace('ii', 'i');

  if (選項.蒸韻韻核視作i && is('蒸韻') && !元音.includes('r')) 元音 = 'i';
  
  return 元音 + 韻尾;
}

function get聲調() {
  return { 上: 'q', 去: 'h' }[音韻地位.聲] || '';
}

let result = get聲母() + (is('曉母 重紐A類 合口') ? '\'' : '') + get韻母() + get聲調();

// 清理連續重複的字母
result = result.replace('ii', 'i');
result = result.replace('yy', 'y');
result = result.replace('rr', 'r');

return result;