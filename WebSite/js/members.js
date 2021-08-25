// メンバー一覧
const member_list = {
    "HexMyria"  : "Stella",
    "Kuroto17"  : "シルヴィア",
    "鮮血解体"   : "鮮血解体",
    'miriaku'   : "カレン・オリヴィア",
    "ロメーダ"   : "ロメーダ",
    "雪月夜　煌" : "カナリア",
    "暁の世界"   : "Reina",
    "○にくまん○" : "くまさん",
    "イチモーズモルト" : "イチ",
    "揮発性檸檬水" : "檸檬水",
    "KATH-TOR" : "かっちゃん",
    "ショウ＝クロー" : "月夜",
    "紅月レイ" : "ソフィ",
    "UJYOMO" : "ujyomo",
    "J'neruko" : "neruko",
    "RhymeSour." : "Rhyme",
    "りっしー" : "りっしー",
    "ミーコさん" : "ミーコ",
    "頭人形" : "Maeve",
    "ヤンカノ" : "ヤンカノ",
    "koh011583" : "マグロん",
    "xMeldy" : "メル",
    "Hex123" : "ケイ",
    "あぴせ" : "あぴせ",
    "イパルプア" : "イパルプア",
    "C.Rusticana" : "Cavalleria",
    "vlgil" : "粉ミルク",
    "かぷりっちおさん" : "Capricio"
};

// 変数
const members = [];


// class定義
class Member {
    constructor(_id, _name) {
        this.id = _id;
        this.name = _name;
        this.icon_src = setIconSrc(this.id);
        this.img_src = setImgSrc(this.id);
    }

    getIconSrc() { return this.icon_src; }
    getImgSrc() { return this.img_src; }
}

function setIconSrc(_id) {
    const dir_icon = "resources/members_icon/";
    return dir_icon + _id + '.png';
}

function setImgSrc(_id) {
    const dir_ss = "resources/members_ss/";
    return dir_ss + _id + '.png';
}


//-------------------------------------------------------------------------------------------------------
// メンバー一覧表示
// 
//-------------------------------------------------------------------------------------------------------
function changeToArray(_map) {
    Object.keys(_map).forEach((_key) => {
        members.push(new Member(_key, _map[_key]));
    });
}

function setUpTexts() {
    const str = [];
    str.push('<ul class="member_list">');
    members.forEach((_element) => {
        str.push('<li>' + _element.name + '</li>');
    });
    str.push('</ul>');
    return str;
}

function changeText(_target, _array) {
    _target.innerHTML = _array.join('');
}

// HTMLが読み込まれた時点で実行(画像を待たない)
$().ready(() => {
    changeToArray(member_list);
    changeText(document.getElementById("members"), setUpTexts());
})

//-------------------------------------------------------------------------------------------------------
// 画像処理
// 
//-------------------------------------------------------------------------------------------------------
let app = Object;
const textures = [];

function setUpPixi() {
    const pixi = new PIXI.Application({
        width : 400,
        height : 400,
        antialias : true,
        backgroundColor : 0x1099bb,
        resolution : window.devicePixcelRatio || 1,
    });
    
    app = pixi;
    document.getElementById("pixiView").appendChild(app.view);
}

function loadImgs(_path) {
    const texture = PIXI.Texture.from(_path);
    return texture;
}

function displayImg() {
    const container = new PIXI.Container();
    app.stage.addChild(container);

    const img = loadImgs(members[1].getImgSrc());
    const tex = new PIXI.Sprite(img);
    container.addChild(tex);

    container.x = app.screen.width / 2;
    container.y = app.screen.height / 2;
}

window.onload = (() => {
    setUpPixi();

    displayImg();
})

$(window).on("load resize", () => {
    app.renderer.resize(window.innerWidth - 16, 450);
    document.getElementById("pixiView").appendChild(app.view);
})

