// LOGIA DE IP

function convertirTodos(){

    // CONFORMACION DE LA IP

    let primeros3Numeros = document.getElementById('primeros3Numeros').value; // CLASE
    let segundos3Numeros = document.getElementById('segundos3Numeros').value;
    let terceros3Numeros = document.getElementById('terceros3Numeros').value;
    let cuartos3Numeros = document.getElementById('cuartos3Numeros').value;

    // LONGITUD ACEPTABLE
    let longitudPrimera = primeros3Numeros.length;
    let longitudSegunda = segundos3Numeros.length;
    let longitudTercera = terceros3Numeros.length;
    let longitudCuarta = cuartos3Numeros.length;

    if(primeros3Numeros < 0 || segundos3Numeros < 0 || terceros3Numeros < 0 || cuartos3Numeros < 0){

        alert('NO SE ACEPTAN NUMEROS NEGATIVOS'); // SOLO NUMEROS POSITIVOS
        document.getElementById('resultadoIp').value = '';

    }

    else if(primeros3Numeros == null || segundos3Numeros == null || terceros3Numeros == null || cuartos3Numeros == null){

        alert('NO HAY NADA EN ALGUNA DE ESTAS COSAS'); // QUE SE LLENE BIEN
        document.getElementById('resultadoIp').value = '';

    }

    else if(parseInt(primeros3Numeros) > 255 || parseInt(segundos3Numeros) > 255 || parseInt(terceros3Numeros) > 255 || parseInt(cuartos3Numeros) > 255){

        alert('NO EXISTEN VALORES PARA ESA IP'); // IP VALIDA
        document.getElementById('resultadoIp').value = '';

    }

    else if(longitudPrimera > 3 || longitudSegunda > 3 || longitudTercera > 3 || longitudCuarta > 3){

        alert('NUMEROS VALIDOS'); // IP VALIDA
        document.getElementById('resultadoIp').value = '';

    }

    else{

        let ipTexto = primeros3Numeros + '.' + segundos3Numeros + '.' + terceros3Numeros + '.' + cuartos3Numeros;
        let datos = (separador(ipTexto).split(',')); // CALCULAR LA IP
        document.getElementById('claseIp').value = datos[0];
        document.getElementById('mascaraSubred').value = datos[1];

    }

}

// CONVERTIDOR A BINARIO

function convertirBinario(decimal){

    let binario = '';
    let resto;

    while(Math.floor(decimal) != 0){

        resto = decimal - Math.floor(decimal / 2) * 2;
        binario = resto + binario;
        decimal = Math.floor(decimal / 2);

    }

    return binario;

}

// SEPARADOR EN IP

function separador(Ip){

    ipSeparada = Ip.split('.')
    ipBinaria = ''
    cerosFaltantes = '';

    for(let i = 0; i < ipSeparada.length; i++){

        numeroBinario = convertirBinario(ipSeparada[i]);
        if(numeroBinario.length < 8){

            cerosFaltantes = ''
            numeroCeros = 8 - numeroBinario.length;
            for(let j = 0; j < numeroCeros; j++){

                cerosFaltantes += '0';
                

            }

            cerosFaltantes += numeroBinario;
            ipBinaria += cerosFaltantes + '.';

        }

        else{

            ipBinaria += numeroBinario + '.';

        }

    }

    ipBinariaCorrecta = ipBinaria.slice(0 , -1);
    datos = clasificarMascara(Ip);
    return datos;

}

// CLASIFICAR TIPO DE RED

function clasificarMascara(Ip){

    tipoDeRed = '';
    mascaraDeSubred = '';
    ipSeparada = Ip.split('.');
    primerByte = parseInt(ipSeparada[0])
    if(primerByte >= 0 && primerByte < 128){

        tipoDeRed = 'A';
        mascaraDeSubred = '255.0.0.0 / 8';

    }

    else if(primerByte >= 128 && primerByte < 192){

        tipoDeRed = 'B';
        mascaraDeSubred = '255.255.0.0 / 16';

    }

    else if(primerByte >= 192 && primerByte < 224){

        tipoDeRed = 'C';
        mascaraDeSubred = '255.255.255.0 / 24';

    }

    else if(primerByte >= 224 && primerByte < 240){

        tipoDeRed = 'C';
        mascaraDeSubred = '(-)';

    }

    else if(primerByte >= 240 && primerByte < 256){

        tipoDeRed = 'D'
        mascaraDeSubred = '(-)';

    }
    
    else{

        alert('Ese rango de subred no existe flaco');

    }

    return tipoDeRed + ',' + mascaraDeSubred;

}

// OBTENER NUMERO DE SUBREDES POR MEDIO DE LA IP

function obtenerNumeroDeHost(){

    let subredesNecesarias = document.getElementById('subredesNecesarias').value;

    if(subredesNecesarias == null){

        alert('NO HAS CALCULADO lLA MASCARA');

    }

    else if(subredesNecesarias < 0){

        alert('NO SE PERMITE NUMEROS NEGATIVOS');

    }

    else{
        
        let numeroEspacios = '';
        let espacioDeSalto = '';
        let exponenteHost = 0;
        let mascaraDecimal = document.getElementById('mascaraSubred').value;
        let mascaraLista = (mascaraDecimal.slice(0 , -4)).split('.');

        let exponente = parseInt(Math.log2(parseInt(subredesNecesarias)));
    
        if(2 ** exponente < parseInt(subredesNecesarias)){

            exponente += 1

        }

        for(let i = 0; i < mascaraLista.length; i++){

            let parteDeSubred = mascaraLista[i];

            if(parseInt(parteDeSubred) == 0){

                numeroEspacios += '11111111';

            }

        }
        
        for(let k = 0; k < exponente; k++){

            espacioDeSalto += '1';

        }

        let espaciosSobrantes = numeroEspacios.length - espacioDeSalto.length;

        for(let j = 0; j < espaciosSobrantes.length; j++){

            espacioDeSalto += '0';
            exponenteHost += 1;

        }

        console.log(espacioDeSalto)
        let mascaraDisponible = convertirDecimal(numeroEspacios);
        let salto = mascaraDisponible - convertirDecimal(espacioDeSalto) + 1;
        document.getElementById('salto').value = parseInt(salto);
        document.getElementById('hostdisponbile').value = toString(2 ** exponenteHost);

    }

}

function convertirDecimal(binario){

    if(binario.constructor != String){

        return null;

    }

    else{

        binario = binario.replace(/[^01]/gi, '');

        return Number.parseInt(binario , 2);

    }
}