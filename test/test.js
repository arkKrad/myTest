main();

function main() {  //この中身は書き換えてOK
    var test1 = 'テスト１'

    print_hello(test1); //このままだとうまくいかない
    print_world(); //このままだとうまくいかない
}

function print_hello(test1) { //便宜上、非同期処理にしてある。引数や中身は書き換えてOK。
    setTimeout(() => {
        console.log(test1);
    }, 500);
}

function print_world() {　//この中身は変更不可
    console.log('world!');
}

process.on("exit", () => {
    process.exit(0);
});