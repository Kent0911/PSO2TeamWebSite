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
const texture_info = {
    // id : [anchor.x, anchor.y, image.scale, translate.x, translate.y]
    "Kuroto17" : [0.5, 0.43, 0.4, 0, 360]
};

// 変数
let app = Object;
let container = Object;
let icon = Object;
let graphics = Object;
const member_SS = [];

function setUpPixi() {
    const pixi = new PIXI.Application({
        width : 400,
        height : 400,
        antialias : true,
        backgroundColor : 0xffffff,
        resolution : window.devicePixcelRatio || 1,
    });
    
    app = pixi;
    document.getElementById("pixiView").appendChild(app.view);
}

function setUpImg(_id) {
    const img = loadImgs(members[_id].getImgSrc());
    const tex = new PIXI.Sprite(img);
    tex.anchor.set(0.5, 0.43);
    tex.scale.x = 0.4;
    tex.scale.y = 0.4;
    member_SS.push(tex);
    app.stage.addChild(tex);
}

function setUpMask(_id) {
    container = new PIXI.Container();
    app.stage.addChild(container);
    
    icon = new PIXI.Sprite(loadImgs(members[_id].getIconSrc()));
    iconMask(container);
}

function fileCheck(_path) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", _path, false);
    xhr.send(null);
    return xhr.status;
}

function loadImgs(_path) {
    const texture = (fileCheck(_path) == 200 ? new PIXI.Texture.from(_path) : new PIXI.Texture.from("resources/no_image.png"));
    return texture;
}

function iconMask(_container) {
    const scale = 0.2;
    graphics = new PIXI.Graphics()
    .beginTextureFill({
        texture: icon.texture,
        matrix: new PIXI.Matrix(scale, 0, 0, scale, (icon.width * scale) / 2, (icon.height * scale) / 2 + 360)
    })
    .lineStyle(2, 0x000000)
    .moveTo(- app.renderer.width / 2 - 1, - app.renderer.height * 1.1 - 1)
    .lineTo(- app.renderer.width / 2 - 1, - app.renderer.height * 0.95)
    .lineTo(app.renderer.width / 2 + 1, - app.renderer.height * 0.65)
    .lineTo(app.renderer.width / 2 + 1, - app.renderer.height * 1.1 - 1)
    .lineTo(- app.renderer.width / 2 - 1, -app.renderer.height * 1.1 - 1)
    .closePath()
    .endFill();

    _container.addChild(graphics);
}

function resizeMask() {
    container.children.forEach((_element) => {
        if (_element == graphics) container.removeChild(graphics);
    });
    iconMask(container);
}

function setPivot(_target, _x, _y) {
    _target.pivot.x = _x;
    _target.pivot.y = _y;
}

function displayImg() {
    setPivot(app.stage,- app.renderer.width * 0.5, - app.renderer.height * 1.1);
    resizeMask();
}

function clickedName(event) {
    const li = event.target.parentNode.querySelectorAll("li");
    const number = Array.prototype.indexOf.call(li, event.target);

    setUpImg(number);
    setUpMask(number);
}

// HTMLが読み込まれた時点で実行(画像を待たない)
$().ready(() => {
    setUpPixi();
    setUpImg(0);
    setUpMask(0);
})

$(window).on("load resize", () => {
    if (navigator.userAgent.match(/iPhone | Android. + Mobile/)){

    } else {
        app.renderer.resize(window.innerWidth * 0.35, window.innerHeight * 0.6);
        document.getElementById("pixiView").appendChild(app.view);
    
        displayImg();
    }
})

