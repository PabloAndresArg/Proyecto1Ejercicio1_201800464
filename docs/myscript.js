// MIT License
// Copyright (c) 2021 Luis Espino

function heuristic(start, end, h) {
    if (h == 1) { // tiles out is sometimes encycled
        var tiles_out = 0
        for (var i = 0; i < start.length; i++) {
            if (start[i] != end[i]) tiles_out++
        }
        return tiles_out
    } else if (h == 2) { // Manhattan
        var man = 0
        for (var i = 0; i < start.length; i++) {
            man += Math.abs(i - end.indexOf(start.substring(i, i + 1)))
        }
        return man
    }
}

const move_ = (cadenaActualMatriz, indice, numberIndex) => {
    const matrizCaracteres = cadenaActualMatriz.split("");
    const charNumber = matrizCaracteres[numberIndex];
    matrizCaracteres[indice] = charNumber;
    matrizCaracteres[numberIndex] = "0";
    return matrizCaracteres.join("");
}

function successors(n, e, h) {
    let suc = [];
    const cadenaActualMatriz = n[0];
    const indice = cadenaActualMatriz.indexOf("0");
    let sucesor;
    // 0 = arriba , 1 = abajo , 2 = izquierda , 3 = derecha
    switch (indice) {
        case 0:
            sucesor = move_(cadenaActualMatriz, indice, 1);
            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);
            sucesor = (move_(cadenaActualMatriz, indice, 3));
            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);
            break;

        case 1:
            sucesor = (move_(cadenaActualMatriz, indice, 0));
            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);

            sucesor = (move_(cadenaActualMatriz, indice, 4));
            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);

            sucesor = (move_(cadenaActualMatriz, indice, 2));
            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);

            break;

        case 2:
            sucesor = (move_(cadenaActualMatriz, indice, 1));
            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);
            sucesor = (move_(cadenaActualMatriz, indice, 5));
            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);

            break;

        case 3:
            sucesor = (move_(cadenaActualMatriz, indice, 0));
            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);
            sucesor = (move_(cadenaActualMatriz, indice, 6));
            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);

            sucesor = (move_(cadenaActualMatriz, indice, 4));
            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);

            break;

        case 4:
            sucesor = (move_(cadenaActualMatriz, indice, 1));
            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);
            sucesor = (move_(cadenaActualMatriz, indice, 3));
            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);
            sucesor = (move_(cadenaActualMatriz, indice, 7));
            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);
            sucesor = (move_(cadenaActualMatriz, indice, 5));
            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);
            break;

        case 5:
            sucesor = (move_(cadenaActualMatriz, indice, 2));
            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);

            sucesor = (move_(cadenaActualMatriz, indice, 4));
            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);

            sucesor = (move_(cadenaActualMatriz, indice, 8));
            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);

            break;

        case 6:
            sucesor = (move_(cadenaActualMatriz, indice, 3));
            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);

            sucesor = (move_(cadenaActualMatriz, indice, 7));
            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);

            break;

        case 7:
            sucesor = (move_(cadenaActualMatriz, indice, 4));

            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);
            sucesor = (move_(cadenaActualMatriz, indice, 6));

            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);
            sucesor = (move_(cadenaActualMatriz, indice, 8));

            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);
            break;

        case 8:
            sucesor = (move_(cadenaActualMatriz, indice, 5));
            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);

            sucesor = (move_(cadenaActualMatriz, indice, 7));
            suc.push([sucesor, heuristic(sucesor, e, h), inc()]);
            
            break;
    }
    suc = suc.sort((uno, dos) => uno[1] - dos[1]);
    suc = suc.slice(0, 2);
    return suc
}

function bestfirst(start, end, h) {
    var cont = 0
    var dot = '{'
    var list = [[start, heuristic(start, end, h), inc()]];
    dot += list[0][2] + ' [label="' + list[0][0].slice(0, 3) + '\n' + list[0][0].slice(3, 6) + '\n' + list[0][0].slice(6, 9) + '"];'
    while (list.length > 0) {
        var current = list.shift();
        if (current[0] == end) {
            dot += '}'
            return dot
        }
        var temp = successors(current, end, h);
        temp.forEach(val => {
            dot += val[2] + ' [label="' + val[0].slice(0, 3) + '\n' + val[0].slice(3, 6) + '\n' + val[0].slice(6, 9) + '"];' + current[2] + '--' + val[2] + ' [label="' + val[1] + '"] ;'
        }
        )
        list = list.concat(temp);
        list = list.sort(function (a, b) { return a[1] - b[1] });
        cont++
        if (cont > 100) {
            alert("The search is looped!")
            dot += '}'
            return dot
        }
    }
    dot += '}'
    return dot
}

var id = 1
function inc() {
    return id++
}

function puzzle() {
    // para pruebas : 152043786
    let initialState = prompt("Ingrese El estado de Inicio Para el 8 puzzle:");
    let heuristicUse = prompt("Ingrese un Numero para la heuristica que desea:  \n 1 para Casillas fuera de lugar \n 2 para Manhatthan");
    if (!initialState){
        initialState = "152043786";
        alert(`dato Invalido para el estado inicial, se usara por defecto: ${initialState}`)
        if (!initialState) {
            heuristicUse = "2";
            alert(`Error al ingresar la heuristica , por defecto se ingreso: ${heuristicUse}`)
        }
    }
    return bestfirst(initialState, "123456780", heuristicUse);
}