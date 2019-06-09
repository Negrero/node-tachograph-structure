/**
 * Created by negrero on 05/03/2016.
 */



require('./size')
require('../card/size')

var BCDtoString=require('../util/util').BCDtoString
var calibrationPurpose=require('../util/util').calibrationPurpose
var eventFaultRecordPurpose=require('../util/util').eventFaultRecordPurpose
var eventFaultType=require('../util/util').eventFaultType
var regionNumeric=require('../util/util').regionNumeric
var entryTypeDailyWorkPeriod=require('../util/util').entryTypeDailyWorkPeriod
var toBytesBitString=require('../util/util').toBytesBitString
var equipmentType=require('../util/util').equipmentType
var toBytesNumber=require('../util/util').toBytesNumber
var nationNumeric=require('../util/util').nationNumeric
/**
 *
 * @param b
 * @constructor
 */
module.exports.vuBlock=function VuBlock(f){
    this.resumen=null
    this.activity=[]
    this.eventFault=null
    this.speed=null
    this.technical=null

    var start=0
    while(start< f.length){
        if(f[start]==0x76){
            start++
            if(f[start]>0x00 && f[start]<0x006){
                switch (f[start]){
                    case 0x01:
                        this.resumen=new Resumen(f,start+1)
                        start=this.resumen.size-1
                        console.log("resumen")
                        break
                    case 0x02:
                        this.activity.push(new Activity(f,start+1))
                        start=this.activity[this.activity.length-1].size-1
                        console.log("activity")
                        break
                    case 0x03:
                        this.eventFault=new EventsFaults(f,start+1)
                        start=this.eventFault.size-1
                        console.log("event")
                        break
                    case 0x04:
                        this.speed=new Speed(f,start+1)
                        start=this.speed.size-1
                        console.log("speed")
                        break
                    case 0x05:
                        this.technical=new Technical(f,start+1)
                        start=this.technical.size-1
                        console.log("technical")
                        break
                }
            }
        }
        start++
    }
}


function Resumen(b,s){
    var start=s
    this.memberStateCertificate= b.slice(start,start+=size_vu.MEMBERSTATECERTIFICATE)
    this.VUcertificate= b.slice(start,start+=size_vu.VUCERTIFICATE)
    this.vehicleIdentificationNumber=String.fromCharCode.apply(null,b.slice(start,start+=size_vu.VEHICLEINDENTIFICATIONNUMBER))
    this.vehicleRegistrationIdentification={}
    this.vehicleRegistrationIdentification.vehicleRegistrationNation= nationNumeric(b.slice(start,start+=size_vu.VEHICLEREGISTRATIONNATION_TREP1))
    this.vehicleRegistrationIdentification.vehicleRegistrationNumber={}
    this.vehicleRegistrationIdentification.vehicleRegistrationNumber.codePage=(b.slice(start,start+=1))
    this.vehicleRegistrationIdentification.vehicleRegistrationNumber.vehicleNumber=String.fromCharCode.apply(null,(b.slice(start,start+=13))).trim()

    var n=toBytesNumber(b.slice(start,start+=size_vu.CURRENTDATETIME))*1000
    this.currentDateTime=new Date(n)
    n=toBytesNumber(b.slice(start,start+=size_vu.MINDOWNLOADLETIME))*1000
    this.minDownloableTime=new Date(n)
    n=toBytesNumber(b.slice(start,start+=size_vu.MAXDOWNLOADLETIME))*1000
    this.maxDonloadbleTime=new Date(n)
    this.cardSlotsStatus= b.slice(start,start+=size_vu.CARDSLOTSSTATUS)
    n=toBytesNumber(b.slice(start,start+=size_vu.DOWNLOADINGTIME))*1000
    this.downloadingTime=new Date(n)

    this.fullcardNumber={}
    this.fullcardNumber.cardType= equipmentType(b.slice(start,start+=size_card.CARDTYPE[0]))
    this.fullcardNumber.cardIssuingMemberState= nationNumeric(b.slice(start,start+=size_card.CARDISSUINGMEMBERSTATE[0]))
    this.fullcardNumber.cardNumber={}
    this.fullcardNumber.cardNumber.driverIdentification=String.fromCharCode.apply(null,b.slice(start,start+=14))
    this.fullcardNumber.cardNumber.drivercardReplacementIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))
    this.fullcardNumber.cardNumber.drivercardRenewalIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))
    this.companyOrWorkshopName_codePage= b.slice(start,start+=1)// code page companyOrWorkshopNmae
    this.companyOrWorkshopName=String.fromCharCode.apply(null,b.slice(start,start+=size_vu.COMPANYORWORKSHOPNAME-1)).trim()

    this.noOfLocks=toBytesNumber(b.slice(start,start+=size_vu.NOOFLOCKS))
    this.vuCompanyLocksRecords=[]
    for (var i = 0; i < this.noOfLocks; i++) {
        var vuCompanyLocksRecord = {
            lockInTime: "",
            lockOutTime: "",
            companyName: "",
            companyAddres: "",
            companyCardNumber: {
                cardType: "",
                cardIssuingMemberState: "",
                cardNumber: {
                    ownerIdentification: "",
                    cardConsecutiveIndex: "",
                    cardReplacementIndex: "",
                    cardRenewalIndex: ""
                }
            }
        }

        n = toBytesNumber(b.slice(start, start += size_vu.LOCKINTITME))*1000
        vuCompanyLocksRecord.lockInTime = new Date(n)
        n = toBytesNumber(b.slice(start, start += size_vu.LOCKOUTTIME))*1000
        vuCompanyLocksRecord.lockOutTime = new Date(n)
        var companyName_codePage = b.slice(start, start += 1)
        vuCompanyLocksRecord.companyName = String.fromCharCode.apply(null, b.slice(start, start += size_vu.COMPANYNAME-1)).trim()
        var companyAddres_codePage = b.slice(start, start += 1)
        vuCompanyLocksRecord.companyAddres = String.fromCharCode.apply(null, b.slice(start, start += size_vu.COMPANYADDRESS-1)).trim()
        vuCompanyLocksRecord.companyCardNumber.cardType = equipmentType(b.slice(start,start += size_card.CARDTYPE[0]))
        vuCompanyLocksRecord.companyCardNumber.cardIssuingMemberState=nationNumeric(b.slice(start,start+=size_card.CARDISSUINGMEMBERSTATE[0]))
        vuCompanyLocksRecord.companyCardNumber.cardNumber.ownerIdentification=String.fromCharCode.apply(null, b.slice(start, start += 13)).trim()
        vuCompanyLocksRecord.companyCardNumber.cardNumber.cardConsecutiveIndex=String.fromCharCode.apply(null, b.slice(start, start += 1)).trim()
        vuCompanyLocksRecord.companyCardNumber.cardNumber.cardReplacementIndex=String.fromCharCode.apply(null, b.slice(start, start += 1)).trim()
        vuCompanyLocksRecord.companyCardNumber.cardNumber.cardRenewalIndex=String.fromCharCode.apply(null, b.slice(start, start += 1)).trim()
        this.vuCompanyLocksRecords.push(vuCompanyLocksRecord)

    }

    this.noOfControls=toBytesNumber(b.slice(start,start+=size_vu.NOOFCONTROLS))
    this.vuControlActivityRecord=[]
    for (var i=0;i<this.noOfControls;i++){
        var vuControlActivityRecord={
            controlType:{
                c:"",
                v:"",
                p:"",
                d:""
            },
            controlTime:"",
            controlCardNumber:{
                cardType: "",
                cardIssuingMemberState: "",
                cardNumber: {
                    ownerIdentification: "",
                    cardConsecutiveIndex: "",
                    cardReplacementIndex: "",
                    cardRenewalIndex: ""
                }
            },
            downloadPeriodBeginTime:"",
            downloadPeriodEndTime:""
        }
        n=toBytesNumber(b.slice(start,start+=size_vu.CONTROLTYPE))
        vuControlActivityRecord.controlType.c=(n.toString(2)[0]==0)?"datos de la tarjeta no transferidos durante esta actividad de control":"datos de la tarjeta transferidos durante esta actividad de control";
        vuControlActivityRecord.controlType.v=(n.toString(2)[1]==0)?"datos de la VU no transferidos durante esta actividad de control":"datos de la VU transferidos durante esta actividad de control";
        vuControlActivityRecord.controlType.d=(n.toString(2)[2]==0)?"no se imprimen datos durante esta actividad de control":"se imprimen datos durante esta actividad de control";
        vuControlActivityRecord.controlType.p=(n.toString(2)[3]==0)?"no se visualizan datos durante esta actividad de control":"se visualizan datos durante esta actividad de control";
        n=toBytesNumber(b.slice(start,start+=size_vu.CONTROLTIME))*1000
        vuControlActivityRecord.controlTime=new Date(n)
        vuControlActivityRecord.controlCardNumber.cardType = equipmentType(b.slice(start,start += size_card.CARDTYPE[0]))
        vuControlActivityRecord.controlCardNumber.cardIssuingMemberState=nationNumeric(b.slice(start,start+=size_card.CARDISSUINGMEMBERSTATE[0]))
        vuControlActivityRecord.controlCardNumber.cardNumber.ownerIdentification=String.fromCharCode.apply(null, b.slice(start, start += 13)).trim()
        vuControlActivityRecord.controlCardNumber.cardNumber.cardConsecutiveIndex=String.fromCharCode.apply(null, b.slice(start, start += 1)).trim()
        vuControlActivityRecord.controlCardNumber.cardNumber.cardReplacementIndex=String.fromCharCode.apply(null, b.slice(start, start += 1)).trim()
        vuControlActivityRecord.controlCardNumber.cardNumber.cardRenewalIndex=String.fromCharCode.apply(null, b.slice(start, start += 1)).trim()
        n=toBytesNumber(b.slice(start,start+=size_vu.DOWNLOADPERIODBEGINTIME))*1000
        vuControlActivityRecord.downloadPeriodBeginTime=new Date(n)
        n=toBytesNumber(b.slice(start,start+=size_vu.DOWNLOADPERIODENDTIME))*1000
        vuControlActivityRecord.downloadPeriodEndTime=new Date(n)
        this.vuControlActivityRecord.push(vuControlActivityRecord)

    }
    this.signature= b.slice(start,start+=size_vu.SIGNATURE_TREP1)
    this.size=start
}

function Activity(b,s){
    var start=s
    var n=toBytesNumber(b.slice(start,start+=size_vu.TIMEREAL))*1000
    this.timeReal=new Date(n)

    this.OdometerValueMidnight=toBytesNumber(b.slice(start,start+=size_vu.ODOMETERVALUEMINDNIGHT))

    this.noOfIWRecords=toBytesNumber(b.slice(start,start+=size_vu.NOOFVUCARDIWRECORDS))

    this.vuCardIWData=[]
    for (var i=0;i<this.noOfIWRecords;i++){
        var vuCardIWData={
            cardHolderName:{
                holderSurname:"",
                holderFirstName:""
            },
            fullCardNumber:{
                cardType:"",
                cardIssuingMemberState:"",
                cardNumber:{
                    driverIdentification:"",
                    drivercardReplacementIndex:"",
                    drivercardRenewalIndex:""
                }
            },
            cardExpiryDate:"",
            cardInsertionTime:"",
            vehicleOdometerValueAtInsertion:"",
            cardSlotNumber:"",
            cardWithdrawalTime:"",
            vehicleOdometerValueAtWithdrawal:"",
            previousVehicleInfo:{
                vehicleRegistrationIdentification:{
                    vehicleRegistrationNation:"",
                    vehicleRegistrationNumber:""
                },
                cardWithdrawalTime:""
            },
            manualInputFlag:"",
        }
        var cardHolderName_surname_codePage= b.slice(start,start+=1)
        vuCardIWData.cardHolderName.holderSurname=String.fromCharCode.apply(null, b.slice(start, start += size_vu.HOLDERSURNAME-1)).trim()
        var cardHolderName_name_codePage= b.slice(start,start+=1)
        vuCardIWData.cardHolderName.holderFirstName=String.fromCharCode.apply(null,b.slice(start,start+=size_vu.HOLDERFIRSTNAMES-1)).trim()
        vuCardIWData.fullCardNumber.cardType= equipmentType(b.slice(start,start+=size_card.CARDTYPE[0]))
        vuCardIWData.fullCardNumber.cardIssuingMemberState= nationNumeric(b.slice(start,start+=size_card.CARDISSUINGMEMBERSTATE[0]))
        vuCardIWData.fullCardNumber.cardNumber={}
        vuCardIWData.fullCardNumber.cardNumber.driverIdentification=String.fromCharCode.apply(null,b.slice(start,start+=14))
        vuCardIWData.fullCardNumber.cardNumber.drivercardReplacementIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))
        vuCardIWData.fullCardNumber.cardNumber.drivercardRenewalIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))
        n=toBytesNumber(b.slice(start,start+=size_vu.CARDEXPIRYTDATE))*1000
        vuCardIWData.cardExpiryDate=new Date(n)
        n=toBytesNumber(b.slice(start,start+=size_vu.CARDINSERTIONTIME))*1000
        vuCardIWData.cardInsertionTime=new Date(n)
        vuCardIWData.vehicleOdometerValueAtInsertion=toBytesNumber(b.slice(start,start+=size_vu.VEHICLEODOMETERVALUEATINSERTION))
        n=toBytesNumber(b.slice(start,start+=size_vu.CARDSLOTNUMBER))
        vuCardIWData.cardSlotNumber=(n==0)?"driverSlot (0)":"co-driverSlot (1)"
        n=toBytesNumber(b.slice(start,start+=size_vu.CARDWITHDRAWALTIME_VUCARDWDATA))*1000
        vuCardIWData.cardWithdrawalTime=new Date(n)
        vuCardIWData.vehicleOdometerValueAtWithdrawal=toBytesNumber(b.slice(start,start+=size_vu.VEHICLEODOMETERVALUEATWITHDRAWAL))
        vuCardIWData.previousVehicleInfo.vehicleRegistrationIdentification.vehicleRegistrationNation=nationNumeric(b.slice(start,start+=size_card.VEHICLEREGISTRATIONNATION[0]))
        var vehicleRegistrationNumber = b.slice(start,start+=1)
        vuCardIWData.previousVehicleInfo.vehicleRegistrationIdentification.vehicleRegistrationNumber=String.fromCharCode.apply(null,b.slice(start,start+=size_card.VEHICLEREGISTRATIONNUMBER[0]-1))
        n=toBytesNumber(b.slice(start,start+=size_vu.CARDWITHDRAWALTIME_VUCARDWDATA))*1000
        vuCardIWData.cardWithdrawalTime=new Date(n)
        n=toBytesNumber(b.slice(start,start+=size_vu.MANUALINPUTFLAG))
        vuCardIWData.manualInputFlag=(n==0)?"noEntry (0)":"manualEntries (1)"
        this.vuCardIWData.push(vuCardIWData)

    }

    this.noOfActivityChanges=toBytesNumber(b.slice(start,start+=size_vu.NOOFACTIVITYCHANGES))
    this.vuActivityDailyData=[]
    for (var i=0;i<this.noOfActivityChanges;i++){
        var activityChangeInfo={
            s:"",
            c:"",
            p:"",
            aa:"",
            t:"",
            from:""
        }

        n=toBytesBitString(b.slice(start,start+=size_card.ACTIVITYCHANGEINFO[0]))


        activityChangeInfo.s = (n[0]==0)?"conductor":"segundo conductor";
        activityChangeInfo.c = (n[1]==0)?"solitario":"equipo";
        activityChangeInfo.p = (n[2]==0)?"insertada":"no insertada";
        switch (n.toString(2)[3]+n.toString(2)[4]){
            case "00": activityChangeInfo.aa="PAUSA/DESCANSO";break;
            case "01": activityChangeInfo.aa="DISPONIBILIDAD";break;
            case "10": activityChangeInfo.aa="TRABAJO";break;
            case "11": activityChangeInfo.aa="CONDUCCIÓN";break;
        }
        activityChangeInfo.t=parseInt(n.slice(5,15),2)
        activityChangeInfo.from =new Date(this.timeReal.getTime()+(activityChangeInfo.t*60*1000))
        if(this.vuActivityDailyData.length>0){
            this.vuActivityDailyData[this.vuActivityDailyData.length-1].to=activityChangeInfo.from
            //minutes
            this.vuActivityDailyData[this.vuActivityDailyData.length-1].duration=((this.vuActivityDailyData[this.vuActivityDailyData.length-1].to.getTime()- // minutes
                this.vuActivityDailyData[this.vuActivityDailyData.length-1].from.getTime())/1000)/60
        }

        this.vuActivityDailyData.push(activityChangeInfo)

    }

    this.noOfPlaceRecords = toBytesNumber(b.slice(start,start+=size_vu.NOOFPLACERECORDS))
    this.vuPlaceDailyWorkPeriodData=[]
    for (var i=0;i<this.noOfPlaceRecords;i++){
        var vuPlaceDailyWorkPeriodRecord={
            fullCardNumber:{
                cardType:"",
                cardIssuingMemberState:"",
                cardNumber:{
                    driverIdentification:"",
                    drivercardReplacementIndex:"",
                    drivercardRenewalIndex:""
                }
            },
            placeRecord:{
                entryTime:"",
                entryTypeDailyWorkPeriod:"",
                dailyWorkPeriodCountry:"",
                dailyWorkPeriodRegion:"",
                vehicleOdometerValue:""
            }
        }
        vuPlaceDailyWorkPeriodRecord.fullCardNumber.cardType= equipmentType(b.slice(start,start+=size_card.CARDTYPE[0]))
        vuPlaceDailyWorkPeriodRecord.fullCardNumber.cardIssuingMemberState= nationNumeric(b.slice(start,start+=size_card.CARDISSUINGMEMBERSTATE[0]))
        vuPlaceDailyWorkPeriodRecord.fullCardNumber.cardNumber.driverIdentification=String.fromCharCode.apply(null,b.slice(start,start+=14))
        vuPlaceDailyWorkPeriodRecord.fullCardNumber.cardNumber.drivercardReplacementIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))
        vuPlaceDailyWorkPeriodRecord.fullCardNumber.cardNumber.drivercardRenewalIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))
        n=toBytesBitString(b.slice(start,start+=size_vu.ENTRYTIME_PLACERECORD))*1000
        vuPlaceDailyWorkPeriodRecord.placeRecord.entryTime=new Date(n)
        vuPlaceDailyWorkPeriodRecord.placeRecord.entryTypeDailyWorkPeriod=entryTypeDailyWorkPeriod(b.slice(start,start+=size_vu.ENTRYTYPEDAILYWORKPERIOD))
        vuPlaceDailyWorkPeriodRecord.placeRecord.dailyWorkPeriodCountry=nationNumeric(b.slice(start,start+=size_vu.DAILYWORKPERIODCOUNTRY))
        vuPlaceDailyWorkPeriodRecord.placeRecord.dailyWorkPeriodRegion= regionNumeric(b.slice(start,start+=size_vu.DAILYWORKPERIODREGION))
        vuPlaceDailyWorkPeriodRecord.placeRecord.vehicleOdometerValue=toBytesNumber(b.slice(start,start+=size_card.VEHICLEODOMETERVALUE[0]))
        this.vuPlaceDailyWorkPeriodData.push(vuPlaceDailyWorkPeriodRecord)
    }
    this.noOfSpecificConditionRecords=toBytesNumber(b.slice(start,start+=size_vu.NOOFSPECIFICCONDITIONSRECORDS))
    this.vuSpecificConditionData=[]
    for (var i = 0; i < this.noOfSpecificConditionRecords; i++) {
        var specificConditionRecord = {
            entryTime: "",
            specificConditionType: ""
        }
        n=toBytesNumber(b.slice(start,start+=size_vu.ENTRYTIME_SPECIFICCIONDITIONRECORD))*1000
        specificConditionRecord.entryTime=new Date(n)
        var str
        switch (toBytesBitString(b.slice(start,start+=size_vu.SPECIFICCONDITIONTYPE))){
            case 0: str="RFU"; break;
            case 1: str="Fuera de ambito-Comienzo";break;
            case 2: str="Fuera de ambito-Final";break;
            case 3: str="Puente/Paso a nivel";break;
            default: str="RFU";
        }
        specificConditionRecord.specificConditionType=str
        this.vuSpecificConditionData.push(specificConditionRecord)
    }

    this.signature= b.slice(start,start+=size_vu.SIGNATURE_TREP2)
    this.size=start
}

function EventsFaults(b,s){
    var start=s
    var n
    this.noOfVuFaults=toBytesNumber(b.slice(start,start+=size_vu.NOOFVUFAULTS))
    this.vuFaultData=[]
    for(var i=0;i<this.noOfVuFaults;i++){
        var vuFaultRecord={
            fualType:"",
            faultRecordPurpose:"",
            faultBeginTime:"",
            faultEndTime:"",
            cardNumberDriverSlotBegin:{ cardType:"",
                cardIssuingMemberState:"",
                cardNumber:{
                    driverIdentification:"",
                    drivercardReplacementIndex:"",
                    drivercardRenewalIndex:""
                }},
            cardNumberCoDriverSlotBegin:{ cardType:"",
                cardIssuingMemberState:"",
                cardNumber:{
                    driverIdentification:"",
                    drivercardReplacementIndex:"",
                    drivercardRenewalIndex:""
                }},
            cardNumberDriverSlotEnd:{ cardType:"",
                cardIssuingMemberState:"",
                cardNumber:{
                    driverIdentification:"",
                    drivercardReplacementIndex:"",
                    drivercardRenewalIndex:""
                }},
            cardNumberCoDriverSlotEnd:{ cardType:"",
                cardIssuingMemberState:"",
                cardNumber:{
                    driverIdentification:"",
                    drivercardReplacementIndex:"",
                    drivercardRenewalIndex:""
                }}
        }
        vuFaultRecord.fualType=eventFaultType(b.slice(start,start+=size_vu.FAULTTYPE))
        vuFaultRecord.faultRecordPurpose= eventFaultRecordPurpose(b.slice(start,start+=size_vu.FAULTRECORDPURPOSE))
        n=toBytesNumber(b.slice(start,start+=size_vu.FAULTBEGINTIME))*1000
        vuFaultRecord.faultBeginTime=new Date(n)
        n=toBytesNumber(b.slice(start,start+=size_vu.FAULTENDTIME))*1000
        vuFaultRecord.faultEndTime= new Date(n)

        vuFaultRecord.cardNumberDriverSlotBegin.cardType= equipmentType(b.slice(start,start+=size_card.CARDTYPE[0]))
        vuFaultRecord.cardNumberDriverSlotBegin.cardIssuingMemberState= nationNumeric(b.slice(start,start+=size_card.CARDISSUINGMEMBERSTATE[0]))
        vuFaultRecord.cardNumberDriverSlotBegin.driverIdentification=String.fromCharCode.apply(null,b.slice(start,start+=14))
        vuFaultRecord.cardNumberDriverSlotBegin.drivercardReplacementIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))
        vuFaultRecord.cardNumberDriverSlotBegin.drivercardRenewalIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))

        vuFaultRecord.cardNumberCoDriverSlotBegin.cardType= equipmentType(b.slice(start,start+=size_card.CARDTYPE[0]))
        vuFaultRecord.cardNumberCoDriverSlotBegin.cardIssuingMemberState= nationNumeric(b.slice(start,start+=size_card.CARDISSUINGMEMBERSTATE[0]))
        vuFaultRecord.cardNumberCoDriverSlotBegin.driverIdentification=String.fromCharCode.apply(null,b.slice(start,start+=14))
        vuFaultRecord.cardNumberCoDriverSlotBegin.drivercardReplacementIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))
        vuFaultRecord.cardNumberCoDriverSlotBegin.drivercardRenewalIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))

        vuFaultRecord.cardNumberDriverSlotEnd.cardType= equipmentType(b.slice(start,start+=size_card.CARDTYPE[0]))
        vuFaultRecord.cardNumberDriverSlotEnd.cardIssuingMemberState= nationNumeric(b.slice(start,start+=size_card.CARDISSUINGMEMBERSTATE[0]))
        vuFaultRecord.cardNumberDriverSlotEnd.driverIdentification=String.fromCharCode.apply(null,b.slice(start,start+=14))
        vuFaultRecord.cardNumberDriverSlotEnd.drivercardReplacementIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))
        vuFaultRecord.cardNumberDriverSlotEnd.drivercardRenewalIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))

        vuFaultRecord.cardNumberCoDriverSlotEnd.cardType= equipmentType(b.slice(start,start+=size_card.CARDTYPE[0]))
        vuFaultRecord.cardNumberCoDriverSlotEnd.cardIssuingMemberState= nationNumeric(b.slice(start,start+=size_card.CARDISSUINGMEMBERSTATE[0]))
        vuFaultRecord.cardNumberCoDriverSlotEnd.driverIdentification=String.fromCharCode.apply(null,b.slice(start,start+=14))
        vuFaultRecord.cardNumberCoDriverSlotEnd.drivercardReplacementIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))
        vuFaultRecord.cardNumberCoDriverSlotEnd.drivercardRenewalIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))

        this.vuFaultData.push(vuFaultRecord)
    }

    this.noOfVuEvents=toBytesNumber(b.slice(start,start+=size_vu.NOOFVUEVENTS))
    this.vuEventDate=[]
    for(var i=0;i<this.noOfVuEvents;i++){
        var vuEventRecord = {
            eventType: "",
            eventRecordPurpose: "",
            eventBeginTime: "",
            eventtEndTime: "",
            cardNumberDriverSlotBegin: {
                cardType: "",
                cardIssuingMemberState: "",
                driverIdentification: "",
                drivercardReplacementIndex: "",
                drivercardRenewalIndex: ""
            },
            cardNumberCoDriverSlotBegin: {
                cardType: "",
                cardIssuingMemberState: "",
                driverIdentification: "",
                drivercardReplacementIndex: "",
                drivercardRenewalIndex: ""
            },
            cardNumberDriverSlotEnd: {
                cardType: "",
                cardIssuingMemberState: "",
                driverIdentification: "",
                drivercardReplacementIndex: "",
                drivercardRenewalIndex: ""
            },
            cardNumberCoDriverSlotEnd: {
                cardType: "",
                cardIssuingMemberState: "",
                driverIdentification: "",
                drivercardReplacementIndex: "",
                drivercardRenewalIndex: ""
            },
            similarEventsNumber:""
        }
        vuEventRecord.eventType=eventFaultType(b.slice(start,start+=size_vu.EVENTTYPE))
        vuEventRecord.eventRecordPurpose= eventFaultRecordPurpose(b.slice(start,start+=size_vu.EVENTRECORDPURPOSE))
        n=toBytesNumber(b.slice(start,start+=size_vu.EVENTBEGINTIME))*1000
        vuEventRecord.eventBeginTime=new Date(n)
        n=toBytesNumber(b.slice(start,start+=size_vu.EVENTENDTIME))*1000
        vuEventRecord.eventEndTime= new Date(n)

        vuEventRecord.cardNumberDriverSlotBegin.cardType= equipmentType(b.slice(start,start+=size_card.CARDTYPE[0]))
        vuEventRecord.cardNumberDriverSlotBegin.cardIssuingMemberState= nationNumeric(b.slice(start,start+=size_card.CARDISSUINGMEMBERSTATE[0]))
        vuEventRecord.cardNumberDriverSlotBegin.driverIdentification=String.fromCharCode.apply(null,b.slice(start,start+=14))
        vuEventRecord.cardNumberDriverSlotBegin.drivercardReplacementIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))
        vuEventRecord.cardNumberDriverSlotBegin.drivercardRenewalIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))

        vuEventRecord.cardNumberCoDriverSlotBegin.cardType= equipmentType(b.slice(start,start+=size_card.CARDTYPE[0]))
        vuEventRecord.cardNumberCoDriverSlotBegin.cardIssuingMemberState= nationNumeric(b.slice(start,start+=size_card.CARDISSUINGMEMBERSTATE[0]))
        vuEventRecord.cardNumberCoDriverSlotBegin.driverIdentification=String.fromCharCode.apply(null,b.slice(start,start+=14))
        vuEventRecord.cardNumberCoDriverSlotBegin.drivercardReplacementIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))
        vuEventRecord.cardNumberCoDriverSlotBegin.drivercardRenewalIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))

        vuEventRecord.cardNumberDriverSlotEnd.cardType= equipmentType(b.slice(start,start+=size_card.CARDTYPE[0]))
        vuEventRecord.cardNumberDriverSlotEnd.cardIssuingMemberState= nationNumeric(b.slice(start,start+=size_card.CARDISSUINGMEMBERSTATE[0]))
        vuEventRecord.cardNumberDriverSlotEnd.driverIdentification=String.fromCharCode.apply(null,b.slice(start,start+=14))
        vuEventRecord.cardNumberDriverSlotEnd.drivercardReplacementIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))
        vuEventRecord.cardNumberDriverSlotEnd.drivercardRenewalIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))

        vuEventRecord.cardNumberCoDriverSlotEnd.cardType= equipmentType(b.slice(start,start+=size_card.CARDTYPE[0]))
        vuEventRecord.cardNumberCoDriverSlotEnd.cardIssuingMemberState= nationNumeric(b.slice(start,start+=size_card.CARDISSUINGMEMBERSTATE[0]))
        vuEventRecord.cardNumberCoDriverSlotEnd.driverIdentification=String.fromCharCode.apply(null,b.slice(start,start+=14))
        vuEventRecord.cardNumberCoDriverSlotEnd.drivercardReplacementIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))
        vuEventRecord.cardNumberCoDriverSlotEnd.drivercardRenewalIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))

        vuEventRecord.similarEventsNumber=toBytesNumber(b.slice(start,start+=size_vu.SIMILAREVENTSNUMBER))
        this.vuEventDate.push(vuEventRecord)
    }

    this.vuOverSpeedingControlData={}
    n=toBytesNumber(b.slice(start,start+=size_vu.LASTOVERSPEEDCONTROLTIME))*1000
    this.vuOverSpeedingControlData.lastOverspeedControlTime=new Date(n)
    n=toBytesNumber(b.slice(start,start+=size_vu.FIRSTOVERSPEEDSINCE))*1000
    this.vuOverSpeedingControlData.firstOverspeedSince=new Date(n)
    this.vuOverSpeedingControlData.numberOfOverspeedSince = toBytesNumber(b.slice(start,start+=size_vu.NUMBEROFOVERSPEEDSINCE))

    this.noOfVuOverSpeedingEvents=toBytesNumber(b.slice(start,start+=size_vu.NOOFVUOVERSPEEDINGEVENTS))
    this.vuOverSpeedingEventData=[]
    for(var i=0;i<this.noOfVuOverSpeedingEvents;i++){
        var vuOverSpeedingEventRecord = {
            eventType: "",
            eventRecordPurpose: "",
            eventBeginTime: "",
            eventEndTime: "",
            maxSpeedValue: "",
            averageSpeedValue: "",
            cardNumberDriverSlotBegin: {
                cardType: "",
                cardIssuingMemberState: "",
                driverIdentification: "",
                drivercardReplacementIndex: "",
                drivercardRenewalIndex: ""

            },
            similarEventsNumber: ""
        }
        vuOverSpeedingEventRecord.eventType=eventFaultType(b.slice(start,start+=size_vu.EVENTTYPE_VUOVERSPEED))
        vuOverSpeedingEventRecord.eventRecordPurpose= eventFaultRecordPurpose(b.slice(start,start+=size_vu.EVENTRECORDPURPOSE_VUOVERSPEED))
        n=toBytesNumber(b.slice(start,start+=size_vu.EVENTBEGINTIME_VUOVERSPEED))*1000
        vuOverSpeedingEventRecord.eventBeginTimeBeginTime=new Date(n)
        n=toBytesNumber(b.slice(start,start+=size_vu.EVENTENDTIME_VUOVERSPEED))*1000
        vuOverSpeedingEventRecord.eventEndTime= new Date(n)
        vuOverSpeedingEventRecord.maxSpeedValue=toBytesNumber(b.slice(start,start+=size_vu.MAXSPEEDVALUE))
        vuOverSpeedingEventRecord.averageSpeedValue=toBytesNumber(b.slice(start,start+=size_vu.AVARAGESPEEDVALUE))

        vuOverSpeedingEventRecord.cardNumberDriverSlotBegin.cardType= equipmentType(b.slice(start,start+=size_card.CARDTYPE[0]))
        vuOverSpeedingEventRecord.cardNumberDriverSlotBegin.cardIssuingMemberState= nationNumeric(b.slice(start,start+=size_card.CARDISSUINGMEMBERSTATE[0]))
        vuOverSpeedingEventRecord.cardNumberDriverSlotBegin.driverIdentification=String.fromCharCode.apply(null,b.slice(start,start+=14))
        vuOverSpeedingEventRecord.cardNumberDriverSlotBegin.drivercardReplacementIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))
        vuOverSpeedingEventRecord.cardNumberDriverSlotBegin.drivercardRenewalIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))
        vuOverSpeedingEventRecord.similarEventsNumber=toBytesNumber(b.slice(start,start+=size_vu.SIMILAREVENTSNUMBER))
        this.vuOverSpeedingEventData.push(vuOverSpeedingEventRecord)
    }

    this.noOfVuTimeAdjRecords= toBytesNumber(b.slice(start,start+=size_vu.NOOFVUTIMEADJRECORDS))
    this.vuTimeAdjustmentData=[]
    for(var i=0;i<this.noOfVuTimeAdjRecords;i++){
        var vuTimeAdjustmentRecord={
            oldTimeValue:"",
            newTimeValue:"",
            workshopName:"",
            workshopAddress:"",
            workshopCardNumber:{
                cardType: "",
                cardIssuingMemberState: "",
                driverIdentification: "",
                drivercardReplacementIndex: "",
                drivercardRenewalIndex: ""
            }
        }
        n=toBytesNumber(b.slice(start,start+=size_vu.OLDTIMEVALUE_VUTIMEADJUSTMENTDATA))*1000
        vuTimeAdjustmentRecord.oldTimeValue=new Date(n)
        n=toBytesNumber(b.slice(start,start+=size_vu.NEWTIMEVALUE_VUTIMEADJUSTMENTDATA))*1000
        vuTimeAdjustmentRecord.newTimeValue=new Date(n)
        var workshopName_codePage= b.slice(start,start+=1)
        vuTimeAdjustmentRecord.workshopName=String.fromCharCode.apply(null, b.slice(start,start+=size_vu.WORKSHOPNAME_VUTIMEADJUSTMENTADATA-1))
        var workshopAddress_codePage= b.slice(start,start+=1)
        vuTimeAdjustmentRecord.workshopAddress=String.fromCharCode.apply(null, b.slice(start,start+=size_vu.WORKSHOPADDRESS_VUTIMEADJUSTMENTADATA-1))
        vuTimeAdjustmentRecord.workshopCardNumber.cardType= equipmentType(b.slice(start,start+=size_card.CARDTYPE[0]))
        vuTimeAdjustmentRecord.workshopCardNumber.cardIssuingMemberState= nationNumeric(b.slice(start,start+=size_card.CARDISSUINGMEMBERSTATE[0]))
        vuTimeAdjustmentRecord.workshopCardNumber.driverIdentification=String.fromCharCode.apply(null,b.slice(start,start+=14))
        vuTimeAdjustmentRecord.workshopCardNumber.drivercardReplacementIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))
        vuTimeAdjustmentRecord.workshopCardNumber.drivercardRenewalIndex=String.fromCharCode.apply(null,b.slice(start,start+=1))
        vuTimeAdjustmentRecord.similarEventsNumber=toBytesNumber(b.slice(start,start+=size_vu.SIMILAREVENTSNUMBER))
        this.vuTimeAdjustmentData.push(vuTimeAdjustmentRecord)
    }

    this.signature= b.slice(start,start+=size_vu.SIGNATURE_TREP3)
    this.size=start
}

function Speed(b,s){
    var start=s
    var n
    this.noOfSpeedBlocks=toBytesNumber(b.slice(start,start+=size_vu.NOOFSPEEDBLOCKS))
    this.vuDetailedData=[]
    for(var i=0;i<this.noOfSpeedBlocks;i++){
        var vuDetailedSpeedBlock={
            speedsPerSecond:[],
            speedBlockBeginDate:"",
            speedMedia:""
        }
        n=toBytesNumber(b.slice(start,start+=size_vu.SPEEDBLOCKBEGINDATE))*1000
        vuDetailedSpeedBlock.speedBlockBeginDate=new Date(n)
        var sum=0
        for(var j=0;j<60;j++){
            n=toBytesNumber(b.slice(start,start+=1))
            vuDetailedSpeedBlock.speedsPerSecond.push(n)
            sum+=vuDetailedSpeedBlock.speedsPerSecond[vuDetailedSpeedBlock.speedsPerSecond.length-1]
        }
        vuDetailedSpeedBlock.speedMedia=(sum/60).toFixed(0)
        this.vuDetailedData.push(vuDetailedSpeedBlock)
    }

    this.signature= b.slice(start,start+=size_vu.SIGNATURE_TREP4)
    this.size=start
}

function Technical(b,s){
    var start=s
    var n
    this.vuIdentification={
        vuManufacturerName:"",
        vuManufacturerAddress:"",
        vuPartNumber:"",
        vuSerialNumber:{
            serialNumber:"",
            monthYear:"",
            type:"",
            manufacturerCode:""
        },
        vuSoftwareIdentification:{
            vuSoftwareVersion:"",
            vuSoftInstallationDate:""
        },
        vuManufacturingDate:"",
        vuApprovalNumber:""
    }
    this.sensorPaired={
        sensorSerialNumber:{
            serialNumber:"",
            monthYear:"",
            type:"",
            manufacturerCode:""
        },
        sensorApprovalNumber:"",
        sensorPairingDateFirst:""
    }



    var vuManufacturerName_codePage=b.slice(start,start+=1)
    this.vuIdentification.vuManufacturerName=String.fromCharCode.apply(null, b.slice(start,start+=size_vu.VUMANUFACTURERNAME-1)).trim()
    var vuManufacturerAddress_codePage=b.slice(start,start+=1)
    this.vuIdentification.vuManufacturerAddress=String.fromCharCode.apply(null, b.slice(start,start+=size_vu.VUMANUFACTURERADDRESS-1)).trim()
    this.vuIdentification.vuPartNumber=String.fromCharCode.apply(null, b.slice(start,start+=size_vu.VUPARTNUMBER))
    this.vuIdentification.vuSerialNumber.serialNumber=toBytesNumber(b.slice(start,start+=4))
    this.vuIdentification.vuSerialNumber.monthYear=BCDtoString(b.slice(start,start+=2))
    this.vuIdentification.vuSerialNumber.type=toBytesNumber(b.slice(start,start+=1)).toString()
    this.vuIdentification.vuSerialNumber.manufacturerCode=toBytesNumber(b.slice(start,start+=1))

    this.vuIdentification.vuSoftwareIdentification.vuSoftwareVersion=String.fromCharCode.apply(null, b.slice(start,start+=size_vu.VUSOFTWAREVERSION))
    n=toBytesNumber(b.slice(start,start+=size_vu.VUSOFTWAREINSTALLATIONDATE))*1000
    this.vuIdentification.vuSoftwareIdentification.vuSoftInstallationDate=new Date(n)
    n=toBytesNumber(b.slice(start,start+=size_vu.VUMANUFATURINGDATE))*1000
    this.vuIdentification.vuManufacturingDate=new Date(n)
    this.vuIdentification.vuApprovalNumber=String.fromCharCode.apply(null, b.slice(start,start+=size_vu.VUAPPROVALNUMBER))

    this.sensorPaired.sensorSerialNumber.serialNumber=toBytesNumber(b.slice(start,start+=4))
    this.sensorPaired.sensorSerialNumber.monthYear=BCDtoString(b.slice(start,start+=2))
    this.sensorPaired.sensorSerialNumber.type=toBytesNumber(b.slice(start,start+=1)).toString(16)
    this.sensorPaired.sensorSerialNumber.manufacturerCode=toBytesNumber(b.slice(start,start+=1))
    this.sensorPaired.sensorApprovalNumber=String.fromCharCode.apply(null,b.slice(start,start+=size_vu.SENSORAPPROVALNUMBER))
    n=toBytesNumber(b.slice(start,start+=size_vu.SENSORPAIRINGDATEFIRST))*1000
    this.sensorPaired.sensorPairingDateFirst=new Date(n)
    this.noOfVuCalibrationRecords=toBytesNumber(b.slice(start,start+=size_vu.NOOFVUCALIBRATIONRECORDS))

    this.vuCalibrationData=[]

    for(var i= 0;i<this.noOfVuCalibrationRecords;i++){
        var vuCalibrationRecord={
            calibrationPurpose:"",
            workshopName:"",
            workshopAddress:"",
            workshopCardNumber:{

                cardType:"",
                cardIssuingMemberState:"",
                ownerIdentification:"",
                cardConsecutiveIndex:"",
                cardReplacementIndex:"",
                cardRenewalIndex:""
            },
            workshopCardExpiryDate:"",
            vehicleIdentificationNumber:"",
            vehicleRegistrationIdentification:{
                vehicleRegistrationNation:"",
                vehicleRegistrationNumber:""
            },
            wVehicleCharacteristicConstant:"",
            kConstantOfRecordingEquipment:"",
            lTyreCircumference:"",
            tyreSize:"",
            authorisedSpeed:"",
            oldOdometerValue:"",
            newOdometerValue:"",
            oldTimeValue:"",
            newTimeValue:"",
            nextCalibrationDate:""

        }
        vuCalibrationRecord.calibrationPurpose=calibrationPurpose(b.slice(start,start+=size_vu.CALIBRATIONPURPOSE))
        var workshopName_codePage= b.slice(start,start+=1)
        vuCalibrationRecord.workshopName=String.fromCharCode.apply(null, b.slice(start,start+=size_vu.WORKSHOPNAME_VUCALIBRATIONDATA-1)).trim()
        var workshopAddress_codePage= b.slice(start,start+=1)
        vuCalibrationRecord.workshopAddress=String.fromCharCode.apply(null, b.slice(start,start+=size_vu.WORKSHOPADDRESS_VUCALIBRATIONDATA-1)).trim()

        vuCalibrationRecord.workshopCardNumber.cardType=equipmentType(b.slice(start,start+=size_card.CARDTYPE[0]))
        vuCalibrationRecord.workshopCardNumber.cardIssuingMemberState=nationNumeric(b.slice(start,start+=size_card.CARDISSUINGMEMBERSTATE[0]))
        vuCalibrationRecord.workshopCardNumber.ownerIdentification=String.fromCharCode.apply(null, b.slice(start,start+=13))
        vuCalibrationRecord.workshopCardNumber.cardConsecutiveIndex=String.fromCharCode.apply(null, b.slice(start,start+=1))
        vuCalibrationRecord.workshopCardNumber.cardReplacementIndex=String.fromCharCode.apply(null, b.slice(start,start+=1))
        vuCalibrationRecord.workshopCardNumber.cardRenewalIndex=String.fromCharCode.apply(null, b.slice(start,start+=1))

        n=toBytesNumber(b.slice(start,start+=size_vu.WORKSHOPCARDEXPIRYDATE))*1000
        vuCalibrationRecord.workshopCardExpiryDate=new Date(n)

        vuCalibrationRecord.vehicleIdentificationNumber=String.fromCharCode.apply(null, b.slice(start,start+=size_vu.VEHICLEIDENTIFICATIONNUMBER)).trim()
        vuCalibrationRecord.vehicleRegistrationIdentification.vehicleRegistrationNation=nationNumeric(b.slice(start,start+=size_vu.VEHICLEREGISTRATIONNATION_TREP5))
        var vehicleRegistrationNumber_codePage= b.slice(start,start+=1)
        vuCalibrationRecord.vehicleRegistrationIdentification.vehicleRegistrationNumber=String.fromCharCode.apply(null, b.slice(start,start+=size_vu.VEHICLEREGISTRATIONNUMBER_TREP5-1))

        vuCalibrationRecord.wVehicleCharacteristicConstant=toBytesNumber(b.slice(start,start+=size_vu.WVEHICLECHARACTERISTICCONSTANT))
        vuCalibrationRecord.kConstantOfRecordingEquipment=toBytesNumber(b.slice(start,start+=size_vu.KCONSTANTOFRECORDINGEQUIPMENT))
        vuCalibrationRecord.lTyreCircumference=toBytesNumber(b.slice(start,start+=size_vu.LTYRECIRCUMFERENCE))
        vuCalibrationRecord.tyreSize=String.fromCharCode.apply(null, b.slice(start,start+=size_vu.TYRESIZE))
        vuCalibrationRecord.authorisedSpeed=toBytesNumber(b.slice(start,start+=size_vu.AUTHORISEDSPEED))

        vuCalibrationRecord.oldOdometerValue=toBytesNumber(b.slice(start,start+=size_vu.OLDODOMETERVALUE))
        vuCalibrationRecord.newOdometerValue=toBytesNumber(b.slice(start,start+=size_vu.NEWODOMETERVALUE))

        n=toBytesNumber(b.slice(start,start+=size_vu.OLDTIMEVALUE_VUCALIBRATIONDATA))*1000
        vuCalibrationRecord.oldTimeValue=new Date(n)
        n=toBytesNumber(b.slice(start,start+=size_vu.NEWTIMEVALUE_VUCALIBRATIONDATA))*1000
        vuCalibrationRecord.newTimeValue=new Date(n)


        n=toBytesNumber(b.slice(start,start+=size_vu.NEXTCALIBRATIONDATE))*1000
        vuCalibrationRecord.nextCalibrationDate=new Date(n)

        this.vuCalibrationData.push(vuCalibrationRecord)
    }
    this.signature= b.slice(start,start+=size_vu.SIGNATURE_TREP5)
    this.size=start;

}