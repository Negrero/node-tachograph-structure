/**
 * Created by negrero on 06/03/2016.
 */
var m=module.exports
    function octectString(byte){
        var str=""
        for (var i=0;i<byte.length;i++){

            var num=parseInt(byte[i],16);
            //ver tabla utf8
            if (num>=0x30 && num<=0x7a){
                str+=String.fromCharCode(byte[i]);
            }else{
                str+=" " + ( ( byte[i] & 0xff ) + 0x100).toString();
            }
        }
    }
m.BCDtoString=BCDtoString
m.calibrationPurpose=calibrationPurpose
m.eventFaultRecordPurpose=eventFaultRecordPurpose
m.eventFaultType=eventFaultType
m.regionNumeric=regionNumeric
m.entryTypeDailyWorkPeriod=entryTypeDailyWorkPeriod
m.toBytesBitString=toBytesBitString
m.equipmentType=equipmentType
m.toBytesNumber=toBytesNumber
m.nationNumeric=nationNumeric

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

