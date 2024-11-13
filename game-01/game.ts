console.log('============ Desafio #1 =============');
// Funcion del primer desafio para encontrar un par de numeros que sumen un valor dado.
function findPair(m: number[], n: number): number[] | null {
    const revisedNumbers = new Set<number>();

    for (const element of m) {
        const complement = n - element;
        if (revisedNumbers.has(complement)) {
            return [complement, element];
        }
        revisedNumbers.add(element);
    }
    return null;
}

const exampleList = [2, 5, 8, 14, 0];
const sumExample = 10;
const response = findPair(exampleList, sumExample);

if (response) {
    console.log(`El primer par que suma ${sumExample} es: [${response[0]}, ${response[1]}]`);
} else {
    console.log(`No se encontró ningún par que sume ${sumExample}`);
}

function test() {
    console.assert(findPair([5, 2, 4], 10) === null, 'Error en la prueba 3');
    console.assert(findPair([], 3) === null, 'Error en la prueba 5');
}

test();
console.log('Pruebas ejecutadas correctamente.');