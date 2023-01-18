// import
import * as modal from './modal'

// 定数
const dirMemberJson = "managements/json/member.json"
const noImage = "resources/image/no_image.png"

// 変数
const members = [];

// member class定義
class Member {
    playerId;
    name;
    imgSrc;
    info;

    constructor(_playerId, _name, _info) {
        this.playerId = _playerId;
        this.name = _name;
        this.imgSrc = setImgSrc(this.playerId);
        this.info = _info;
    }

    getImgSrc() { return this.imgSrc; }
}

// メンバー詳細画面 Info Class定義
class Info {
    characterName;
    title;
    class;
    comment;
    twitter;
    youtube;
    questions();

    constructor(_characterName, _playerId, _title, _class, _comment, _twitter, _youtube, _questions) {
        this.characterName = _characterName;
        this.title = _title;
        this.comment = _comment;
        this.twitter = _twitter;
        this.youtube = _youtube;
        this.questions = _questions;
    }
}

function setImgSrc(_playerId) {
    const dir = "resources/image/";

    let pngPath = dir + _playerId + '.png';
    if (modal.fileCheck(pngPath)) return pngPath;
    
    let jpgPath = dir + _playerId + '.jpg';
    if (modal.fileCheck(jpgPath)) return jpgPath;

    return noImage;
}

function pushMemberInfo() {
    const jsonObject = JSON.parse(dirMemberJson);
}

function desployObjects() {
    const htmlStr = [];

    document.getElementById("members").innerHTML = htmlStr;
}