/**
 * Created by negrero on 01/04/2016.
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

size_card= {

    //:[tama�o:[byte] min,tama�o:[byte] max, valor por defecto]
    MF :[11411,24959,0],
    EF_IC:[25,25,0], // EF Archivo elemental
    CARDICCIDENTIFICATION:[25,25,0],
    CLOCKSTOP:[1,1,0],
    CARDEXTENDEDSERIALNUMBER:[8,8,0],
    SERIALNUMBER:[4,4,0],
    MONTHYEAR:[2,2,0],
    TYPE:[1,1,0],
    MANUFACTUREDCODE:[1,1,0],
    CARDAPPROVALNUMBER:[8,8,20],
    CARDPERSONALISERID:[1,1,0],
    EMBEDDERICASSEMBLERID:[5,5,0],
    ICIDENTIFIER:[2,2,0],
    EF_ICC:[8,8,0],
    CARDCHIPIDENTIFICATION:[8,8,0],
    ICSERIALNUMBER:[4,4,0],
    ICMANUFACTURINGREFENCES:[4,4,0],
    DF_TACHOGRAPF:[11378,24926,0],  //DF Archivo dedicado. Un DF puede contener otros archivos :[EF o DF]
    EF_APPLICATION_IDENTIFICATION:[10,10,0],
    DRIVERCARDAPPLICATIONIDENTIFICATION:[10,10,0],
    TYPEOFTACHOGRAPHCARDID:[1,1,0],
    CARDSTRUCTUREVERSION:[2,2,0],
    NOOFEVENTSPERTYPE:[1,1,0],
    NOOFFAULTSPERTYPE:[1,1,0],
    ACTIVITYSTRUCTURELENGTH:[2,2,0],
    NOOFCARDVEHICLERECORDS:[2,2,0],
    NOOFCARDPLACERECORDS:[1,1,0],
    EF_CARD_CERTIFICATE:[194,194,0],
    CARDCERTIFICATE:[194,194,0],
    EF_CA_CERTIFICATE:[194,194,0],
    MEMBERSTATECERTIFICATE:[194,194,0],
    EF_IDENTIFICATION:[143,143,0],
    CARDIDENTIFICATION:[65,65,0],
    CARDISSUINGMEMBERSTATE:[1,1,0],
    CARDNUMBER:[16,16,20],
    DRIVERIDENTIFICATION:[14,14,20],
    DRIVERCARDREPLACEMENTINDEX:[1,1,20],
    DRIVERCARDRENEWALINDEX:[1,1,20],
    OWNERIDENTIFICATION:[13,13,20],
    CARDCONSECUTIVEINDEX:[1,1,20],
    CARDREPLACEMENTINDEX:[1,1,20],
    CARDRENEWALINDEX:[1,1,20],
    CARDISSUINGAUTORITYNAME:[36,36,20],
    CARDISSUEDATE:[4,4,0],
    CARDVALIDITYBEGIN:[4,4,0],
    CARDEXPIRYDATE:[4,4,0],
    DRIVERCARDHOLDERIDENTIFICATION:[78,78,0],
    CARDHOLDERNAME:[72,72,0],
    HOLDERSURNAME:[36,36,200],
    HOLDERFIRTSNAMES:[36,36,200],
    CARDHOLDERBIRTHDATE:[4,4,0],
    CARDHOLDERPREFERREDLANGUAGE:[2,2,20],
    EF_CARD_DOWNLOAD:[4,4,0],
    LASTCARDDOWNLOAD:[4,4,0],
    EF_DRIVING_LICENSE_INFO:[53,53,0],
    CARDDRIVINGLICENCEINFORMATION:[53,53,0],
    DRIVINGLICENCEISSUINGAUTHORITY:[36,36,200],
    DRIVINGLICENCEISSUINGNATION:[1,1,0],
    DRIVINGLICENCENUMBER:[16,16,20],
    EF_EVENTS_DATA:[864,1728,0],
    CARDEVENTDATA:[864,1728,0],
    CARDEVENTRECORDS:[144,288,0],
    CARDEVENTRECORD:[24,24,0],
    EVENTTYPE:[1,1,0],
    EVENTBEGINTIME:[4,4,0],
    EVENTENDTIME:[4,4,0],
    EVENTVEHICLEREGISTRATION:[15,15,0],
    VEHICLEREGISTRATIONNATION_CARDEVENTDATA:[1,1,0],
    VEHICLEREGISTRATIONNUMBER_CARDEVENTDATA:[14,14,0],
    EF_FAULTS_DATA:[576,1152,0],
    CARDFAULTDATA:[576,1152,0],
    CARDFAULTRECORD:[24,24,0],
    FAULTTYPE:[1,1,0],
    FAULTBEGINTIME:[4,4,0],
    FAULTENDTIME:[4,4,0],
    FAULTVEHICLEREGISTRATION:[15,15,0],
    VEHICLEREGISTRATIONNATION_CARDFAULTDATA:[1,1,0],
    VEHICLEREGISTRATIONNUMBER_CARDFAULTDATA:[14,14,0],
    EF_DRIVER_ACTIVITY_DATA:[5548,13780,0],
    CARDDRIVERACTIVITY:[5548,13780,0],
    ACTIVITYPOINTEROLDESTADAYRECORD:[2,2,0],
    ACTIVITYPOINTERNEWESTRECORD:[2,2,0],
    ACTIVITYDAILYRECORDS:[14,14,0],
    ACTIVITYPREVIUSRECORDLENGTH:[2,2,0],
    ACTIVITYRECORDLENGTH:[2,2,0],
    ACTIVITYRECORDDATE:[4,4,0],
    ACTIVITYDAILYPRESENCECOUNTER:[2,2,0],
    ACTIVITYDAYDISTANCE:[2,2,0],
    ACTIVITYCHANGEINFO:[2,1440,0],
    EF_VEHICLES_USED:[2606,6202,0],
    CARDVEHICLEUSED:[2606,6202,0],
    VEHICLEPOINTERNEWESTRECORD:[2,2,0],
    CARDVEHICLERECORDS:[2604,6200,0],
    CARDVEHICLERECORD:[31,31,0],
    VEHICLEODOMETERBEGIN:[3,3,0],
    VEHICLEODOMETEREND:[3,3,0],
    VEHICLEFIRSTUSE:[4,4,0],
    VEHICLELASTUSE:[4,4,0],
    VEHICLEREGISTRATION:[15,15,0],
    VEHICLEREGISTRATIONNATION:[1,1,0],
    VEHICLEREGISTRATIONNUMBER:[14,14,0],
    VUDATABLOCKCOUNTER:[2,2,0],
    EF_PLACES:[841,1121,0],
    CARDPLACEDAILYWORKPERIOD:[841,1121,0],
    PLACEPOINTERNEWESTRECORD:[1,1,0],
    PLACERECORDS:[840,1120,0],
    PLACERECORD:[10,10,0],
    ENTRYTIME:[4,4,0],
    ENTRYTYPEDAILYWORKPERIOD:[1,1,0],
    DAILYWORKPERIODCOUNTRY:[1,1,0],
    DAILYWORKPERIODREGION:[1,1,0],
    VEHICLEODOMETERVALUE:[3,3,0],
    EF_CURRENT_USAGE:[19,19,0],
    CARDCURRENTUSE:[19,19,0],
    SESSIONOPENTIME:[4,4,0],
    SESSIONOPENVEHICLE:[15,15,0],
    VEHICLEREGISTRATIONNATION_CARDCURRENTUSE:[1,1,0],
    VEHICLEREGISTRATIONNUMBER_CARDCURRENTUSE:[14,14,0],
    EF_CONTROL_ACTIVITY_DATA:[46,46,0],
    CARDCONTROLACTIVITYDATARECORD:[46,46,0],
    CONTROLTYPE:[1,1,0],
    CONTROLTIME:[4,4,0],
    CONTROLCARDNUMBER:[18,18,0],
    CARDTYPE:[1,1,0],
    CARDISSUINGMEMBERSTATE_CONTROL:[1,1,0],
    CARDNUMBER_CONTROL:[16,16,0],
    CONTROLVEHICLEREGISTRATION:[15,15,0],
    VEHICLEREGISTRATIONNATION_CONTROL:[1,1,0],
    VEHICLEREGISTRATIONNUMBER_CONTROL:[14,14,0],
    CONTROLDOWNLOADPERIODBEGIN:[4,4,0],
    CONTROLDOWNLOADPERIODEND:[4,4,0],
    EF_SPECIFIC_CONDITIONS:[280,280,0],
    SPECIFICCONDITIONRECORD:[5,5,0],
    ENTRYTIME_SPECIFIC:[4,4,0],
    SPECIFICCIONDITIONTYPE:[1,1,0]
}
size_vu= {
    TREP_1:491,     							//Resumen
    MEMBERSTATECERTIFICATE:194,			//Certificados de seguridad de la VU
    VUCERTIFICATE:194,
    VEHICLEINDENTIFICATIONNUMBER:17, 		//Identificacion de vehiculo
    VEHICLEREGISTRATIONIDENTIFICATION_TREP1:15,
    VEHICLEREGISTRATIONNATION_TREP1:1,
    VEHICLEREGISTRATIONNUMBER_TREP1:14,
    CURRENTDATETIME:4,						//fecha y hora actuales de la VU
    VUDOWNLOADABLEPERIOD:8,				//periodo transferible
    MINDOWNLOADLETIME:4,
    MAXDOWNLOADLETIME:4,
    CARDSLOTSSTATUS:1,
    VUDOWNLOADACITIVITYDATA:58,            //Transferencia anterior de la VU
    DOWNLOADINGTIME:4,
    //FULLCARDNUMBER YA DECLARADO
    COMPANYORWORKSHOPNAME:36,
    VUCOMPANYLOCKSDATA:99,					//Todos los bloqueos de empresa almacenado.
    NOOFLOCKS:1,						//Si la seccion esta vacia, tan solo se envia noOfLocks=0
    VUCOMPANYLOCKSRECORD:98,
    LOCKINTITME:4,
    LOCKOUTTIME:4,
    COMPANYNAME:36,
    COMPANYADDRESS:36,
    COMPANYCARDNUMBER:18,
    VUCONTROLACTIVITYDATA:32,				//Todos los registros de control almacenado en la vu.
    NOOFCONTROLS:1,					//Si la seccion esta vacia, tan solo se envia noOfControls=0
    VUCONTROLACTIVITYRECORD:31,
    CONTROLTYPE:1,
    CONTROLTIME:4,
    CONTROLCARDNUMBER:18,
    DOWNLOADPERIODBEGINTIME:4,
    DOWNLOADPERIODENDTIME:4,
    SIGNATURE_TREP1:128,							//Firma RSA de todos los datos:except los certificados,desde el
    //VehicleIdentificationNumber hasta el ultimo byte del ultimo VuControlActivityRecord


    TREP_2:7,									//Actividades
    TIMEREAL:4,							//Fecha correspondiente al dia cuyos datos se transfieren
    ODOMETERVALUEMINDNIGHT:3,				//Lectura del cuantakilometros al terminar el dia cuyos datos se transfieren
    VUCARDWDATA:131,						//Datos sobre los ciclos de insercion y extraccion de tarjetas.
    NOOFVUCARDIWRECORDS:2,				//-Si esta seccion no contiene datos disponibles, tan solo se envia noOfVuCardIWRecords=0
    VUCARDIWRECORD:129,				//-Cuando un registro VuCardIWRecord es anterior a las 00:00:la tarjeta se insert� el dia de antes
    CARDHOLDERNAME:72,					//o posterior a las 24:00:la tarjeta se extrajo el dia despues, debera constar en los dias.
    HOLDERSURNAME:36,
    HOLDERFIRSTNAMES:36,
    FULLCARDNUMBER:18,
    CARDEXPIRYTDATE:4,
    CARDINSERTIONTIME:4,
    VEHICLEODOMETERVALUEATINSERTION:3,
    CARDSLOTNUMBER:1,
    CARDWITHDRAWALTIME_VUCARDWDATA:4,
    VEHICLEODOMETERVALUEATWITHDRAWAL:3,
    PREVIOUSVEHICLEINFO:19,
    VEHICLEREGISTRATIONIDENTIFICATION_TREP2:15,
    //VEHICLEREGISTRATIONNUMBER_TREP2:14,
    CARDWITHDRAWALTIME_VEHICLEODOMETER:4,
    MANUALINPUTFLAG:1,
    VUACTIVITYDAILYDATA:4,					//Estado de la ranura a las 00:00 y cambios de actividad registrados
    NOOFACTIVITYCHANGES:2,				//durante el dia cuyos datos se transfieren
    ACTIVITYCHANGEINFO:2,
    VUPLACEDAILYWORKPERIODDATA:29,			//Datos relativos a lugares y registros durante el dia cuyos datos se
    NOOFPLACERECORDS:1,				//transfieren. Si la seccion esta vacia tan solo se envia noOfPlaceRecords=0
    VUPLACEDAILYWORKPERIODRECORD:28,
    FULLCARDNUMBER_TREP2:18,
    PLACERECORD:10,
    ENTRYTIME_PLACERECORD:4,
    ENTRYTYPEDAILYWORKPERIOD:1,
    DAILYWORKPERIODCOUNTRY:1,
    DAILYWORKPERIODREGION:1,
    VEHICLEODOMETERVALUE:3,
    VUSPECIFICCONDITIONDATA:7,
    NOOFSPECIFICCONDITIONSRECORDS:2,
    SPECIFICCONDITIONRECORD:5,
    ENTRYTIME_SPECIFICCIONDITIONRECORD:4,
    SPECIFICCONDITIONTYPE:1,
    SIGNATURE_TREP2:128,					//Firma RSA de todos los datos, desde TimeReal hasta el ultimo byte
    //del ultimo registro de una condicion especifica

    TREP_3:0,								//Indices y fallos
    VUFAULTDATA:83,					//Todos los fallos almacenados o en curso en la VU. Si la seccion esta vacia,
    NOOFVUFAULTS:1,				//tan solo se envia noOfVuFaults=0
    VUFAULTRECORD:82,
    FAULTTYPE:1,
    FAULTRECORDPURPOSE:1,
    FAULTBEGINTIME:4,
    FAULTENDTIME:4,
    CARDNUMBERDRIVERSLOTBEGIN_FAULT:18,
    CARDNUMBERCODRIVERSLOTBEGIN_FAULT:18,
    CARDNUMBERDRIVERSLOTEND_FAULT:18,
    CARDNUMBERCODRIVERSLOTEND_FAULT:18,
    VUEVENTDATA:84,				//Todos los incidentes:excepto los de exceso de velocidad almacenados o en curso
    NOOFVUEVENTS:1,			// en la VU. Si la seccion esta vacia, tan solo se envia noOfVuEvents=0
    VUEVENTRECORD:83,
    EVENTTYPE:1,
    EVENTRECORDPURPOSE:1,
    EVENTBEGINTIME:4,
    EVENTENDTIME:4,
    CARDNUMBERDRIVERSLOTBEGIN_EVENT:18,
    CARDNUMBERCODRIVERSLOTBEGIN_EVENT:18,
    CARDNUMBERDRIVERSLOTEND_EVENT:18,
    CARDNUMBERCODRIVERSLOTEND_EVENT:18,
    //SIMILAREVENTSNUMBER:1,
    VUOVERSPEEDINGCONTROLDATA:9,	//Datos relativos al ultimo control del exceso de velocidad:si no hay datos
    LASTOVERSPEEDCONTROLTIME:4,//se indica un valor por defecto
    FIRSTOVERSPEEDSINCE:4,
    NUMBEROFOVERSPEEDSINCE:1,
    VUOVERSPEEDINGEVENTDATA:32,	//Todos los incidentes de exceso de velocidad almacenados en la VU.
    NOOFVUOVERSPEEDINGEVENTS:1,//Si la seccion esta vacia, tan solo se envia noOfVuOverSpeedingEvents=0
    VUOVERSPEEDINGEVENTRECORD:31,
    EVENTTYPE_VUOVERSPEED:1,
    EVENTRECORDPURPOSE_VUOVERSPEED:1,
    EVENTBEGINTIME_VUOVERSPEED:4,
    EVENTENDTIME_VUOVERSPEED:4,
    MAXSPEEDVALUE:1,
    AVARAGESPEEDVALUE:1,
    CARDNUMBERDRIVERSLOTBEGIN_VUOVERSPEED:18,
    SIMILAREVENTSNUMBER:1,
    VUTIMEADJUSTMENTDATA:99,		//Todos los ajustes de hora almacenados en la VU:fuera del marco de un calibrado
    NOOFVUTIMEADJUSTMENTRECORDS:1,	//completo. Si la seccion esta vacia, tan solo se envia noOfVuTimeAdjRecors=0
    VUTIMEADJUSTMENTRECORD:98,
    OLDTIMEVALUE_VUTIMEADJUSTMENTDATA:4,
    NEWTIMEVALUE_VUTIMEADJUSTMENTDATA:4,
    WORKSHOPNAME_VUTIMEADJUSTMENTADATA:36,
    WORKSHOPADDRESS_VUTIMEADJUSTMENTADATA:36,
    WORKSHOPCARDNUMBER_VUTIMEADJUSTMENTADATA:18,
    SIGNATURE_TREP3:128,

    TREP_4:0, 						//Velocidad
    VUDETAILEDSPEEDDATA:66,
    NOOFSPEEDBLOCKS:2,		//Todos los datos pormenorizados almacenados en la Vu y relativos a la velociad del
    VUDETAILEDSPEEDBLOCK:64,//vehiculo :un bloque de datos por cad minuto que haya estado el vehiculo en
    SPEEDBLOCKBEGINDATE:4,//movimiento 60 valores de velocidad por cada minuto:un valor por segundo
    SPEEDPERSECOND:60,
    SIGNATURE_TREP4:128,		// Firma RSA de todos los datos, desde noOfSpeedBlocks hsta el ultimo byte del
    //ultimo bloque con datos de velocidad

    TREP_5:208,						//Datos tecnicos
    VUIDENTIFICATION:116,
    VUMANUFACTURERNAME:36,
    VUMANUFACTURERADDRESS:36,
    VUPARTNUMBER:16,
    VUSERIALNUMBER:8,
    SERIALNUMBER:4,
    MONTHYEAR:2,
    TYPE: 1,
    MANUFACTURERCODE:1,
    VUSOFTWAREIDENTIFICATION:8,
    VUSOFTWAREVERSION:4,
    VUSOFTWAREINSTALLATIONDATE:4,
    VUMANUFATURINGDATE:4,
    VUAPPROVALNUMBER:8,
    SENSORPAIRED:20,
    SENSORSERIALNUMBER:8,
    SENSORAPPROVALNUMBER:8,
    SENSORPAIRINGDATEFIRST:4,
    VUCALIBRATIONDATA:165,			//Todos los registros de calibrado almacenados en la VU
    NOOFVUCALIBRATIONRECORDS:1,
    VUCALIBRATIONRECORD:164,
    CALIBRATIONPURPOSE:1,
    WORKSHOPNAME_VUCALIBRATIONDATA:36,
    WORKSHOPADDRESS_VUCALIBRATIONDATA:36,
    WORKSHOPCARDNUMBER_VUCALIBRATIONDATA:18,
    WORKSHOPCARDEXPIRYDATE:4,
    VEHICLEIDENTIFICATIONNUMBER:17,
    VEHICLEREGISTRATIONIDENTIFICATION_TREP5:15,
    VEHICLEREGISTRATIONNATION_TREP5:1,
    VEHICLEREGISTRATIONNUMBER_TREP5:14,
    WVEHICLECHARACTERISTICCONSTANT:2,
    KCONSTANTOFRECORDINGEQUIPMENT:2,
    LTYRECIRCUMFERENCE:2,
    TYRESIZE:15,
    AUTHORISEDSPEED:1,
    OLDODOMETERVALUE:3,
    NEWODOMETERVALUE:3,
    OLDTIMEVALUE_VUCALIBRATIONDATA:4,
    NEWTIMEVALUE_VUCALIBRATIONDATA:4,
    NEXTCALIBRATIONDATE:4,
    SIGNATURE_TREP5:128			//Firma RSA de todos los datos, desde vuManufacturerName hasta el ultimo
}
function BCDtoString(byte){
    var str =""
    for (var i=0;i<byte.length;i++){
        // elimino 4 ultimos bits
        var high = (byte[i] & 0xf0);
        // desplazo los 4 bits hacia la derecha
        high >>>=  4;
        // pongo a cero los cuatro primeros bits
        high =  (high & 0x0f);
        // elimino los 4 primeros bits
        var low =  (byte[i] & 0x0f);
        str+=high.toString()+low.toString()
    }

    return str;
}
function calibrationPurpose(byte){
    var str="";
    switch (byte[0]) {
        case 0x00:str="valor reservado";break;
        case 0x01:str="activación: registro de los parámetros de calibrado conocidos en el momento de la activación de la VU";break;
        case 0x02:str="primera instalación: primer calibrado de la VU después de su activación";break;
        case 0x03:str="instalación: primer calibrado de la VU en el vehículo actual";break;
        case 0x04:str="control periódico";break;
        default:
            break;
    }
    return str;
}
function eventFaultRecordPurpose(byte){
    var str="";
    switch (byte[0]) {
        case 0x00:str="uno de los 10 incidentes o fallos más recientes (o de los 10 últimos)";break;
        case 0x01:str="el incidente de más duración ocurrido en uno de los 10 últimos días en que se hayan producido incidentes de este tipo";break;
        case 0x02:str=" uno de los 5 incidentes de más duración ocurridos en los últimos 365 días";break;
        case 0x03:str="el último incidente ocurrido en uno de los 10 últimos días en que se hayan producido incidentes de este tipo";break;
        case 0x04:str="el incidente más grave en uno de los últimos días en que se hayan producido incidentes de este tipo";break;
        case 0x05:str="uno de los 5 incidentes más graves ocurridos en los últimos 365 días";break;
        case 0x06:str="el primer incidente o fallo ocurrido tras el último calibrado";break;
        case 0x07:str="un incidente o fallo activo/en curso";break;
        default:
            str="RFU";
            break;
    }
    return str;
}
function eventFaultType(byte){
    var str="";
    switch (byte[0]) {
        //0xIncidentes de carácter general,
        case 0x00:str="No hay más información";break;
        case 0x01:str="Inserción de una tarjeta no válida";break;
        case 0x02:str="Conflicto de tarjetas";break;
        case 0x03:str="Solapamiento temporal";break;
        case 0x04:str="Conducción sin tarjeta adecuada";break;
        case 0x05:str="Inserción de tarjeta durante la conducción";break;
        case 0x06:str="Error al cerrar la última sesión de la tarjeta";break;
        case 0x07:str="Exceso de velocidad";break;
        case 0x08:str="Interrupción del suministro eléctrico";break;
        case 0x09:str="Error en datos de movimiento";break;
        case 0x0a:str="Conflicto de movimiento del vehículo";break;
        //′0B′H .. ′0F′H RFU,
        //′1x′H Intentos de violación de la seguridad relacionados con la unidad intravehicular,
        case 0x10:str="No hay más información";break;
        case 0x11:str="Fallo de autentificación del sensor de movimiento";break;
        case 0x12:str="Fallo de autentificación de la tarjeta de tacógrafo";break;
        case 0x13:str="Cambio no autorizado del sensor de movimiento";break;
        case 0x14:str="Error de integridad en la entrada de los datos de la tarjeta";break;
        case 0x15:str="Error de integridad en los datos de usuario almacenados";break;
        case 0x16:str="Error en una transferencia interna de datos";break;
        case 0x17:str="Apertura no autorizada de la carcasa";break;
        case 0x18:str="Sabotaje del hardware";break;
        //′19′H .. ′1F′H RFU
        //′2x′H Intentos de violación de la seguridad relacionados con el sensor,
        case 0x20:str="No hay más información,";break;
        case 0x21:str="Fallo de autentificación";break;
        case 0x22:str="Error de integridad en los datos almacenados";break;
        case 0x23:str="Error en una transferencia interna de datos";break;
        case 0x24:str="Apertura no autorizada de la carcasa";break;
        case 0x25:str="Sabotaje del hardware";break;
        // ′26′H .. ′2F′H RFU,
        // ′3x′H Fallos del aparato de control
        case 0x30:str="No hay más información";break;
        case 0x31:str="Fallo interno de la VU";break;
        case 0x32:str="Fallo de la impresora";break;
        case 0x33:str="Fallo de la pantalla";break;
        case 0x34:str="Fallo de transferencia";break;
        case 0x35:str="Fallo del sensor";break;
        //′36′H .. ′3F′H RFU
        //′4x′H	Fallos de las tarjetas
        case 0x40:str="No hay más información";break;
        //′41′H .. ′4F′H RFU
        //′50′H .. ′7F′H RFU
        //′80′H .. ′FF′H Específicos del fabricante
        default:
            if (byte[0]>0x80){
                str="Específicos del fabricante";
            }else{
                str="RFU";
            }
            break;
    }
    return str;


}
function regionNumeric (byte){

    switch(byte[0]){
        case 0x01: return "Andalucia";
        case 0x02: return "Aragon";
        case 0x03: return "Asturias";
        case 0x04: return "Cantabria";
        case 0x05: return "Cataluña";
        case 0x06: return "Castilla-Leon";
        case 0x07: return "Castilla-La-Mancha";
        case 0x08: return "Valencia";
        case 0x09: return "Extremadura";
        case 0x0A: return "Galicia";
        case 0x0B: return "Baleares";
        case 0x0C: return "Canarias";
        case 0x0D: return "La Rioja";
        case 0x0E: return "Madrid";
        case 0x0F: return "Murcia";
        case 0x10: return "Navarra";
        case 0x11: return "Pais Vasco";
    }
    return null;
}
function entryTypeDailyWorkPeriod(byte){
    var str=""
    switch (toBytesNumber(byte[0])){
        case 0: str="Begin:card insertion time or time of entry ";break;
        case 1: str="End:card with drawal time or time of entry ";break;
        case 2: str="Begin:card withdrawal time or time of entry ";break;
        case 3: str="End:related time manually entered (end of work period) ";break;
        case 4: str="Begin:related time assumed by VU";break;
        case 5: str="related time assumed by VU";break;
        default: str=toBytesNumber(byte[0]);
    }
    return str
}
function toBytesBitString(byte){
    var str=""
    var octet
    for(var j=0;j<byte.length;j++){
        octet = byte[j];

        for (var i = 7; i >= 0; i--) {
            var bit = octet & (1 << i) ? 1 : 0;
            str+=bit
        }
    }
    return str
}
function equipmentType(byte){
    switch(byte[0]){
        case 0x00 :return "Reserved(0)";
        case 0x01: return "Driver Card (1)";
        case 0x02: return "Workshop Card(2)";
        case 0x03: return "Control Card(3)";
        case 0x04: return "Company Card(4)";
        case 0x05: return "Manufacturing Card(5)";
        case 0x06: return "Vehicle Unit(6)";
        case 0x07: return "Motion Sensor(7)";
        default: return "RFU(8....255)";
    }
}
function toBytesNumber (array) {
    switch (array.length){
        case 1:
            var result = ((array[array.length - 1]) |
            (array[array.length - 2] << 8))
            break
        case 2:
            var result = ((array[array.length - 1]) |
            (array[array.length - 2] << 8) |
            (array[array.length - 3] << 16))
            break
        case 3:
            var result = ((array[array.length - 1]) |
            (array[array.length - 2] << 8) |
            (array[array.length - 3] << 16))
            break
        case 4:
            var result = ((array[array.length - 1]) |
            (array[array.length - 2] << 8) |
            (array[array.length - 3] << 16) |
            (array[array.length - 4] << 24));
            break
    }

    return result;
}
function nationNumeric(byte){
    var cadena="";
    switch(byte[0]){
        case 0x00:cadena="No hay informacion disponible (00)H";break;
        case 0x01:cadena="Austria (01)H";break;
        case 0x02:cadena="Albania (02)H";break;
        case 0x03:cadena="Andorra (03)H";break;
        case 0x04:cadena="Armenia (04)H";break;
        case 0x05:cadena="Azerbaiy�n (05)H";break;
        case 0x06:cadena="Belgica (06)H";break;
        case 0x07:cadena="Bulgaria (07)H";break;
        case 0x08:cadena="Bosnia y Hercegovina (08)H";break;
        case 0x09:cadena="Bielorrusia (09)H";break;
        case 0x0a:cadena="Suiza (0A)H";break;
        case 0x0b:cadena="Chipre (0B)H";break;
        case 0x0c:cadena="Republica Checa (0C)H";break;
        case 0x0d:cadena="Alemania (0D)H";break;
        case 0x0e:cadena="Dinamarca (0E)H";break;
        case 0x0f:cadena="España (0F)H";break;
        case 0x10:cadena="Estonia (10)H";break;
        case 0x11:cadena="Francia (11)H";break;
        case 0x12:cadena="Finlandia (12)H";break;
        case 0x13:cadena="Liechtenstein (13)H";break;
        case 0x14:cadena="Islas Feroe (14)H";break;
        case 0x15:cadena="Reino Unido (15)H";break;
        case 0x16:cadena="Georgia (16)H";break;
        case 0x17:cadena="Grecia (17)H";break;
        case 0x18:cadena="Hungria (18)H,";break;
        case 0x19:cadena="Croacia (19)H";break;
        case 0x1a:cadena="Italia (1A)H";break;
        case 0x1b:cadena="poikl Irlanda (1B)H";break;
        case 0x1c:cadena="Islandia (1C)H";
        case 0x1d:cadena=" Kazajistan (1D)H";break;
        case 0x1e:cadena="Luxemburgo (1E)H";break;
        case 0x1f:cadena="Lituania (1F)H";break;
        case 0x20:cadena="Letonia (20)H";break;
        case 0x21:cadena="Malta (21)H";break;
        case 0x22:cadena="Monaco (22)H";break;
        case 0x23:cadena="Republica de Moldavia (23)H";break;
        case 0x24:cadena="Macedonia (24)H";break;
        case 0x25:cadena="Noruega (25)H";break;
        case 0x26:cadena="Paises Bajos (26)H";break;
        case 0x27:cadena="Portugal (27)H";break;
        case 0x28:cadena="Polonia (28)H";break;
        case 0x29:cadena="Rumania (29)H";break;
        case 0x2a:cadena="San Marino (2A)H";break;
        case 0x2b:cadena="Federacion Rusa (2B)H";break;
        case 0x2c:cadena="Suecia (2C)H";break;
        case 0x2d:cadena="Eslovaquia (2D)H";break;
        case 0x2e:cadena="Eslovenia (2E)H";break;
        case 0x2f:cadena="Turkmenistan (2F)H";break;
        case 0x30:cadena="Turquia (30)H";break;
        case 0x31:cadena="Ucrania (31)H";break;
        case 0x32:cadena="Vaticano (32)H";break;
        case 0x33:cadena="Yugoslavia (33)H";break;
        case 0xFC:cadena="RFU (34..FC)H";break;
        case 0xfd:cadena="Comunidad Europea (FD)H";break;
        case 0xfe:cadena="Resto de Europa (FE)H";break;
        case 0xff:cadena="Resto del mundo (FF)H";break;
    }

    return cadena;
}