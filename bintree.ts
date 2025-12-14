interface BinTree {
    left?: BinTree | undefined,
    right?: BinTree | undefined,
    data: string,
}

export let bintree: BinTree = { data: '' };

export function insertToBinTree(char: string, code: string) {
    let moving = bintree;
    for (let i = 0; i < code.length; i++) {
        if (code[i] == '.') {
            if (!moving.left) {
                moving.left = { data: char };
            }
            moving = moving.left;
        } else {
            if (!moving.right) {
                moving.right = { data: char };
            }
            moving = moving.right;
        }
    }
}

export function getCharFromMorseCode(code: string) {
    let moving = bintree;
    for (let i = 0; i < code.length; i++) {
        if (code[i] == '.') {
            if (moving.left) {
                moving = moving.left;
            } else {
                return '[?]';
            }
        } else {
            if (moving.right) {
                moving = moving.right;
            } else {
                return '[?]';
            }
        }
    }
    return moving.data;
}

export function getMorseCodeFromChar(tree: BinTree | undefined, char: string, code: string[]): string[] | undefined {
    if (tree == undefined) {
        return;
    }
    if (tree?.data == char) {
        return code;
    }
    let result: string[] | undefined = [];
    result = getMorseCodeFromChar(tree?.left, char, [...code, '.']);
    if (result != undefined && result?.length != 0) {
        return result;
    }
    else {
        return getMorseCodeFromChar(tree?.right, char, [...code, '-']);
    }
}

insertToBinTree('E', '.');
insertToBinTree('T', '-');
insertToBinTree('I', '..');
insertToBinTree('A', '.-');
insertToBinTree('N', '-.');
insertToBinTree('M', '--');
insertToBinTree('S', '...');
insertToBinTree('U', '..-');
insertToBinTree('R', '.-.');
insertToBinTree('W', '.--');
insertToBinTree('D', '-..');
insertToBinTree('K', '-.-');
insertToBinTree('G', '--.');
insertToBinTree('O', '---');
insertToBinTree('H', '....');
insertToBinTree('V', '...-');
insertToBinTree('F', '..-.');
insertToBinTree('L', '.-..');
insertToBinTree('P', '.--.');
insertToBinTree('J', '.---');
insertToBinTree('B', '-...');
insertToBinTree('X', '-..-');
insertToBinTree('C', '-.-.');
insertToBinTree('Y', '-.---');
insertToBinTree('Z', '--..');
insertToBinTree('Q', '--.-');

insertToBinTree('[SOS]', '...---...');
insertToBinTree(',', '--..--');
insertToBinTree('?', '..--..');
