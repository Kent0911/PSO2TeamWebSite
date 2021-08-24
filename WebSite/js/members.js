// メンバー一覧
const member_list = {
    'HexMyria'  : 'Stella',
    'Kuroto17'  : 'シルヴィア',
    '鮮血解体'   : '鮮血解体',
    'miriaku'   : 'カレン・オリヴィア',
    'ロメーダ'   : 'ロメーダ',
    '雪月夜　煌' : 'カナリア',
    '暁の世界'   : 'Reina',
    '○にくまん○' : 'くまさん',
    'イチモーズモルト' : 'イチ',
    '揮発性檸檬水' : '檸檬水',
    'KATH-TOR' : 'かっちゃん',
    'ショウ＝クロー' : '月夜',
    '紅月レイ' : 'ソフィ',
    'UJYOMO' : 'ujyomo',
    "J'neruko" : 'neruko',
    'RhymeSour.' : 'Rhyme',
    'りっしー' : 'りっしー',
    'ミーコさん' : 'ミーコ',
    '頭人形' : 'Maeve',
    'ヤンカノ' : 'ヤンカノ',
    'koh011583' : 'マグロん',
    'xMeldy' : 'メル',
    'Hex123' : 'リン',
    'あぴせ' : 'あぴせ',
    'イパルプア' : 'イパルプア',
    'C.Rusticana' : 'Callvaria',
    'vlgil' : '粉ミルク',
    'かぷりっちおさん' : 'Capricio'
};

// 変数
const members = [];


// class定義
class Member {
    constructor(_id, _name) {
        this.id = _id;
        this.name = _name;
        this.icon_src = getIconSrc(this.id);
        this.img_src = getImgSrc(this.id);
    }
}

function getIconSrc(_id) {
    const dir_icon = "resources/members_icon/";
    return dir_icon + _id + '.png';
}

function getImgSrc(_id) {
    const dir_ss = "resources/members_ss/";
    return dir_ss + _id + '.png';
}


//-------------------------------------------------------------------------------------------------------
// メンバー一覧表示
// 
//-------------------------------------------------------------------------------------------------------
function Members(_member_list) {
    Object.keys(_member_list).forEach((_key) => {
        members.push(new Member(_key, _member_list[_key]));
    });
}

function changeText(_target, _text) {
    _target.innerText = _text;
}

window.onload = () => {
    Members(member_list);
    changeText(document.getElementsByClassName("members"), members[0]);
}

//-------------------------------------------------------------------------------------------------------
// 画像処理
// 
//-------------------------------------------------------------------------------------------------------



