var broadcastId;
var userId;
var self = this;
this.peerId = uuidv4();
this.signalingWS = null;
var error = false;
var lastmoment = "";

var newFans = [];
var newInvites = [];
var subs = [];
var eventsToTrigger = [];

var userName = "UkuLuca";
var waitingbetweenanimations = 3;
//CONSTRUCTORS

//List of Subs


class AnimationStructure 
{
    //Picture with ending(e.g pic.jpg), Scalse  e.g. 0.5
  constructor(timeinsec,textbool,picbool,userpicbool,mainpos,textfont,textsize,text,textposx,textposy,picturename,pictureposx,pictureposy,picturewidthx,picturewidthy,picturescale,userpicposx,userpicposy,userpicscale,userId,textid)
    {
        this.timeinsec = timeinsec;
        this.textbool = textbool;
        this.picbool = picbool;
        this.userpicbool = userpicbool;
        this.mainpos = mainpos;
        this.textfont = textfont;
        this.textsize = textsize;
        this.text = text;
        this.textposx = textposx;
        this.textposy = textposy;
        this.picturename = picturename;
        this.pictureposx = pictureposx;
        this.pictureposy = pictureposy;
        this.picturewidthx = picturewidthx;
        this.picturewidthy = picturewidthy;
        this.picturescale = picturescale;
        this.userpicposx = userpicposx;
        this.userpicposy = userpicposy;
        this.userpicscale = userpicscale;
        this.userId = userId;
        this.textid = textid;
    }
}

class Event 
{
  constructor(category,name,id,inviteVal)
    {
    this.category = category;
    this.name = name;
    this.id = id;
    this.inviteVal = inviteVal;
    }
}

class Subscriber 
{
  constructor(name,link,amount,time,resx,resy,scale)
    {
    this.name = name;
    this.link = link;
    this.amount = amount;
    this.time = time;
    this.resx = resx;
    this.resy = resy;
    this.scale = scale;
    }
}

subs.push(new Subscriber("lieblingsluxus","img/lilu.gif",3,10,1280,720,1));
subs.push(new Subscriber("AnnaSunflower","img/anna.gif",3,10,500,261,2));
subs.push(new Subscriber("Princess_Buttercup","img/buttercup.gif",3,10,640,450,1.7));
subs.push(new Subscriber("zacrin","img/zac.gif",3,10,480,360,1.7));
subs.push(new Subscriber("J_Squared2020","img/squared.gif",3,10,356,200,3.2));
subs.push(new Subscriber("Chicken__Wings","img/chicken.gif",3,10,400,200,2.8));
subs.push(new Subscriber("JulieOliveMusic","img/julie.jpg",3,10,750,750,1.8));
subs.push(new Subscriber("Sanji-oker","img/sanj.gif",3,10,480,360,2));
subs.push(new Subscriber("Ashton_BieberMaagicHD","img/moist.gif",3,10,375,635,1.5));
subs.push(new Subscriber("Plucked.daisy","img/daisy.gif",3,10,200,110,6));
subs.push(new Subscriber("AllisonWHNP","img/alison.gif",3,10,640,640,1.5));
subs.push(new Subscriber("drain_","img/drain.gif",3,10,240,400,2.7));
subs.push(new Subscriber("ceeza","img/ceza.gif",3,10,342,676,1.4));
subs.push(new Subscriber("erica.mckenzie_humble","img/erica.gif",3,10,270,480,1.8));
subs.push(new Subscriber("Erica.McKenzie_Humble","img/erica.gif",3,10,270,480,1.8));
subs.push(new Subscriber("ThatBritishGuy","img/britguy.gif",3,10,480,468,1.2));
subs.push(new Subscriber("jdaly","img/jery.gif",3,10,480,270,2.2));
subs.push(new Subscriber("MysteryMusicalGal","img/mystery.png",3,10,529,657,1));
subs.push(new Subscriber("tomsyco","img/tom.png",3,10,547,659,1));
subs.push(new Subscriber("TomSyco","img/tom.png",3,10,547,659,1));







//CONSTRUCTS FOR ANIMATIONS
async function RunCode()
{
    FetchBroadcastId();
    CastEvents();
}


async function CastEvents()
{
    while(true)
    {
        console.log("STILL CHECKING");
        if(eventsToTrigger.length != 0)
        {
            var totrigger = eventsToTrigger.shift();
            var checker = false;
            var foundsub;
            console.log("we got in here");
            //Check how many times Sticker has been used
            for (var i = 0; i < subs.length; i++) {
                
                console.log("Subname checked " + subs[i].name);
                console.log("Trigger name checked " + totrigger.name);
                
                if(subs[i].name.localeCompare(totrigger.name) == 0)
                {
                    foundsub = subs[i];

                    if(subs[i].amount > 0)
                    {
                        checker = true;
                        subs[i].amount--;
                        console.log("Amount now: " + subs[i].amount);
                    }
                }
            }

            if(checker)
            {
                console.log("1" + foundsub.resx);
                console.log("2" + foundsub.resy);
                var InviteAnimation = new AnimationStructure(foundsub.time,false,true,false,"LowerRight",'"Times New Roman", Times, serif',25,0,80,20,foundsub.link,0,0,foundsub.resx,foundsub.resy,foundsub.scale,0,0,1,"12345",0);
                await Animation(InviteAnimation);
            }              
            
            await sleep(2000);
        }
        await sleep(2000);
    }
}



async function Retry()
{
    console.log("Retrying in 10 seconds");
    await sleep(10000);
    error = false;  
    FetchBroadcastId();
}

async function FetchBroadcastId()
{
    console.log("Fetching....");
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://api.younow.com/php/api/broadcast/info/curId=0/user=' + userName;
    var json = fetch(proxyUrl + targetUrl)
  .then(blob => blob.json())
  .then(data => {
    json = JSON.stringify(data, null, 2);
    var done = JSON.parse(json);
        if(json.length < 1)
        {
            console.log("No Data Found");
            error = true;
        }
        else
        {
            if(done.errorCode != 0)
            {
                console.log("User not online or not found");
                error = true;
            }

            if(error)
            {
                Retry();
                return;
            }
            userId = done.userId;
            broadcastId = done.broadcastId;
            console.log("Data Found");
            FetchData();
            return;
        }
  })
  .catch(e => {
    console.log("Some error occured");
    Retry();    
  });
}


function FetchData()
{

    console.log("Succesfully Connected");

	var pusher = new Pusher('d5b7447226fc2cd78dbb', {
        cluster: "younow"
    });
    var channel = pusher.subscribe("public-channel_" + userId);


    channel.bind('onPartnerSticker', function(data) {
        if(data.message != "undefined")
        {
            if(data.message.stageGifts[0].target == 7081785)
                AddSubStickerEvent(data.message.stageGifts[0].name);
        }
    });
}

function AddSubStickerEvent(name)
{
    console.log("Adds Sub event");
    var newEvent = new Event("Invite",name,"","");
    eventsToTrigger.push(newEvent); 
    console.log(eventsToTrigger[0].name);
}
var randomcolor = ['#EC4B13','#ECDC13','#16EC13','#13ECC5','#131AEC','#C513EC','#EC138D','#EC1313'];

function randomInt()
{
    return Math.floor(Math.random() * 7); 
}
async function Animation(animStruct)
{
    rancol = randomcolor[randomInt()];
    console.log("START");
    console.log(animStruct.resx);
    console.log(animStruct.resy);


    var WholeThing = document.createElement("div");
    WholeThing.id = "WholeThing";
    WholeThing.style.animation = 'moveup 2s';
    WholeThing.style.width  = "1280px"; 
    WholeThing.style.height = "720px";   

    if(animStruct.picbool)
    {
        console.log(animStruct);
        var Picture = document.createElement("div");
        Picture.id = "CustomPicture";
        Picture.style.position = "absolute";
        Picture.style.margin = "auto";
        Picture.style.top = "0";
        Picture.style.left = "0";
        Picture.style.right = "0";
        Picture.style.bottom = "0";
        Picture.style.width  = animStruct.picturewidthx + "px"; 
        Picture.style.height = animStruct.picturewidthy + "px";
        Picture.style.transform = "scale("+ animStruct.picturescale + ")";
        Picture.style.backgroundImage = "url(" +animStruct.picturename + ")"; 
        Picture.style.border = "thick solid " + rancol;

        WholeThing.appendChild(Picture);
    }
        document.getElementById("Container").appendChild(WholeThing);

    await sleep(animStruct.timeinsec * 1000);
   
    var all = document.getElementById("WholeThing");
    all.parentNode.removeChild(all);    

    console.log("DONE");
}

function AddTestSub(name)
{
     var newEvent = new Event("Invite",name,"","");
     eventsToTrigger.push(newEvent); 
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


Event.prototype.toString = function(){console.log("Event: " + this.category + " with Name: " + this.name + " with id: " + this.id + " with inviteVal: " + this.inviteVal);}

function sleep(milliseconds) { return new Promise(resolve => setTimeout(resolve, milliseconds)); }


function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}