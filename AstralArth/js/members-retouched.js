// メンバー一覧
const member_names = {
    "HexMyria"  : "Stella",
    "Kuroto17"  : "シルヴィア",
    "鮮血解体"   : "鮮血解体",
    "miriaku"   : "カレン・オリヴィア",
    "ロメーダ"   : "ロメーダ",
    "雪月夜　煌" : "カナリア",
    "暁の世界"   : "Reina",
    "○にくまん○" : "くまさん",
    "イチモーズモルト" : "イチ",
    "揮発性檸檬水" : "檸檬水",
    "KATH-TOR" : "かっちゃん",
    "ショウ＝クロー" : "月夜",
    // "紅月レイ" : "ソフィ",
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
    "かぷりっちおさん" : "Capricio",
    "Moonwuzy" : "Dorogi"
};

// 変数
const members = [];


// member class定義
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
    str.push('<ul class="member_list" onClick="clickedName(event)">');
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
    changeToArray(member_names);
    changeText(document.getElementById("members"), setUpTexts());
})

//-------------------------------------------------------------------------------------------------------
// 画像処理
// 
//-------------------------------------------------------------------------------------------------------

// 定数
const LOADING_OK = 200;
const LOADING_ERROR = 404;
const RENDERER_WIDTH = 0.35;
const RENDERER_HEIGHT = 0.6;

const texture_info = {
    // id : [image.scale, anchor.x, anchor.y, icon.scale, translate.x, translate.y]
    "HexMria" : [0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    "Kuroto17" : [0.4, 0.5, 0.43, 0.2, 0, 420]
};

// 変数
let app = Object;
let container = Object;
let image = Object;
let icon = Object;
let display_number = 0;

function fileCheck(_path) {
    const xhr = new XMLHttpRequest();
    xhr
    .open("HEAD", _path, false)
    .send(null);
    return xhr.status;
}

// PIXI.js SetUps
function setUpPixi() {
    const pixi = new PIXI.Application({
        width : 400,
        height : 400,
        antialias : true,
        backgroundColor : 0xffffff,
        resolution : window.devicePixelRatio || 1,
    });

    app = pixi;
    document.getElementById("pixiView").appendChild(app.view);
}

function loadImgs(_path) {
    const texture = (fileCheck(_path) == LOADING_OK ? new PIXI.Texture.from(_path) : new PIXI.Texture.from("resources/no_image.png"));
    return texture;
}

function setUpImg(_id) {
    const tex_info = [texture_info[_id][0], texture_info[_id][1], texture_info[_id][2]];
    image = new PIXI.Sprite(loadImgs(members[_id].getImgSrc()));
    image
    .anchor.set(tex_info[1], tex_info[2])
    .scale.x = tex_info[0]
    .scale.y = tex_info[0];
    app.stage.addChild(image);
}

function resetImg(_id) {
    app.stage.children.forEach((_element) => {
        if (_element instanceof PIXI.Sprite) app.stage.removeChild(_element);
    });
    setUpImg(_id);
}

function setPivot(_target, _x, _y) {
    _target.pivot.x = _x;
    _target.pivot.y = _y;
}

function setUpMask(_id) {
    container = new PIXI.Container();
    app.stage.addChild(container);

    icon = new PIXI.Sprite(loadImgs(members[_id].getIconSrc()));
    iconMask(_id);
}

function iconMask(_id) {
    const scale = texture_info[_id][3];
    const translate = [texture_info[_id][4], texture_info[_id][5]];
    const graphics = new PIXI.Graphics()
    .beginTextureFill({
        texture : icon.texture,
        matrix : new PIXI.Matirx(scale, 0, 0, scale, (icon.width * scale) / 2 + translate[0], (icon.height * scale) / 2 + translate[1])
    })
    .moveTo(- app.renderer.width / 2 - 1, - app.renderer.height * 1.1 - 1)
    .lineTo(- app.renderer.width / 2 - 1, - app.renderer.height * 0.95)
    .lineTo(app.renderer.width / 2 + 1, - app.renderer.height * 0.65)
    .lineTo(app.renderer.width / 2 + 1, - app.renderer.height * 1.1 - 1)
    .lineTo(- app.renderer.width / 2 - 1, -app.renderer.height * 1.1 - 1)
    .closePath()
    .endFill();

    container.addChild(graphics);
}

function restMask(_id) {
    container.children.forEach((_element) => {
        if (_element instanceof PIXI.Graphics) container.removeChild(_element);
    });
    iconMask(display_number);
}

// ウィンドウ表示
$().ready(() => {
    setUpPixi();
    setUpImg(display_number);
    setUpMask(display_number);
})

$(window).on("load resize", () => {
    if (navigator.userAgment.match(/iPhone | Android. + Mobile/)) {

    } else {
        app.renderer.resize(window.innerWidth * RENDERER_WIDTH, window.innerHeight * RENDERER_HEIGHT);
        document.getElementById("pixiView").appendChild(app.view);

        setPivot(app.stage, -app.renderer.width * 0.5, -app.renderer.height * 1.1);
    }
})

function changeDisplayMember(event) {
    const li = event.target.parentNode.querySelectorAll("li");
    display_number = Array.prototype.indexOf.call(li, event.target);

    resetImg(display_number);
    restMask(display_number);
}