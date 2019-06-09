/**
 * Created by Andres Carmona Gil on 26/08/2015.
 */
'use strict';
//var FileTGD=require('./file/FileTGD')
//var Vu=require('./vu/vuBlock')
require('./lib/vu/size');
require('./lib/card/size');
var Vu=require('./lib/vu/vuBlock').vuBlock;
var Card=require('./lib/card/cardBlock').cardBlock
//var card=require('./lib/card/cardBlockTuned');
/*
 * module.exports
 * Export callback json of file tachograf
 */


function tgd(buffer){

    if(buffer[0]==0x76){
        var f=new Vu(buffer)
        card(buffer);
    }else{
        Card(buffer);
    }

}



function FileTGD(buffer){
    this.buffer=buffer;
}


module.exports = tgd;





